"use client"

import { useCursorEffects } from "@/hooks/use-cursor-effects"

export default function CursorEffectsProvider() {
  useCursorEffects([
    { selector: "a, button, [role=button]", className: "link" },
    { selector: "h1, h2, h3", className: "heading" },
    { selector: ".card, .feature-card", className: "card" },
  ])

  return null
}

