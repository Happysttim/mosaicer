import type { Meta, StoryObj } from '@storybook/react-vite';
import Stepper from '../ui/stepper';

const meta: Meta<typeof Stepper> = {
  title: 'components/ui/stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Stepper>;

const steps = ['메인 이미지 선택', '타일 이미지 선택', '세부 설정'];
export const StepOne: Story = {
  args: {
    steps,
  },
};

export const StepTwo: Story = {
  args: {
    steps,
    nowStep: 1,
  },
};

export const StepThree: Story = {
  args: {
    steps,
    nowStep: 2,
  },
};
