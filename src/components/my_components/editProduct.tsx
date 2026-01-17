import { useState, useEffect } from "react";
import { apiUrl } from "@/lib/api";

import { GetCsrf } from "@/components/utils/csrf";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface EditProductData {
	pId?: number;
	pvId?: number;
	name?: string;
	description?: string;
	stock?: number;
	price?: number;
	discount?: number;
	minPurchase?: number;
	hasVariant?: boolean;
	isActive?: boolean;
	interval?: number;
	intervalId?: number;
}

interface EditProductDataSend {
	name?: string;
	description?: string;
	stock?: number;
	price?: number;
	discount?: number;
	min_purchase?: number;
	has_variant?: boolean;
	is_active?: boolean;
	interval?: number;
	i_id?: number;
}

interface EditProductProps {
	data: EditProductData;
}

export default function EditProduct({ data }: EditProductProps) {
	const [productChecker, setProductChecker] = useState<boolean>(false);
	const [productImages, setProductImages] = useState<File[]>();
	const [product, setProduct] = useState<EditProductDataSend>({
		name: data?.name,
		description: data?.description,
		stock: data?.stock,
		price: data?.price,
		discount: data?.discount,
		min_purchase: data?.minPurchase,
		has_variant: data?.hasVariant,
		is_active: data?.isActive,
		interval: data?.interval,
		i_id: data?.intervalId,
	});
	const [subscriptionStateName, setSubscriptionStateName] = useState<
		string | undefined
	>("");
	function validateProduct(product: EditProductDataSend): boolean {
		if (
			product.name !== "" &&
			product.description !== "" &&
			product.stock !== 0 &&
			product.price !== 0 &&
			product.min_purchase !== 0 &&
			product.interval !== 0 &&
			product.i_id !== 0
		) {
			return false;
		} else {
			return true;
		}
	}

	useEffect(() => {
		if (validateProduct(product)) {
			setProductChecker(false);
			return;
		}
		setProductChecker(true);
		return;
	}, [product]);

	useEffect(() => {
		switch (product.i_id) {
			case 1:
				setSubscriptionStateName("Hari");
				break;
			case 2:
				setSubscriptionStateName("Minggu");
				break;
			case 3:
				setSubscriptionStateName("Bulan");
				break;
			case 4:
				setSubscriptionStateName("Tahun");
				break;
			default:
				setSubscriptionStateName("");
		}
	}, []);

	const changeSubsState = (val: string) => {
		switch (Number(val)) {
			case 1:
				setSubscriptionStateName("Hari");
				break;
			case 2:
				setSubscriptionStateName("Minggu");
				break;
			case 3:
				setSubscriptionStateName("Bulan");
				break;
			case 4:
				setSubscriptionStateName("Tahun");
				break;
			default:
				setSubscriptionStateName("");
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const files = Array.from(e.target.files);
			setProductImages(files);
		}
	};

	useEffect(() => {
		console.log(product);
	}, [product]);

	useEffect(() => {
		console.log(productImages);
	}, [productImages]);

	const handleEditSubmit = async () => {
		if (!productChecker) {
			toast.warning("Semua form harus diisi dan tidak boleh 0 kecuali diskon");
			return;
		}
		const csrfToken = await GetCsrf();

		const payload = new FormData();
		payload.append("product", JSON.stringify(product));
		productImages?.forEach((file, idx) => {
			payload.append("images", file);
		});
		try {
			const send = await fetch(
				`${apiUrl}/api/v1/products/` +
					data?.pId +
					"/" +
					data.pvId +
					"?state=product",
				{
					method: "PATCH",
					headers: {
						"X-CSRF-TOKEN": csrfToken,
					},
					credentials: "include",
					body: payload,
				},
			);

			const result = await send.json();
			if (result.code === 200 && result.status === "ok") {
				window.location.reload();
			} else {
				toast.error(result.error);
				// setLoading(false);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			toast.error(errFetch);
		}
	};
	return (
		<>
			<section className="w-full">
				<section>
					<section className="py-3">
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
										value={product.name}
										onChange={(e) =>
											setProduct((prev) => ({
												...prev,
												name: e.target.value,
											}))
										}
										placeholder="Nama Produk..."
									/>
								</section>
								<section className="mb-3">
									<label htmlFor="deskripsi">Deskripsi</label>
									<textarea
										className="border w-full p-3 rounded-lg"
										id="deskripsi"
										name="deskripsi"
										value={product.description}
										onChange={(e) =>
											setProduct((prev) => ({
												...prev,
												description: e.target.value,
											}))
										}
										placeholder="Deskripsi"
										rows={8}
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
										accept="image/*"
										onChange={handleFileChange}
									/>
								</section>
								<section className="flex gap-3">
									{data?.hasVariant ? (
										<section className="mb-6">
											<section>
												<p>Opsi</p>
												<section className="flex gap-3 mt-5">
													<Label htmlFor="active">Aktifkan Produk</Label>
													<Switch
														id="active"
														checked={product.is_active}
														onCheckedChange={(value) =>
															setProduct((prev) => ({
																...prev,
																is_active: value,
															}))
														}
													/>
												</section>
											</section>
										</section>
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
														value={product.stock}
														onChange={(e) =>
															setProduct((prev) => ({
																...prev,
																stock: Number(e.target.value),
															}))
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
														value={product.price}
														onChange={(e) =>
															setProduct((prev) => ({
																...prev,
																price: Number(e.target.value),
															}))
														}
														placeholder="Harga..."
													/>
												</section>
												<section className="flex items-end gap-3">
													<section className="flex-1">
														<Label
															htmlFor="subscriptionInterval"
															className="mb-1 font-normal"
														>
															Jangka Langganan
														</Label>
														<input
															className="border w-full p-3 rounded-lg"
															name="subscriptionInterval"
															type="number"
															id="subscriptionInterval"
															value={product.interval}
															onChange={(e) =>
																setProduct((prev) => ({
																	...prev,
																	interval: Number(e.target.value),
																}))
															}
															placeholder="Jangka Langganan..."
														/>
													</section>
													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button
																variant="outline"
																className="cursor-pointer h-12.5"
															>
																{subscriptionStateName === ""
																	? "Pilihan"
																	: subscriptionStateName}
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent>
															<DropdownMenuLabel>
																Pilih Jangka Langganan
															</DropdownMenuLabel>
															<DropdownMenuSeparator />
															<DropdownMenuRadioGroup
																value={String(product.i_id) || ""}
																onValueChange={(value) => {
																	changeSubsState(value);
																	setProduct((prev) => ({
																		...prev,
																		i_id: Number(value),
																	}));
																}}
															>
																<DropdownMenuRadioItem value="1">
																	Hari
																</DropdownMenuRadioItem>
																<DropdownMenuRadioItem value="2">
																	Minggu
																</DropdownMenuRadioItem>
																<DropdownMenuRadioItem value="3">
																	Bulan
																</DropdownMenuRadioItem>
																<DropdownMenuRadioItem value="4">
																	Tahun
																</DropdownMenuRadioItem>
															</DropdownMenuRadioGroup>
														</DropdownMenuContent>
													</DropdownMenu>
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
														value={product.discount}
														onChange={(e) =>
															setProduct((prev) => ({
																...prev,
																discount: Number(e.target.value),
															}))
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
														value={product.min_purchase}
														onChange={(e) =>
															setProduct((prev) => ({
																...prev,
																min_purchase: Number(e.target.value),
															}))
														}
														placeholder="Minimum Pembelian..."
													/>
												</section>
												<section className="mb-6">
													<section>
														<p>Opsi</p>
														<section className="flex gap-3 mt-5">
															<Label htmlFor="active">Aktifkan Produk</Label>
															<Switch
																id="active"
																checked={product.is_active}
																onCheckedChange={(value) =>
																	setProduct((prev) => ({
																		...prev,
																		is_active: value,
																	}))
																}
															/>
														</section>
													</section>
												</section>
											</section>
										</>
									)}
								</section>
							</section>
						</section>
						<Button
							type="button"
							className="w-full cursor-pointer p-4 uppercase font-bold tracking-wider"
							onClick={handleEditSubmit}
						>
							Ubah
						</Button>
					</section>

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
