import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { CreateCsrf } from "../utils/csrf";

import { toast } from "sonner";

interface SignInProps {
	setOpenCloseDialog: React.Dispatch<React.SetStateAction<boolean>>;
	setOpenCloseDropDownMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function SignIn({
	setOpenCloseDialog,
	setOpenCloseDropDownMenu,
}: SignInProps) {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [notFound, setNotFound] = useState<boolean>();
	const [error, setError] = useState<string | null>(null);
	const [id, setId] = useState<string>("");
	const [ok, setOk] = useState<boolean>(false);

	const handleSubmit = async () => {
		const csrfToken = await CreateCsrf();

		const payload = {
			email: email,
			password: password,
		};

		try {
			const send = await fetch("http://localhost:8080/api/v1/auth/login", {
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
				setId(result.data.id);
				setOk(true);
			} else if (result.code === 401 && result.status === "error") {
				setError(result.error);
				setNotFound(true);
			} else if (result.code === 404 && result.status === "error") {
				setError(result.error);
				setNotFound(true);
			} else {
				setError(result.error);
				// setLoading(false);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			setError(errFetch);
			// setLoading(false);
		}
	};

	useEffect(() => {
		if (ok === true) {
			toast("Sign in berhasil");
			setOpenCloseDialog(false);
			setOpenCloseDropDownMenu(false);
			window.location.reload();
		}
	}, [ok]);
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
						Welcome back!
					</section>
					<section className="text-center mb-5 mt-3">
						Please enter your details to sign in.
					</section>
					<section className="bg-grey-lightest py-3">
						{/* {{ csrf_field() }} */}

						<section className="mb-3">
							<label htmlFor="email">E-Mail Address</label>
							<input
								className="border w-full p-3 rounded-lg"
								type="email"
								id="email"
								placeholder="E-Mail"
								onChange={(e) => setEmail(e.target.value)}
								onFocus={() => setNotFound(false)}
							/>
						</section>
						<section className={notFound === true ? "mb-6" : "mb-3"}>
							<label htmlFor="password">Password</label>
							<input
								className="border w-full p-3 rounded-lg"
								type="password"
								id="password"
								placeholder="* * * * * * * * * *"
								onChange={(e) => setPassword(e.target.value)}
								onFocus={() => setNotFound(false)}
							/>
						</section>
						{notFound === true ? (
							<p className="mb-6 ms-1 text-red-500 font-semibold">
								Email atau password salah
							</p>
						) : (
							""
						)}
						<section className="flex">
							<button
								type="button"
								className="cursor-pointer bg-black rounded-lg hover:bg-primary-dark w-full p-4 text-sm text-white uppercase font-bold tracking-wider"
								// onClick={() => {
								// 	isSignIn(1);
								// 	setOpenCloseDialog(false);
								// }}
								onClick={handleSubmit}
							>
								Masuk
							</button>
						</section>
					</section>

					<section className="border-t px-8 py-6">
						<section className="flex justify-center">
							{/* <a
								href="/signup"
								className="font-bold text-primary hover:text-primary-dark no-underline"
							>
								Don't have an account?
							</a>
							<p className="px-2">|</p> */}
							<a
								href="/forgotpw"
								className="text-grey-darkest hover:text-black no-underline"
							>
								Forgot Password?
							</a>
						</section>
					</section>
				</section>
			</section>
		</>
	);
}
