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
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState("")
  const [password, setPassword] = useState("")
  

  async function onSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      // Prepare signup payload
      
      const payload = {
        email,
        name,
        phone,
        role,
        password
      };
  
      // Send signup request to the backend
      const response = await fetch("https://v0ck2c87-5000.inc1.devtunnels.ms/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setShowOTPModal(true); // Show OTP modal on successful signup
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  


  const handleOTPComplete = async (otp: string) => {
    setIsLoading(true);
  
    try {
      // Prepare OTP verification payload
      const payload = {
        email,
        otp,
      };
  
      // Send OTP verification request to the backend
      const response = await fetch("https://v0ck2c87-5000.inc1.devtunnels.ms/api/user/verifyotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem("authToken", data.token);
        setShowOTPModal(false); // Close OTP modal
        alert("Successfully verified!");
  
        // Optionally redirect to a dashboard or home page
        window.location.href = "/dashboard";
      } else {
        alert(data.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      alert("An error occurred during OTP verification. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resendotp = async () => {
    setIsLoading(true);
  
    try {
      // Prepare payload for resending OTP
      const payload = { email };
  
      // Send request to the backend to resend OTP
      const response = await fetch("https://v0ck2c87-5000.inc1.devtunnels.ms/api/user/sendotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("A new OTP has been sent to your email.");
      } else {
        alert(data.message || "Failed to resend OTP.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("An error occurred while resending OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  


  
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
              <Input id="name" type="text" placeholder="John Doe" required onChange={(e)=>{setName(e.target.value)}} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Input id="mobile" type="tel" placeholder="+1234567890" required onChange={(e)=>{setPhone(e.target.value)}}/>
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
                  <SelectItem value="constructor">Manager</SelectItem>
                  <SelectItem value="user">Customer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required onChange={(e)=>{setPassword(e.target.value)}}/>
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
                resendotp();
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