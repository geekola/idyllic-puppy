import { Phone } from 'lucide-react';
import { AsYouType } from 'libphonenumber-js';

interface PhoneInputProps {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
  error?: string;
  disabled?: boolean;
}

export function PhoneInput({ value, onChange, error, disabled }: PhoneInputProps) {
  const formatter = new AsYouType('US');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    const formatted = formatter.input(input);
    onChange(formatted, input.length >= 10);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text').replace(/\D/g, '');
    const formatted = formatter.input(pastedText);
    onChange(formatted, pastedText.length >= 10);
  };

  return (
    <div className="form-group">
      <div className="relative">
        <div className="input-icon-wrapper">
          <Phone className="input-icon" />
        </div>
        <input
          type="tel"
          value={value}
          onChange={handleInputChange}
          onPaste={handlePaste}
          disabled={disabled}
          placeholder="(555) 555-5555"
          className={`input-with-icon ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
        />
      </div>
      {error && (
        <p className="form-error">{error}</p>
      )}
    </div>
  );
}