// Import the `mount()` method from Vue Test Utils

import actions from '@/store/actions.js';
import axios from 'axios';
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
const mockpromiseState = true;

localVue.use(Vuex);
localVue.use(BootstrapVue);

jest.mock('axios', () => ({
  $get: jest.fn(() => Promise.resolve(mockData.data)),
  $post: jest.fn((node) => Promise.resolve(node)),
  $delete: jest.fn(() => Promise.resolve({})),
}));

describe('Tree', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      actions, mutations, state,
    });
    store.$axios = axios;
    global.wrapper = shallowMount(Tree, {
      store,
      propsData: { dataTree: mockData.demoData },
      localVue,
      stubs: {
        FontAwesomeIcon: true, 'b-button': true,
      },
    });
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
    expect(axios.$post).toBeCalledWith('trees',
      expect.objectContaining({
        id: expect.any(Number),
        parentId: expect.any(Number),
        label: expect.any(String),
      }));

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

  it('should click on editButton and event emitted', async () => {
    await flushPromises();

    const editNode = wrapper.find('.editButton');
    expect(editNode.exists()).toBe(true);
    editNode.trigger('click');

    expect(wrapper.emitted('edit_node')).toBeTruthy();
  });

  it('should toggle ', async () => {
    await flushPromises();
    let id=5
    wrapper = mount(Tree, {
      store,
      propsData: { dataTree: mockData.demoData },
      localVue,
      stubs: {
        FontAwesomeIcon: true, 'b-button': true,
      },
    });
    const toggle = wrapper.find('.toggleSpan');
    expect(toggle.exists()).toBe(true);
    toggle.trigger('click');
    wrapper.vm.toggle(id);
    const addNode = wrapper.find('#dropdown-5');
    expect(addNode.exists()).toBe(true);
    expect(addNode.classes()).toContain('visible')

    // wrapper.vm.toggle(id);
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

  it('Toggles button when clicked to node name', async () => {
    await flushPromises();
    const toggleSpan = wrapper.find('.deleteButton');

    expect(toggleSpan.exists()).toBe(true);
    toggleSpan.trigger('click');
  });

  it('is a Vue instance', () => {
    console.log(wrapper)
    expect(wrapper.vm).toBeTruthy();
  });
});
