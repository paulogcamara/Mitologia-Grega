"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ScrollAnimationOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  onUpdate?: (self: ScrollTrigger) => void;
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!triggerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: options.trigger || triggerRef.current,
        start: options.start || "top top",
        end: options.end || "bottom bottom",
        scrub: options.scrub ?? 1,
        pin: options.pin || false,
        markers: options.markers || false,
        onUpdate: options.onUpdate,
      },
    });

    timelineRef.current = tl;

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [options.trigger, options.start, options.end, options.scrub, options.pin, options.markers, options.onUpdate]);

  return { triggerRef, timelineRef };
}
