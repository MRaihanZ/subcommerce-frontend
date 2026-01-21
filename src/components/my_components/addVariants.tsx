import { useState, useEffect } from "react";
import { apiUrl } from "@/lib/importEnv";

import { GetCsrf } from "@/components/utils/csrf";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface VariantsData {
	pId: number;
	pvId: number;
	hasVariant: boolean;
}

interface AddVariantsProps {
	data: VariantsData;
}

interface ProductVariants {
	i_id: number;
	is_default: boolean;
	name: string;
	interval: number;
	stock: number;
	price: number;
	discount: number;
	min_order: number;
}

interface variantProps {
	index: number;
	total: number;
	onAdd: () => void;
	onDelete: () => void;
	productVariants: ProductVariants[];
	setProductVariants: React.Dispatch<React.SetStateAction<ProductVariants[]>>;
	subscriptionName: string[];
	setSubscriptionName: React.Dispatch<React.SetStateAction<string[]>>;
	setProductChecker: React.Dispatch<React.SetStateAction<boolean[]>>;
}

function Variants({
	index,
	total,
	onAdd,
	onDelete,
	productVariants,
	setProductVariants,
	subscriptionName,
	setSubscriptionName,
	setProductChecker,
}: variantProps) {
	const handleVariantChange = (
		index: number,
		field: keyof ProductVariants,
		value: string | number | boolean,
	) => {
		setProductVariants((prev) =>
			prev.map((variant, i) =>
				i === index ? { ...variant, [field]: value } : variant,
			),
		);
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
		productVariants: ProductVariants[],
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
		// if (!firstLoad) {
		if (validateProductVariants(productVariants, index)) {
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
		// } else {
		// 	setFirstLoad(false);
		// }
	}, [productVariants]);
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
						value={productVariants[index].name}
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
						value={productVariants[index].stock || ""}
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
						value={productVariants[index].price || ""}
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
						value={productVariants[index].discount || ""}
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
						value={productVariants[index].min_order || ""}
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
							value={productVariants[index].interval || ""}
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
							value={String(productVariants[index].i_id || "")}
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

export default function AddVariants({ data }: AddVariantsProps) {
	const [subscriptionStateNameArr, setSubscriptionStateNameArr] = useState<
		string[]
	>([""]);
	const [variantComponents, setVariantComponents] = useState([0]);
	const [productVariantChecker, setProductVariantChecker] = useState<boolean[]>(
		[false],
	);
	const [productVariants, setProductVariants] = useState<ProductVariants[]>([
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
	]);

	const addComponent = () => {
		setVariantComponents((prev) => [...prev, prev.length]);
		setSubscriptionStateNameArr((prev) => {
			const updated = [...prev];
			updated.push("");
			return updated;
		});
		setProductVariants((prev) => [
			...prev,
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
		]);
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
		setProductVariants((prev) => {
			if (prev.length === 0) return prev;

			const newVariants = [...prev];
			newVariants.pop();

			return newVariants;
		});
		setProductVariantChecker((prev) => {
			const updated = [...prev];
			updated.pop();
			return updated;
		});
	};

	// useEffect(() => {
	// 	console.log(productVariants);
	// 	console.log(variantComponents);
	// }, [productVariants, variantComponents]);
	// useEffect(() => {
	// 	console.log(subscriptionStateNameArr);
	// 	console.log(productVariantChecker);
	// }, [subscriptionStateNameArr, productVariantChecker]);

	const handleAddSubmit = async () => {
		for (let i = 0; i < productVariantChecker.length; i++) {
			if (!productVariantChecker[i]) {
				toast.warning(
					"Semua form harus diisi dan tidak boleh 0 kecuali diskon",
				);
				return;
			}
		}
		const csrfToken = await GetCsrf();

		try {
			const send = await fetch(
				`${apiUrl}/api/v1/products/` + data.pId + "/" + data.pvId,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-TOKEN": csrfToken,
					},
					credentials: "include",
					body: JSON.stringify(productVariants),
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
						<p className="font-semibold text-xl mb-1">Varian</p>
						{variantComponents.map((_, index) => (
							<Variants
								key={index}
								index={index}
								total={variantComponents.length}
								onAdd={addComponent}
								onDelete={deleteFirstComponent}
								productVariants={productVariants}
								setProductVariants={setProductVariants}
								subscriptionName={subscriptionStateNameArr}
								setSubscriptionName={setSubscriptionStateNameArr}
								setProductChecker={setProductVariantChecker}
							/>
						))}
						<Button
							type="button"
							className="w-full cursor-pointer p-4 uppercase font-bold tracking-wider"
							onClick={handleAddSubmit}
						>
							Tambah
						</Button>
					</section>
				</section>
			</section>
		</>
	);
}
