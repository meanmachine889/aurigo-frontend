"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

interface Payment {
  id: string;
  approver: string;
  upi: string;
  amount: number;
  date: string;
  description?: string;
}

export default function PaymentsTable() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // Items per page
  const pathname = window.location.pathname; // Use `window.location` to access the full path
    const segments = pathname.split("/"); // Split the path into segments
    const lastSegment = segments[segments.length - 1]; // Get the last part of the path
    const [projectId, areaId] = lastSegment.split("-"); // Extract projectId and areaId
  const fetchPayments = async (currentPage: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/transaction/${projectId}/${areaId}/completed-transactions?page=${currentPage}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched payments:", data);
        setPayments(
          data.transactions.map((task: any) => ({
            id: task._id,
            approver: task.payerid || "Unknown",
            upi: task.upiid || "N/A",
            amount: task.total || 0,
            date: task.updatedAt || "N/A",
            description: task.description || "",
          }))
        );
        setTotalPages(Math.ceil(data.pagination.totalTasks / limit));
      } else {
        console.error("Failed to fetch payments");
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments(page);
  }, [page]);

  const filteredPayments = payments.filter((payment) =>
    payment.upi.toLowerCase().includes(filterValue.toLowerCase())
  );

  const isAllSelected = selectedRows.length === filteredPayments.length;

  const toggleAll = () => {
    if (isAllSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredPayments.map((payment) => payment.id));
    }
  };

  const toggleRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  return (
    <div className="w-full space-y-4 bg-background p-3 border-2 rounded-xl">
      <div className="space-y-1">
        <h1 className="text-2xl font-normal tracking-tight">Payments</h1>
        <p className="text-sm text-muted-foreground">Manage your payments.</p>
      </div>
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter upis..."
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="max-w-sm"
        />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Approver</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Receiver UPI Id</TableHead>
                <TableHead className="">Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.approver}</TableCell>
                  <TableCell>{payment.description}</TableCell>
                  <TableCell>{payment.upi}</TableCell>
                  <TableCell>₹{payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
