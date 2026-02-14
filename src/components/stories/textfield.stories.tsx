import type { Meta, StoryObj } from '@storybook/react-vite';
import TextField from '../ui/textfield';

const meta: Meta<typeof TextField> = {
  title: 'components/ui/textfield',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Text: Story = {
  args: {
    type: 'text',
    placeholder: 'Text Field',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Password Field',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Number Field',
    defaultValue: 0,
  },
};

export const Primary: Story = {
  args: {
    status: 'primary',
    type: 'text',
    placeholder: 'Text Field',
  },
};

export const Secondary: Story = {
  args: {
    status: 'secondary',
    type: 'text',
    placeholder: 'Text Field',
  },
};

export const Success: Story = {
  args: {
    status: 'success',
    type: 'text',
    placeholder: 'Text Field',
  },
};

export const Danger: Story = {
  args: {
    status: 'danger',
    type: 'text',
    placeholder: 'Text Field',
  },
};

export const Disabled: Story = {
  args: {
    status: 'disabled',
    type: 'text',
    placeholder: 'Text Field',
  },
};

export const Alert: Story = {
  args: {
    status: 'danger',
    type: 'text',
    placeholder: 'Text Field',
    helpMessage: 'Alert Message',
  },
};
