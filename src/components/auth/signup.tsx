"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { OTPInput } from "../ui/otp-input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Signup() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showOTPModal, setShowOTPModal] = useState(false)
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")

  async function onSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setShowOTPModal(true)
    }, 1500)
  }

  const handleOTPComplete = async (otp: string) => {
    setIsLoading(true)

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false)
      setShowOTPModal(false)
      // Here you would typically redirect to the dashboard or home page
      alert("Successfully verified!")
    }, 1500)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account to get started.</CardDescription>
        </CardHeader>
        <form onSubmit={onSignup}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Input id="mobile" type="tel" placeholder="+1234567890" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select required onValueChange={(value) => setRole(value)}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Dialog open={showOTPModal} onOpenChange={setShowOTPModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter verification code</DialogTitle>
            <DialogDescription>We have sent a verification code to {email}. Please enter it below.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <OTPInput onComplete={handleOTPComplete} />
            <Button
              variant="link"
              className="text-sm"
              onClick={() => {
                // Here you would typically trigger resending the OTP
                alert("New code sent!")
              }}
            >
              Didn&apos;t receive the code? Resend
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}