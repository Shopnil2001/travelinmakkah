'use client';

import React from 'react';

const FloatingInput = React.memo(({ name, label, type = 'text', value, onChange, required = false, delay = 0, focusedField, setFocusedField }) => {
  const isActive = focusedField === name || value;

  return (
    <div
      className="relative animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocusedField(name)}
        onBlur={() => setFocusedField(null)}
        required={required}
        className="peer w-full px-4 pt-6 pb-3 bg-white border-2 border-[var(--color-stone)] rounded-xl
                   text-[var(--color-charcoal)] text-base font-medium
                   focus:outline-none focus:border-[var(--color-gold)] focus:ring-4 focus:ring-[var(--color-gold)]/10
                   transition-all duration-300 placeholder-transparent"
        placeholder={label}
      />
      <label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-300 pointer-events-none font-medium
                   ${isActive
                     ? 'top-2 text-xs text-[var(--color-gold-dark)]'
                     : 'top-1/2 -translate-y-1/2 text-[var(--color-muted)] text-base'
                   }
                   peer-focus:top-2 peer-focus:text-xs peer-focus:text-[var(--color-gold-dark)] peer-focus:translate-y-0`}
      >
        {label}{required && ' *'}
      </label>
    </div>
  );
});

FloatingInput.displayName = 'FloatingInput';

export default FloatingInput;
