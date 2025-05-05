"use client"

import type React from "react"

import { useEffect, useState } from "react"

export type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive" | "success"
}

type ToastActionType = {
  addToast: (toast: Omit<ToastProps, "id">) => void
  removeToast: (id: string) => void
  updateToast: (id: string, toast: Partial<ToastProps>) => void
}

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function generateId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

const toasts: ToastProps[] = []

export const useToast = (): ToastActionType & { toasts: ToastProps[] } => {
  const [state, setState] = useState<ToastProps[]>(toasts)

  useEffect(() => {
    toasts.forEach((toast) => {
      const timeout = setTimeout(() => {
        removeToast(toast.id)
      }, TOAST_REMOVE_DELAY)

      toastTimeouts.set(toast.id, timeout)
    })

    return () => {
      toastTimeouts.forEach((timeout) => {
        clearTimeout(timeout)
      })
      toastTimeouts.clear()
    }
  }, [state])

  const addToast = (toast: Omit<ToastProps, "id">) => {
    const id = generateId()
    const newToast = { id, ...toast }
    toasts.push(newToast)
    setState([...toasts])
    return id
  }

  const updateToast = (id: string, toast: Partial<ToastProps>) => {
    const toastIndex = toasts.findIndex((t) => t.id === id)
    if (toastIndex !== -1) {
      toasts[toastIndex] = { ...toasts[toastIndex], ...toast }
      setState([...toasts])
    }
  }

  const removeToast = (id: string) => {
    const index = toasts.findIndex((toast) => toast.id === id)
    if (index !== -1) {
      toasts.splice(index, 1)
      setState([...toasts])
    }
  }

  return {
    toasts: state,
    addToast,
    updateToast,
    removeToast,
  }
}

export const toast = {
  default(props: Omit<ToastProps, "id" | "variant">) {
    const id = generateId()
    const newToast = { id, variant: "default", ...props } as ToastProps
    toasts.push(newToast)
    return id
  },
  success(props: Omit<ToastProps, "id" | "variant">) {
    const id = generateId()
    const newToast = { id, variant: "success", ...props } as ToastProps
    toasts.push(newToast)
    return id
  },
  destructive(props: Omit<ToastProps, "id" | "variant">) {
    const id = generateId()
    const newToast = { id, variant: "destructive", ...props } as ToastProps
    toasts.push(newToast)
    return id
  },
}
