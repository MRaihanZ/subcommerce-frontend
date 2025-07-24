import { useState } from "react";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface EditProductProps {
	name: string;
	description: string;
	stock?: number;
	price?: number;
	discount?: number;
	minPurchase?: number;
	hasVariant?: boolean;
	isActive?: boolean;
}

export default function EditProduct({
	name,
	description,
	stock,
	price,
	discount,
	minPurchase,
	hasVariant,
	isActive,
}: EditProductProps) {
	const [nameValue, setNameValue] = useState(name);
	const [descriptionValue, setDescriptionValue] = useState(description);
	const [stockValue, setStockValue] = useState(stock);
	const [priceValue, setPriceValue] = useState(price);
	const [discountValue, setDiscountValue] = useState(discount);
	const [minPurchaseValue, setMinPurchaseValue] = useState(minPurchase);
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
										value={nameValue}
										onChange={(e) => setNameValue(e.target.value)}
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
										value={descriptionValue}
										onChange={(e) => setDescriptionValue(e.target.value)}
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
									{hasVariant ? (
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
														value={stockValue}
														onChange={(e) =>
															setStockValue(Number(e.target.value))
														}
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
														value={priceValue}
														onChange={(e) =>
															setPriceValue(Number(e.target.value))
														}
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
														value={discountValue}
														onChange={(e) =>
															setDiscountValue(Number(e.target.value))
														}
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
														value={minPurchaseValue}
														onChange={(e) =>
															setMinPurchaseValue(Number(e.target.value))
														}
														placeholder="Minimum Pembelian..."
													/>
												</section>
											</section>
										</>
									)}
								</section>
							</section>
						</section>
						{hasVariant ? (
							""
						) : (
							<section className="mb-6">
								<section>
									<p>Opsi</p>
									<section className="flex gap-3 mt-5">
										<Label htmlFor="active">Aktifkan Produk</Label>
										<Switch id="active" checked={isActive} />
									</section>
								</section>
							</section>
						)}
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
