import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

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

import AddProduct from "@/components/my_components/addProduct";
import EditUser from "@/components/my_components/editUser";
import DeleteProduct from "@/components/my_components/deleteProduct";

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

export default function AdminUsers() {
	const navigate = useNavigate();
	const [openDialog, setOpenDialog] = useState(false);
	const [openDialogAction, setOpenDialogAction] =
		useState<string>("addProduct");
	const [productSelected, setProductSelected] = useState<EditProductData>();

	const [products, setProducts] = useState<ProductsDetail[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>();

	const fetchProduct = async () => {
		try {
			const res = await fetch("http://localhost:8080/api/v1/products/seller", {
				credentials: "include",
			});
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				setProducts(json.data);
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
		fetchProduct();
	}, []);

	// const handleDeleteState = (deleteProd: number) => {
	// 	if (!products) return;

	// 	const filtered = products.find((p) => p.p_id === deleteProd);

	// 	if (!filtered) return;
	// 	toast.success("produk " + filtered.p_name + " dihapus dari produk");

	// 	const updated = products.filter((p) => !(p.p_id === filtered.p_id));

	// 	setProducts(updated);
	// };

	// const handleDeleteVariantState = (
	// 	deleteProd: number,
	// 	deleteProdVar: number
	// ) => {
	// 	if (!products) return;

	// 	setProducts((prev) => {
	// 		if (!prev) return prev;

	// 		return prev.map((p) => {
	// 			if (p.p_id !== deleteProd) return p;

	// 			const variantToDelete = p.product_variants.find(
	// 				(v) => v.pv_id === deleteProdVar
	// 			);
	// 			if (!variantToDelete) return p;

	// 			toast.success(
	// 				"produk " +
	// 					p.p_name +
	// 					" - " +
	// 					variantToDelete.pv_name +
	// 					" dihapus dari cart"
	// 			);

	// 			return {
	// 				...p,
	// 				product_variants: p.product_variants.filter(
	// 					(v) => v.pv_id !== deleteProdVar
	// 				),
	// 			};
	// 		});
	// 	});
	// };

	useEffect(() => {
		console.log(products);
	}, [products]);

	if (loading) return <p>Loading...</p>;
	if (error) {
		return <p>{error}</p>;
	}
	if (!products) return <p>No item found</p>;
	const childComponentsDialog = (key: string) => {
		switch (key) {
			case "addProduct":
				return (
					<>
						<DialogHeader>
							<DialogTitle>Tambah Produk</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<AddProduct />
					</>
				);
			case "editUser":
				return (
					<>
						<DialogHeader>
							<DialogTitle>Ubah User</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<EditUser data={productSelected} />
					</>
				);
			case "deleteProduct":
				return (
					<>
						<DialogHeader>
							<DialogTitle>Konfirmasi Hapus Produk</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<DeleteProduct
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
				<section className="flex justify-end">
					{/* <section className="w-full flex-1 flex max-w-3xs sm:max-w-2xs md:max-w-xs lg:max-w-sm items-center justify-center">
						<Input
							id="search"
							type="text"
							placeholder="..."
							className="rounded-r-none border-l-1 border-t-1 border-r-0 border-b-1"
						/>
						<Button
							type="submit"
							variant="outline"
							onClick={() => navigate("/search")}
							className="rounded-l-none border-l-1 border-t-1 border-r-1 border-b-1 cursor-pointer"
						>
							Cari
						</Button>
					</section> */}
					<Button
						variant="outline"
						className="cursor-pointer flex-1 w-fitt sm:w-full max-w-3xs sm:max-w-2xs md:max-w-xs lg:max-w-sm"
						onClick={() => {
							setOpenDialog(true);
							setOpenDialogAction("addProduct");
						}}
					>
						Tambah User
					</Button>
				</section>
				<Table>
					<TableCaption>Pengguna</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Image</TableHead>
							<TableHead>Nama</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Tanggal Lahir</TableHead>
							<TableHead className="text-center">Tanggal Pembuatan</TableHead>
							<TableHead className="text-center">Aksi</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{products.map((product, index) => (
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
								<TableCell className="max-w-50 truncate">
									{product.p_name}
								</TableCell>
								<TableCell className="max-w-50 truncate">
									{product.description}
								</TableCell>
								<TableCell>
									{Math.floor(product.average_rating * 10) / 10}
								</TableCell>
								<TableCell className="text-center">2025-12-30</TableCell>
								<TableCell>
									<section className="flex flex-col justify-center items-center gap-3 py-5">
										<Button
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
												setOpenDialogAction("editUser");
											}}
										>
											Edit User
										</Button>
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
											Hapus User
										</Button>
									</section>
								</TableCell>
							</TableRow>
						))}
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
						openDialogAction !== "deleteProduct"
							? "max-h-250 overflow-y-auto"
							: ""
					}
				>
					{childComponentsDialog(openDialogAction)}
				</DialogContent>
			</Dialog>
		</>
	);
}
