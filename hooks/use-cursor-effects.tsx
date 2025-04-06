"use client"

import { useEffect } from "react"

type CursorEffectOptions = {
  selector: string
  className: string
}

export function useCursorEffects(options: CursorEffectOptions[]) {
  useEffect(() => {
    // カスタムデータ属性を追加する関数
    const addCursorEffects = () => {
      options.forEach(({ selector, className }) => {
        const elements = document.querySelectorAll(selector)
        elements.forEach((el) => {
          el.setAttribute("data-cursor-effect", className)
        })
      })
    }

    // カスタムデータ属性を追加
    addCursorEffects()

    // 動的に追加された要素にも対応するためのMutationObserver
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          addCursorEffects()
        }
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
    }
  }, [options])
}

