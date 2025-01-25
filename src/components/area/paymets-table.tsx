/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import * as React from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"

interface Payment {
  id: string
  approver: string
  upi: string
  amount: number
  date: string
  description?: string
}

const payments: Payment[] = [
  {
    id: "1",
    approver: "Yash",
    upi: "ken99@yahoo.com",
    amount: 316.00,
    date: "2023-06-05",
    description: "Tiles"
  },
  {
    id: "2",
    approver: "Sai Charan",
    upi: "abe45@gmail.com",
    amount: 242.00,
    date: "2023-06-06",
    description: "Paint"
  },
  {
    id: "3",
    approver: "Kshitij",
    upi: "monserrat44@gmail.com",
    amount: 837.00,
    date: "2023-06-07",
    description: "Furniture"
  },
  {
    id: "4",
    approver: "Naman",
    upi: "carmella@hotmail.com",
    amount: 721.00,
    date: "2023-06-08",
    description: "Curtains"
  },
]

export default function PaymentsTable() {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])
  const [filterValue, setFilterValue] = React.useState("")

  const filteredPayments = payments.filter(payment =>
    payment.upi.toLowerCase().includes(filterValue.toLowerCase())
  )

  const isAllSelected = selectedRows.length === filteredPayments.length

  const toggleAll = () => {
    if (isAllSelected) {
      setSelectedRows([])
    } else {
      setSelectedRows(filteredPayments.map(payment => payment.id))
    }
  }

  const toggleRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  return (
    <div className="w-full space-y-4 bg-background p-3 border-2 rounded-xl">
      <div className="space-y-1">
        <h1 className="text-2xl font-normal tracking-tight">Payments</h1>
        <p className="text-sm text-muted-foreground">
          Manage your payments.
        </p>
      </div>
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter upis..."
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border bg-[#1d1d1d]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Approver</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>
                Receiver UPI Id
              </TableHead>
              <TableHead className="">Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  <span >
                    {payment.approver}
                  </span>
                </TableCell>
                <TableCell>{payment.description}</TableCell>
                <TableCell>{payment.upi}</TableCell>
                <TableCell className="">
                ₹{payment.amount.toFixed(2)}
                </TableCell>
                <TableCell>{payment.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="space-x-2">
          <Button  className="bg-[#1d1d1d] text-gray-300" size="sm">
            Previous
          </Button>
          <Button  className="bg-[#1d1d1d] text-gray-300" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
