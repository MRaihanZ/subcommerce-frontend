import { useState } from "react";
import { apiUrl } from "@/lib/api";

import { GetCsrf } from "@/components/utils/csrf";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import InputFormProfile from "@/components/my_components/inputFormProfile";

interface Seller {
	id: string;
	name: string;
	img: string;
	address: string;
	created_at: Date;
}

interface EditSellerProps {
	data: Seller;
}

export default function EditSeller({ data }: EditSellerProps) {
	const [defProfileImg, setDefProfileImg] = useState(data.img);
	const [profileImg, setProfileImg] = useState<File | null>(null);
	const [name, setName] = useState<string>(data.name);
	const [address, setAddress] = useState<string>(data.address);
	const isDisableButton = false;

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>();

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
			const send = await fetch(`${apiUrl}/api/v1/admins/sellers/` + data.id, {
				method: "PATCH",
				headers: {
					"X-CSRF-TOKEN": csrfToken,
				},
				credentials: "include",
				body: payload,
			});
			const json = await send.json();
			if (json.code === 200 && json.status === "ok") {
				toast.success("Data berhasil di update");
				window.location.reload();
			} else {
				toast.error("Gagal mengupdate Data: " + json.error);
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

	// if (loading) return <p>Loading...</p>;
	if (error) {
		return <p>{error}</p>;
	}
	return (
		<>
			<section className="place-self-center mt-5 p-3 border rounded-xl">
				<img src={defProfileImg} alt="" className="w-60 h-60" />
			</section>
			<section className="mx-5 mb-5">
				<section id="profile_picture" className="grid w-full items-center mt-5">
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
					<Button className="cursor-pointer w-full" onClick={handleUpdate}>
						Submit
					</Button>
				</section>
			</section>
		</>
	);
}
