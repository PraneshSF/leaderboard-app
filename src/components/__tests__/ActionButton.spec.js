import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ActionButton from '../ActionButton.vue';

describe('ActionButton.vue', () => {
  it('renders button with correct label', () => {
    const wrapper = mount(ActionButton, {
      props: { label: 'Click Me' }
    });
    expect(wrapper.text()).toContain('Click Me');
  });

  it('disables button when disable prop is true', async () => {
    const wrapper = mount(ActionButton, {
      props: { label: 'Click Me', disable: true }
    });
    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(ActionButton, {
      props: { label: 'Click Me' }
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });
});
