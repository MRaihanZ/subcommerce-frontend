import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "@/lib/api";

import { GetCsrf } from "@/components/utils/csrf";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import CartItem from "@/components/my_components/cartItem";
import { toast } from "sonner";
interface CartProduct {
	s_name: string;
	p_id: number;
	p_name: string;
	img: string;
	active: boolean;
	pv_id: number;
	pv_name: string;
	interval: number;
	price: number;
	discount: number;
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

export default function Cart() {
	const [products, setProducts] = useState<CartProduct[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>();

	const navigate = useNavigate();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await fetch(`${apiUrl}/api/v1/carts/`, {
					credentials: "include",
				});
				const json = await res.json();
				if (json.code === 200 && json.status === "ok") {
					setProducts(json.data);
					setLoading(false);
				} else {
					setError(json.error);
					setLoading(false);
				}
			} catch (err) {
				const errFetch = "Network Error: " + err;
				setError(errFetch);
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	const [allCheck, setAllCheck] = useState<boolean>(false);
	const [checkState, setCheckState] = useState<string>("parent");
	const [totalPrice, setTotalPrice] = useState<number[]>([]);
	const [countTotal, setCountTotal] = useState<number>(0);
	const [formatedTotalPrice, setFormatedTotalPrice] = useState<string>();

	useEffect(() => {
		if (products !== null) {
			if (totalPrice.length === products.length) {
				const total = totalPrice.reduce((total, val) => total + val, 0);
				setCountTotal(total);
			}
		}
	}, [products, totalPrice]);

	useEffect(() => {
		if (products !== null) {
			const formatted = new Intl.NumberFormat("id-ID").format(countTotal);
			setFormatedTotalPrice(formatted);
		}
	}, [products, totalPrice, countTotal]);

	const deleteCarts = async () => {
		const csrfToken = await GetCsrf();
		try {
			const res = await fetch(`${apiUrl}/api/v1/carts/`, {
				method: "DELETE",
				headers: {
					"X-CSRF-TOKEN": csrfToken,
				},
				credentials: "include",
			});
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				toast(json.data + " produk dihapus");
				setProducts(null);
			} else {
				toast(json.error);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			toast("Fail. " + errFetch);
		}
	};

	const handleDeleteState = (deleteProd: number, deleteProdVar: number) => {
		if (!products) return;

		const filtered = products.filter((p) => p.p_id === deleteProd);
		const secondFiltered = filtered.find((p) => p.pv_id === deleteProdVar);

		if (!secondFiltered) return;
		toast(
			"produk " +
				secondFiltered.p_name +
				" - " +
				secondFiltered.pv_name +
				" dihapus dari cart",
		);

		const updated = products.filter(
			(p) =>
				!(p.p_id === secondFiltered.p_id && p.pv_id === secondFiltered.pv_id),
		);

		setProducts(updated);
	};

	const [checkoutProducts, setCheckoutProducts] = useState<CheckoutProduct[]>(
		[],
	);

	const handleCheckoutSubmit = async () => {
		if (checkoutProducts.length === 0) {
			toast.warning("Pilih produk terlebih dahulu");
			return;
		}
		const csrfToken = await GetCsrf();

		try {
			const send = await fetch(`${apiUrl}/api/v1/orders/checkouts?state=cart`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-TOKEN": csrfToken,
				},
				credentials: "include",
				body: JSON.stringify(checkoutProducts),
			});

			const result = await send.json();
			if (result.code === 200 && result.status === "ok") {
				navigate("/checkout");
			} else {
				toast.error(result.error);
				setError(result.error);
				// setLoading(false);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			setError(errFetch);
		}
	};

	if (loading) return <p>Loading...</p>;
	if (error) {
		return <p>{error}</p>;
	}
	if (!products) return <p>No item found</p>;
	return (
		<>
			<section className="grid grid-cols-12">
				<section className="col-span-12 lg:col-span-6 lg:col-start-2 lg:mb-5">
					<p className="font-semibold text-3xl">Keranjang</p>
					<section className="mt-5">
						<section className="flex justify-between items-center  ms-3 mb-3">
							<section className="flex">
								<Checkbox
									className="border-black"
									id="allItem"
									checked={allCheck}
									onCheckedChange={(checked) => {
										const value = checked === true;
										setCheckState("parent");
										setAllCheck(value);
									}}
								/>
								<Label htmlFor="allItem" className="ms-3">
									Pilih Semua
								</Label>
							</section>
							<Button
								variant="outline"
								className="w-fit cursor-pointer hover:bg-red-600 px-3"
								onClick={deleteCarts}
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
								Hapus Semua
							</Button>
						</section>
						<section className="">
							{products.map((prod, index) => (
								<CartItem
									key={index}
									index={index}
									data={prod}
									checkoutData={checkoutProducts}
									checkoutDataFunc={setCheckoutProducts}
									totalFunc={setTotalPrice}
									allCheck={allCheck}
									allCheckFunc={setAllCheck}
									actionState={checkState}
									actionStateFunc={setCheckState}
									deleteStateFunc={handleDeleteState}
								/>
							))}
						</section>
					</section>
				</section>
				<section className="col-span-12 lg:col-span-4 ms-3 mb-5 lg:ms-5 mt-5 lg:mt-28">
					<section className="py-7 px-5 bottom-0 bg-white border rounded-md">
						<section className="mb-5">
							<p className="font-semibold text-xl pb-5">Ringkasan Belanja</p>
							<Separator />
						</section>
						<section className="flex justify-between mb-5">
							<p className="font-bold text-xl">Total</p>
							<p className="font-bold text-xl">Rp{formatedTotalPrice}</p>
						</section>
						<Button
							className="bg-green-600 hover:bg-green-800 w-full cursor-pointer"
							onClick={handleCheckoutSubmit}
						>
							Beli
						</Button>
					</section>
				</section>
			</section>
		</>
	);
}
