export default function SellerRegistration() {
	return (
		<>
			<section className="mx-auto max-w-md">
				<section className="flex flex-col h-screen justify-center">
					<section className="bg-gradient-to-b from-[#edf2f4] from-10% via-white via-30% to-white to-60% rounded-lg shadow p-5">
						<span className="flex justify-center pt-8">
							{/* <img src="..." alt="Logo" className="w-16" /> */}
							<p className="text-2xl font-bold">SubCommerce</p>
						</span>
						<section className="pt-8 font-bold text-black text-center text-xl tracking-widest uppercase">
							Selamat Datang!
						</section>
						<section className="text-center mb-5 mt-3">
							Isi form dibawah ini untuk menjadi penjual
						</section>
						<form className="bg-grey-lightest py-3">
							{/* {{ csrf_field() }} */}
							<section className="mb-3">
								<label htmlFor="name">Nama Toko</label>
								<input
									className="border w-full p-3 rounded-lg"
									name="name"
									type="text"
									id="name"
									placeholder="Masukkan nama toko..."
								/>
							</section>
							<section className="mb-3">
								<label htmlFor="alamat">Alamat Toko</label>
								<input
									className="border w-full p-3 rounded-lg"
									name="alamat"
									type="text"
									id="alamat"
									placeholder="Masukkan alamat toko..."
								/>
							</section>
							<section className="flex">
								<button
									type="button"
									className="cursor-pointer bg-black rounded-lg hover:bg-primary-dark w-full p-4 text-sm text-white uppercase font-bold tracking-wider"
									// onClick={() => {
									// 	isSignUp(1);
									// 	setOpenCloseDialog(false);
									// }}
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
			</section>
		</>
	);
}
