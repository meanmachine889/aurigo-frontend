/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PaymentButton from "../ui/paymentbutton";

interface Payment {
  upiid: string;
  _id: string;
  amount: number;
  description: string;
  quantity: number;
}

export type TaskPaymentsProps = {
  id: string; // The task ID
};

export default function TaskPayments({ id }: TaskPaymentsProps) {
  const [transactions, setTransactions] = React.useState<Payment[]>([]);
  const [filterValue, setFilterValue] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalTransactions, setTotalTransactions] = React.useState(0);
  const pageLimit = 5; // Transactions per page

  React.useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/transaction/${id}?page=${currentPage}&limit=${pageLimit}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched transactions:", data);
          setTransactions(data.transactions);
          setTotalTransactions(data.pagination.totalTransactions);
        } else {
          console.error("Failed to fetch transactions");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [id, currentPage]);

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.upiid?.toLowerCase().includes(filterValue.toLowerCase())
  );

  const handleNextPage = () => {
    if (currentPage * pageLimit < totalTransactions) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  if (transactions.length === 0) {
    return <div>No pending transactions found</div>;
  }

  return (
    <div className="w-full space-y-4 bg-background ">
      <div className="flex items-center justify-start gap-5">
        <Input
          placeholder="Filter UPI ID"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border bg-[#1d1d1d]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Receiver&apos;s UPI Id</TableHead>
              <TableHead className="">Total</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              console.log(transaction),
              <TableRow key={transaction._id}>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.quantity}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.upiid}</TableCell>
                <TableCell className="">
                  ₹{(transaction.amount * transaction.quantity).toFixed(2)}
                </TableCell>
                <TableCell>
                  <PaymentButton amount={transaction.amount * transaction.quantity} transactionId={transaction._id}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage * pageLimit >= totalTransactions}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
