// Import the `mount()` method from Vue Test Utils
import { mount, createLocalVue } from '@vue/test-utils';
import Index from '@/pages/index.vue';

import Vuex from 'vuex';
import axios from 'axios';
import mutations from '@/store/mutations.js';

import actions from '@/store/actions.js';
import state from '@/store/state.js';
// const flushPromises = require('flush-promises');
const localVue = createLocalVue();

localVue.use(Vuex);
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

}));

describe('Index', () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      actions, mutations, state,
    });
    store.$axios = axios;
  });
  it('All nodes should be loaded via api call to tree route', async () => {
    const wrapper = mount(Index, { store, localVue, stubs: { Tree: true } });
    expect(axios.$get).toBeCalled();
    expect(axios.$get).toHaveBeenCalledWith('trees');
  });
  it('is a Vue instance', () => {
    const wrapper = mount(Index, { store, localVue, stubs: { Tree: true } });
    expect(wrapper.vm).toBeTruthy();
  });
});
