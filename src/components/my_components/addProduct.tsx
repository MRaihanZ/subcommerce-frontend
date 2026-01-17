import { useState, useEffect } from "react";

import { apiUrl } from "@/lib/api";

import { GetCsrf } from "@/components/utils/csrf";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface ReqProductVariants {
	i_id: number;
	is_default: boolean;
	name: string;
	interval: number;
	stock: number;
	price: number;
	discount: number;
	min_order: number;
}

interface ReqProductAdd {
	name: string;
	description: string;
	active: boolean;
	p_variants: ReqProductVariants[];
}

interface variantProps {
	index: number;
	total: number;
	onAdd: () => void;
	onDelete: () => void;
	product: ReqProductAdd;
	setProduct: React.Dispatch<React.SetStateAction<ReqProductAdd>>;
	subscriptionName: string[];
	setSubscriptionName: React.Dispatch<React.SetStateAction<string[]>>;
	setProductChecker: React.Dispatch<React.SetStateAction<boolean[]>>;
}

function Variant({
	index,
	total,
	onAdd,
	onDelete,
	product,
	setProduct,
	subscriptionName,
	setSubscriptionName,
	setProductChecker,
}: variantProps) {
	const [firstLoad, setFirstLoad] = useState(true);

	const handleVariantChange = (
		index: number,
		field: keyof ReqProductVariants,
		value: string | number | boolean,
	) => {
		setProduct((prev) => ({
			...prev!,
			p_variants: prev!.p_variants.map((variant, i) =>
				i === index ? { ...variant, [field]: value } : variant,
			),
		}));
	};

	const handleChangeSubscription = (index: number, val: number) => {
		switch (Number(val)) {
			case 1:
				setSubscriptionName((prev) => {
					const update = [...prev];
					update[index] = "Hari";
					return update;
				});
				break;
			case 2:
				setSubscriptionName((prev) => {
					const update = [...prev];
					update[index] = "Minggu";
					return update;
				});
				break;
			case 3:
				setSubscriptionName((prev) => {
					const update = [...prev];
					update[index] = "Bulan";
					return update;
				});
				break;
			case 4:
				setSubscriptionName((prev) => {
					const update = [...prev];
					update[index] = "Tahun";
					return update;
				});
				break;
			default:
				setSubscriptionName((prev) => {
					const update = [...prev];
					update[index] = "";
					return update;
				});
		}
	};

	function validateProductVariants(
		productVariants: ReqProductVariants[],
		idx: number,
	): boolean {
		if (
			productVariants[idx].name !== "" &&
			productVariants[idx].i_id !== 0 &&
			productVariants[idx].stock !== 0 &&
			productVariants[idx].price !== 0 &&
			productVariants[idx].min_order !== 0 &&
			productVariants[idx].interval !== 0
		) {
			return false;
		} else {
			return true;
		}
	}

	useEffect(() => {
		if (!firstLoad) {
			if (validateProductVariants(product.p_variants, index)) {
				setProductChecker((prev) => {
					const update = [...prev];
					update[index] = false;
					return update;
				});
				return;
			}
			setProductChecker((prev) => {
				const update = [...prev];
				update[index] = true;
				return update;
			});
			return;
		} else {
			setFirstLoad(false);
		}
	}, [firstLoad, product.p_variants]);
	return (
		<>
			<section className="flex items-center gap-3 mb-3">
				<section className="mb-3">
					<label htmlFor={"variantName" + index}>Nama</label>
					<input
						className="border w-full p-3 rounded-lg"
						name={"variantName" + index}
						type="text"
						id={"variantName" + index}
						value={product?.p_variants[index]?.name || ""}
						onChange={(e) => handleVariantChange(index, "name", e.target.value)}
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
						value={product?.p_variants[index]?.stock || ""}
						onChange={(e) =>
							handleVariantChange(index, "stock", Number(e.target.value))
						}
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
						value={product?.p_variants[index]?.price || ""}
						onChange={(e) =>
							handleVariantChange(index, "price", Number(e.target.value))
						}
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
						value={product?.p_variants[index]?.discount || ""}
						onChange={(e) =>
							handleVariantChange(index, "discount", Number(e.target.value))
						}
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
						value={product?.p_variants[index]?.min_order || ""}
						onChange={(e) =>
							handleVariantChange(index, "min_order", Number(e.target.value))
						}
						placeholder="Minimum Order..."
					/>
				</section>
				<section className="mb-3">
					<section className="flex-1">
						<Label htmlFor="subscriptionInterval" className="mb-1 font-normal">
							Jangka Langganan
						</Label>
						<input
							className="border w-full p-3 rounded-lg"
							name="subscriptionInterval"
							type="number"
							id="subscriptionInterval"
							value={product?.p_variants[index]?.interval || ""}
							onChange={(e) =>
								handleVariantChange(index, "interval", Number(e.target.value))
							}
							placeholder="Jangka Langganan..."
						/>
					</section>
				</section>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="cursor-pointer h-12.5 w-15">
							{subscriptionName[index] === ""
								? "Pilihan"
								: subscriptionName[index]}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Pilih Jangka Langganan</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuRadioGroup
							value={String(product?.p_variants[index]?.i_id || "")}
							onValueChange={(val) => {
								handleChangeSubscription(index, Number(val));
								handleVariantChange(index, "i_id", Number(val));
							}}
						>
							<DropdownMenuRadioItem value="1">Hari</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="2">Minggu</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="3">Bulan</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="4">Tahun</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>

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
						{index !== 0 ? (
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
						) : (
							""
						)}
					</>
				)}
			</section>
		</>
	);
}

