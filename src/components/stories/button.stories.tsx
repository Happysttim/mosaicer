import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '../ui/button';
import Download from '../../assets/download.svg?react';

const meta: Meta<typeof Button> = {
  title: 'components/ui/button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    content: 'Button',
    variant: 'default',
    size: 'lg',
  },
};

export const Outline: Story = {
  args: {
    content: 'Button',
    variant: 'outline',
    size: 'lg',
  },
};

export const Ghost: Story = {
  args: {
    content: 'Button',
    variant: 'ghost',
    size: 'lg',
  },
};

export const Icon: Story = {
  args: {
    content: 'Button',
    status: 'primary',
    size: 'lg',
    icon: Download,
  },
};

export const Primary: Story = {
  args: {
    content: 'Button',
    status: 'primary',
    size: 'lg',
  },
};

export const Secondary: Story = {
  args: {
    content: 'Button',
    status: 'secondary',
    size: 'lg',
  },
};

export const Danger: Story = {
  args: {
    content: 'Button',
    status: 'danger',
    size: 'lg',
  },
};

export const Success: Story = {
  args: {
    content: 'Button',
    status: 'success',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    content: 'Button',
    status: 'disabled',
    size: 'lg',
  },
};
