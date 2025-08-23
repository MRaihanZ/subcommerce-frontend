import { useState } from "react";
import { useGlobalData } from "@/contexts/GlobalDataContext";

import { CreateCsrf } from "../utils/csrf";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface SignUpProps {
	setOpenCloseDialog: React.Dispatch<React.SetStateAction<boolean>>;
	setOpenCloseDropDownMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignUp({
	setOpenCloseDialog,
	setOpenCloseDropDownMenu,
}: SignUpProps) {
	const [date, setDate] = useState<Date | undefined>(undefined);
	const [open, setOpen] = useState(false);
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string | null>(null);
	const [inputRequired, setInputRequired] = useState(false);
	const [emailExist, setEmailExist] = useState<boolean>();

	const { setData } = useGlobalData();

	const handleSubmit = async () => {
		if (name === "") {
			setInputRequired(true);
			return;
		} else if (email === "") {
			setInputRequired(true);
			return;
		} else if (date === undefined) {
			setInputRequired(true);
			return;
		} else if (password === "") {
			setInputRequired(true);
			return;
		}
		const csrfToken = await CreateCsrf();

		const payload = {
			name: name,
			email: email,
			dob: date,
			password: password,
		};

		try {
			const send = await fetch("http://localhost:8080/api/v1/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-TOKEN": csrfToken,
				},
				credentials: "include",
				body: JSON.stringify(payload),
			});

			const result = await send.json();
			if (result.code === 200 && result.status === "ok") {
				setData({
					code: result.code,
					status: result.status,
					data: {
						is_login: true,
						is_seller: false,
					},
					error: null,
				});
				toast("Sign up berhasil");
				setOpenCloseDialog(false);
				setOpenCloseDropDownMenu(false);
				window.location.reload();
			} else if (result.code === 409 && result.status === "error") {
				setEmailExist(true);
			} else {
				toast(result.error);
				setError(result.error);
				// setLoading(false);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			toast(errFetch);
			setError(errFetch);
			// setLoading(false);
		}
	};
	return (
		<>
			<section className="mx-auto max-w-md">
				{/* <!-- ... --> */}

				<section>
					<span className="flex justify-center pt-8">
						{/* <img src="..." alt="Logo" className="w-16" /> */}
						<p className="text-2xl font-bold">SubCommerce</p>
					</span>
					<section className="pt-8 font-bold text-black text-center text-xl tracking-widest uppercase">
						Selamat Datang!
					</section>
					<section className="text-center mb-5 mt-3">
						Silahkan isi form dibawah ini
					</section>
					<form className="bg-grey-lightest py-3">
						{/* {{ csrf_field() }} */}
						<section className="mb-3">
							<label htmlFor="name">Nama</label>
							<input
								className="border w-full p-3 rounded-lg"
								name="name"
								type="text"
								id="name"
								placeholder="Nama..."
								required
								onChange={(e) => setName(e.target.value)}
								onFocus={() => {
									setEmailExist(false);
									setInputRequired(false);
								}}
							/>
						</section>
						<section className="mb-3">
							<label htmlFor="email">Email</label>
							<input
								className="border w-full p-3 rounded-lg"
								name="email"
								type="email"
								id="email"
								placeholder="Email..."
								required
								onChange={(e) => setEmail(e.target.value)}
								onFocus={() => {
									setEmailExist(false);
									setInputRequired(false);
								}}
							/>
						</section>
						<section className="flex flex-col mb-3">
							<Label htmlFor="date" className="mb-1 font-normal">
								Tanggal Lahir
							</Label>
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										id="date"
										className="w-full justify-between font-normal"
									>
										{date ? date.toLocaleDateString() : "Pilih Tanggal"}
										<CalendarIcon />
									</Button>
								</PopoverTrigger>
								<PopoverContent
									className="w-auto overflow-hidden p-0"
									align="start"
								>
									<Calendar
										mode="single"
										selected={date}
										captionLayout="dropdown"
										required
										onSelect={(date) => {
											setDate(date);
											setOpen(false);
											setInputRequired(false);
										}}
										className="mx-auto"
									/>
								</PopoverContent>
							</Popover>
						</section>
						<section className="mb-6">
							<label htmlFor="password">Password</label>
							<input
								className="border w-full p-3 rounded-lg"
								name="password"
								type="password"
								id="password"
								placeholder="* * * * * * * * * *"
								required
								onChange={(e) => setPassword(e.target.value)}
								onFocus={() => {
									setEmailExist(false);
									setInputRequired(false);
								}}
							/>
						</section>
						{inputRequired === true ? (
							<p className="mb-6 ms-1 text-red-500 font-semibold">
								Nama, email, tanggal dan password harus diisi
							</p>
						) : (
							""
						)}
						{emailExist === true ? (
							<p className="mb-6 ms-1 text-red-500 font-semibold">
								Email sudah terdaftar
							</p>
						) : (
							""
						)}
						<section className="flex">
							<button
								type="button"
								className="cursor-pointer bg-black rounded-lg hover:bg-primary-dark w-full p-4 text-sm text-white uppercase font-bold tracking-wider"
								onClick={handleSubmit}
							>
								Daftar
							</button>
						</section>
					</form>

					{/* <section className="border-t px-24 py-6 flex justify-center">
						<a
							href="/"
							className="font-bold text-primary hover:text-primary-dark no-underline"
						>
							Already have an account?
						</a>
					</section> */}
				</section>
			</section>
		</>
	);
}
