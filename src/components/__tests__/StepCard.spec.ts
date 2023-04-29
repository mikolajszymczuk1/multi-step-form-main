import { describe, expect, it } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import StepCard from '@/components/cards/StepCard.vue';

describe('StepCard.vue', () => {
  let wrapper: VueWrapper;
  const createComponent = (config = {}) => { wrapper = mount(StepCard, config); };

  it('Should render correct contents', () => {
    createComponent({
      slots: {
        default: 'Some card content',
      },
    });

    expect(wrapper.text()).to.equal('Some card content');
  });
});
