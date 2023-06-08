import {
  describe, expect, it, vi,
} from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import useMultiStepFormStore from '@/stores/MultiStepFormStore';
import PaymentModeButton from '@/components/buttons/PaymentModeButton.vue';

describe('PaymentModeButton.vue', () => {
  let wrapper: VueWrapper;
  const createComponent = (config = {}) => { wrapper = mount(PaymentModeButton, config); };

  it('Button should has correct class based on isYearlyMode value', async () => {
    createComponent({
      global: {
        plugins: [createTestingPinia({
          stubActions: false,
          createSpy: vi.fn,
        })],
      },
    });

    expect(wrapper.classes()).not.toContain('paymentModeButton--yearly');
    await wrapper.trigger('click');
    expect(wrapper.classes()).toContain('paymentModeButton--yearly');
  });

  it('Button should change yearly mode state in store when clicked', async () => {
    createComponent({
      global: {
        plugins: [createTestingPinia({
          stubActions: false,
          createSpy: vi.fn,
        })],
      },
    });

    const store = useMultiStepFormStore();

    expect(store.isYearlyMode).toBeFalsy();
    await wrapper.trigger('click');
    expect(store.isYearlyMode).toBeTruthy();
    await wrapper.trigger('click');
    expect(store.isYearlyMode).toBeFalsy();
  });
});
