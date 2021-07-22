// Import the `mount()` method from Vue Test Utils

import actions from '@/store/actions.js';
import axios from 'axios';
import Index from '@/pages/index.vue';
import mockData from '@/testData.js';
import mutations from '@/store/mutations.js';
import { mount, createLocalVue } from '@vue/test-utils';
import state from '@/store/state.js';
import Vuex from 'vuex';

const flushPromises = require('flush-promises');
const localVue = createLocalVue();
const mockpromiseState = true;

localVue.use(Vuex);

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
        FontAwesomeIcon: true, Tree: true, 'b-modal': true, 'b-form-group': true, 'b-form-input': true, 'b-button': true,
      },
    });
  });
  it('All nodes should be loaded via api call to tree route', async () => {
    
    expect(axios.$get).toBeCalled();
    expect(axios.$get).toHaveBeenCalledWith('trees');
  });

  it('Modal should open and edit data if submitButton pressed', async () => {
    await flushPromises();
    wrapper.vm.$emit('edit-node',{id:1,label:'test',parentId:'0'})
    
    const modal = wrapper.findComponent({ ref: 'modal-ref' });
    expect(modal.isVisible()).toBe(true);
    
    const submitNode = wrapper.find('.submitButton');
    expect(submitNode.exists()).toBe(true);
    submitNode.trigger('click');
    
    console.log(submitNode.trigger('click'))
    
    await flushPromises();
    expect(axios.$put).toHaveBeenCalledTimes(1);
  });

  it('Modal should open and should not edit data if cancelButton pressed', async () => {
    await flushPromises();
    wrapper.vm.$emit('edit-node',{id:1,label:'test',parentId:'0'})
    
    const modal = wrapper.findComponent({ ref: 'modal-ref' });
    expect(modal.isVisible()).toBe(true);
    
    const cancelNode = wrapper.find('.cancelButton');
    expect(cancelNode.exists()).toBe(true);
    cancelNode.trigger('click');
    
    console.log(cancelNode.trigger('click'))
    
    await flushPromises();
    expect(axios.$put).toHaveBeenCalledTimes(0);
  });
  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
