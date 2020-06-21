import React from 'react'
import SimpleSchedule from '../SimpleSchedule/SimpleSchedule'
import { useProfile } from '../../../context/profile'

const ScheduleContainer = () => {
  const { schedule } = useProfile()

  return (
    <div className="text-left">
      <SimpleSchedule lineItems={schedule.lineItems} />
    </div>
  )
}

export default ScheduleContainer
