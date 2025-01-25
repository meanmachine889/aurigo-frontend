"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import Image from "next/image"
import { format } from "date-fns"
import { UpdateForm } from "../update-form"

export interface Update {
  id: string
  note: string
  photos: string[]
  date: Date
}

const updates: Update[] = [
  {
    id: "1",
    note: "First update",
    photos: [
      "https://images.unsplash.com/photo-1727206407683-490abfe0d682?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1727206407683-490abfe0d682?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx8ZW58MHx8fHx8",
    ],
    date: new Date("2025-01-01"),
  },
  { id: "2", note: "Second update", photos: [], date: new Date("2023-10-02") },
  {
    id: "3",
    note: "",
    photos: [
      "https://images.unsplash.com/photo-1727206407683-490abfe0d682?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx8ZW58MHx8fHx8",
    ],
    date: new Date("2025-01-03"),
  },
]

const UpdatesComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const filteredUpdates = selectedDate
    ? updates.filter((update) => update.date.toDateString() === selectedDate.toDateString())
    : updates

  return (
    <div className=" bg-zinc-950 text-zinc-100 min-h-screen">
      <div className="mb-6 flex w-[100%] justify-between items-center">
        <DatePicker
          selected={selectedDate}
          onSelect={setSelectedDate}
          highlightedDates={updates.map((update) => update.date)}
        />
        <UpdateForm/>
      </div>
      <div className="space-y-4">
        {filteredUpdates.map((update) => (
          <Card key={update.id} className="bg-[#1d1d1d]">
            <CardContent className="p-4">
              <p className="text-lg text-zinc-400">{format(update.date, "MMMM d, yyyy")}</p>
              {update.photos.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-md font-medium text-zinc-500">Photos:</p>
                  <div className="grid grid-cols-2 gap-2 w-fit">
                    {update.photos.map((photo, index) => (
                      <div key={index} className="relative aspect-square overflow-hidden rounded-md w-[300px]">
                        <Image
                          src={photo || "/placeholder.svg"}
                          alt={`Update ${update.id} photo ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {update.note && <p className="mt-4 text-lg text-zinc-300">{update.note}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default UpdatesComponent