import {
  describe, expect, it, type Mock, vi,
} from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { useRoute } from 'vue-router';
import SingleStepLabel from '@/components/SingleStepLabel.vue';

vi.mock('vue-router');

describe('SingleStepLabel.vue', () => {
  let wrapper: VueWrapper;
  const createComponent = (config = {}) => { wrapper = mount(SingleStepLabel, config); };
  const findStepNumber = () => wrapper.find('[data-test="step-number"]');
  const findStepText = () => wrapper.find('[data-test="step-text"]');
  const findStepLabel = () => wrapper.find('[data-test="step-label"]');

  it('Component should correctly shows props values', () => {
    (useRoute as Mock).mockReturnValueOnce({ name: 'personal-info' });

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
    (useRoute as Mock).mockReturnValueOnce({ name: 'personal-info' });

    createComponent({
      props: {
        stepId: 'personal-info',
      },
    });

    expect(wrapper.classes()).toContain('singleStepLabel--active');
    await wrapper.setProps({ stepId: 'select-your-plan' });
    expect(wrapper.classes()).not.toContain('singleStepLabel--active');
  });
});
