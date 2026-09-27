import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface BenchoCopyButtonProps {
  textToCopy: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}

export const BenchoCopyButton: React.FC<BenchoCopyButtonProps> = ({
  textToCopy,
  label = 'COPY',
  copiedLabel = 'COPIED!',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex items-center gap-2 px-3 py-1.5 font-mono text-xs transition-all duration-200 rounded-sm cursor-pointer select-none ${
        copied
          ? 'bg-[#00FF88]/15 border border-[#00FF88] text-[#00FF88]'
          : 'bg-[#161A26] border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white'
      } ${className}`}
      title="Click to copy"
    >
      <span className="transition-transform duration-200">
        {copied ? (
          <Check className="w-3.5 h-3.5 text-[#00FF88] animate-bounce" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
        )}
      </span>
      <span className="font-semibold tracking-wider">
        {copied ? copiedLabel : label}
      </span>
    </button>
  );
};
