"use client"

import { addDays } from "date-fns"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"

const start = new Date(2023, 5, 5)

export function DateRange() {
  return (
    <Card className="w-fit bg-[#1d1d1d]">
      <CardContent className="p-1 ">
        <Calendar
          numberOfMonths={1}
          className=" text-gray-300"
          mode="range"
          defaultMonth={start}
          selected={{
            from: start,
            to: addDays(start, 8),
          }}
        />
      </CardContent>
    </Card>
  )
}