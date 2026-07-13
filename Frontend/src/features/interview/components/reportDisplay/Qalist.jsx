import React from 'react'
import QAItem from './QAItem.jsx'

/**
 * QAList
 *
 * Props:
 * - title: string
 * - subtitle: string
 * - items: [{ question, intention, answer }]
 */
const QAList = ({ title, subtitle, items }) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-50 tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => (
          <QAItem key={item.question} index={i + 1} {...item} defaultOpen={i === 0} />
        ))}
      </div>
    </div>
  )
}

export default QAList