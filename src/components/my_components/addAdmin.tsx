import { useState } from "react";

import { CreateCsrf } from "../utils/csrf";

import { toast } from "sonner";

export default function AddAdmin() {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string | null>(null);
	const [inputRequired, setInputRequired] = useState(false);
	const [emailExist, setEmailExist] = useState<boolean>();

	const handleSubmit = async () => {
		if (name === "") {
			setInputRequired(true);
			return;
		} else if (email === "") {
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
			password: password,
		};

		try {
			const send = await fetch("http://localhost:8080/api/v1/admins/", {
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
				toast("Berhasil menambahkan admin baru");
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
			<section>
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
							Submit
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
		</>
	);
}
