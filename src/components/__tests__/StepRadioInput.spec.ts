import { describe, expect, it } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import StepRadioInput from '@/components/StepRadioInput.vue';
import type { ComponentPublicInstance } from 'vue';

describe('StepRadioInput.vue', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;
  const createComponent = (config = {}) => { wrapper = mount(StepRadioInput, config); };
  const findInput = () => wrapper.find('[data-test="input"]');
  const findIcon = () => wrapper.find('[data-test="icon"]');
  const findHeading = () => wrapper.find('[data-test="heading"]');
  const findPrice = () => wrapper.find('[data-test="price"]');
  const findFree = () => wrapper.find('[data-test="free"]');

  it('Should has correct props values', () => {
    createComponent({
      props: {
        iconPath: '/path/to/icon.svg',
        name: 'name',
        heading: 'Heading',
        monthlyPrice: 100,
      },
    });

    expect(findIcon().attributes('src')).toBe('/path/to/icon.svg');
    expect(findInput().attributes('name')).toBe('name');
    expect(findInput().attributes('value')).toBe('100mo');
    expect(findHeading().text()).toBe('Heading');
    expect(findPrice().text()).toBe('$100/mo');
    expect(findFree().exists()).toBeFalsy();
  });

  it('Should calculates correct values if isYearlyMode enabled', () => {
    createComponent({
      props: {
        monthlyPrice: 100,
        isYearlyMode: true,
      },
    });

    expect(findInput().attributes('value')).toBe('1000yr');
    expect(findPrice().text()).toBe('$1000/yr');
    expect(findFree().text()).toBe('2 months free');
  });

  it('modelValue should be updated', async () => {
    createComponent({
      props: {
        monthlyPrice: 100,
        modelValue: '',
        'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
      },
    });

    await findInput().setValue('100mo');
    expect(wrapper.props('modelValue')).toBe('100mo');
  });
});
