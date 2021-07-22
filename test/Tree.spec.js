// Import the `mount()` method from Vue Test Utils

import axios from 'axios';
import actions from '@/store/actions.js';
import BootstrapVue from 'bootstrap-vue';
import $ from 'jquery';
import mockData from '@/testData.js';
import mutations from '@/store/mutations.js';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import state from '@/store/state.js';
import Tree from '@/components/Tree.vue';
import Vuex from 'vuex';

global.$ = $;
const flushPromises = require('flush-promises');
const localVue = createLocalVue();
let mockpromiseState = true

localVue.use(Vuex);
localVue.use(BootstrapVue);

jest.mock('axios', () => ({
  $get: jest.fn(() => Promise.resolve(mockData.data)),
  $post: jest.fn((node) => Promise.resolve(node)),
  $delete: jest.fn(() => Promise.resolve({})),  
  $put: jest.fn((node) => {
    return new Promise((resolve, reject) => {
      if (mockpromiseState) {
        resolve(node);
      } else {
        reject({});
      }
    });
  })
}));

describe('Tree', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      actions, mutations, state,
    });
    store.$axios = axios;
    global.wrapper=mount(Tree, {
      store,
      propsData: { dataTree: mockData.demoData },
      localVue,
      stubs: {
        FontAwesomeIcon: true, Tree: true, 'b-modal': true, 'b-form-group': true, 'b-form-input': true,'b-button': true
      },
    })
  });

  it('Add a node at same level when Add Same Level button preesed', async () => {
    
    await localVue.nextTick();
    await flushPromises();

    const addNode = wrapper.find('#dropdown-1');
    const addSameNode = wrapper.find('#addSame-1');

    expect(addNode.exists()).toBe(true);
    addNode.trigger('click');

    expect(addSameNode.isVisible()).toBe(true);
    addSameNode.trigger('click');
    expect(axios.$post).toBeCalledWith("trees",
    expect.objectContaining({
      id: expect.any(Number),
      parentId:expect.any(Number),
      label:expect.any(String)
      }),
    );

    await flushPromises();
    expect(axios.$get).toHaveBeenCalledTimes(1);
  });

  it('Add a node at sub level when Add Sub Level button preesed', async () => {
    await flushPromises();

    const addNode = wrapper.find('#dropdown-1');
    const addSameNode = wrapper.find('#addSub-1');

    expect(addNode.exists()).toBe(true);
    addNode.trigger('click');

    expect(addSameNode.isVisible()).toBe(true);
    addSameNode.trigger('click');

    expect(axios.$post).toBeCalled();
    await flushPromises();
    expect(axios.$get).toHaveBeenCalledTimes(2);
  });

  it('Could not edit a Node when pressed to Edit Button and than cancelButton', async () => {
    await flushPromises();

    const editNode = wrapper.find('.editButton');
    const cancelNode = wrapper.find('.cancelButton');

    expect(editNode.exists()).toBe(true);
    editNode.trigger('click');

    expect(cancelNode.exists()).toBe(true);
    cancelNode.trigger('click');

    expect(axios.$put).toHaveBeenCalledTimes(0);
  });

  it('Could not edit a Node when pressed to Edit Button and than cancelButton', async () => {
    await flushPromises();

    const editNode = wrapper.find('.editButton');
    const cancelNode = wrapper.find('.cancelButton');

    expect(editNode.exists()).toBe(true);
    editNode.trigger('click');

    expect(cancelNode.exists()).toBe(true);
    cancelNode.trigger('click');

    expect(axios.$put).toHaveBeenCalledTimes(0);
  });

  it('Delete  a node when delete button preesed', async () => {
    
    await flushPromises();
    const deleteNode = wrapper.find('.deleteButton');

    expect(deleteNode.exists()).toBe(true);
    deleteNode.trigger('click');

    expect(axios.$delete).toBeCalled();
    await flushPromises();
    expect(axios.$get).toHaveBeenCalled();
  });

  it('is a Vue instance', () => {
    
    expect(wrapper.vm).toBeTruthy();
  });
});
