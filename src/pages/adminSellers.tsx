import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "@/lib/importEnv";

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
	Dialog,
	// DialogClose,
	DialogContent,
	DialogDescription,
	// DialogFooter,
	DialogHeader,
	DialogTitle,
	// DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import AddSeller from "@/components/my_components/addSeller";
import EditSeller from "@/components/my_components/editSeller";
import DeleteSeller from "@/components/my_components/deleteSeller";

interface Seller {
	id: string;
	name: string;
	img: string;
	address: string;
	created_at: Date;
}

export default function AdminSellers() {
	const navigate = useNavigate();
	const [openDialog, setOpenDialog] = useState(false);
	const [openDialogAction, setOpenDialogAction] = useState<string>("addSeller");

	const [sellers, setSellers] = useState<Seller[] | null>(null);
	const [sellerSelected, setSellerSelected] = useState<Seller>();
	const [sellerIdSelected, setSellerIdSelected] = useState<string>("");
	const [search, setSearch] = useState<string>("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>();

	const fetchSellers = async () => {
		try {
			const res = await fetch(`${apiUrl}/api/v1/admins/sellers`, {
				credentials: "include",
			});
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				setSellers(json.data);
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
		fetchSellers();
	}, []);

	const fetchSeller = async () => {
		try {
			const res = await fetch(`${apiUrl}/api/v1/admins/sellers/` + search, {
				credentials: "include",
			});
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				setSellers(json.data);
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
			fetchSeller();
		} else {
			fetchSellers();
		}
	};

	useEffect(() => {
		if (search === "") {
			fetchSellers();
		}
	}, [search]);

	const formatDate = (dateStr: Date) => {
		return new Date(dateStr).toLocaleDateString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	};

	useEffect(() => {
		if (sellerIdSelected !== "") {
			console.log(sellerIdSelected);
		}
	}, [sellerIdSelected]);

	if (loading) return <p>Loading...</p>;
	if (error) {
		toast.error(error);
	}
	if (!sellers) toast.error("No item found");
	const childComponentsDialog = (key: string) => {
		switch (key) {
			case "addSeller":
				return (
					<>
						<DialogHeader>
							<DialogTitle>Tambah Penjual</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<AddSeller />
					</>
				);
			case "editSeller":
				return (
					<>
						<DialogHeader>
							<DialogTitle>Ubah Penjual</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<EditSeller data={sellerSelected} />
					</>
				);
			case "deleteSeller":
				return (
					<>
						<DialogHeader>
							<DialogTitle>Konfirmasi Hapus Penjual</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<DeleteSeller
							setStateDialog={setOpenDialog}
							data={sellerIdSelected}
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
					<Button
						variant="outline"
						className="cursor-pointer flex-1 w-fitt sm:w-full max-w-3xs sm:max-w-2xs md:max-w-xs lg:max-w-sm"
						onClick={() => {
							setOpenDialog(true);
							setOpenDialogAction("addSeller");
						}}
					>
						Tambah Penjual
					</Button>
				</section>
				<Table>
					<TableCaption>Sellers</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Image</TableHead>
							<TableHead>Id</TableHead>
							<TableHead>Nama</TableHead>
							<TableHead>Alamat</TableHead>
							<TableHead className="text-center">Tanggal Pembuatan</TableHead>
							<TableHead className="text-center">Aksi</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sellers.map((seller, index) => (
							<TableRow key={seller.id}>
								<TableCell className="w-40">
									<img src={seller.img} alt={seller.name + " user image"} />
								</TableCell>
								<TableCell>{seller.id}</TableCell>
								<TableCell className="max-w-50 truncate">
									{seller.name}
								</TableCell>
								<TableCell className="max-w-50 truncate">
									{seller.address}
								</TableCell>
								<TableCell className="text-center">
									{formatDate(seller.created_at)}
								</TableCell>
								<TableCell>
									<section className="flex flex-col justify-center items-center gap-3 py-5">
										<Button
											variant="outline"
											className="cursor-pointer w-full"
											onClick={() => {
												setSellerSelected({
													id: seller.id,
													name: seller.name,
													img: seller.img,
													address: seller.address,
													created_at: seller.created_at,
												});
												setOpenDialog(true);
												setOpenDialogAction("editSeller");
											}}
										>
											Edit Penjual
										</Button>
										<Button
											className="cursor-pointer w-full"
											variant="destructive"
											onClick={() => {
												setSellerIdSelected(seller.id);
												setOpenDialog(true);
												setOpenDialogAction("deleteSeller");
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
											Hapus Penjual
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
						openDialogAction !== "deleteSeller"
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
