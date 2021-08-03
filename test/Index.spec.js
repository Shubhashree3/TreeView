import actions from '@/store/actions.js';
import axios from 'axios';
import BootstrapVue from 'bootstrap-vue';
import Index from '@/pages/index.vue';
import mockData from '@/testData.js';
import mutations from '@/store/mutations.js';
import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import state from '@/store/state.js';
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
    global.wrapper = shallowMount(Index, {
      store,
      localVue,
      stubs: {
        FontAwesomeIcon: true, 'b-button': true, Tree: true, Modal: true,
      },
    });
  });

  it('All nodes should be loaded via api call to tree route', async () => {
    expect(axios.$get).toBeCalled();
    expect(axios.$get).toHaveBeenCalledWith('trees');
  });

  it('it emits expected data and call showModal method', async () => {
    expect(wrapper.vm.flag).toBe(false);
    wrapper.vm.$emit('edit_node');
    expect(wrapper.emitted('edit_node')).toBeTruthy();
    wrapper.vm.showModal(mockData.dataModal);
    expect(wrapper.vm.flag).toBe(true);
  });

  it('it emits expected data and call toggleFlag method', async () => {
    wrapper.vm.$emit('update_flag');
    expect(wrapper.emitted('update_flag')).toBeTruthy();
    wrapper.vm.toggleFlag();
    expect(wrapper.vm.flag).toBe(false);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
