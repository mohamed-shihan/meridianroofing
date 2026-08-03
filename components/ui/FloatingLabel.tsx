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
          'peer w-full h-14 px-4 pt-5 pb-2 bg-transparent text-travertine text-sm font-body',
          'border-b outline-none transition-colors duration-150',
          'placeholder-transparent',
          focused ? 'border-ember' : 'border-travertine/30',
          'focus-visible:outline-none',
        ].join(' ')}
        placeholder={label}
      />
      <label
        htmlFor={uid}
        className={[
          'absolute left-4 transition-all duration-150 pointer-events-none font-body',
          isFloated
            ? 'top-1.5 text-[10px] tracking-widest uppercase'
            : 'top-4 text-sm',
          focused ? 'text-ember' : 'text-travertine/50',
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
          'peer w-full px-4 pt-7 pb-2 bg-transparent text-travertine text-sm font-body resize-none',
          'border-b outline-none transition-colors duration-150',
          'placeholder-transparent',
          focused ? 'border-ember' : 'border-travertine/30',
          'focus-visible:outline-none',
        ].join(' ')}
        placeholder={label}
      />
      <label
        htmlFor={uid}
        className={[
          'absolute left-4 transition-all duration-150 pointer-events-none font-body',
          isFloated
            ? 'top-1.5 text-[10px] tracking-widest uppercase'
            : 'top-4 text-sm',
          focused ? 'text-ember' : 'text-travertine/50',
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
          'peer w-full h-14 px-4 pt-5 pb-2 bg-obsidian text-travertine text-sm font-body',
          'border-b outline-none transition-colors duration-150 cursor-pointer appearance-none',
          focused ? 'border-ember' : 'border-travertine/30',
          'focus-visible:outline-none',
        ].join(' ')}
      >
        <option value="" disabled />
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-obsidian">
            {opt.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={uid}
        className={[
          'absolute left-4 transition-all duration-150 pointer-events-none font-body',
          hasValue || focused
            ? 'top-1.5 text-[10px] tracking-widest uppercase'
            : 'top-4 text-sm',
          focused ? 'text-ember' : 'text-travertine/50',
        ].join(' ')}
      >
        {label}
      </label>
      {/* Custom chevron */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="#B9AE9A" strokeWidth="1.2" strokeLinecap="square"/>
        </svg>
      </div>
    </div>
  )
}
