import type { Meta, StoryObj } from '@storybook/react-vite';
import Progress from '../ui/progress';

const meta: Meta<typeof Progress> = {
  title: 'components/ui/progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const SetValue: Story = {
  args: {
    value: 30,
  },
};
