"use client"

import { Input } from "@/components/ui/input"
import { useRef, useState } from "react"

interface OTPInputProps {
  length?: number
  onComplete?: (otp: string) => void
}

export function OTPInput({ length = 6, onComplete }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return

    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    // Call onComplete when all digits are filled
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    const otpString = newOtp.join("")
    if (otpString.length === length && onComplete) {
      onComplete(otpString)
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex gap-2">
      {otp.map((digit, index) => (
        <Input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          ref={(ref) => (inputRefs.current[index] = ref)}
          className="w-10 h-10 text-center p-0"
        />
      ))}
    </div>
  )
}