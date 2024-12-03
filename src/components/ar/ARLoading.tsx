import { Loader } from 'lucide-react';

export function ARLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90">
      <div className="text-center">
        <Loader className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
        <p className="text-white">Initializing AR Experience...</p>
      </div>
    </div>
  );
}