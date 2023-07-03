import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import { nextTick } from 'vue';
import { mount, type VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import StepCheckboxInput from '@/components/StepCheckboxInput.vue';
import useMultiStepFormStore from '@/stores/MultiStepFormStore';

describe('StepCheckboxInput.vue', () => {
  let wrapper: VueWrapper;
  const createComponent = (config = {}) => { wrapper = mount(StepCheckboxInput, config); };
  const findCheckbox = () => wrapper.find('[data-test="input"]');
  const findHeading = () => wrapper.find('[data-test="heading"]');
  const findUnderHeading = () => wrapper.find('[data-test="under-heading"]');
  const findPrice = () => wrapper.find('[data-test="price"]');

  beforeEach(() => {
    createComponent({
      global: {
        plugins: [createTestingPinia({
          stubActions: false,
          createSpy: vi.fn,
        })],
      },
      slots: {
        default: 'some underheading text',
      },
      props: {
        heading: 'Checkbox Heading',
        name: 'checkbox',
        monthlyPrice: 10,
        modelValue: [],
      },
    });
  });

  it('should render the checkbox input and label with correct attributes', () => {
    expect(findCheckbox().exists()).toBe(true);
    expect(findCheckbox().attributes('name')).toBe('checkbox');
    expect(findCheckbox().attributes('value')).toBe('Checkbox Heading');
    expect(wrapper.classes()).toContain('stepCheckboxInput');
  });

  it('should update modelValue when checkbox is checked', async () => {
    await findCheckbox().setValue(true);
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([['Checkbox Heading']]);
  });

  it('should render the heading and under heading correctly', () => {
    expect(findHeading().exists()).toBe(true);
    expect(findHeading().text()).toBe('Checkbox Heading');
    expect(findUnderHeading().exists()).toBe(true);
    expect(findUnderHeading().text()).toBe('some underheading text');
  });

  it('should render the price correctly', async () => {
    const store = useMultiStepFormStore();
    expect(findPrice().exists()).toBe(true);
    expect(findPrice().text()).toBe('+$10/mo');
    store.changeIsYearlyMode();
    await nextTick();
    expect(findPrice().text()).toBe('+$100/yr');
  });

  it('should apply checked styles when modelValue includes the checkbox value', async () => {
    await wrapper.setProps({ modelValue: ['Checkbox Heading'] });
    expect(findCheckbox().classes()).toContain('stepCheckboxInput__input');
    expect(wrapper.classes()).toContain('stepCheckboxInput--checked');
  });
});
