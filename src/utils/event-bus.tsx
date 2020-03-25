import * as React from 'react'

const listeners: Record<string, Function[]> = {}

export const EventBus = {
  addEventListener(event: string, listener: () => void): () => void {
    listeners[event] = listeners[event] || []
    listeners[event].push(listener)

    return () => (listeners[event] = listeners[event].filter(l => l !== listener))
  },

  dispatch(event: string) {
    listeners[event].forEach(listener => listener())
  },
}
