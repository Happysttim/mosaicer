import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import type { Status } from '../types/status';

type DefaultButtonProps = {
  status: Status;
  content: string;
  className: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
};

const buttonVariants = cva(
  "flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-sans font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border-2 bg-transparent hover:text-accent-foreground',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: 'h-8 rounded-md gap-1.5 px-3 text-sm has-[>svg]:px-2.5',
        md: 'h-10 px-10 py-4 text-md has-[>svg]:px-3',
        lg: 'h-12 rounded-md px-20 py-6 text-lg has-[>svg]:px-4',
        icon: 'size-9',
        'icon-xs': "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'md',
  status = 'primary',
  content,
  icon,
  onClick,
}: DefaultButtonProps & VariantProps<typeof buttonVariants>) {
  const colorMap = {
    default: {
      primary: 'bg-primary hover:bg-primary/90',
      secondary: 'bg-secondary hover:bg-secondary/90',
      success: 'bg-success hover:bg-success/90',
      danger: 'bg-danger hover:bg-danger/90',
      disabled: 'bg-disabled',
    },
    outline: {
      primary: 'border-primary hover:border-primary/90',
      secondary: 'border-secondary hover:border-secondary/90',
      success: 'border-success hover:border-success/90',
      danger: 'border-danger hover:border-danger/90',
      disabled: 'border-disabled',
    },
  };

  const Icon = icon;
  return (
    <button
      className={cn(
        buttonVariants({ variant, size, className }),
        (variant === 'default' || variant === 'outline') &&
          colorMap[variant][status],
      )}
      onClick={onClick}
      disabled={status === 'disabled'}
    >
      {Icon && (
        <span>
          <Icon />
        </span>
      )}
      <span className="flex-1">{content}</span>
    </button>
  );
}

export default Button;
