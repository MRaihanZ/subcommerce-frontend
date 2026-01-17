import { useState, useEffect } from "react";
import { apiUrl } from "@/lib/api";

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

interface EditProductVariantData {
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

interface ProductVariantsSend {
	i_id?: number;
	name?: string;
	interval?: number;
	stock?: number;
	price?: number;
	discount?: number;
	min_order?: number;
}

interface EditVariantsProps {
	setStateDialog: React.Dispatch<React.SetStateAction<boolean>>;
	data: EditProductVariantData;
}

export default function EditVariants({
	setStateDialog,
	data,
}: EditVariantsProps) {
	const [productVariant, setProductVariant] = useState<ProductVariantsSend>({
		i_id: data?.intervalId,
		name: data?.name,
		interval: data?.interval,
		stock: data?.stock,
		price: data?.price,
		discount: data?.discount,
		min_order: data?.minPurchase,
	});
	const [subscriptionStateName, setSubscriptionStateName] = useState<
		string | undefined
	>("");
	const [productChecker, setProductChecker] = useState<boolean>(false);

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

	function validateProduct(product: ProductVariantsSend): boolean {
		if (
			product.name !== "" &&
			product.stock !== 0 &&
			product.price !== 0 &&
			product.min_order !== 0 &&
			product.interval !== 0 &&
			product.i_id !== 0
		) {
			return false;
		} else {
			return true;
		}
	}

	useEffect(() => {
		if (validateProduct(productVariant)) {
			setProductChecker(false);
			return;
		}
		setProductChecker(true);
		return;
	}, [productVariant]);

	const handleEditSubmit = async () => {
		if (!productChecker) {
			toast.warning("Semua form harus diisi dan tidak boleh 0 kecuali diskon");
			return;
		}
		const csrfToken = await GetCsrf();

		try {
			const send = await fetch(
				`${apiUrl}/api/v1/products/` +
					data?.pId +
					"/" +
					data.pvId +
					"?state=variant",
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-TOKEN": csrfToken,
					},
					credentials: "include",
					body: JSON.stringify(productVariant),
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

	useEffect(() => {
		changeSubsState(String(productVariant.i_id));
		console.log(productVariant);
	}, [productVariant]);
	return (
		<>
			<section className="w-full">
				<section>
					<section className="py-3">
						<section className="flex items-center gap-3 mb-3">
							<section className="mb-3">
								<label htmlFor="variantName">Nama</label>
								<input
									className="border w-full p-3 rounded-lg"
									name="variantName"
									type="text"
									id="variantName"
									value={productVariant.name}
									onChange={(e) =>
										setProductVariant((prev) => ({
											...prev,
											name: e.target.value,
										}))
									}
									placeholder="Nama..."
								/>
							</section>
							<section className="mb-3">
								<label htmlFor="variantStock">Stok</label>
								<input
									className="border w-full p-3 rounded-lg"
									name="variantStock"
									type="number"
									id="variantStock"
									value={productVariant.stock}
									onChange={(e) =>
										setProductVariant((prev) => ({
											...prev,
											stock: Number(e.target.value),
										}))
									}
									placeholder="Stok..."
								/>
							</section>
							<section className="mb-3">
								<label htmlFor="variantPrice">Harga</label>
								<input
									className="border w-full p-3 rounded-lg"
									name="variantPrice"
									type="number"
									id="variantPrice"
									value={productVariant.price}
									onChange={(e) =>
										setProductVariant((prev) => ({
											...prev,
											price: Number(e.target.value),
										}))
									}
									placeholder="Harga..."
								/>
							</section>
							<section className="mb-3">
								<label htmlFor="variantDiscount">Diskon</label>
								<input
									className="border w-full p-3 rounded-lg"
									name="variantDiscount"
									type="number"
									id="variantDiscount"
									value={productVariant.discount}
									onChange={(e) =>
										setProductVariant((prev) => ({
											...prev,
											discount: Number(e.target.value),
										}))
									}
									placeholder="Diskon..."
								/>
							</section>
							<section className="mb-3">
								<label htmlFor="variantMinOrder">Minimum Order</label>
								<input
									className="border w-full p-3 rounded-lg"
									name="variantMinOrder"
									type="number"
									id="variantMinOrder"
									value={productVariant.min_order}
									onChange={(e) =>
										setProductVariant((prev) => ({
											...prev,
											min_order: Number(e.target.value),
										}))
									}
									placeholder="Minimum Order..."
								/>
							</section>
							<section className="mb-3">
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
										value={productVariant.interval}
										onChange={(e) =>
											setProductVariant((prev) => ({
												...prev,
												interval: Number(e.target.value),
											}))
										}
										placeholder="Jangka Langganan..."
									/>
								</section>
							</section>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										className="cursor-pointer h-12.5 w-15"
									>
										{subscriptionStateName === undefined
											? "Pilihan"
											: subscriptionStateName}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>Pilih Jangka Langganan</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuRadioGroup
										value={String(productVariant.i_id) || ""}
										onValueChange={(value) => {
											changeSubsState(value);
											setProductVariant((prev) => ({
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
					<Button
						type="button"
						className="w-full cursor-pointer p-4 uppercase font-bold tracking-wider"
						onClick={handleEditSubmit}
					>
						Ubah
					</Button>
				</section>
			</section>
		</>
	);
}
