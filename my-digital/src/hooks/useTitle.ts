import { useEffect, useState } from "react"

export default function useTitle(currentTitle: string) {
  useEffect(() => {
    document.title = currentTitle
  }, [currentTitle])
}
