import { useState } from "react";

import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import InputFormProfile from "@/components/my_components/inputFormProfile";

import { format } from "date-fns";
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
			<section className="grid grid-cols-5">
				<section className="col-span-3 col-start-2 border rounded-2xl">
					<p className="text-center py-3">Bio Data</p>
					<Separator />
					<section className="grid grid-cols-2">
						<section className="ms-5">
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
									Date of birth
								</Label>
								<Popover open={open} onOpenChange={setOpen}>
									<PopoverTrigger id="date" asChild>
										<Button
											disabled={isDisableButton}
											variant="outline"
											data-empty={!date}
											className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
										>
											<CalendarIcon />
											{date ? format(date, "PPP") : <span>10/03/2000</span>}
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0">
										<Calendar
											mode="single"
											selected={date}
											onSelect={setDate}
											disabled={(date) =>
												date > new Date() || date < new Date("1900-01-01")
											}
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
							<section
								id="profile_picture"
								className={
									isEditProfile
										? "grid w-full max-w-sm items-center mt-5"
										: "hidden w-full max-w-sm items-center mt-5"
								}
							>
								<Label htmlFor="picture" className="mb-1">
									Picture
								</Label>
								<Input id="picture" type="file" />
							</section>
							<section className="flex justify-around mt-5">
								<Button
									className="cursor-pointer"
									onClick={() => setIsDisableButton(false)}
								>
									Edit
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
									Change Profile Picture
								</Button>
							</section>
						</section>
						<section className="place-self-center">
							<img
								src="/assets/img/item.jpg"
								alt=""
								className="w-60 h-60 ms-3"
							/>
						</section>
					</section>
				</section>
			</section>
		</>
	);
}
