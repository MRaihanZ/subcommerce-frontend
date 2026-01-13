import { useState } from "react";

import { GetCsrf } from "@/components/utils/csrf";

import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import InputFormProfile from "@/components/my_components/inputFormProfile";

import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";

interface EditUserData {
	id: string;
	name: string;
	img: string;
	email: string;
	dob: Date;
	created_at: Date;
}

interface EditUserDataSend {
	name: string;
	img: string;
	email: string;
	dob: Date;
	password: string;
}

interface EditUserProps {
	data: EditUserData;
}

export default function EditUser({ data }: EditUserProps) {
	const [profileImg, setProfileImg] = useState<File | null>(null);
	const [name, setName] = useState(data.name);
	const [email, setEmail] = useState(data.email);
	const [date, setDate] = useState<Date | undefined>(data.dob);
	const [password, setPassword] = useState("");
	const [isDisableButton, setIsDisableButton] = useState(true);
	const [open, setOpen] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [isEditPassword, setIsEditPassword] = useState(false);

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
		payload.append("email", email);
		payload.append(
			"dob",
			date ? date.toLocaleDateString("en-CA").split("T")[0] : ""
		);
		payload.append("password", password);
		if (profileImg) {
			payload.append("img", profileImg);
		} else {
			payload.append("imgPath", data.img);
		}

		try {
			const send = await fetch(
				"http://localhost:8080/api/v1/admins/users/" + data.id,
				{
					method: "PATCH",
					headers: {
						"X-CSRF-TOKEN": csrfToken,
					},
					credentials: "include",
					body: payload,
				}
			);

			const json = await send.json();
			if (json.code === 200 && json.status === "ok") {
				toast("Profile berhasil di update");
				window.location.reload();
			} else {
				toast("Gagal mengupdate profil: " + json.error);
				setError(json.error);
				// setLoading(false);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			toast(errFetch);
			setError(errFetch);
			// setLoading(false);
		}
	};
	return (
		<>
			<section className="flex items-center justify-center">
				<section className="w-full lg:col-span-3 xl:col-span-3 2xl:col-span-3 lg:col-start-2 xl:col-start-3 2xl:col-start-4 border rounded-2xl">
					<section className="place-self-center mt-5 p-3 border rounded-xl">
						<img src={data.img} alt="" className="w-60 h-60" />
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
							labelName="Email"
							id="email"
							name="email"
							type="email"
							value={email}
							setValue={setEmail}
							isDisabled={isDisableButton}
						/>
						<section className="flex flex-col mt-5">
							<Label htmlFor="date" className="mb-1">
								Tanggal Lahir
							</Label>
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<Button
										disabled={isDisableButton}
										variant="outline"
										id="date"
										className="w-full justify-between font-normal"
									>
										{date ? date.toLocaleDateString() : "Pilih Tanggal"}
										<CalendarIcon />
									</Button>
								</PopoverTrigger>
								<PopoverContent
									className="w-auto overflow-hidden p-0"
									align="start"
								>
									<Calendar
										mode="single"
										selected={date}
										captionLayout="dropdown"
										onSelect={(date) => {
											setDate(date);
											setOpen(false);
										}}
										className="mx-auto"
									/>
								</PopoverContent>
							</Popover>
						</section>
						<section className={isEditPassword ? "mt-5" : "hidden mt-5"}>
							<Label htmlFor="password" className="mb-1">
								password
							</Label>
							<Input
								id="password"
								name="password"
								type="password"
								placeholder="********"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</section>
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
							<Button
								className="cursor-pointer grow"
								onClick={() => {
									setIsEditPassword((prev) => !prev);
									setIsDisableButton((prev) => !prev);
								}}
							>
								{isEditPassword ? "Batalkan" : "Change Password"}
							</Button>
						</section>
					</section>
				</section>
			</section>
		</>
	);
}
