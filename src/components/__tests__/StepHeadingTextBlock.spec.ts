import { describe, expect, it } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import StepHeadingTextBlock from '@/components/StepHeadingTextBlock.vue';

describe('StepHeadingTextBlock.vue', () => {
  let wrapper: VueWrapper;
  const createComponent = (config = {}) => { wrapper = mount(StepHeadingTextBlock, config); };
  const findTopContent = () => wrapper.find('[data-test="topContent"]');
  const findTitle = () => wrapper.find('[data-test="title"]');
  const findText = () => wrapper.find('[data-test="text"]');

  it('Should render correct contents', () => {
    createComponent({
      slots: {
        topContent: 'Test content',
        title: 'Step Heading',
        text: 'Under step heading text',
      },
    });

    expect(findTopContent().text()).toBe('Test content');
    expect(findTitle().text()).toBe('Step Heading');
    expect(findText().text()).toBe('Under step heading text');
  });
});
