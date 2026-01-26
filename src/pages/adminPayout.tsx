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

import AddAdmin from "@/components/my_components/addAdmin";
import EditAdmin from "@/components/my_components/editAdmin";
import DeleteAdmin from "@/components/my_components/deleteAdmin";

interface Admin {
	id: string;
	name: string;
	email: string;
}

export default function AdminPayout() {
	const navigate = useNavigate();
	const [openDialog, setOpenDialog] = useState(false);
	const [openDialogAction, setOpenDialogAction] = useState<string>("addAdmin");

	const [admins, setAdmins] = useState<Admin[] | null>(null);
	const [adminSelected, setAdminSelected] = useState<Admin>();
	const [adminIdSelected, setAdminIdSelected] = useState<string>("");
	const [search, setSearch] = useState<string>("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>();

	const fetchAdmins = async () => {
		try {
			const res = await fetch(`${apiUrl}/api/v1/admins/`, {
				credentials: "include",
			});
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				setAdmins(json.data);
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
		fetchAdmins();
	}, []);

	const fetchAdmin = async () => {
		try {
			const res = await fetch(`${apiUrl}/api/v1/admins/` + search, {
				credentials: "include",
			});
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				setAdmins(json.data);
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
			fetchAdmin();
		} else {
			fetchAdmins();
		}
	};

	useEffect(() => {
		if (search === "") {
			fetchAdmins();
		}
	}, [search]);

	useEffect(() => {
		if (adminIdSelected !== "") {
			console.log(adminIdSelected);
		}
	}, [adminIdSelected]);

	if (loading) return <p>Loading...</p>;
	if (error) {
		toast.error(error);
	}
	if (!admins) toast.error("No item found");
	const childComponentsDialog = (key: string) => {
		switch (key) {
			case "addAdmin":
				return (
					<>
						<DialogHeader>
							<DialogTitle>Tambah Admin</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<AddAdmin />
					</>
				);
			case "editAdmin":
				return (
					<>
						<DialogHeader>
							<DialogTitle>Ubah Admin</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<EditAdmin data={adminSelected} />
					</>
				);
			case "deleteAdmin":
				return (
					<>
						<DialogHeader>
							<DialogTitle>Konfirmasi Hapus Admin</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<DeleteAdmin
							setStateDialog={setOpenDialog}
							data={adminIdSelected}
						/>
					</>
				);
		}
	};
	return (
		<>
			<section className="my-7">
				<section className="flex justify-between mb-3">
					{/* <section className="w-full flex-1 flex max-w-3xs sm:max-w-2xs md:max-w-xs lg:max-w-sm items-center justify-center">
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
					</section> */}
				</section>
				<Table>
					<TableCaption>Tarik Uang</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Id</TableHead>
							<TableHead>Nama Penjual</TableHead>
							<TableHead>Atas Nama</TableHead>
							<TableHead>Tipe Pembayaran</TableHead>
							<TableHead>Nomor</TableHead>
							<TableHead>Total</TableHead>
							<TableHead>Deskripsi</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-center">Aksi</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{admins.map((admin, index) => (
							<TableRow key={admin.id}>
								<TableCell>{admin.id}</TableCell>
								<TableCell className="max-w-50 truncate">
									{admin.name}
								</TableCell>
								<TableCell className="max-w-50 truncate">
									{admin.email}
								</TableCell>
								<TableCell>
									<section className="flex flex-col justify-center items-center gap-3 py-5">
										<Button
											variant="outline"
											className="cursor-pointer w-full"
											onClick={() => {
												setAdminSelected({
													id: admin.id,
													name: admin.name,
													email: admin.email,
												});
												setOpenDialog(true);
												setOpenDialogAction("editAdmin");
											}}
										>
											Edit Admin
										</Button>
										<Button
											className="cursor-pointer w-full"
											variant="destructive"
											onClick={() => {
												setAdminIdSelected(admin.id);
												setOpenDialog(true);
												setOpenDialogAction("deleteAdmin");
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
											Hapus Admin
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
						openDialogAction !== "deleteAdmin"
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
