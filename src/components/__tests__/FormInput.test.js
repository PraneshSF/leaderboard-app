import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FormInput from '../FormInput.vue';

describe('FormInput.vue', () => {
  it('renders the label', () => {
    const wrapper = mount(FormInput, {
      props: { label: 'User Name' },
    });

    expect(wrapper.text()).toContain('User Name');
  });

  it('updates modelValue on input', async () => {
    const wrapper = mount(FormInput, {
      props: { modelValue: '', 'onUpdate:modelValue': (val) => wrapper.setProps({ modelValue: val }) },
    });

    const input = wrapper.find('input');
    await input.setValue('John Doe');

    expect(wrapper.props('modelValue')).toBe('John Doe');
  });

  it('displays error message', () => {
    const wrapper = mount(FormInput, {
      props: { error: 'This field is required' },
    });

    expect(wrapper.text()).toContain('This field is required');
  });
});
