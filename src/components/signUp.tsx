export default function SignUp() {
	return (
		<>
			<button
				className="btn"
				onClick={() => document.getElementById("modalSignUp").showModal()}
			>
				Daftar
			</button>
			<dialog id="modalSignUp" className="modal modal-bottom sm:modal-middle">
				<div className="modal-box bg-gradient-to-b from-[#edf2f4] from-10% via-white via-30% to-white to-60% ">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="cursor-pointer btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<section className="mx-auto max-w-md">
						{/* <!-- ... --> */}

						<section className="rounded-lg">
							<span className="flex justify-center pt-8">
								<img src="..." alt="Pertamina Logo" className="w-16" />
							</span>
							<section className="pt-8 font-bold text-black text-center text-xl tracking-widest uppercase">
								Welcome!
							</section>
							<section className="text-center mb-5 mt-3">
								Please enter your details to sign up.
							</section>
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
									<button className="cursor-pointer bg-black rounded-lg hover:bg-primary-dark w-full p-4 text-sm text-white uppercase font-bold tracking-wider">
										Sign up
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
				</div>
				<form method="dialog" className="modal-backdrop">
					<button className="!cursor-default">close</button>
				</form>
			</dialog>
		</>
	);
}
