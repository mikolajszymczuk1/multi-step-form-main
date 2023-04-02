import { describe, expect, it } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import SingleStepLabel from '@/components/SingleStepLabel.vue';

describe('SingleStepLabel.vue', () => {
  let wrapper: VueWrapper;
  const createComponent = (config = {}) => { wrapper = mount(SingleStepLabel, config); };
  const findStepNumber = () => wrapper.find('[data-test="step-number"]');
  const findStepText = () => wrapper.find('[data-test="step-text"]');
  const findStepLabel = () => wrapper.find('[data-test="step-label"]');

  it('Component should correctly shows props values', () => {
    createComponent({
      props: {
        stepNumber: 5,
        label: 'Test Label',
      },
    });

    expect(findStepNumber().text()).toBe('5');
    expect(findStepText().text()).toBe('STEP 5');
    expect(findStepLabel().text()).toBe('Test Label');
  });

  it('Component should change state based on active prop', async () => {
    createComponent({
      props: {
        active: true,
      },
    });

    expect(wrapper.classes()).toContain('singleStepLabel--active');
    await wrapper.setProps({ active: false });
    expect(wrapper.classes()).not.toContain('singleStepLabel--active');
  });
});
