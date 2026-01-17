import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "@/lib/api";

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

import AddUser from "@/components/my_components/addUser";
import EditUser from "@/components/my_components/editUser";
import DeleteUser from "@/components/my_components/deleteUser";

interface User {
	id: string;
	name: string;
	img: string;
	email: string;
	dob: Date;
	created_at: Date;
}

export default function AdminUsers() {
	const navigate = useNavigate();
	const [openDialog, setOpenDialog] = useState(false);
	const [openDialogAction, setOpenDialogAction] = useState<string>("addUser");

	const [users, setUsers] = useState<User[] | null>(null);
	const [userSelected, setUserSelected] = useState<User>();
	const [userIdSelected, setUserIdSelected] = useState<string>("");
	const [search, setSearch] = useState<string>("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>();

	const fetchUsers = async () => {
		try {
			const res = await fetch(`${apiUrl}/api/v1/admins/users`, {
				credentials: "include",
			});
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				setUsers(json.data);
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
		fetchUsers();
	}, []);

	const fetchUser = async () => {
		try {
			const res = await fetch(`${apiUrl}/api/v1/admins/users/` + search, {
				credentials: "include",
			});
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				setUsers(json.data);
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
			fetchUser();
		} else {
			fetchUsers();
		}
	};

	useEffect(() => {
		if (search === "") {
			fetchUsers();
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
		if (userIdSelected !== "") {
			console.log(userIdSelected);
		}
	}, [userIdSelected]);

	if (loading) return <p>Loading...</p>;
	if (error) {
		toast.error(error);
	}
	if (!users) toast.error("No item found");
	const childComponentsDialog = (key: string) => {
		switch (key) {
			case "addUser":
				return (
					<>
						<DialogHeader>
							<DialogTitle>Tambah User</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<AddUser />
					</>
				);
			case "editUser":
				return (
					<>
						<DialogHeader>
							<DialogTitle>Ubah User</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<EditUser data={userSelected} />
					</>
				);
			case "deleteUser":
				return (
					<>
						<DialogHeader>
							<DialogTitle>Konfirmasi Hapus User</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<DeleteUser setStateDialog={setOpenDialog} data={userIdSelected} />
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
							setOpenDialogAction("addUser");
						}}
					>
						Tambah User
					</Button>
				</section>
				<Table>
					<TableCaption>Users</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Image</TableHead>
							<TableHead>Id</TableHead>
							<TableHead>Nama</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Tanggal Lahir</TableHead>
							<TableHead className="text-center">Tanggal Pembuatan</TableHead>
							<TableHead className="text-center">Aksi</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.map((user, index) => (
							<TableRow key={user.id}>
								<TableCell className="w-40">
									<img src={user.img} alt={user.name + " user image"} />
								</TableCell>
								<TableCell>{user.id}</TableCell>
								<TableCell className="max-w-50 truncate">{user.name}</TableCell>
								<TableCell className="max-w-50 truncate">
									{user.email}
								</TableCell>
								<TableCell>{formatDate(user.dob)}</TableCell>
								<TableCell className="text-center">
									{formatDate(user.created_at)}
								</TableCell>
								<TableCell>
									<section className="flex flex-col justify-center items-center gap-3 py-5">
										<Button
											variant="outline"
											className="cursor-pointer w-full"
											onClick={() => {
												setUserSelected({
													id: user.id,
													name: user.name,
													img: user.img,
													email: user.email,
													dob: new Date(user.dob),
													created_at: user.created_at,
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
												setUserIdSelected(user.id);
												setOpenDialog(true);
												setOpenDialogAction("deleteUser");
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
						openDialogAction !== "deleteUser" ? "max-h-250 overflow-y-auto" : ""
					}
				>
					{childComponentsDialog(openDialogAction)}
				</DialogContent>
			</Dialog>
		</>
	);
}
