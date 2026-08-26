"use client";

import { useId, useState, type CSSProperties } from "react";

export interface BeforeAfterSliderProps {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  initialPosition?: number;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({ before, after, initialPosition = 50, beforeLabel = "Before", afterLabel = "After" }: BeforeAfterSliderProps) {
  const id = useId();
  const [position, setPosition] = useState(initialPosition);
  const style = { "--hive-before-after-position": `${position}%` } as CSSProperties;
  return <div className="hive-before-after" style={style}>
    {/* eslint-disable-next-line @next/next/no-img-element */}<img src={after.src} alt={after.alt} className="hive-before-after__image" loading="lazy" />
    <div className="hive-before-after__before">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={before.src} alt={before.alt} className="hive-before-after__image" loading="lazy" /></div>
    <span className="hive-before-after__label hive-before-after__label--before">{beforeLabel}</span>
    <span className="hive-before-after__label hive-before-after__label--after">{afterLabel}</span>
    <div className="hive-before-after__divider" aria-hidden="true" />
    <label className="hive-before-after__control" htmlFor={id}><span className="hive-before-after__sr-only">Compare {beforeLabel} and {afterLabel}</span><input id={id} type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} /></label>
  </div>;
}
