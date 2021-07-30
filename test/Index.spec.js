// Import the `mount()` method from Vue Test Utils

import actions from '@/store/actions.js';
import axios from 'axios';
import BootstrapVue from 'bootstrap-vue';
import Index from '@/pages/index.vue';
import mockData from '@/testData.js';
import Modal from '@/components/Modal.vue';
import mutations from '@/store/mutations.js';
import { mount, shallowMount,createLocalVue } from '@vue/test-utils';
import state from '@/store/state.js';
import Tree from '@/components/Tree.vue';

import Vuex from 'vuex';

const flushPromises = require('flush-promises');
const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(BootstrapVue);

jest.mock('axios', () => ({
  $get: jest.fn(() => Promise.resolve(mockData.data)),
}));

describe('Index', () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      actions, mutations, state,
    });
    store.$axios = axios;
    global.wrapper = mount(Index, {
      store,
      localVue,
      stubs: {
        FontAwesomeIcon: true,'b-button': true,
      },
    });
  });
  it('All nodes should be loaded via api call to tree route', async () => {
    expect(axios.$get).toBeCalled();
    expect(axios.$get).toHaveBeenCalledWith('trees');
  });
  it('it emits expected data', async ()  => {
    wrapper = mount(Modal, {
      store,
      localVue,
      stubs: {
        FontAwesomeIcon: true,'b-modal': true, 'b-form-group': true, 'b-form-input': true, 'b-button': true,
      },
    });
    const modal = wrapper.findComponent(Modal)
    modal.vm.toggleFlag('false') // We emit data
    console.log(wrapper.emitted())
    expect(wrapper.emitted().update_flag).toEqual(true) // Data is emitted with expected value 
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
