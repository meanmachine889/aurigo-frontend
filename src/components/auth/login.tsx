import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { OTPInput } from "../ui/otp-input";


export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [email, setEmail] = useState("");

  async function onLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowOTPModal(true);
    }, 1500);
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
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email and password to login.
        </CardDescription>
      </CardHeader>
      <form onSubmit={onLogin}>
        <CardContent className="space-y-4">
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
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
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
  );
}
