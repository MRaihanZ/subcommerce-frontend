import { useState, useEffect, useRef } from "react";

import { GetCsrf } from "@/components/utils/csrf";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
// import { Separator } from "@/components/ui/separator";

interface CartProducts {
	s_name: string;
	p_id: number;
	p_name: string;
	img: string;
	active: boolean;
	pv_id: number;
	pv_name: string;
	interval: number;
	price: number;
	min_order: number;
	stock: number;
	i_name: string;
	quantity: number;
}

interface CheckoutProduct {
	p_id: number;
	pv_id: number;
	quantity: number;
	unit_price: number;
	total_price: number;
}

interface CartItemProps {
	index: number;
	data: CartProducts;
	checkoutData: CheckoutProduct[];
	checkoutDataFunc: React.Dispatch<React.SetStateAction<CheckoutProduct[]>>;
	totalFunc: React.Dispatch<React.SetStateAction<number[]>>;
	allCheck: boolean;
	allCheckFunc: React.Dispatch<React.SetStateAction<boolean>>;
	actionState: string;
	actionStateFunc: React.Dispatch<React.SetStateAction<string>>;
	deleteStateFunc: (deleteProd: number, deleteProdVar: number) => void;
}

export default function CartItem({
	index,
	data,
	checkoutData,
	checkoutDataFunc,
	totalFunc,
	allCheck,
	allCheckFunc,
	actionState,
	actionStateFunc,
	deleteStateFunc,
}: CartItemProps) {
	const [localCheck, setLocalCheck] = useState(false);
	const [quantity, setQuantity] = useState<number>(data.quantity);
	const [price, setPrice] = useState(data.price);
	const [formatedPrice, setFormatedPrice] = useState<string>();
	const deleteProd = data.p_id;
	const deleteProdVar = data.pv_id;

	useEffect(() => {
		if (allCheck === true) {
			setLocalCheck(true);
		} else {
			if (actionState === "parent") setLocalCheck(false);
		}
	}, [allCheck, actionState]);

	useEffect(() => {
		if (data !== null) {
			if (quantity < data.min_order) {
				setQuantity(data.min_order);
			}
			if (quantity > data.stock) {
				setQuantity(data.stock);
			}
			setPrice(quantity * data.price);
			const formatted = new Intl.NumberFormat("id-ID").format(price);
			setFormatedPrice(formatted);
		}
	}, [data, quantity, price]);

	useEffect(() => {
		if (localCheck === true) {
			totalFunc((prev) => {
				const newArray = [...prev];
				newArray[index] = price;
				return newArray;
			});
			checkoutDataFunc((prev) => {
				return [
					...prev,
					{
						p_id: data.p_id,
						pv_id: data.pv_id,
						quantity,
						unit_price: data.price,
						total_price: price,
					},
				];
			});
		} else {
			totalFunc((prev) => {
				const newArray = [...prev];
				newArray[index] = 0;
				return newArray;
			});
			// change this function from adding item to the array to delete the item in array
			checkoutDataFunc((prev) =>
				prev.filter(
					(data) => data.p_id !== deleteProd && data.pv_id !== deleteProdVar
				)
			);
		}
	}, [price, localCheck]);

	const deleteCart = async () => {
		const csrfToken = await GetCsrf();
		try {
			const res = await fetch(
				"http://localhost:8080/api/v1/carts/product/" +
					deleteProd +
					"/" +
					deleteProdVar,
				{
					method: "DELETE",
					headers: {
						"X-CSRF-TOKEN": csrfToken,
					},
					credentials: "include",
				}
			);
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				deleteStateFunc(json.data.p_id, json.data.pv_id);
			} else {
				toast(json.error);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			toast("Fail. " + errFetch);
		}
	};

	const isFirstRender = useRef(true);
	const isQuantityFirstSet = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		if (isQuantityFirstSet.current) {
			isQuantityFirstSet.current = false;
			return;
		}

		const timeoutId = setTimeout(() => {
			updateCart();
		}, 1000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [quantity]);

	const updateCart = async () => {
		const payload = {
			p_id: data.p_id,
			pv_id: data.pv_id,
			quantity: quantity,
		};

		const csrfToken = await GetCsrf();
		try {
			const res = await fetch("http://localhost:8080/api/v1/carts/", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-TOKEN": csrfToken,
				},
				credentials: "include",
				body: JSON.stringify(payload),
			});
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				toast(
					"Kuantitas produk " +
						data.p_name +
						" - " +
						data.pv_name +
						" berhasil diubah "
				);
			} else {
				toast("Kuantitas gagal diubah. Error: ", json.error);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			toast("Fail. " + errFetch);
		}
	};
	return (
		<>
			<section className="ms-3 mt-5 py-5 px-5 border rounded-md">
				<section className="flex items-center ms-6">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="currentColor"
					>
						<path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
					</svg>
					<p className="ms-3 font-semibold">{data.s_name}</p>
				</section>
				<section className="flex">
					<section className="flex-none my-auto">
						<Checkbox
							className="border-black"
							checked={localCheck}
							onCheckedChange={(checked) => {
								if (checked === true) {
									setLocalCheck(true);
								} else {
									actionStateFunc("child");
									setLocalCheck(false);
									allCheckFunc(false);
								}
							}}
						/>
					</section>
					<section className="flex-none my-auto">
						<img src={data.img} alt="" className="w-40 h-40 ms-5" />
					</section>
					<section className="flex-auto ms-5">
						<p className="my-3 text-lg">
							{data.p_name}
							{data.pv_name === "default" ? "" : " - " + data.pv_name}
						</p>
						{data.pv_name === "default" ? (
							""
						) : (
							<p>
								Varian:
								<Badge variant="outline" className="mx-1">
									{data.pv_name}
								</Badge>
							</p>
						)}
						<p>
							Periode:
							<Badge variant="outline" className="mx-1">
								{data.interval + " " + data.i_name}
							</Badge>
						</p>
						<section className="flex w-full max-w-25 items-center my-3 relative">
							{quantity === data.min_order ? (
								""
							) : (
								<Button
									variant="outline"
									size="icon"
									className="size-8 absolute start-1 border-0 cursor-pointer rounded-2xl"
									onClick={() => setQuantity(quantity - 1)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 -960 960 960"
										width="24px"
										fill="currentColor"
									>
										<path d="M200-440v-80h560v80H200Z" />
									</svg>
								</Button>
							)}
							<Input
								type="number"
								value={quantity}
								onChange={(e) => setQuantity(Number(e.target.value))}
								className="text-center rounded-2xl !ps-6.5"
							/>
							{quantity === data.stock ? (
								""
							) : (
								<Button
									variant="outline"
									size="icon"
									className="size-8 absolute end-1 border-0 cursor-pointer rounded-2xl"
									onClick={() => setQuantity(quantity + 1)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 -960 960 960"
										width="24px"
										fill="currentColor"
									>
										<path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
									</svg>
								</Button>
							)}
						</section>
						<section className="flex justify-between">
							<p>Harga: Rp{formatedPrice}</p>
							<Button
								variant="outline"
								size="icon"
								className="size-8 cursor-pointer hover:bg-red-600"
								onClick={deleteCart}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
								</svg>
							</Button>
						</section>
					</section>
				</section>
			</section>
		</>
	);
}
