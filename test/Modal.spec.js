// Import the `mount()` method from Vue Test Utils

import actions from '@/store/actions.js';
import axios from 'axios';
import BootstrapVue from 'bootstrap-vue';
import mockData from '@/testData.js';
import Modal from '@/components/Modal.vue';
import mutations from '@/store/mutations.js';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import state from '@/store/state.js';
import Vuex from 'vuex';

const flushPromises = require('flush-promises');
const localVue = createLocalVue();
const mockpromiseState = true;

localVue.use(Vuex);
localVue.use(BootstrapVue);

jest.mock('axios', () => ({
  $get: jest.fn(() => Promise.resolve(mockData.f)),
  $put: jest.fn((node) => new Promise((resolve, reject) => {
    if (mockpromiseState) {resolve(node);}
    else {reject({});}
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
  
  it('should open modal', async () => {
    
    await localVue.nextTick();
    await flushPromises();

    const openModal = wrapper.find('.testModal');    
    expect(openModal.exists()).toBe(true);
    expect(openModal.isVisible()).toBe(true);
   
  });
  
  it('if click on cancel button in modal it should not call put api', async () => {
    await localVue.nextTick();
    await flushPromises();

    const cancelButton = wrapper.find('#testCancelButton');
    expect(cancelButton.exists()).toBe(true);
    cancelButton.trigger('click');
    
    expect(axios.$put).toHaveBeenCalledTimes(0);
  });
  
  it('if click on submit button in modal', async () => {
    await localVue.nextTick();
    await flushPromises();

    const submitButton = wrapper.find('#testSubmitButton');
    expect(submitButton.exists()).toBe(true);
    submitButton.trigger('click');
   
    expect(axios.$put).toHaveBeenCalledTimes(1);
    let coolRegex=/[trees\/\d]/
    expect(axios.$put).toBeCalledWith(expect.stringMatching(coolRegex),
      expect.objectContaining({
        id: expect.any(Number),
        parentId: expect.any(Number),
        label: expect.any(String),
      }));

    await flushPromises();
    expect(axios.$get).toHaveBeenCalledTimes(1);  
  });
    
  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

});
