// Import the `mount()` method from Vue Test Utils

import actions from '@/store/actions.js';
import axios from 'axios';
import Index from '@/pages/index.vue';
import mockData from '@/testData.js';
import mutations from '@/store/mutations.js';
import { mount, createLocalVue } from '@vue/test-utils';

import state from '@/store/state.js';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

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
