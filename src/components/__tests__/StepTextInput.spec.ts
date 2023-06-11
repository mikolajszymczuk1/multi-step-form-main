import { describe, expect, it } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import StepTextInput from '@/components/StepTextInput.vue';
import type { ComponentPublicInstance } from 'vue';

describe('StepTextInput.vue', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;
  const createComponent = (config = {}) => { wrapper = mount(StepTextInput, config); };
  const findLabel = () => wrapper.find('[data-test="label"]');
  const findInput = () => wrapper.find('[data-test="input"]');
  const findMessage = () => wrapper.find('[data-test="message"]');

  it('Should sets prop values correctly', () => {
    createComponent({
      props: {
        labelText: 'Label text',
        name: 'some-name',
        placeholder: 'Placeholder text',
      },
    });

    expect(findLabel().text()).to.equal('Label text');
    expect(findInput().attributes('name')).to.equal('some-name');
    expect(findInput().attributes('placeholder')).to.equal('Placeholder text');
    expect(findInput().attributes('id')).to.equal('some-name');
    expect(findMessage().text()).to.equal('');
  });

  it('Test if v-model is set correctly', async () => {
    createComponent({
      props: {
        labelText: 'Label text',
        name: 'some-name',
        placeholder: 'Placeholder text',
      },
    });

    expect((findInput().element as HTMLInputElement).value).to.equal('');
    await findInput().setValue('Hello world');
    expect((findInput().element as HTMLInputElement).value).to.equal('Hello world');
  });
});
