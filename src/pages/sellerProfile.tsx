import { useState } from "react";

import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
	const [nama, setNama] = useState("Rai");
	const [alamat, setAlamat] = useState("Kab. Bogor");
	// const [dob, setDob] = useState("13/mm/yyyy");
	const [isDisableButton, setIsDisableButton] = useState(true);
	const [openDialog, setOpenDialog] = useState(false);
	return (
		<>
			<section className="grid lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9 mt-7">
				<section className="lg:col-span-3 xl:col-span-3 2xl:col-span-3 lg:col-start-2 xl:col-start-3 2xl:col-start-4 border rounded-2xl">
					<p className="text-center py-3">Bio Data</p>
					<Separator />
					<section className="place-self-center mt-5 p-3 border rounded-xl">
						<img src="/assets/img/profile1.jpg" alt="" className="w-60 h-60" />
					</section>
					<section className="mx-5 mb-5">
						<section
							id="profile_picture"
							className="grid w-full items-center mt-5"
						>
							<Label htmlFor="picture" className="mb-1">
								Picture
							</Label>
							<Input
								id="picture"
								type="file"
								name="picture"
								disabled={isDisableButton}
							/>
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
							labelName="Alamat"
							id="alamat"
							name="alamat"
							type="text"
							value={alamat}
							setValue={setAlamat}
							isDisabled={isDisableButton}
						/>
						<section className="flex gap-5">
							<Button
								className={
									isDisableButton
										? "hidden cursor-pointer w-full mt-5"
										: "flex-1 cursor-pointer w-full mt-5"
								}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
								</svg>
								Submit
							</Button>
							<Button
								className="flex-1 w-full cursor-pointer mt-5"
								onClick={() => setIsDisableButton((prev) => !prev)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
								</svg>
								{isDisableButton ? "Edit" : "Batalkan"}
							</Button>
						</section>
						{isDisableButton ? (
							<>
								<Dialog open={openDialog} onOpenChange={setOpenDialog}>
									<DialogTrigger asChild>
										<Button
											className="w-full cursor-pointer mt-5"
											variant="destructive"
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
											Hapus Akun
										</Button>
									</DialogTrigger>
									<DialogContent className="sm:max-w-md">
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
											>
												Ya
											</Button>
										</section>
									</DialogContent>
								</Dialog>
							</>
						) : (
							""
						)}
					</section>
				</section>
			</section>
		</>
	);
}
