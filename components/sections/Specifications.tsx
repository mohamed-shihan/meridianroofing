'use client'
import CountUp from '@/components/ui/CountUp'
import SectionReveal, { RevealItem } from '@/components/ui/SectionReveal'

const SPECS = [
  { label: 'Total Roof Area', value: 14800, suffix: ' SQ FT', prefix: '' },
  { label: 'Wind Resistance', value: 180, suffix: ' MPH', prefix: '' },
  { label: 'Structural Warranty', value: 50, suffix: ' YRS', prefix: '' },
  { label: 'Craftsman Hours', value: 4200, suffix: ' HRS', prefix: '' },
  { label: 'Estates Roofed', value: 250, suffix: '+', prefix: '' },
]

export default function Specifications() {
  return (
    <section
      id="specifications"
      aria-label="Roofing Specifications & Performance Standards"
      className="bg-hedge section-pad"
    >
      <div className="max-w-content mx-auto" style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <span className="divider-timber mb-12 block" aria-hidden />

        <SectionReveal>
          <RevealItem>
            <div className="flex items-center gap-3 mb-12 md:mb-14">
              <span className="w-6 h-0.5 bg-ember" />
              <p className="eyebrow tracking-[0.24em]">ENGINEERING STANDARDS &amp; METRICS</p>
            </div>
          </RevealItem>
        </SectionReveal>

        {/* Stat grid with generous padding */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-6 md:gap-y-10 gap-x-0">
          {SPECS.map((spec, i) => (
            <SectionReveal key={spec.label} delay={i * 0.06}>
              <RevealItem>
                <div
                  className={[
                    'flex flex-col gap-2 px-0 sm:px-6 md:px-8 py-4 md:py-2 text-center md:text-left',
                    i < SPECS.length - 1
                      ? 'border-b md:border-b-0 md:border-r border-timber/25'
                      : '',
                  ].join(' ')}
                >
                  <span className="stat-number">
                    {spec.prefix}
                    <CountUp end={spec.value} duration={1.8} suffix={spec.suffix} />
                  </span>
                  <span className="eyebrow text-travertine/70 mt-1 font-extrabold">{spec.label}</span>
                </div>
              </RevealItem>
            </SectionReveal>
          ))}
        </div>

        <span className="divider-timber mt-12 md:mt-14 block" aria-hidden />
      </div>
    </section>
  )
}
