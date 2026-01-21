import { useState } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "@/lib/importEnv";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
	const [state, setState] = useState("email");
	const navigate = useNavigate();
	return (
		<>
			<section className="flex flex-col justify-center items-center h-screen">
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
			</section>
		</>
	);
}
