import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ChangeEvent } from 'react';
import AlertSvg from '@/assets/alert.svg?react';

type DefaultTextFieldProps = {
  type: 'text' | 'password' | 'number';
  helpMessage?: string;
  defaultValue?: string | number;
  placeholder?: string;
  width?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const textFieldVariants = cva(
  'flex justify-center items-center h-7.75 p-1.25 gap-1 border-b',
  {
    variants: {
      status: {
        primary: 'border-b-primary',
        secondary: 'border-b-secondary',
        success: 'border-b-success',
        danger: 'border-b-danger',
        disabled: 'border-b-disabled',
      },
    },
    defaultVariants: {
      status: 'primary',
    },
  },
);

const TextField = ({
  type,
  status,
  helpMessage = '',
  defaultValue = '',
  placeholder = '',
  width = 200,
  onChange,
}: DefaultTextFieldProps & VariantProps<typeof textFieldVariants>) => {
  const colorMap = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    danger: 'text-danger',
    disabled: 'text-disabled',
  };

  const variantValue = status || 'primary';

  return (
    <div className="mb-2 flex flex-col gap-1.25">
      <div style={{ width }} className={cn(textFieldVariants({ status }))}>
        <input
          className="text-strong min-w-0 flex-1 border-none bg-transparent font-sans text-sm outline-none"
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={onChange}
          disabled={status === 'disabled'}
        />
        {helpMessage && (
          <span className={cn('shrink-0', colorMap[variantValue])}>
            <AlertSvg width={13} height={13} className="block" />
          </span>
        )}
      </div>
      {helpMessage && (
        <span className={`text-[12px] ${colorMap[variantValue]} pl-1.25`}>
          {helpMessage}
        </span>
      )}
    </div>
  );
};

export default TextField;
