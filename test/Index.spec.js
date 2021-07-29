// Import the `mount()` method from Vue Test Utils

import actions from '@/store/actions.js';
import axios from 'axios';
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
const mockpromiseState = true;

localVue.use(Vuex);
localVue.component(Tree)

jest.mock('axios', () => ({
  $get: jest.fn(() => Promise.resolve(mockData.data)),
  $put: jest.fn((node) => new Promise((resolve, reject) => {
    if (mockpromiseState) {
      resolve(node);
    } else {
      reject({});
    }
  })),

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

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
