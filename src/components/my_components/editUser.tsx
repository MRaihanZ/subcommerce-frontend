import { useState } from "react";
import { useNavigate } from "react-router";

import { Separator } from "@/components/ui/separator";
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

import { Input } from "@/components/ui/input";

interface EditUserData {
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

interface EditUserDataSend {
	name?: string;
	description?: string;
	stock?: number;
	price?: number;
	discount?: number;
	min_purchase?: number;
	has_variant?: boolean;
	is_active?: boolean;
	interval?: number;
	i_id?: number;
}

interface EditUserProps {
	data: EditUserData;
}

export default function EditUser({ data }: EditUserProps) {
	const [defProfileImg, setDefProfileImg] = useState("");
	const [profileImg, setProfileImg] = useState<File | null>(null);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [date, setDate] = useState<Date | undefined>(undefined);
	const [password, setPassword] = useState("");
	const [isDisableButton, setIsDisableButton] = useState(true);
	const [open, setOpen] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [isEditPassword, setIsEditPassword] = useState(false);

	const [openDialog, setOpenDialog] = useState(false);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>();

	const navigate = useNavigate();

	return (
		<>
			<section className="flex items-center justify-center">
				<section className="w-full lg:col-span-3 xl:col-span-3 2xl:col-span-3 lg:col-start-2 xl:col-start-3 2xl:col-start-4 border rounded-2xl">
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
								// onChange={handleFileChange}
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
								// onClick={handleUpdate}
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
