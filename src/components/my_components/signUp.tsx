// import { useNavigate } from "react-router";

export default function SignUp() {
	// const navigate = useNavigate();
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
						Welcome!
					</section>
					<section className="text-center mb-5 mt-3">
						Please enter your details to sign up.
					</section>
					{/* <section className="flex justify-center">
						<button
							type="button"
							className="flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-3 mx-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-apple"
								viewBox="0 0 16 16"
							>
								<path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
								<path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
							</svg>
						</button>
						<button
							type="button"
							className="flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-3 mx-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-google"
								viewBox="0 0 16 16"
							>
								<path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
							</svg>
						</button>
						<button
							type="button"
							className="flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-3 mx-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
						>
							<svg
								className="w-4 h-4 me-2"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 17"
							>
								<path
									fill-rule="evenodd"
									d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					</section> */}
					{/* <section className="text-center mt-4 flex items-center">
						<section className="border-t border-4 border-gray-400 flex-grow mr-3"></section>
						<p>OR</p>
						<section className="ml-3 border-t border-4 border-gray-400 flex-grow"></section>
					</section> */}

					<form className="bg-grey-lightest py-3">
						{/* {{ csrf_field() }} */}
						<section className="mb-3">
							<label htmlFor="name">Full Name</label>
							<input
								className="border w-full p-3 rounded-lg"
								name="name"
								type="text"
								id="name"
								placeholder="Enter your full name..."
							/>
						</section>
						<section className="mb-3">
							<label htmlFor="email">E-Mail Address</label>
							<input
								className="border w-full p-3 rounded-lg"
								name="email"
								type="text"
								id="email"
								placeholder="Enter your E-Mail..."
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
							/>
						</section>
						<section className="flex">
							<button
								// type="button"
								className="cursor-pointer bg-black rounded-lg hover:bg-primary-dark w-full p-4 text-sm text-white uppercase font-bold tracking-wider"
								// onClick={() => navigate("/")}
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
