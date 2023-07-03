import { describe, it, expect } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import StepSingleSummary from '@/components/StepSingleSummary.vue';

describe('StepSingleSummary.vue', () => {
  let wrapper: VueWrapper;
  const createComponent = (config = {}) => { wrapper = mount(StepSingleSummary, config); };
  const findLeftCol = () => wrapper.find('[data-test="left-col"]');
  const findRightCol = () => wrapper.find('[data-test="right-col"]');

  it('Should correctly render elements in slots', () => {
    createComponent({
      slots: {
        leftCol: 'left',
        rightCol: 'right',
      },
    });

    expect(findLeftCol().text()).toBe('left');
    expect(findRightCol().text()).toBe('right');
  });
});
