import { LayoutGrid } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-6 w-auto" }: LogoProps) {
  return (
    <div className="flex items-center space-x-2">
      <LayoutGrid className={`text-primary ${className}`} />
      <span className="font-heading font-bold text-xl text-dark dark:text-light">
        Spatial Mods
      </span>
    </div>
  );
}
