import { useState } from "react";

import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
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

export default function Profile() {
	const [nama, setNama] = useState("Rai");
	const [email, setEmail] = useState("rai@gmail.com");
	// const [dob, setDob] = useState("13/mm/yyyy");
	const [date, setDate] = useState<Date | undefined>(undefined);
	const [isDisableButton, setIsDisableButton] = useState(true);
	const [open, setOpen] = useState(false);
	const [isEditPassword, setIsEditPassword] = useState(false);
	const [isEditProfile, setIsEditProfile] = useState(false);
	return (
		<>
			<section className="grid lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9 mt-7">
				<section className="lg:col-span-3 xl:col-span-3 2xl:col-span-3 lg:col-start-2 xl:col-start-3 2xl:col-start-4 border rounded-2xl">
					<p className="text-center py-3">Bio Data</p>
					<Separator />
					<section className="place-self-center mt-5 p-3 border rounded-xl">
						<img src="/assets/img/item.jpg" alt="" className="w-60 h-60" />
					</section>
					<section className="mx-5 mb-5">
						<section
							id="profile_picture"
							className={
								isEditProfile
									? "grid w-full items-center mt-5"
									: "hidden w-full items-center mt-5"
							}
						>
							<Label htmlFor="picture" className="mb-1">
								Picture
							</Label>
							<Input id="picture" type="file" />
						</section>
						<InputFormProfile
							labelName="Nama"
							id="nama"
							name="nama"
							type="text"
							value={nama}
							setValue={setNama}
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
								id="{id}"
								name="password"
								type="password"
								placeholder="********"
							/>
						</section>
						<section className={isDisableButton ? "hidden mt-5" : "mt-5"}>
							<Button
								className={
									isDisableButton
										? "hidden cursor-pointer w-full"
										: "cursor-pointer w-full"
								}
							>
								Submit
							</Button>
						</section>
						<section className="flex justify-around flex-col 2xl:flex-row gap-5 mt-5">
							<Button
								className="cursor-pointer"
								onClick={() => setIsDisableButton((prev) => !prev)}
							>
								{isDisableButton ? "Edit" : "Batalkan"}
							</Button>
							<Button
								className="cursor-pointer"
								onClick={() => setIsEditPassword((prev) => !prev)}
							>
								Change Password
							</Button>
							<Button
								className="cursor-pointer"
								onClick={() => setIsEditProfile((prev) => !prev)}
							>
								{isEditProfile ? "Batalkan" : "Change Profile Picture"}
							</Button>
						</section>
					</section>
				</section>
			</section>
		</>
	);
}
