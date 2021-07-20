// Import the `mount()` method from Vue Test Utils
import axios from 'axios';
import actions from '@/store/actions.js';
import BootstrapVue from 'bootstrap-vue';
import $ from 'jquery';
import mutations from '@/store/mutations.js';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import state from '@/store/state.js';
import Tree from '@/components/Tree.vue';
import Vuex from 'vuex';

const flushPromises = require('flush-promises');

global.$ = $;

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);

const demoData = [
  {
    id: 1,
    parentId: 0,
    label: 'Root 1',
    childrens: [
      {
        id: 2,
        parentId: 1,
        label: 'Item 2.1',
        childrens: [
          {
            id: 3,
            parentId: 2,
            label: 'Item 3.2',
            childrens: [
              {
                id: 4,
                parentId: 3,
                label: 'Item 4.3',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    label: 'Root 24',
    parentId: 0,
  },
];
const data = [
  {
    id: 1,
    parentId: 0,
    label: 'Root 1',
  },
  {
    id: 2,
    parentId: 1,
    label: 'Item 2.1',
  },
  {
    id: 3,
    parentId: 2,
    label: 'Item 3.2',
  },
  {
    id: 4,
    parentId: 3,
    label: 'Item 4.3',
  },
  {
    id: 5,
    label: 'Root 24',
    parentId: 0,
  },
];

jest.mock('axios', () => ({
  $get: jest.fn(() => Promise.resolve(data)),
  $post: jest.fn(() => Promise.resolve()),
  $delete: jest.fn(() => Promise.resolve({})),
  $put: jest.fn(() => Promise.resolve({})),

}));

describe('Tree', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      actions, mutations, state,
    });
    store.$axios = axios;
  });

  it('Add a node at same level when Add Same Level button preesed', async () => {
    const wrapper = mount(Tree, {
      store,
      propsData: { dataTree: demoData },
      localVue,
      stubs: {
        FontAwesomeIcon: true, Tree: true, 'b-modal': true, 'b-form-group': true, 'b-form-input': true, 'b-button': true,
      },
    });
    await localVue.nextTick();
    await flushPromises();

    const addNode = wrapper.find('#dropdown-1');
    const addSameNode = wrapper.find('#addSame-1');

    expect(addNode.exists()).toBe(true);
    addNode.trigger('click');

    expect(addSameNode.isVisible()).toBe(true);
    addSameNode.trigger('click');

    expect(axios.$post).toBeCalled();
    await flushPromises();
    expect(axios.$get).toHaveBeenCalledTimes(1);
  });

  it('Add a node at sub level when Add Sub Level button preesed', async () => {
    const wrapper = mount(Tree, {
      store,
      propsData: { dataTree: demoData },
      localVue,
      stubs: {
        FontAwesomeIcon: true, Tree: true, 'b-modal': true, 'b-form-group': true, 'b-form-input': true, 'b-button': true,
      },
    });
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
    const wrapper = shallowMount(Tree, {
      store,
      propsData: { dataTree: demoData },
      localVue,
      stubs: {
        FontAwesomeIcon: true, Tree: true, 'b-modal': true, 'b-form-group': true, 'b-form-input': true, 'b-button': true,
      },
    });
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
    const wrapper = mount(Tree, {
      store,
      propsData: { dataTree: demoData },
      localVue,
      stubs: {
        FontAwesomeIcon: true, Tree: true, 'b-modal': true, 'b-form-group': true, 'b-form-input': true, 'b-button': true,
      },
    });
    await flushPromises();
    const deleteNode = wrapper.find('.deleteButton');

    expect(deleteNode.exists()).toBe(true);
    deleteNode.trigger('click');

    expect(axios.$delete).toBeCalled();
    await flushPromises();
    expect(axios.$get).toHaveBeenCalled();
  });

  it('is a Vue instance', () => {
    const wrapper = mount(Tree, {
      store,
      propsData: { dataTree: demoData },
      localVue,
      stubs: {
        FontAwesomeIcon: true, Tree: true, 'b-modal': true, 'b-form-group': true, 'b-form-input': true, 'b-button': true,
      },
    });
    expect(wrapper.vm).toBeTruthy();
  });
});
