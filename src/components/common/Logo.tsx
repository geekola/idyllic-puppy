import { LayoutGrid } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-6 w-auto" }: LogoProps) {
  return (
    <div className="flex items-center space-x-2">
      <LayoutGrid className={`text-primary ${className}`} />
     <img src="../images/logo-overlay.png" alt="Spatial Mods" className='h-10' /
    </div>
  );
}
