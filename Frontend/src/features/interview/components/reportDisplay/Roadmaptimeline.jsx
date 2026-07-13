import React from 'react'
import RoadmapDay from './RoadmapDay.jsx'

/**
 * RoadmapTimeline
 *
 * Props:
 * - plan: [{ day, focus, tasks }]
 */
const RoadmapTimeline = ({ plan }) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-50 tracking-tight">Preparation Road Map</h2>
        <p className="mt-1 text-sm text-slate-500">A day-by-day plan built around your skill gaps and the target role.</p>
      </div>

      <div>
        {plan.map((d, i) => (
          <RoadmapDay key={d.day} {...d} isLast={i === plan.length - 1} />
        ))}
      </div>
    </div>
  )
}

export default RoadmapTimeline