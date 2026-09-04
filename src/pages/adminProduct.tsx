import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "@/lib/importEnv";

import { GetCsrf } from "@/components/utils/csrf";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	// TableFooter,
} from "@/components/ui/table";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	// CarouselNext,
	// CarouselPrevious,
} from "@/components/ui/carousel";
import {
	Dialog,
	// DialogClose,
	DialogContent,
	DialogDescription,
	// DialogFooter,
	DialogHeader,
	DialogTitle,
	// DialogTrigger,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import AddProductAdmin from "@/components/my_components/addProductAdmin";
import EditProduct from "@/components/my_components/editProduct";
import DeleteProductAdmin from "@/components/my_components/deleteProductAdmin";
import AddVariants from "@/components/my_components/addVariants";
import EditVariants from "@/components/my_components/editVariants";
import DeleteVariantAdmin from "@/components/my_components/deleteVariantAdmin";

interface ProductImages {
	img: string;
}

// ProductVariant
interface ProductVariants {
	pv_id: number;
	is_default: boolean;
	pv_name: string;
	i_id: number;
	i_name: string;
	interval: number;
	stock: number;
	pv_sold: number;
	price: number;
	discount: number;
	min_order: number;
}

// Item
interface ProductsDetail {
	p_id: number;
	p_name: string;
	images: ProductImages[];
	description: string;
	sold: number;
	average_rating: number;
	active: boolean;
	product_variants: ProductVariants[];
}

interface ProductVariantsEdit {
	p_id: number;
	pv_id: number;
	i_id: number;
	is_default: boolean;
	name: string;
	interval: number;
	stock: number;
	price: number;
	discount: number;
	min_order: number;
}

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

export default function AdminProduct() {
	const navigate = useNavigate();
	const [openDialog, setOpenDialog] = useState(false);
	const [openDialogAction, setOpenDialogAction] =
		useState<string>("addProduct");
	const [productSelected, setProductSelected] = useState<EditProductData>();
	const [variantSelected, setVariantSelected] = useState<number>(0);

	const [products, setProducts] = useState<ProductsDetail[] | null>(null);
	const [search, setSearch] = useState<string>("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>();
	const [notFound, setNotFound] = useState<boolean>(false);
	const [activeProduct, setActiveProduct] = useState<boolean[]>([]);

	const updateActiveProduct = (index: number) => {
		setActiveProduct((prev) =>
			prev.map((val, i) => (i === index ? !val : val)),
		);
	};

	const fetchProducts = async () => {
		try {
			const res = await fetch(`${apiUrl}/api/v1/admins/products`, {
				credentials: "include",
			});
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				setProducts(json.data);
				setActiveProduct(
					json.data.map((activate: { active: boolean }) => activate.active),
				);
				setLoading(false);
			} else if (json.code === 404 && json.status === "error") {
				setNotFound(true);
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

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProduct = async () => {
		try {
			const res = await fetch(`${apiUrl}/api/v1/admins/products/` + search, {
				credentials: "include",
			});
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				setProducts(json.data);
				setActiveProduct(
					json.data.map((activate: { active: boolean }) => activate.active),
				);
				setLoading(false);
			} else if (json.code === 404 && json.status === "error") {
				setNotFound(true);
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

	const handleSearch = () => {
		if (search !== "") {
			fetchProduct();
		} else {
			fetchProducts();
		}
	};

	useEffect(() => {
		if (search === "") {
			fetchProducts();
		}
	}, [search]);

	const fetchUpdateActiveProduct = async (pId: number, active: boolean) => {
		const csrfToken = await GetCsrf();
		try {
			const res = await fetch(
				`${apiUrl}/api/v1/admins/products/` + pId + "/" + active,
				{
					method: "PATCH",
					headers: {
						"X-CSRF-TOKEN": csrfToken,
					},
					credentials: "include",
				},
			);
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				toast("Produk berhasil diupdate");
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

	const handleUpdateActiveProduct = (pId: number, active: boolean) => {
		fetchUpdateActiveProduct(pId, active);
	};

	if (loading) return <p>Loading...</p>;
	if (error) {
		return <p>{error}</p>;
	}
	const childComponentsDialog = (key: string) => {
		switch (key) {
			case "addProduct":
				return (
					<>
						<DialogHeader>
							<DialogTitle>Tambah Produk</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<AddProductAdmin />
					</>
				);
			case "editProduct":
				return (
					<>
						<DialogHeader>
							<DialogTitle>Ubah Produk</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<EditProduct data={productSelected} />
					</>
				);
			case "deleteProduct":
				return (
					<>
						<DialogHeader>
							<DialogTitle>Konfirmasi Hapus Produk</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<DeleteProductAdmin
							setStateDialog={setOpenDialog}
							data={productSelected}
						/>
					</>
				);
			case "addVariant":
				return (
					<>
						<DialogHeader>
							<DialogTitle>Tambah Varian</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<AddVariants data={productSelected} />
					</>
				);
			case "editVariant":
				return (
					<>
						<DialogHeader>
							<DialogTitle>Ubah Varian</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<EditVariants
							setStateDialog={setOpenDialog}
							data={productSelected}
						/>
					</>
				);
			case "deleteVariant":
				return (
					<>
						<DialogHeader>
							<DialogTitle>Konfirmasi Hapus Varian Produk</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<DeleteVariantAdmin
							setStateDialog={setOpenDialog}
							data={productSelected}
						/>
					</>
				);
		}
	};
	return (
		<>
			<section className="my-7">
				<section className="flex justify-between mb-3">
					<section className="w-full flex-1 flex max-w-3xs sm:max-w-2xs md:max-w-xs lg:max-w-sm items-center justify-center">
						<Input
							id="search"
							type="text"
							placeholder="..."
							onChange={(e) => setSearch(e.target.value)}
							className="rounded-r-none border-l-1 border-t-1 border-r-0 border-b-1"
						/>
						<Button
							type="submit"
							variant="outline"
							onClick={() => handleSearch()}
							className="rounded-l-none border-l-1 border-t-1 border-r-1 border-b-1 cursor-pointer"
						>
							Cari
						</Button>
					</section>
				</section>
				<Table>
					<TableCaption>Produk</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Image</TableHead>
							<TableHead>Nama</TableHead>
							<TableHead>Deskripsi</TableHead>
							<TableHead>Rata-Rata Rating</TableHead>
							<TableHead>Terjual</TableHead>
							<TableHead className="text-center">Aktif</TableHead>
							<TableHead className="text-center">Aksi</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{notFound ? (
							<TableRow>
								<TableCell colSpan={7} className="text-center font-medium">
									Tidak ada produk
								</TableCell>
							</TableRow>
						) : (
							products.map((product, index) => (
								<TableRow key={product.p_id}>
									<TableCell className="w-40">
										<Carousel>
											<CarouselContent>
												{product.images.map((image, index) => (
													<CarouselItem
														key={index}
														className="flex justify-center"
													>
														<img
															src={image.img}
															alt={product.p_name + " product image"}
														/>
													</CarouselItem>
												))}
											</CarouselContent>
										</Carousel>
									</TableCell>
									<TableCell>{product.p_name}</TableCell>
									<TableCell>
										<p className="max-w-30 truncate">{product.description}</p>
									</TableCell>
									<TableCell>
										{Math.floor(product.average_rating * 10) / 10}
									</TableCell>
									<TableCell>{product.sold}</TableCell>
									{/* <TableCell className="text-center">
									<section className="flex justify-center">
										<p className="mx-2">❌</p>
										<Switch
											disabled
											checked={activeProduct[index]}
											onCheckedChange={() => {
												updateActiveProduct(index);
											}}
										/>
										<p className="mx-2">✅</p>
									</section>
								</TableCell> */}
									<TableCell className="text-center">
										<section className="flex justify-center">
											<p className="mx-2">❌</p>
											<Switch
												checked={activeProduct[index]}
												onCheckedChange={() => {
													updateActiveProduct(index);
													handleUpdateActiveProduct(
														product.p_id,
														!activeProduct[index],
													);
												}}
											/>
											<p className="mx-2">✅</p>
										</section>
									</TableCell>
									<TableCell className="flex flex-col justify-center flex-wrap items-center gap-3 py-5">
										{/* <Button
										variant="outline"
										className="cursor-pointer w-full"
										onClick={() => {
											setProductSelected({
												pId: product.p_id,
												pvId: product.product_variants[0].pv_id,
												name: product.p_name,
												description: product.description,
												stock: product.product_variants[0].stock,
												price: product.product_variants[0].price,
												discount: product.product_variants[0].discount,
												minPurchase: product.product_variants[0].min_order,
												hasVariant:
													product.product_variants[0].is_default == false
														? true
														: false,
												isActive: product.active,
												interval: product.product_variants[0].interval,
												intervalId: product.product_variants[0].i_id,
											});
											setOpenDialog(true);
											setOpenDialogAction("editProduct");
										}}
									>
										Ubah Produk
									</Button> */}
										<Button
											className="cursor-pointer w-full"
											variant="destructive"
											onClick={() => {
												setProductSelected({
													pId: product.p_id,
													pvId: product.product_variants[0].pv_id,
												});
												setOpenDialog(true);
												setOpenDialogAction("deleteProduct");
											}}
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
											Hapus Produk
										</Button>
										{/* <Button
										variant="outline"
										className="cursor-pointer w-full"
										onClick={() => {
											setProductSelected({
												pId: product.p_id,
												pvId: product.product_variants[0].pv_id,
												hasVariant:
													product.product_variants[0].is_default == false
														? true
														: false,
											});
											setOpenDialog(true);
											setOpenDialogAction("addVariant");
										}}
									>
										Tambah Varian
									</Button> */}
										{/* {product.product_variants[0].is_default == false ? (
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="outline"
													className="cursor-pointer w-full"
												>
													Ubah Varian
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent>
												<DropdownMenuLabel>Pilih Variant</DropdownMenuLabel>
												<DropdownMenuSeparator />
												{product.product_variants.map((pv) => (
													<DropdownMenuItem className="p-0" key={pv.pv_id}>
														<Button
															variant="outline"
															className="cursor-pointer w-full border-0 shadow-none"
															onClick={() => {
																setProductSelected({
																	pId: product.p_id,
																	pvId: pv.pv_id,
																	name: pv.pv_name,
																	stock: pv.stock,
																	price: pv.price,
																	discount: pv.discount,
																	minPurchase: pv.min_order,
																	hasVariant:
																		product.product_variants[0].is_default ==
																		false
																			? true
																			: false,
																	isActive: product.active,
																	interval: pv.interval,
																	intervalId: pv.i_id,
																});
																setVariantSelected(pv.pv_id);
																setOpenDialog(true);
																setOpenDialogAction("editVariant");
															}}
														>
															{pv.pv_name}
														</Button>
													</DropdownMenuItem>
												))}
											</DropdownMenuContent>
										</DropdownMenu>
									) : (
										""
									)} */}
										{product.product_variants[0].is_default == false ? (
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														variant="destructive"
														className="cursor-pointer w-full"
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
														Hapus Varian
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent>
													<DropdownMenuLabel>Pilih Variant</DropdownMenuLabel>
													<DropdownMenuSeparator />
													{product.product_variants.map((pv) => (
														<DropdownMenuItem className="p-0" key={pv.pv_id}>
															<Button
																variant="outline"
																className="cursor-pointer w-full border-0 shadow-none"
																onClick={() => {
																	setProductSelected({
																		pId: product.p_id,
																		pvId: pv.pv_id,
																	});
																	setVariantSelected(pv.pv_id);
																	setOpenDialog(true);
																	setOpenDialogAction("deleteVariant");
																}}
															>
																{pv.pv_name}
															</Button>
														</DropdownMenuItem>
													))}
												</DropdownMenuContent>
											</DropdownMenu>
										) : (
											""
										)}
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
					{/* <TableFooter>
							<TableRow>
								<TableCell colSpan={5} className="text-right">
									Total: Rp750.000
								</TableCell>
							</TableRow>
						</TableFooter> */}
				</Table>
			</section>
			<Dialog open={openDialog} onOpenChange={setOpenDialog}>
				<DialogContent
					className={
						openDialogAction !== "deleteProduct" &&
						openDialogAction !== "deleteVariant"
							? "sm:max-w-7xl max-h-250 overflow-y-auto"
							: ""
					}
				>
					{childComponentsDialog(openDialogAction)}
				</DialogContent>
			</Dialog>
		</>
	);
}
