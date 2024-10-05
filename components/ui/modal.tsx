import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface ModalProps {
  trigger: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function Modal({ trigger, children, className }: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className={className}>
        {children}
      </DialogContent>
    </Dialog>
  )
}