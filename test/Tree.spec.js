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
    global.wrapper = mount(Tree, {
      store,
      propsData: { dataTree: mockData.demoData },
      localVue,
      stubs: {
        FontAwesomeIcon: true, 'b-button': true,
      },
    });
  });

  it('Add a node at same level when Add Same Level button preesed', async () => {
    await flushPromises();

    const addNode = wrapper.find('#dropdown-1');
    expect(addNode.exists()).toBe(true);
    addNode.trigger('click');

    const addSameNode = wrapper.find('#addSame-1');
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
    expect(addNode.exists()).toBe(true);
    addNode.trigger('click');

    const addSameNode = wrapper.find('#addSub-1');
    expect(addSameNode.isVisible()).toBe(true);
    addSameNode.trigger('click');

    expect(axios.$post).toBeCalledWith('trees', expect.objectContaining({
      id: expect.any(Number),
      parentId: expect.any(Number),
      label: expect.any(String),
    }));
    await flushPromises();
    expect(axios.$get).toHaveBeenCalledTimes(2);
  });

  it('Should show edit and delete button when toggle span pressed ', async () => {
    await flushPromises();
    const toggle = wrapper.find('#toggleSpan-5');
    expect(toggle.exists()).toBe(true);

    const editNode = wrapper.find('#editButton-5');
    expect(editNode.exists()).toBe(true);
    expect(editNode.find('.notVisible').exists()).toBe(true);

    const deleteNode = wrapper.find('#deleteButton-5');
    expect(deleteNode.exists()).toBe(true);
    expect(deleteNode.find('.notVisible').exists()).toBe(true);

    await toggle.trigger('click');
    expect(editNode.classes()).toContain('visible');
    expect(deleteNode.classes()).toContain('visible');
  });

  it('Should not show add button when toggle span pressed', async () => {
    await flushPromises();
    const toggle = wrapper.find('#toggleSpan-5');
    expect(toggle.exists()).toBe(true);

    const addNode = wrapper.find('#dropdown-5');
    expect(addNode.exists()).toBe(true);
    expect(addNode.find('.visible').exists()).toBe(true);

    await toggle.trigger('click');
    expect(addNode.classes()).toContain('notVisible');

    await toggle.trigger('click');
    expect(addNode.classes()).toContain('visible');
  });

  it('Should click on editButton and event emitted', async () => {
    await flushPromises();

    const editNode = wrapper.find('.editButton');
    expect(editNode.exists()).toBe(true);
    editNode.trigger('click');

    expect(wrapper.emitted('edit_node')).toBeTruthy();
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
