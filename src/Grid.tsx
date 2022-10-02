import React from 'react'

export function Grid({ rows, cols, style, children, ...props }: GridProps) {
  return (
    <div
      {...props}
      style={{ ...style, display: 'grid', gridTemplateRows: rows, gridTemplateColumns: cols }}
    >
      {children}
    </div>
  )
}

type GridProps = {
  rows?: React.CSSProperties['gridTemplateRows']
  cols?: React.CSSProperties['gridTemplateColumns']
  children?: React.ReactNode
} & React.HTMLAttributes<any>

export function Cell({ row, col, style, children, ...props }: CellProps) {
  return (
    <div className="ss" {...props} style={{ ...style, gridRow: row, gridColumn: col }}>
      {children}
    </div>
  )
}

type CellProps = {
  row?: React.CSSProperties['gridRow']
  col?: React.CSSProperties['gridColumn']
  children?: JSX.Element | JSX.Element[]
} & React.HTMLAttributes<any>
