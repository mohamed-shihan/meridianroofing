// 60 keyframes sampled every 5th frame from the 300-frame sequence
// Frame 1 = timber framing (aerial), Frame 300 = finished dusk exterior
export const FRAME_COUNT = 60

export function getFrameIndex(scrollProgress: number): number {
  const clamped = Math.max(0, Math.min(1, scrollProgress))
  return Math.round(clamped * (FRAME_COUNT - 1))
}

export function getFrameUrl(keyframeIndex: number): string {
  // Map 0-59 to frame numbers: 1, 6, 11, 16, ... 296 (every 5th)
  const frameNumber = keyframeIndex * 5 + 1
  const padded = String(frameNumber).padStart(3, '0')
  return `/ezgif-frame-${padded}.webp`
}

export function getAllFrameUrls(): string[] {
  return Array.from({ length: FRAME_COUNT }, (_, i) => getFrameUrl(i))
}

// Stage labels tailored for Meridian Roofing Co.
export function getStageLabel(progress: number): string {
  if (progress < 0.15) return '01. Heavy Timber Framing'
  if (progress < 0.35) return '02. Structural Roof Trusses'
  if (progress < 0.55) return '03. Weatherproof Sheathing'
  if (progress < 0.72) return '04. Hand-Laid Slate Shingles'
  if (progress < 0.88) return '05. Copper Detailing & Waterproofing'
  return '06. Completed Estate Roof System'
}

// Key static frames for section backgrounds
export const STATIC_FRAMES = {
  hero: '/ezgif-frame-300.webp',
  approach: '/ezgif-frame-250.webp',
  grounds: '/ezgif-frame-220.webp',
  courtyard: '/ezgif-frame-001.webp',
  galleryPool: '/ezgif-frame-275.webp',
  galleryEntrance: '/ezgif-frame-245.webp',
  galleryFacade: '/ezgif-frame-290.webp',
  galleryRoof: '/ezgif-frame-120.webp',
  closing: '/ezgif-frame-285.webp',
}
