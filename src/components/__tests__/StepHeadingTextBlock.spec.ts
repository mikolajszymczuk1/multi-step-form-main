import { describe, expect, it } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import StepHeadingTextBlock from '@/components/StepHeadingTextBlock.vue';

describe('StepHeadingTextBlock.vue', () => {
  let wrapper: VueWrapper;
  const createComponent = (config = {}) => { wrapper = mount(StepHeadingTextBlock, config); };
  const findTitle = () => wrapper.find('[data-test="title"]');
  const findText = () => wrapper.find('[data-test="text"]');

  it('Should render correct contents', () => {
    createComponent({
      slots: {
        title: 'Step Heading',
        text: 'Under step heading text',
      },
    });

    expect(findTitle().text()).toBe('Step Heading');
    expect(findText().text()).toBe('Under step heading text');
  });
});
