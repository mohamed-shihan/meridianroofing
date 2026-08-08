'use client'
import { useState, useId } from 'react'

interface FloatingLabelProps {
  id?: string
  label: string
  type?: 'text' | 'email' | 'tel'
  required?: boolean
  name: string
  autoComplete?: string
}

export function FloatingLabelInput({
  label,
  type = 'text',
  required,
  name,
  autoComplete,
}: FloatingLabelProps) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const uid = useId()

  const isFloated = focused || hasValue

  return (
    <div className="relative w-full">
      <input
        id={uid}
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false)
          setHasValue(e.target.value.length > 0)
        }}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        className={[
          'peer w-full h-16 px-4 md:px-5 pt-6 pb-2 bg-transparent text-travertine text-sm font-body font-medium',
          'border-b outline-none transition-colors duration-200',
          'placeholder-transparent',
          focused ? 'border-ember' : 'border-travertine/25',
          'focus-visible:outline-none',
        ].join(' ')}
        placeholder={label}
      />
      <label
        htmlFor={uid}
        className={[
          'absolute left-4 md:left-5 transition-all duration-200 pointer-events-none font-body font-semibold',
          isFloated
            ? 'top-2 text-[10px] tracking-widest uppercase text-ember font-extrabold'
            : 'top-5 text-sm text-travertine/50',
          focused ? 'text-ember' : '',
        ].join(' ')}
      >
        {label}
      </label>
    </div>
  )
}

interface FloatingTextareaProps {
  label: string
  name: string
  required?: boolean
  rows?: number
}

export function FloatingLabelTextarea({
  label,
  name,
  required,
  rows = 4,
}: FloatingTextareaProps) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const uid = useId()

  const isFloated = focused || hasValue

  return (
    <div className="relative w-full">
      <textarea
        id={uid}
        name={name}
        required={required}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false)
          setHasValue(e.target.value.length > 0)
        }}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        className={[
          'peer w-full px-4 md:px-5 pt-8 pb-3 bg-transparent text-travertine text-sm font-body font-medium resize-none',
          'border-b outline-none transition-colors duration-200',
          'placeholder-transparent',
          focused ? 'border-ember' : 'border-travertine/25',
          'focus-visible:outline-none',
        ].join(' ')}
        placeholder={label}
      />
      <label
        htmlFor={uid}
        className={[
          'absolute left-4 md:left-5 transition-all duration-200 pointer-events-none font-body font-semibold',
          isFloated
            ? 'top-2 text-[10px] tracking-widest uppercase text-ember font-extrabold'
            : 'top-5 text-sm text-travertine/50',
          focused ? 'text-ember' : '',
        ].join(' ')}
      >
        {label}
      </label>
    </div>
  )
}

interface FloatingSelectProps {
  label: string
  name: string
  required?: boolean
  options: { value: string; label: string }[]
}

export function FloatingSelect({ label, name, required, options }: FloatingSelectProps) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const uid = useId()

  return (
    <div className="relative w-full">
      <select
        id={uid}
        name={name}
        required={required}
        defaultValue=""
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        className={[
          'peer w-full h-16 px-4 md:px-5 pt-6 pb-2 bg-transparent text-travertine text-sm font-body font-medium',
          'border-b outline-none transition-colors duration-200 cursor-pointer appearance-none',
          focused ? 'border-ember' : 'border-travertine/25',
          'focus-visible:outline-none',
        ].join(' ')}
      >
        <option value="" disabled className="bg-obsidian text-travertine/40" />
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-obsidian text-travertine py-2">
            {opt.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={uid}
        className={[
          'absolute left-4 md:left-5 transition-all duration-200 pointer-events-none font-body font-semibold',
          hasValue || focused
            ? 'top-2 text-[10px] tracking-widest uppercase text-ember font-extrabold'
            : 'top-5 text-sm text-travertine/50',
          focused ? 'text-ember' : '',
        ].join(' ')}
      >
        {label}
      </label>
      {/* Custom chevron with clean spacing */}
      <div className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 pointer-events-none text-travertine/60">
        <svg width="12" height="7" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}
