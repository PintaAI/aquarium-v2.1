import React from 'react'

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Grid({ children, className, ...props }: GridProps) {
  return (
    <div className={`grid ${className}`} {...props}>
      {children}
    </div>
  )
}
