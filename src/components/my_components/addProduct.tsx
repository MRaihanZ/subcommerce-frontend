import { useState } from "react";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface variantProps {
	index: number;
	total: number;
	onAdd: () => void;
	onDelete: () => void;
}

function Variant({ index, total, onAdd, onDelete }: variantProps) {
	return (
		<>
			{total > 1 && index === 0 && (
				<p className="font-semibold text-xl mb-1">Varian</p>
			)}
			<section className="flex items-center gap-3 mb-3">
				<section className="mb-3">
					<label htmlFor={"variantName" + index}>Nama</label>
					<input
						className="border w-full p-3 rounded-lg"
						name={"variantName" + index}
						type="text"
						id={"variantName" + index}
						placeholder="Nama..."
					/>
				</section>
				<section className="mb-3">
					<label htmlFor={"variantStock" + index}>Stok</label>
					<input
						className="border w-full p-3 rounded-lg"
						name={"variantStock" + index}
						type="number"
						id={"variantStock" + index}
						placeholder="Stok..."
					/>
				</section>
				<section className="mb-3">
					<label htmlFor={"variantPrice" + index}>Harga</label>
					<input
						className="border w-full p-3 rounded-lg"
						name={"variantPrice" + index}
						type="number"
						id={"variantPrice" + index}
						placeholder="Harga..."
					/>
				</section>
				<section className="mb-3">
					<label htmlFor={"variantDiscount" + index}>Diskon</label>
					<input
						className="border w-full p-3 rounded-lg"
						name={"variantDiscount" + index}
						type="number"
						id={"variantDiscount" + index}
						placeholder="Diskon..."
					/>
				</section>
				<section className="mb-3">
					<label htmlFor={"variantMinOrder" + index}>Minimum Order</label>
					<input
						className="border w-full p-3 rounded-lg"
						name={"variantMinOrder" + index}
						type="number"
						id={"variantMinOrder" + index}
						placeholder="Minimum Order..."
					/>
				</section>

				{index === total - 1 && (
					<>
						<Button
							type="button"
							className="cursor-pointer p-4"
							onClick={onAdd}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24px"
								viewBox="0 -960 960 960"
								width="24px"
								fill="#e3e3e3"
							>
								<path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
							</svg>
						</Button>
						<Button
							type="button"
							className="cursor-pointer p-4"
							onClick={onDelete}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24px"
								viewBox="0 -960 960 960"
								width="24px"
								fill="#e3e3e3"
							>
								<path d="M200-440v-80h560v80H200Z" />
							</svg>
						</Button>
					</>
				)}
			</section>
		</>
	);
}

export default function AddProduct() {
	const [variantOption, setVariantOption] = useState(false);
	const [variantComponents, setVariantComponents] = useState([0]);
	const addComponent = () => {
		setVariantComponents((prev) => [...prev, prev.length]);
	};

	const deleteFirstComponent = () => {
		setVariantComponents((prev) => prev.slice(1));
	};
	return (
		<>
			<section className="w-full">
				<section>
					<form className="py-3">
						{/* {{ csrf_field() }} */}
						<section className="flex gap-5">
							<section className="flex-1">
								<section className="mb-3">
									<label htmlFor="name">Nama Produk</label>
									<input
										className="border w-full p-3 rounded-lg"
										name="name"
										type="text"
										id="name"
										placeholder="Nama Produk..."
									/>
								</section>
								<section className="mb-3">
									<label htmlFor="deskripsi">Deskripsi</label>
									{/* <input
									className="border w-full p-3 rounded-lg"
									name="deskripsi"
									type="text"
									id="deskripsi"
									placeholder="Deskripsi..."
								/> */}
									<textarea
										className="border w-full p-3 rounded-lg"
										id="deskripsi"
										name="deskripsi"
										placeholder="Deskripsi"
										rows={4}
										cols={50}
									></textarea>
								</section>
							</section>
							<section className="flex-1">
								<section className="flex flex-col mb-3">
									<section className="flex">
										<Label htmlFor="picture" className="mb-1 font-normal">
											Gambar
										</Label>
										<Tooltip>
											<TooltipTrigger className="align-top ms-1">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													height="16px"
													viewBox="0 -960 960 960"
													width="16px"
													fill="currentColor"
												>
													<path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
												</svg>
											</TooltipTrigger>
											<TooltipContent>
												<p>pilih 1 atau lebih dari 1 gambar</p>
											</TooltipContent>
										</Tooltip>
									</section>
									<input
										className="border w-full p-3 rounded-lg"
										id="picture"
										type="file"
										name="picture"
										multiple
									/>
								</section>
								<section className="flex gap-3">
									{variantOption ? (
										""
									) : (
										<>
											<section className="w-full">
												<section className="mb-3">
													<label htmlFor="stok">Stok</label>
													<input
														className="border w-full p-3 rounded-lg"
														name="stok"
														type="number"
														id="stok"
														placeholder="Stok..."
													/>
												</section>
												<section className="mb-3">
													<label htmlFor="harga">Harga</label>
													<input
														className="border w-full p-3 rounded-lg"
														name="harga"
														type="number"
														id="harga"
														placeholder="Harga..."
													/>
												</section>
											</section>
											<section className="w-full">
												<section className="mb-3">
													<label htmlFor="diskon">Diskon</label>
													<input
														className="border w-full p-3 rounded-lg"
														name="diskon"
														type="number"
														id="diskon"
														placeholder="Diskon..."
													/>
												</section>
												<section className="mb-3">
													<label htmlFor="minOrder">Minimum Pembelian</label>
													<input
														className="border w-full p-3 rounded-lg"
														name="minOrder"
														type="number"
														id="minOrder"
														placeholder="Minimum Pembelian..."
													/>
												</section>
											</section>
										</>
									)}
									{variantOption ? (
										<section className="">
											<section>
												<p>Opsi</p>
												<section className="flex gap-3 mt-5">
													<Label htmlFor="active">Aktifkan Produk</Label>
													<Switch id="active" />
												</section>
												<section className="flex gap-3 mt-5">
													<Label htmlFor="variant_option">
														Tambahkan Variasi Produk
													</Label>
													<Switch
														id="variant_option"
														checked={variantOption}
														onCheckedChange={setVariantOption}
													/>
												</section>
											</section>
										</section>
									) : (
										""
									)}
								</section>
							</section>
						</section>
						{variantOption ? (
							""
						) : (
							<section className="mb-6">
								<section>
									<p>Opsi</p>
									<section className="flex gap-3 mt-5">
										<Label htmlFor="active">Aktifkan Produk</Label>
										<Switch id="active" />
									</section>
									<section className="flex gap-3 mt-5">
										<Label htmlFor="variant_option">
											Tambahkan Variasi Produk
										</Label>
										<Switch
											id="variant_option"
											checked={variantOption}
											onCheckedChange={setVariantOption}
										/>
									</section>
								</section>
							</section>
						)}
						{variantOption
							? variantComponents.map((_, index) => (
									<Variant
										key={index}
										index={index}
										total={variantComponents.length}
										onAdd={addComponent}
										onDelete={deleteFirstComponent}
									/>
							  ))
							: ""}
						<Button
							type="button"
							className="w-full cursor-pointer p-4 uppercase font-bold tracking-wider"
							// onClick={() => {
							// 	isSignUp(1);
							// 	setOpenCloseDialog(false);
							// }}
						>
							Tambah
						</Button>
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
