import { describe, expect, it } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import PaymentModeButton from '@/components/buttons/PaymentModeButton.vue';

describe('PaymentModeButton.vue', () => {
  let wrapper: VueWrapper;
  const createComponent = (config = {}) => { wrapper = mount(PaymentModeButton, config); };

  it('Button should has correct class based on isYearlyMode value', async () => {
    createComponent();
    expect(wrapper.classes()).not.toContain('paymentModeButton--yearly');
    await wrapper.trigger('click');
    expect(wrapper.classes()).toContain('paymentModeButton--yearly');
  });

  it('Button should emits correct value when clicked', async () => {
    createComponent();
    await wrapper.trigger('click');
    await wrapper.trigger('click');
    const paymentModeEvent = wrapper.emitted('paymentMode') as Event[];
    expect(paymentModeEvent).toHaveLength(2);
    expect(paymentModeEvent[0]).toEqual([true]);
    expect(paymentModeEvent[1]).toEqual([false]);
  });
});
