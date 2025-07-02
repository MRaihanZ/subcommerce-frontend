import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/components/hooks/use-media-query";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import CheckoutItem from "@/components/my_components/checkoutItem";

type Status = {
	value: string;
	label: string;
};
const statuses: Status[] = [
	{
		value: "qris",
		label: "Qris",
	},
	{
		value: "bsi",
		label: "BSI",
	},
	{
		value: "mandiri",
		label: "Mandiri",
	},
	{
		value: "bCA",
		label: "BCA",
	},
	{
		value: "BNI",
		label: "BNI",
	},
];

export default function Checkout() {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	console.log(isDesktop);
	const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
	return (
		<>
			<section className="grid grid-cols-12">
				<section className="col-span-12 lg:col-span-6 lg:col-start-2">
					<p className="font-semibold text-2xl">Checkout</p>
					<section className="mt-5">
						<section className="mb-3">
							<section className="border rounded-md">
								<CheckoutItem />
								<Separator />
								<CheckoutItem />
								<Separator />
								<CheckoutItem />
								<Separator />
								<CheckoutItem />
								<Separator />
								<CheckoutItem />
							</section>
						</section>
					</section>
				</section>
				<section className="col-span-12 lg:col-span-4 ms-3 mb-5 lg:ms-5 mt-5 lg:mt-13">
					<section className="py-7 px-5 bottom-0 bg-white border rounded-md">
						<section className="mb-5">
							<p className="font-semibold text-xl pb-5">Ringkasan Belanja</p>
							<Separator />
						</section>
						<section className="mb-5">
							{isDesktop ? (
								<Popover open={open} onOpenChange={setOpen}>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											className="w-[15rem] justify-start"
										>
											{selectedStatus ? (
												<>{selectedStatus.label}</>
											) : (
												<>Pilih Metode Pembayaran</>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-[15rem] p-0" align="start">
										<StatusList
											setOpen={setOpen}
											setSelectedStatus={setSelectedStatus}
										/>
									</PopoverContent>
								</Popover>
							) : (
								<Drawer open={open} onOpenChange={setOpen}>
									<DrawerTrigger asChild>
										<Button
											variant="outline"
											className="w-[15rem] justify-start"
										>
											{selectedStatus ? (
												<>{selectedStatus.label}</>
											) : (
												<>Pilih Metode Pembayaran</>
											)}
										</Button>
									</DrawerTrigger>
									<DrawerContent>
										<div className="mt-4 border-t">
											<StatusList
												setOpen={setOpen}
												setSelectedStatus={setSelectedStatus}
											/>
										</div>
									</DrawerContent>
								</Drawer>
							)}
						</section>
						<section className="flex justify-between mb-2">
							<p className="text-md">Total Harga</p>
							<p className="text-md">Rp189.000</p>
						</section>
						{selectedStatus ? (
							<section className="flex justify-between mb-2">
								<p className="text-md">Biaya Admin</p>
								<p className="text-md">Rp2.500</p>
							</section>
						) : (
							<></>
						)}

						<section className="flex justify-between mb-2">
							<p className="text-md">Biaya Jasa Aplikasi</p>
							<p className="text-md">Rp3.000</p>
						</section>
						<section className="flex justify-between mb-5">
							<p className="font-bold text-xl">Total Tagihan</p>
							<p className="font-bold text-xl">Rp240.000</p>
						</section>
						<Button className="bg-green-600 w-full cursor-pointer">Beli</Button>
					</section>
				</section>
			</section>
		</>
	);
}

function StatusList({
	setOpen,
	setSelectedStatus,
}: {
	setOpen: (open: boolean) => void;
	setSelectedStatus: (status: Status | null) => void;
}) {
	return (
		<Command>
			<CommandInput placeholder="Filter status..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup>
					{statuses.map((status) => (
						<CommandItem
							key={status.value}
							value={status.value}
							onSelect={(value) => {
								setSelectedStatus(
									statuses.find((priority) => priority.value === value) || null
								);
								setOpen(false);
							}}
						>
							{status.label}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}
