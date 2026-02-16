import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

type DefaultTextFieldProps = {
  width?: number;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  helpMessage?: string;
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
  helpMessage = '',
  icon,
  status = 'primary',
  placeholder = '',
  width = 200,
  onChange,
  ...props
}: React.ComponentProps<'input'> &
  DefaultTextFieldProps &
  VariantProps<typeof textFieldVariants>) => {
  const colorMap = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    danger: 'text-danger',
    disabled: 'text-disabled',
  };

  const variantValue = status || 'primary';
  const Icon = icon;

  return (
    <div className="mb-2 flex flex-col gap-1.25">
      <div style={{ width }} className={cn(textFieldVariants({ status }))}>
        <input
          className="text-strong min-w-0 flex-1 border-none bg-transparent font-sans text-sm outline-none"
          defaultValue={props.defaultValue}
          placeholder={placeholder}
          onChange={onChange}
          disabled={status === 'disabled'}
          {...props}
        />
        {Icon && (
          <span className={cn('shrink-0', colorMap[variantValue])}>
            <Icon width={13} height={13} className="block" />
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
