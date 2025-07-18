import { useState } from "react";
import { useNavigate } from "react-router";
import rawData from "./variantItem.json";

import Comment from "@/components/my_components/comment";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function DetailItem() {
	// const selectedLength = Array(rawData.variantTitle.length).fill("");
	const [variantState, setVariantState] = useState("");
	// const variantOptions: Record<string, string[]> = {};

	// rawData.variantTitle.forEach((title: string) => {
	// 	const key = `variant${title}`;
	// 	const options = rawData[key];

	// 	if (Array.isArray(options)) {
	// 		variantOptions[title] = options;
	// 	}
	// });
	console.log(rawData.variant);

	const [quantity, setQuantity] = useState(1);

	const navigate = useNavigate();

	return (
		<>
			<section className="grid grid-cols-12 justify-items-center-safe mt-7">
				<section className="col-span-3 col-start-2 w-full">
					<Carousel className="border rounded-md py-3">
						<CarouselContent>
							<CarouselItem className="flex justify-center">
								<img src="/assets/img/item.jpg" alt="Testing" />
							</CarouselItem>
							<CarouselItem className="flex justify-center">
								<img src="/assets/img/item.jpg" alt="Testing" />
							</CarouselItem>
							<CarouselItem className="flex justify-center">
								<img src="/assets/img/item.jpg" alt="Testing" />
							</CarouselItem>
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
					<section className="mt-5 border rounded-md px-10 py-3">
						<section className="flex items-center ">
							<Avatar>
								<AvatarImage src="/assets/img/profile1.jpg" />
								<AvatarFallback>Profile1</AvatarFallback>
							</Avatar>
							<p className="ms-3 font-bold text-xl">User Name</p>
						</section>
						<section className="flex justify-between my-3 ms-11">
							<section className="flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
								</svg>
								<p className="ms-2">500+ Barang Terjual</p>
							</section>
							<p>⭐ 4.5</p>
						</section>
						<Separator />
						<section className="flex justify-between mt-3">
							<Button
								variant="outline"
								className="cursor-pointer"
								onClick={() => {
									navigate("/chat");
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M880-80 720-240H320q-33 0-56.5-23.5T240-320v-40h440q33 0 56.5-23.5T760-440v-280h40q33 0 56.5 23.5T880-640v560ZM160-473l47-47h393v-280H160v327ZM80-280v-520q0-33 23.5-56.5T160-880h440q33 0 56.5 23.5T680-800v280q0 33-23.5 56.5T600-440H240L80-280Zm80-240v-280 280Z" />
								</svg>
								Chat
							</Button>
							<Button
								variant="outline"
								className="cursor-pointer"
								onClick={() => {
									navigator.clipboard
										.writeText(window.location.href)
										.then(() => {
											toast("Link disalin ke clipboard");
										})
										.catch((err) => alert("Failed to copy. Error: " + err));
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z" />
								</svg>
								Share
							</Button>
						</section>
					</section>
				</section>
				<section className="col-span-6 col-start-6 w-full">
					<section className="px-3 py-3">
						<section className="pb-3">
							<p className="text-justify font-semibold text-xl">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
								finibus turpis a venenatis eleifend.
							</p>
							{/* <p className="mt-3 font-bold text-xl">Rp64.000</p> */}
							<section className="flex justify-between mt-3">
								<section className="flex items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 -960 960 960"
										width="24px"
										fill="currentColor"
									>
										<path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
									</svg>
									<p className="ms-2">53 terjual</p>
								</section>
								<p>⭐ 4.5</p>
							</section>
						</section>
						<Separator />
						{rawData.is_default === false ? (
							<>
								<section className="my-3">
									<p className="text-sm font-medium capitalize mb-2">
										Variant:{" "}
									</p>
									<section className="flex gap-2 flex-wrap">
										{rawData.variant.map((variantName, variantIndex) => (
											<Button
												key={variantIndex}
												variant={
													variantState === variantName ? "default" : "outline"
												}
												onClick={() => setVariantState(variantName)}
												className="cursor-pointer"
											>
												{variantName}
											</Button>
										))}
									</section>
								</section>
								<Separator />
							</>
						) : (
							""
						)}
						<section className="py-7 bottom-0">
							<section className="flex items-center mb-5">
								<section className="flex w-full max-w-25 items-center relative">
									<Button
										variant="outline"
										size="icon"
										className="size-8 absolute start-1 border-0 cursor-pointer rounded-2xl"
										onClick={() => setQuantity(quantity - 1)}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="24px"
											viewBox="0 -960 960 960"
											width="24px"
											fill="currentColor"
										>
											<path d="M200-440v-80h560v80H200Z" />
										</svg>
									</Button>
									<Input
										type="text"
										value={quantity}
										onChange={(e) => setQuantity(Number(e.target.value))}
										className="text-center rounded-2xl"
									/>
									<Button
										variant="outline"
										size="icon"
										className="size-8 absolute end-1 border-0 cursor-pointer rounded-2xl"
										onClick={() => setQuantity(quantity + 1)}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="24px"
											viewBox="0 -960 960 960"
											width="24px"
											fill="currentColor"
										>
											<path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
										</svg>
									</Button>
								</section>
								<p className="ms-5">Tersedia: {rawData.stock}</p>
							</section>
							{!variantState ? (
								""
							) : (
								<section className="mb-3">
									<p>
										Variant:{" "}
										<Badge variant="outline" className="mx-1">
											{variantState}
										</Badge>
									</p>
								</section>
							)}
							<section className="flex justify-between mb-5">
								<p className="font-bold text-xl">Total</p>
								<p className="font-bold text-xl">Rp240.000</p>
							</section>
							<section className="flex gap-5">
								<Button
									className="bg-green-600 hover:bg-green-800 mb-5 w-full cursor-pointer flex-1"
									onClick={() => navigate("/checkout")}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 -960 960 960"
										width="24px"
										fill="currentColor"
									>
										<path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z" />
									</svg>
									Beli
								</Button>
								<Button
									className="bg-blue-600 hover:bg-blue-800 w-full cursor-pointer flex-1"
									onClick={() => navigate("/cart")}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 -960 960 960"
										width="24px"
										fill="currentColor"
									>
										<path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
									</svg>
									Tambah Keranjang
								</Button>
							</section>
						</section>
						<Separator />
						<section className="mt-3">
							<p className="mb-3">
								Min. Pemesanan:
								<Badge variant="outline" className="mx-1">
									1
								</Badge>
							</p>
							<p className="text-justify">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Curabitur lobortis tempor lacus, et hendrerit orci viverra ut.
								Nullam convallis neque dignissim leo venenatis, a semper elit
								sollicitudin. Donec aliquet, magna ac efficitur commodo, risus
								orci hendrerit massa, ac ultricies massa lacus in arcu. Nunc id
								gravida est. Donec ac blandit nibh. Cras leo ex, imperdiet a
								nisl in, tincidunt tincidunt ante. Morbi semper viverra
								tincidunt. Quisque erat lectus, accumsan nec imperdiet
								sollicitudin, cursus at arcu. Nullam aliquet consectetur orci et
								condimentum. Vestibulum sit amet purus porttitor, volutpat dui
								feugiat, accumsan lorem. Vivamus congue ac nulla porta faucibus.
								Maecenas efficitur mauris eu sodales dictum.
							</p>
							<p className="text-justify">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Curabitur lobortis tempor lacus, et hendrerit orci viverra ut.
								Nullam convallis neque dignissim leo venenatis, a semper elit
								sollicitudin. Donec aliquet, magna ac efficitur commodo, risus
								orci hendrerit massa, ac ultricies massa lacus in arcu. Nunc id
								gravida est. Donec ac blandit nibh. Cras leo ex, imperdiet a
								nisl in, tincidunt tincidunt ante. Morbi semper viverra
								tincidunt. Quisque erat lectus, accumsan nec imperdiet
								sollicitudin, cursus at arcu. Nullam aliquet consectetur orci et
								condimentum. Vestibulum sit amet purus porttitor, volutpat dui
								feugiat, accumsan lorem. Vivamus congue ac nulla porta faucibus.
								Maecenas efficitur mauris eu sodales dictum.
							</p>
						</section>
					</section>
				</section>
			</section>
			<section className="grid grid-cols-12 mt-5">
				<section className="col-span-2 col-start-2">
					<section className="flex justify-center gap-3 border rounded-md px-7 py-5">
						<section>
							<p className="font-semibold text-3xl">
								⭐ 4.6<sub className="text-base"> / 5.0</sub>
							</p>
							<section className="flex ms-1.5 mt-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
								</svg>
								<p className="ms-3">53 Pembeli</p>
							</section>
						</section>
					</section>
				</section>
				<section className="col-span-8 col-start-4 ms-5">
					<section className="border rounded-md p-5">
						<p className="mb-5 text-xl font-semibold">Ulasan Pembeli</p>
						<Comment />
						<Comment />
						<Comment />
						<Comment />
						<Comment />
						<Comment />
						<Comment />
					</section>
				</section>
			</section>
		</>
	);
}
