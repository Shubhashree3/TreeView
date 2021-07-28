// Import the `mount()` method from Vue Test Utils

import actions from '@/store/actions.js';
import axios from 'axios';
import BootstrapVue from 'bootstrap-vue';
import $ from 'jquery';
import mockData from '@/testData.js';
import Modal from '@/components/Modal.vue';
import mutations from '@/store/mutations.js';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import state from '@/store/state.js';
import Tree from '@/components/Tree.vue';
import Vuex from 'vuex';

global.$ = $;
const flushPromises = require('flush-promises');
const localVue = createLocalVue();
const mockpromiseState = true;

localVue.use(Vuex);
localVue.use(BootstrapVue);

jest.mock('axios', () => ({
  $get: jest.fn(() => Promise.resolve(mockData.f)),
  $put: jest.fn((node) => new Promise((resolve, reject) => {
    if (mockpromiseState) {
      resolve(node);
    } else {
      reject({});
    }
  })),
}));

describe('Modal', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      actions, mutations, state,
    });
    store.$axios = axios;
    global.wrapper = mount(Modal, {
      store,
      propsData: { modalOpen: mockData.flag ,dataModal:mockData.dataModal},
      localVue,
      stubs: {
        FontAwesomeIcon: true, 'b-modal': true, 'b-form-group': true, 'b-form-input': true, 'b-button': true,
      },
    });
  });


  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
