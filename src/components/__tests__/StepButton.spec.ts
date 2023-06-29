import {
  describe, it, expect, vi,
} from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { RouterLink } from 'vue-router';
import StepButton from '@/components/buttons/StepButton.vue';

vi.mock('vue-router');

describe('StepButton.vue', () => {
  let wrapper: VueWrapper;
  const createComponent = (config = {}) => {
    wrapper = mount(StepButton, {
      global: {
        stubs: ['RouterLink'],
      },
      ...config,
    });
  };

  const findRouterLink = () => wrapper.findComponent(RouterLink);

  it('Router link should has correct redirect prop', () => {
    createComponent({
      props: {
        goTo: 'pick-addons',
      },
    });

    expect(findRouterLink().exists()).toBe(true);
    expect(findRouterLink().props()).toMatchObject({ to: { name: 'pick-addons' } });
  });

  it('Applies the "stepButton--next" class when "isNext" prop is true', () => {
    createComponent({
      props: {
        isNext: true,
        goTo: 'pick-addons',
      },
    });

    expect(wrapper.classes()).toContain('stepButton--next');
  });

  it('Applies the "stepButton--finish" class when "isFinishing" prop is true', () => {
    createComponent({
      props: {
        isFinishing: true,
        goTo: 'pick-addons',
      },
    });

    expect(wrapper.classes()).toContain('stepButton--finish');
  });

  // eslint-disable-next-line max-len
  it('Applies the "stepButton--next" and "stepButton--finish" class when "isNext" and "isFinishing" prop is true', () => {
    createComponent({
      props: {
        isNext: true,
        isFinishing: true,
        goTo: 'pick-addons',
      },
    });

    expect(wrapper.classes()).toContain('stepButton--next');
    expect(wrapper.classes()).toContain('stepButton--finish');
  });
});
