import QRCode from 'qrcode.react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignId: string;
  campaignTitle: string;
}

export function QRCodeModal({ isOpen, onClose, campaignId, campaignTitle }: QRCodeModalProps) {
  const arViewerUrl = `${window.location.origin}/ar/${campaignId}`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(arViewerUrl);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={onClose}
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full shadow-xl"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {campaignTitle}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Scan this QR code to view the AR experience
                </p>

                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-white rounded-lg">
                    <QRCode
                      value={arViewerUrl}
                      size={200}
                      level="H"
                      includeMargin
                      className="mx-auto"
                    />
                  </div>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <p className="mb-2">AR Viewer URL:</p>
                  <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded p-2">
                    <code className="text-xs break-all">{arViewerUrl}</code>
                    <button
                      onClick={handleCopyUrl}
                      className="ml-2 text-primary hover:text-highlight text-sm"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}