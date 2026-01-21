import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "@/lib/importEnv";

import { useGlobalData } from "@/contexts/GlobalDataContext";

import { GetCsrf } from "@/components/utils/csrf";

import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
	Dialog,
	// DialogClose,
	DialogContent,
	DialogDescription,
	// DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import InputFormProfile from "@/components/my_components/inputFormProfile";

export default function SellerProfile() {
	const [defProfileImg, setDefProfileImg] = useState("");
	const [profileImg, setProfileImg] = useState<File | null>(null);
	const [name, setName] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	// const [dob, setDob] = useState("13/mm/yyyy");
	const [isDisableButton, setIsDisableButton] = useState(true);
	const [openDialog, setOpenDialog] = useState(false);

	const [isEdit, setIsEdit] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>();

	const navigate = useNavigate();

	const { setGlobalToast } = useGlobalData();

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const res = await fetch(`${apiUrl}/api/v1/sellers/`, {
					credentials: "include",
				});
				const json = await res.json();
				if (json.code === 200 && json.status === "ok") {
					setName(json.data.name);
					setAddress(json.data.address);
					setDefProfileImg(json.data.img);
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
		fetchProfile();
	}, []);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setProfileImg(e.target.files[0]); // store the first selected file
		}
	};

	const handleUpdate = async () => {
		const csrfToken = await GetCsrf();

		const payload = new FormData();
		payload.append("name", name);
		payload.append("address", address);
		if (profileImg) {
			payload.append("img", profileImg);
		} else {
			payload.append("imgPath", defProfileImg);
		}

		try {
			const send = await fetch(`${apiUrl}/api/v1/sellers/`, {
				method: "PATCH",
				headers: {
					"X-CSRF-TOKEN": csrfToken,
				},
				credentials: "include",
				body: payload,
			});
			const json = await send.json();
			if (json.code === 200 && json.status === "ok") {
				setName(json.data.name);
				setAddress(json.data.address);
				setDefProfileImg(json.data.img);
				setIsDisableButton(true);
				setIsEdit(false);
				toast.success("Profile berhasil di update");
			} else {
				toast.error("Gagal mengupdate profil: " + json.error);
				setError(json.error);
				// setLoading(false);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			toast.error(errFetch);
			setError(errFetch);
			// setLoading(false);
		}
	};

	const handleDelete = async () => {
		const csrfToken = await GetCsrf();
		try {
			const send = await fetch(`${apiUrl}/api/v1/sellers/`, {
				method: "DELETE",
				headers: {
					"X-CSRF-TOKEN": csrfToken,
				},
				credentials: "include",
			});
			const json = await send.json();
			if (json.code === 200 && json.status === "ok") {
				setGlobalToast("akun berhasil di hapus");
				navigate("/");
			} else {
				toast.error("Gagal menghapus akun: " + json.error);
				setError(json.error);
				// setLoading(false);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			toast.error(errFetch);
			setError(errFetch);
			// setLoading(false);
		}
	};

	if (loading) return <p>Loading...</p>;
	if (error) {
		return <p>{error}</p>;
	}
	return (
		<>
			<section className="grid lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9 mt-7">
				<section className="lg:col-span-3 xl:col-span-3 2xl:col-span-3 lg:col-start-2 xl:col-start-3 2xl:col-start-4 border rounded-2xl">
					<p className="text-center py-3">Bio Data</p>
					<Separator />
					<section className="place-self-center mt-5 p-3 border rounded-xl">
						<img src={defProfileImg} alt="" className="w-60 h-60" />
					</section>
					<section className="mx-5 mb-5">
						<section
							id="profile_picture"
							className={
								!isDisableButton
									? "grid w-full items-center mt-5"
									: "hidden w-full items-center mt-5"
							}
						>
							<Label htmlFor="picture" className="mb-1">
								Picture
							</Label>
							<Input
								id="picture"
								type="file"
								name="picture"
								accept="image/*"
								onChange={handleFileChange}
							/>
						</section>
						<InputFormProfile
							labelName="Nama"
							id="nama"
							name="nama"
							type="text"
							value={name}
							setValue={setName}
							isDisabled={isDisableButton}
						/>
						<InputFormProfile
							labelName="Alamat"
							id="alamat"
							name="alamat"
							type="text"
							value={address}
							setValue={setAddress}
							isDisabled={isDisableButton}
						/>
						<section className={isDisableButton ? "hidden mt-5" : "mt-5"}>
							<Button
								className={
									isDisableButton
										? "hidden cursor-pointer w-full"
										: "cursor-pointer w-full"
								}
								onClick={handleUpdate}
							>
								Submit
							</Button>
						</section>
						<section className="flex justify-around flex-col 2xl:flex-row gap-5 mt-5">
							<Button
								className="cursor-pointer grow"
								onClick={() => {
									setIsEdit((prev) => !prev);
									setIsDisableButton((prev) => !prev);
								}}
							>
								{isEdit ? "Batalkan" : "Edit"}
							</Button>
							<Dialog open={openDialog} onOpenChange={setOpenDialog}>
								<DialogTrigger asChild>
									<Button variant="destructive" className="cursor-pointer grow">
										Hapus Akun
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Konfirmasi Hapus Akun</DialogTitle>
										<DialogDescription></DialogDescription>
									</DialogHeader>
									<section className="flex gap-5">
										<Button
											className="w-full flex-1 cursor-pointer mt-5"
											onClick={() => setOpenDialog(false)}
										>
											Tidak
										</Button>
										<Button
											className="w-full flex-1 cursor-pointer mt-5"
											variant="destructive"
											onClick={handleDelete}
										>
											Ya
										</Button>
									</section>
								</DialogContent>
							</Dialog>
						</section>
					</section>
				</section>
			</section>
		</>
	);
}
