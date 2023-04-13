import { describe, expect, it } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import StepInputsWrapper from '@/components/StepInputsWrapper.vue';

describe('StepInputsWrapper.vue', () => {
  let wrapper: VueWrapper;
  const createComponent = (config = {}) => { wrapper = mount(StepInputsWrapper, config); };

  it('Should render correct contents', () => {
    createComponent({
      slots: {
        default: 'test',
      },
    });

    expect(wrapper.text()).toBe('test');
  });

  it('Should set class based on largeSpace prop', async () => {
    createComponent({
      props: {
        largeSpace: false,
      },
    });

    expect(wrapper.classes()).not.toContain('stepInputsWrapper--largeSpace');
    await wrapper.setProps({ largeSpace: true });
    expect(wrapper.classes()).toContain('stepInputsWrapper--largeSpace');
  });
});
