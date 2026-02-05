import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router";
import { apiUrl } from "@/lib/importEnv";

import { useGlobalData } from "@/contexts/GlobalDataContext";

import Comment from "@/components/my_components/comment";
import { GetCsrf } from "@/components/utils/csrf";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// ProductImage
interface ProductImage {
	img: string;
}

// ProductVariant
interface ProductVariant {
	pv_id: number;
	is_default: boolean;
	pv_name: string;
	code: string;
	i_name: string;
	interval: number;
	stock: number;
	pv_sold: number;
	price: number;
	discount: number;
	min_order: number;
}

// Item
interface ProductDetail {
	p_id: number;
	p_name: string;
	images: ProductImage[];
	description: string;
	sold: number;
	average_rating: number;
	rating_count: number;
	created_at: string;
	product_variants: ProductVariant[];
}

interface SellerSummarize {
	id: string;
	name: string;
	img: string;
	address: string;
	total_sold_products: number;
	average_rating: number;
}

interface Rating {
	average_rating: number;
	rating_count: number;
}

export default function DetailItem() {
	// const selectedLength = Array(rawData.variantTitle.length).fill("");
	const [variantState, setVariantState] = useState("");
	const [quantity, setQuantity] = useState<number>(0);
	const [basePrice, setBasePrice] = useState<number>(0);
	const [price, setPrice] = useState<number>(0);
	const [formatedPrice, setFormatedPrice] = useState<string>("");
	const [formatedDiscontPrice, setFormatedDiscontPrice] = useState<string>("");
	const [productVariantId, setProductVariantId] = useState<number | null>(null);
	const [productVariantIdx, setProductVariantIdx] = useState<number>(0);

	const navigate = useNavigate();
	const locate = useLocation();

	const [product, setProduct] = useState<ProductDetail | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>();
	const [searchParams] = useSearchParams();

	const { data, setGlobalToast } = useGlobalData();

	const prodParam = searchParams.get("product");
	const prodVarParam = searchParams.get("variant");

	const [seller, setSeller] = useState<SellerSummarize | null>(null);
	const [rating, setRating] = useState<Rating | null>(null);

	useEffect(() => {
		// Products
		const prodNumParam = Number(prodParam);
		if (Number.isNaN(prodNumParam)) {
			setGlobalToast("Terjadi kesalahan pada query produk");
			navigate("/");
			return;
		}
		const fetchProduct = async () => {
			try {
				const res = await fetch(`${apiUrl}/api/v1/products/` + prodParam);
				const json = await res.json();
				if (json.code === 200 && json.status === "ok") {
					setProduct(json.data);
					setProductVariantId(json.data.product_variants[0].pv_id);
					setProductVariantIdx(0);
					setVariantState(json.data.product_variants[0].pv_name);
					setPrice(json.data.product_variants[0].price);
					setQuantity(json.data.product_variants[0].min_order);
					setLoading(false);
				} else {
					toast.error(json.error);
					setError(json.error);
					setLoading(false);
				}
			} catch (err) {
				const errFetch = "Network Error: " + err;
				toast.error(errFetch);
				setError(errFetch);
				setLoading(false);
			}
		};
		fetchProduct();

		// seller
		const fetchSeller = async () => {
			try {
				const res = await fetch(
					`${apiUrl}/api/v1/sellers/summarize/` + prodParam,
				);
				const json = await res.json();
				if (json.code === 200 && json.status === "ok") {
					setSeller(json.data);
					setLoading(false);
				} else {
					toast.error(json.error);
					setError(json.error);
					setLoading(false);
				}
			} catch (err) {
				const errFetch = "Network Error: " + err;
				toast.error(errFetch);
				setError(errFetch);
				setLoading(false);
			}
		};
		fetchSeller();

		// rating
		const fetchRating = async () => {
			try {
				const res = await fetch(`${apiUrl}/api/v1/ratings/` + prodParam);
				const json = await res.json();
				if (json.code === 200 && json.status === "ok") {
					setRating(json.data);
					setLoading(false);
				} else {
					toast.error(json.error);
					setError(json.error);
					setLoading(false);
				}
			} catch (err) {
				const errFetch = "Network Error: " + err;
				toast.error(errFetch);
				setError(errFetch);
				setLoading(false);
			}
		};
		fetchRating();
	}, [prodParam]);

	useEffect(() => {
		if (product !== null) {
			const prodVarNumParam = Number(prodVarParam);
			if (Number.isNaN(prodVarNumParam)) {
				navigate(
					"/detail?product=" +
						product.p_id +
						"&variant=" +
						product.product_variants[0].pv_id,
				);
			}
			for (let i = 0; i < product.product_variants.length; i++) {
				if (product.product_variants[i].pv_id === prodVarNumParam) {
					setProductVariantId(product.product_variants[i].pv_id);
					setProductVariantIdx(i);
					setVariantState(product.product_variants[i].pv_name);
					break;
				}
				if (i + 1 === product.product_variants.length) {
					navigate(
						"/detail?product=" +
							product.p_id +
							"&variant=" +
							product.product_variants[0].pv_id,
					);
				}
			}
		}
	}, [product, prodVarParam]);

	useEffect(() => {
		if (product !== null) {
			if (quantity < product.product_variants[productVariantIdx].min_order) {
				setQuantity(product.product_variants[productVariantIdx].min_order);
			}
			if (quantity > product.product_variants[productVariantIdx].stock) {
				setQuantity(product.product_variants[productVariantIdx].stock);
			}
			if (product.product_variants[productVariantIdx].discount > 0) {
				const formattedDiscount = new Intl.NumberFormat("id-ID").format(
					Math.floor(
						price -
							(price * product.product_variants[productVariantIdx].discount) /
								100,
					),
				);
				setFormatedDiscontPrice(formattedDiscount);
			}
			const formatted = new Intl.NumberFormat("id-ID").format(price);
			setFormatedPrice(formatted);
			setPrice(quantity * product.product_variants[productVariantIdx].price);
			setBasePrice(product.product_variants[productVariantIdx].price);
		}
	}, [quantity, price, productVariantIdx]);

	const handleCheckoutSubmit = async () => {
		if (data?.code !== 200) return;
		const csrfToken = await GetCsrf();

		const payload = {
			p_id: Number(prodParam),
			pv_id: productVariantId,
			quantity: quantity,
			unit_price: Math.floor(
				basePrice -
					(basePrice * product!.product_variants[productVariantIdx].discount) /
						100,
			),
			total_price: Math.floor(
				price -
					(price * product!.product_variants[productVariantIdx].discount) / 100,
			),
		};

		try {
			const send = await fetch(
				`${apiUrl}/api/v1/orders/checkouts?state=direct`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-TOKEN": csrfToken,
					},
					credentials: "include",
					body: JSON.stringify([payload]),
				},
			);

			const result = await send.json();
			if (result.code === 200 && result.status === "ok") {
				navigate("/checkout");
			} else {
				toast.error(result.error);
				// setLoading(false);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			setError(errFetch);
		}
	};

	const handleCartSubmit = async () => {
		if (data?.code !== 200) return;
		const csrfToken = await GetCsrf();

		const payload = {
			p_id: Number(prodParam),
			pv_id: productVariantId,
			quantity: quantity,
		};

		try {
			const send = await fetch(`${apiUrl}/api/v1/carts/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-TOKEN": csrfToken,
				},
				credentials: "include",
				body: JSON.stringify(payload),
			});

			const result = await send.json();
			if (result.code === 200 && result.status === "ok") {
				toast.success("Berhasil menambahkan barang");
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
	if (!product) return <p>No item found</p>;
	return (
		<>
			<section className="grid grid-cols-12 justify-items-center-safe mt-7">
				<section className="col-span-3 col-start-2 w-full">
					<Carousel className="border rounded-md py-3">
						<CarouselContent>
							{product.images.map((image, index) => (
								<CarouselItem key={index} className="flex justify-center">
									<img src={image.img} alt="Testing" />
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
					<section className="mt-5 border rounded-md px-10 py-3">
						<section className="flex items-center ">
							<Avatar>
								<AvatarImage src={seller?.img} />
								<AvatarFallback>Image Profile Seller</AvatarFallback>
							</Avatar>
							<p className="ms-3 font-bold text-xl">{seller?.name}</p>
						</section>
						<section className="flex justify-between my-3 ms-11">
							<section className="flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
								</svg>
								<p className="ms-2">
									{seller?.total_sold_products} Barang Terjual
								</p>
							</section>
							<p>⭐ {Math.floor(seller?.average_rating * 10) / 10}</p>
						</section>
						<Separator />
						<section className="flex justify-between mt-3">
							<Button
								variant="outline"
								className="cursor-pointer"
								onClick={() => {
									navigate("/chat?seller=" + seller?.id);
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M880-80 720-240H320q-33 0-56.5-23.5T240-320v-40h440q33 0 56.5-23.5T760-440v-280h40q33 0 56.5 23.5T880-640v560ZM160-473l47-47h393v-280H160v327ZM80-280v-520q0-33 23.5-56.5T160-880h440q33 0 56.5 23.5T680-800v280q0 33-23.5 56.5T600-440H240L80-280Zm80-240v-280 280Z" />
								</svg>
								Chat
							</Button>
							<Button
								variant="outline"
								className="cursor-pointer"
								onClick={() => {
									navigator.clipboard
										.writeText(window.location.href)
										.then(() => {
											toast("Link disalin ke clipboard");
										})
										.catch((err) => alert("Failed to copy. Error: " + err));
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z" />
								</svg>
								Share
							</Button>
						</section>
					</section>
				</section>
				<section className="col-span-6 col-start-6 w-full">
					<section className="px-3 py-3">
						<section className="pb-3">
							<p className="text-justify font-semibold text-xl">
								{product.p_name}{" "}
								{product.product_variants[productVariantIdx].pv_name ===
								"default"
									? ""
									: " - " + product.product_variants[productVariantIdx].pv_name}
							</p>
							<section className="flex justify-between mt-3">
								<section className="flex items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 -960 960 960"
										width="24px"
										fill="currentColor"
									>
										<path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
									</svg>
									<p className="ms-2">
										{product.sold}/
										{product.product_variants[productVariantIdx].pv_sold}
										terjual
									</p>
								</section>
								<p>⭐ {Math.floor(product.average_rating * 10) / 10}</p>
							</section>
						</section>
						<Separator />
						{product.product_variants[0].is_default === false ? (
							<>
								<section className="my-3">
									<p className="text-sm font-medium capitalize mb-2">
										Varian:{" "}
									</p>
									<section className="flex gap-2 flex-wrap">
										{product.product_variants.map((pv, idx) => (
											<Button
												key={idx}
												variant={
													variantState === pv.pv_name ? "default" : "outline"
												}
												onClick={() => {
													navigate(
														locate.pathname +
															"?product=" +
															product.p_id +
															"&variant=" +
															pv.pv_id,
													);
												}}
												className="cursor-pointer"
											>
												{pv.pv_name}
											</Button>
										))}
									</section>
								</section>
								<Separator />
							</>
						) : (
							""
						)}
						<section className="py-7 bottom-0">
							<section className="flex items-center mb-5">
								<section className="flex w-full max-w-25 items-center relative">
									{quantity ===
									product.product_variants[productVariantIdx].min_order ? (
										""
									) : (
										<Button
											variant="outline"
											size="icon"
											className="size-8 absolute start-1 border-0 cursor-pointer rounded-2xl"
											onClick={() => {
												if (quantity === null) {
													setQuantity(0);
												} else {
													setQuantity(quantity - 1);
												}
											}}
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
										type="text"
										value={quantity}
										onChange={(e) => setQuantity(Number(e.target.value))}
										className="text-center rounded-2xl"
									/>
									{quantity ===
									product.product_variants[productVariantIdx].stock ? (
										""
									) : (
										<Button
											variant="outline"
											size="icon"
											className="size-8 absolute end-1 border-0 cursor-pointer rounded-2xl"
											onClick={() => {
												if (quantity === null) {
													setQuantity(0);
												} else {
													setQuantity(quantity + 1);
												}
											}}
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
								<p className="ms-5">
									Tersedia: {product.product_variants[productVariantIdx].stock}
								</p>
							</section>
							<section className="mb-3">
								{variantState === "default" ? (
									""
								) : (
									<p>
										Varian:{" "}
										<Badge variant="outline" className="mx-1">
											{variantState}
										</Badge>
									</p>
								)}
								<p>
									Periode:{" "}
									<Badge variant="outline" className="mx-1">
										{product.product_variants[productVariantIdx].interval +
											" " +
											product.product_variants[productVariantIdx].i_name}
									</Badge>
								</p>
							</section>
							<section className="flex justify-between mb-5">
								<p className="font-bold text-xl">Total</p>
								<section>
									{product.product_variants[productVariantIdx].discount ===
									0 ? (
										<p className="text-xl font-bold">{formatedPrice}</p>
									) : (
										<>
											<p className="text-xl font-bold">
												Rp
												{formatedDiscontPrice}
											</p>
											<section className="flex items-center">
												<p className="text-sm font-normal line-through">
													Rp{formatedPrice}
												</p>
												<p className="text-sm font-bold text-red-500 ms-3">
													{product.product_variants[productVariantIdx].discount}
													%
												</p>
											</section>
										</>
									)}
								</section>
							</section>
							<section className="flex gap-5">
								<Button
									className="bg-green-600 hover:bg-green-800 mb-5 w-full cursor-pointer flex-1"
									onClick={handleCheckoutSubmit}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 -960 960 960"
										width="24px"
										fill="currentColor"
									>
										<path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z" />
									</svg>
									Beli
								</Button>
								<Button
									className="bg-blue-600 hover:bg-blue-800 w-full cursor-pointer flex-1"
									onClick={handleCartSubmit}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 -960 960 960"
										width="24px"
										fill="currentColor"
									>
										<path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
									</svg>
									Tambah Keranjang
								</Button>
							</section>
						</section>
						<Separator />
						<section className="mt-3">
							<p className="mb-3 font-semibold text-xl">Deskripsi: </p>
							<p className="mb-3">
								Min. Pemesanan:
								<Badge variant="outline" className="mx-1">
									{product.product_variants[productVariantIdx].min_order}
								</Badge>
							</p>
							<p className="text-justify">{product.description}</p>
						</section>
					</section>
				</section>
			</section>
			<section className="grid grid-cols-12 mt-5">
				<section className="col-span-2 col-start-2">
					<section className="flex justify-center gap-3 border rounded-md px-7 py-5">
						<section>
							<p className="font-semibold text-3xl">
								⭐ {Math.floor(rating?.average_rating * 10) / 10}
								<sub className="text-base"> / 5.0</sub>
							</p>
							<section className="flex ms-1.5 mt-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
								</svg>
								<p className="ms-3">{rating?.rating_count} Pembeli</p>
							</section>
						</section>
					</section>
				</section>
				<section className="col-span-8 col-start-4 ms-5">
					<section className="border rounded-md p-5">
						<p className="mb-5 text-xl font-semibold">Ulasan Pembeli</p>
						<Comment prodId={prodParam} />
					</section>
				</section>
			</section>
		</>
	);
}
