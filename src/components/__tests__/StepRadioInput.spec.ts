import {
  describe, expect, it, vi,
} from 'vitest';
import { nextTick } from 'vue';
import { mount, type VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import StepRadioInput from '@/components/StepRadioInput.vue';
import type { ComponentPublicInstance } from 'vue';
import useMultiStepFormStore from '@/stores/MultiStepFormStore';

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
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
      props: {
        iconPath: '/path/to/icon.svg',
        name: 'name',
        heading: 'Advanced',
        monthlyPrice: 100,
      },
    });

    expect(findIcon().attributes('src')).toBe('/path/to/icon.svg');
    expect(findInput().attributes('name')).toBe('name');
    expect(findInput().attributes('value')).toBe('Advanced');
    expect(findHeading().text()).toBe('Advanced');
    expect(findPrice().text()).toBe('$100/mo');
    expect(findFree().exists()).toBeFalsy();
  });

  it('Should calculates correct values if isYearlyMode enabled', async () => {
    createComponent({
      global: {
        plugins: [createTestingPinia({
          stubActions: false,
          createSpy: vi.fn,
        })],
      },
      props: {
        heading: 'Arcade',
        monthlyPrice: 100,
      },
    });

    const store = useMultiStepFormStore();

    expect(findInput().attributes('value')).toBe('Arcade');
    expect(findPrice().text()).toBe('$100/mo');
    expect(findFree().exists()).toBeFalsy();
    store.changeIsYearlyMode();
    await nextTick();
    expect(findPrice().text()).toBe('$1000/yr');
    expect(findFree().text()).toBe('2 months free');
  });

  it('modelValue should be updated', async () => {
    createComponent({
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
      props: {
        heading: 'Pro',
        monthlyPrice: 100,
        modelValue: '',
        'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
      },
    });

    await findInput().setValue(true);
    expect(wrapper.props('modelValue')).toBe('Pro');
  });
});
