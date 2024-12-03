import { LucideIcon } from 'lucide-react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  tooltip?: string;
}

export function IconButton({
  icon: Icon,
  variant = 'primary',
  size = 'md',
  tooltip,
  className = '',
  ...props
}: IconButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'text-gray-600 hover:text-primary focus:ring-primary',
    secondary: 'text-gray-400 hover:text-gray-600 focus:ring-gray-500',
    danger: 'text-gray-600 hover:text-red-600 focus:ring-red-500'
  };

  const sizes = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      title={tooltip}
      {...props}
    >
      <Icon className={iconSizes[size]} aria-hidden="true" />
    </button>
  );
}