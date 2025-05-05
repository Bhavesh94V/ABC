"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Clock, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ScheduleSelectorProps {
  isScheduling: boolean
  setIsScheduling: (value: boolean) => void
  scheduledDate: string
  setScheduledDate: (value: string) => void
  scheduledTime: string
  setScheduledTime: (value: string) => void
}

const ScheduleSelector: React.FC<ScheduleSelectorProps> = ({
  isScheduling,
  setIsScheduling,
  scheduledDate,
  setScheduledDate,
  scheduledTime,
  setScheduledTime,
}) => {
  const [minDate, setMinDate] = useState("")
  const [minTime, setMinTime] = useState("")

  // Get the current date and time plus 15 minutes (minimum scheduling time)
  useEffect(() => {
    const now = new Date()

    // Set min date to today in YYYY-MM-DD format
    const dateString = now.toISOString().split("T")[0]
    setMinDate(dateString)

    // Set default scheduled date to today if not already set
    if (!scheduledDate) {
      setScheduledDate(dateString)
    }

    // Calculate minimum time (current time + 15 minutes)
    now.setMinutes(now.getMinutes() + 15)
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")
    const timeString = `${hours}:${minutes}`
    setMinTime(timeString)

    // Set default scheduled time if not already set or if it's earlier than minimum time
    if (!scheduledTime || (scheduledDate === dateString && scheduledTime < timeString)) {
      setScheduledTime(timeString)
    }
  }, [])

  // Validate time selection based on selected date
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTime = e.target.value

    // If today is selected, ensure time is not in the past
    if (scheduledDate === minDate && selectedTime < minTime) {
      setScheduledTime(minTime)
    } else {
      setScheduledTime(selectedTime)
    }
  }

  // Validate date selection
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value
    setScheduledDate(selectedDate)

    // If date changes to today, ensure time is not in the past
    if (selectedDate === minDate && scheduledTime < minTime) {
      setScheduledTime(minTime)
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue={isScheduling ? "schedule" : "now"}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="now" onClick={() => setIsScheduling(false)}>
            Ride Now
          </TabsTrigger>
          <TabsTrigger value="schedule" onClick={() => setIsScheduling(true)}>
            Schedule
          </TabsTrigger>
        </TabsList>
        <TabsContent value="now" className="pt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Book a ride for immediate pickup at your location</p>
        </TabsContent>
        <TabsContent value="schedule" className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input type="date" value={scheduledDate} onChange={handleDateChange} min={minDate} className="pl-10" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="time"
                value={scheduledTime}
                onChange={handleTimeChange}
                min={scheduledDate === minDate ? minTime : undefined}
                className="pl-10"
              />
            </div>
            <div className="text-xs text-green-nexus-600 dark:text-green-nexus-400">
              Rides can be scheduled at least 15 minutes in advance
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ScheduleSelector