export default function AddProduct() {
	const [subscriptionStateNameArr, setSubscriptionStateNameArr] = useState<
		string[]
	>([""]);
	const [subscriptionStateName, setSubscriptionStateName] =
		useState<string>("");
	const [isActive, setIsActive] = useState(false);
	const [variantOption, setVariantOption] = useState(false);
	const [variantComponents, setVariantComponents] = useState([0]);

	const [productChecker, setProductChecker] = useState<boolean>(false);
	const [productVariantChecker, setProductVariantChecker] = useState<boolean[]>(
		[],
	);
	const defaultProduct: ReqProductAdd = {
		name: "",
		description: "",
		active: false,
		p_images: [],
		p_variants: [
			{
				i_id: 0,
				is_default: true,
				name: "default",
				interval: 0,
				stock: 0,
				price: 0,
				discount: 0,
				min_order: 0,
			},
		],
	};
	const [product, setProduct] = useState<ReqProductAdd>(defaultProduct);
	const [productImages, setProductImages] = useState<File[]>();

	const handleVariantChange = (
		index: number,
		field: keyof ReqProductVariants,
		value: string | number | boolean,
	) => {
		setProduct((prev) => ({
			...prev!,
			p_variants: prev!.p_variants.map((variant, i) =>
				i === index ? { ...variant, [field]: value } : variant,
			),
		}));
	};

	useEffect(() => {
		if (!variantOption) {
			setProduct((prev) => {
				if (!prev) return prev;
				return {
					...prev,
					p_variants: [
						{
							i_id: 0,
							is_default: true,
							name: "",
							interval: 0,
							stock: 0,
							price: 0,
							discount: 0,
							min_order: 0,
						},
					],
				};
			});
			setSubscriptionStateNameArr([""]);
			handleVariantChange(0, "is_default", true);
			handleVariantChange(0, "name", "default");
			setProductVariantChecker([]);
		} else {
			setVariantComponents([0]);
			setSubscriptionStateName("");
			setProduct((prev) => {
				if (!prev) return prev;
				return {
					...prev,
					p_variants: [
						{
							i_id: 0,
							is_default: false,
							name: "",
							interval: 0,
							stock: 0,
							price: 0,
							discount: 0,
							min_order: 0,
						},
					],
				};
			});
			setProductVariantChecker((prev) => {
				const updated = [...prev];
				updated.push(false);
				return updated;
			});
		}
	}, [variantOption]);

	useEffect(() => {
		setProduct((prev) => ({ ...prev, active: isActive }));
	}, [isActive]);

	const addComponent = () => {
		setVariantComponents((prev) => [...prev, prev.length]);
		setSubscriptionStateNameArr((prev) => {
			const updated = [...prev];
			updated.push("");
			return updated;
		});
		setProduct((prev) => {
			if (!prev) return prev;
			return {
				...prev,
				p_variants: [
					...prev.p_variants,
					{
						i_id: 0,
						is_default: false,
						name: "",
						interval: 0,
						stock: 0,
						price: 0,
						discount: 0,
						min_order: 0,
					},
				],
			};
		});
		setProductVariantChecker((prev) => {
			const updated = [...prev];
			updated.push(false);
			return updated;
		});
	};

	const deleteFirstComponent = () => {
		setVariantComponents((prev) => {
			const updated = [...prev];
			updated.pop();
			return updated;
		});
		setSubscriptionStateNameArr((prev) => {
			const updated = [...prev];
			updated.pop();
			return updated;
		});
		setProduct((prev) => {
			if (!prev) return prev;
			if (prev.p_variants.length === 0) return prev;

			const newVariants = [...prev.p_variants];
			newVariants.pop();

			return {
				...prev,
				p_variants: newVariants,
			};
		});
		setProductVariantChecker((prev) => {
			const updated = [...prev];
			updated.pop();
			return updated;
		});
	};

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

	function validateProduct(product: ReqProductAdd): boolean {
		if (product.name !== "" && product.description !== "") {
			return false;
		} else {
			return true;
		}
	}

	function validateProductVariantsDefault(
		productVariants: ReqProductVariants[],
	): boolean {
		if (
			productVariants[0].name !== "" &&
			productVariants[0].i_id !== 0 &&
			productVariants[0].stock !== 0 &&
			productVariants[0].price !== 0 &&
			productVariants[0].min_order !== 0 &&
			productVariants[0].interval !== 0
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
		if (!variantOption) {
			if (validateProductVariantsDefault(product.p_variants)) {
				setProductChecker(false);
				return;
			}
		}
		setProductChecker(true);
		return;
	}, [product, variantOption]);

	useEffect(() => {
		console.log(product);
		console.log(variantOption);
	}, [product, variantOption]);
	// useEffect(() => {
	// 	console.log(productChecker);
	// 	console.log(productVariantChecker);
	// }, [productChecker, productVariantChecker]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const files = Array.from(e.target.files);
			setProductImages(files);
		}
	};

	const handleAddSubmit = async () => {
		if (!productChecker) {
			toast.warning("Semua form harus diisi dan tidak boleh 0 kecuali diskon");
			return;
		}
		if (!productImages || productImages.length === 0) {
			toast.warning("gambar product harus dipilih");
			return;
		}
		for (let i = 0; i < productVariantChecker.length; i++) {
			if (!productVariantChecker[i]) {
				toast.warning(
					"Semua form harus diisi dan tidak boleh 0 kecuali diskon",
				);
				return;
			}
		}
		const csrfToken = await GetCsrf();

		const payload = new FormData();
		payload.append("product", JSON.stringify(product));
		productImages?.forEach((file, idx) => {
			payload.append("images", file);
		});
		try {
			const send = await fetch(`${apiUrl}/api/v1/products/`, {
				method: "POST",
				headers: {
					"X-CSRF-TOKEN": csrfToken,
				},
				credentials: "include",
				body: payload,
			});

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
										placeholder="Deskripsi"
										value={product.description}
										onChange={(e) =>
											setProduct((prev) => ({
												...prev,
												description: e.target.value,
											}))
										}
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
														value={product?.p_variants[0]?.stock || ""}
														onChange={(e) =>
															handleVariantChange(
																0,
																"stock",
																Number(e.target.value),
															)
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
														value={product?.p_variants[0]?.price || ""}
														onChange={(e) =>
															handleVariantChange(
																0,
																"price",
																Number(e.target.value),
															)
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
															value={product?.p_variants[0]?.interval || ""}
															onChange={(e) =>
																handleVariantChange(
																	0,
																	"interval",
																	Number(e.target.value),
																)
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
																value={
																	String(product?.p_variants[0]?.i_id) || ""
																}
																onValueChange={(value) => {
																	changeSubsState(value);
																	handleVariantChange(0, "i_id", Number(value));
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
														value={product?.p_variants[0]?.discount || ""}
														onChange={(e) =>
															handleVariantChange(
																0,
																"discount",
																Number(e.target.value),
															)
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
														value={product?.p_variants[0]?.min_order || ""}
														onChange={(e) =>
															handleVariantChange(
																0,
																"min_order",
																Number(e.target.value),
															)
														}
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
													<Switch
														id="active"
														checked={isActive}
														onCheckedChange={setIsActive}
													/>
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
								<p>Opsi</p>
								<section className="flex gap-3 mt-5">
									<Label htmlFor="active">Aktifkan Produk</Label>
									<Switch
										id="active"
										checked={isActive}
										onCheckedChange={setIsActive}
									/>
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
						)}
						{variantOption ? (
							<p className="font-semibold text-xl mb-1">Varian</p>
						) : (
							""
						)}
						{variantOption
							? variantComponents.map((_, index) => (
									<Variant
										key={index}
										index={index}
										total={variantComponents.length}
										onAdd={addComponent}
										onDelete={deleteFirstComponent}
										product={product}
										setProduct={setProduct}
										subscriptionName={subscriptionStateNameArr}
										setSubscriptionName={setSubscriptionStateNameArr}
										setProductChecker={setProductVariantChecker}
									/>
								))
							: ""}
						<Button
							type="button"
							className="w-full cursor-pointer p-4 uppercase font-bold tracking-wider"
							onClick={handleAddSubmit}
						>
							Tambah
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
