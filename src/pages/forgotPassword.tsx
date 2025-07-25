import { useState } from "react";
import { useNavigate } from "react-router";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";

export default function ForgotPassword() {
	const [state, setState] = useState("email");
	const navigate = useNavigate();
	return (
		<>
			<section className="flex flex-col justify-center items-center h-screen">
				{state === "email" ? (
					<section className="w-full max-w-md">
						<section className="mb-3">
							<Button
								variant="outline"
								className="cursor-pointer border-0 shadow-none"
								onClick={() => navigate(-1)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="36px"
									viewBox="0 -960 960 960"
									width="36px"
									fill="currentColor"
								>
									<path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
								</svg>
							</Button>
							<p className="font-semibold text-xl ms-3">Atur Ulang Katasandi</p>
							<p className="ms-3">Masukkan E-mail yang sudah terdaftar</p>
						</section>
						<Label htmlFor="email" className="mb-1 ms-3">
							Email
						</Label>
						<Input
							type="email"
							id="email"
							placeholder="Email...."
							className="ms-3"
						/>
						<Button
							className="mt-3 ms-3 w-full cursor-pointer"
							onClick={() => setState("otp")}
						>
							Submit
						</Button>
					</section>
				) : (
					<section className="w-full max-w-md">
						<section className="mb-3">
							<p className="font-semibold text-xl ms-3">OTP</p>
							<p className="ms-3">
								Masukkan Kode OTP yang sudah dikirim melalui email
							</p>
						</section>
						<Label htmlFor="otp" className="mb-1 ms-3">
							OTP
						</Label>
						<section className="flex justify-center">
							<InputOTP maxLength={6} id="otp">
								<InputOTPGroup>
									<InputOTPSlot index={0} />
									<InputOTPSlot index={1} />
									<InputOTPSlot index={2} />
								</InputOTPGroup>
								<InputOTPSeparator />
								<InputOTPGroup>
									<InputOTPSlot index={3} />
									<InputOTPSlot index={4} />
									<InputOTPSlot index={5} />
								</InputOTPGroup>
							</InputOTP>
						</section>
						<Button className="mt-3 ms-3 w-full cursor-pointer">Submit</Button>
					</section>
				)}
			</section>
		</>
	);
}
