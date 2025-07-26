import { useState } from "react";
import { useNavigate } from "react-router";

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

import AddProduct from "@/components/my_components/addProduct";
import EditProduct from "@/components/my_components/editProduct";
import DeleteProduct from "@/components/my_components/deleteProduct";
import AddVariants from "@/components/my_components/addVariants";
import EditVariants from "@/components/my_components/editVariants";

export default function SellerItem() {
	const navigate = useNavigate();
	const [openDialog, setOpenDialog] = useState(false);
	const [openDialogAction, setOpenDialogAction] =
		useState<string>("addProduct");
	const [productSelected, setProductSelected] = useState<number>(0);
	const [variantSelected, setVariantSelected] = useState<number>(0);
	const [testSwitch, setTestSwitch] = useState(true);

	const childComponentsDialog = (key: string) => {
		switch (key) {
			case "addProduct":
				return (
					<>
						<DialogHeader>
							<DialogTitle></DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<AddProduct />
					</>
				);
			case "editProduct":
				return (
					<>
						<DialogHeader>
							<DialogTitle></DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<EditProduct
							name="test edit"
							description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Curabitur lobortis tempor lacus, et hendrerit orci viverra ut.
									Nullam convallis neque dignissim leo venenatis, a semper elit
									sollicitudin. Donec aliquet, magna ac efficitur commodo, risus
									orci hendrerit massa, ac ultricies massa lacus in arcu. Nunc
									id gravida est. Donec ac blandit nibh. Cras leo ex, imperdiet
									a nisl in, tincidunt tincidunt ante. Morbi semper viverra
									tincidunt. Quisque erat lectus, accumsan nec imperdiet
									sollicitudin, cursus at arcu. Nullam aliquet consectetur orci
									et condimentum. Vestibulum sit amet purus porttitor, volutpat
									dui feugiat, accumsan lorem. Vivamus congue ac nulla porta
									faucibus. Maecenas efficitur mauris eu sodales dictum."
							stock={53}
							price={120000}
							discount={0}
							minPurchase={1}
							hasVariant={false}
							isActive={true}
						/>
					</>
				);
			case "deleteProduct":
				return (
					<>
						<DialogHeader>
							<DialogTitle>Konfirmasi Hapus Produk</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<DeleteProduct setStateDialog={setOpenDialog} />
					</>
				);
			case "addVariant":
				return (
					<>
						<DialogHeader>
							<DialogTitle>Add Variant</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<AddVariants setStateDialog={setOpenDialog} />
					</>
				);
			case "editVariant":
				return (
					<>
						<DialogHeader>
							<DialogTitle>Edit Variant</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<EditVariants setStateDialog={setOpenDialog} />
					</>
				);
		}
	};
	return (
		<>
			<section className="my-7">
				<section className="flex justify-between">
					<section className="w-full flex-1 flex max-w-3xs sm:max-w-2xs md:max-w-xs lg:max-w-sm items-center justify-center">
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
					</section>
					<Button
						variant="outline"
						className="cursor-pointer flex-1 w-fitt sm:w-full max-w-3xs sm:max-w-2xs md:max-w-xs lg:max-w-sm"
						onClick={() => {
							setOpenDialog(true);
							setOpenDialogAction("addProduct");
						}}
					>
						Add
					</Button>
				</section>
				<Table>
					<TableCaption>Produk</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Image</TableHead>
							<TableHead>Nama</TableHead>
							<TableHead>Deskripsi</TableHead>
							<TableHead>Rata-Rata Rating</TableHead>
							<TableHead>Total Rating</TableHead>
							<TableHead className="text-center">Aktif</TableHead>
							<TableHead className="text-center">Aksi</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="w-40">
								<Carousel>
									<CarouselContent>
										<CarouselItem className="flex justify-center">
											<img src="/assets/img/item.jpg" alt="Testing" />
										</CarouselItem>
										<CarouselItem className="flex justify-center">
											<img src="/assets/img/item.jpg" alt="Testing" />
										</CarouselItem>
										<CarouselItem className="flex justify-center">
											<img src="/assets/img/item.jpg" alt="Testing" />
										</CarouselItem>
									</CarouselContent>
								</Carousel>
							</TableCell>
							<TableCell>VPS Linux Indonesia</TableCell>
							<TableCell>
								<p className="max-w-30 truncate">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Curabitur lobortis tempor lacus, et hendrerit orci viverra ut.
									Nullam convallis neque dignissim leo venenatis, a semper elit
									sollicitudin. Donec aliquet, magna ac efficitur commodo, risus
									orci hendrerit massa, ac ultricies massa lacus in arcu. Nunc
									id gravida est. Donec ac blandit nibh. Cras leo ex, imperdiet
									a nisl in, tincidunt tincidunt ante. Morbi semper viverra
									tincidunt. Quisque erat lectus, accumsan nec imperdiet
									sollicitudin, cursus at arcu. Nullam aliquet consectetur orci
									et condimentum. Vestibulum sit amet purus porttitor, volutpat
									dui feugiat, accumsan lorem. Vivamus congue ac nulla porta
									faucibus. Maecenas efficitur mauris eu sodales dictum.
								</p>
							</TableCell>
							<TableCell>4.5</TableCell>
							<TableCell>40</TableCell>
							<TableCell className="text-center">
								<Switch checked={testSwitch} onCheckedChange={setTestSwitch} />
							</TableCell>
							<TableCell className="flex flex-col justify-center flex-wrap items-center gap-3 py-5">
								<Button
									variant="outline"
									className="cursor-pointer w-full"
									onClick={() => {
										setOpenDialog(true);
										setOpenDialogAction("editProduct");
										setProductSelected(1);
									}}
								>
									Edit
								</Button>
								<Button
									className="cursor-pointer w-full"
									variant="destructive"
									onClick={() => {
										setOpenDialog(true);
										setOpenDialogAction("deleteProduct");
										setProductSelected(1);
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
								<Button
									variant="outline"
									className="cursor-pointer w-full"
									onClick={() => {
										setOpenDialog(true);
										setOpenDialogAction("addVariant");
									}}
								>
									Add Variant
								</Button>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline" className="cursor-pointer w-full">
											Edit Variant
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuLabel>Pilih Variant</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem className="p-0">
											<Button
												variant="outline"
												className="cursor-pointer w-full border-0 shadow-none"
												onClick={() => {
													setOpenDialog(true);
													setOpenDialogAction("editVariant");
													setProductSelected(1);
													setVariantSelected(1);
												}}
											>
												1 Core 512MB
											</Button>
										</DropdownMenuItem>
										<DropdownMenuItem className="p-0">
											<Button
												variant="outline"
												className="cursor-pointer w-full border-0 shadow-none"
												onClick={() => {
													setOpenDialog(true);
													setOpenDialogAction("editVariant");
													setProductSelected(1);
													setVariantSelected(2);
												}}
											>
												1 Core 1GB
											</Button>
										</DropdownMenuItem>
										<DropdownMenuItem className="p-0">
											<Button
												variant="outline"
												className="cursor-pointer w-full border-0 shadow-none"
												onClick={() => {
													setOpenDialog(true);
													setOpenDialogAction("editVariant");
													setProductSelected(1);
													setVariantSelected(3);
												}}
											>
												2 core 1GB
											</Button>
										</DropdownMenuItem>
										<DropdownMenuItem className="p-0">
											<Button
												variant="outline"
												className="cursor-pointer w-full border-0 shadow-none"
												onClick={() => {
													setOpenDialog(true);
													setOpenDialogAction("editVariant");
													setProductSelected(1);
													setVariantSelected(4);
												}}
											>
												2 core 2GB
											</Button>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
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
						openDialogAction === "addProduct" ||
						openDialogAction === "editProduct"
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
