import { forwardRef } from 'react';

const TextInputWithLabel = forwardRef(function TextInputWithLabel(
  { elementId, labelText, onChange, value, className, ...props },
  ref
) {
  return (
    <>
      <label htmlFor={elementId} className="sr-only">
        {labelText}
      </label>
      <input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
        className={`w-full bg-transparent border-none text-on-surface focus:ring-0 focus:outline-none placeholder-outline-variant font-body text-[16px] leading-[24px] ${className || ""}`}
        {...props}
      />
    </>
  );
});

export default TextInputWithLabel;