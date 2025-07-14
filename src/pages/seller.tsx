import {
	Card,
	// CardAction,
	CardContent,
	// CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	Table,
	TableBody,
	// TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	TableFooter,
} from "@/components/ui/table";

export default function Seller() {
	return (
		<>
			<section>
				<section className="hidden md:grid grid-cols-12 gap-x-5 justify-items-center">
					<Card className="col-start-4 col-span-2 w-full">
						<CardHeader>
							<CardTitle>
								Total Terjual
								<Tooltip>
									<TooltipTrigger className="align-top ms-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="16px"
											viewBox="0 -960 960 960"
											width="16px"
											fill="currentColor"
										>
											<path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
										</svg>
									</TooltipTrigger>
									<TooltipContent>
										<p>Total pesanan yang terjual per bulan</p>
									</TooltipContent>
								</Tooltip>
							</CardTitle>
							{/* <CardDescription>Barang yang terjual</CardDescription> */}
							{/* <CardAction>Card Action</CardAction> */}
						</CardHeader>
						<CardContent>
							<p className="font-bold text-2xl">173</p>
						</CardContent>
						<CardFooter>
							<p>
								Bulan Lalu: <span className="font-bold text-xl">64</span>
							</p>
						</CardFooter>
					</Card>
					<Card className="col-span-2 w-full">
						<CardHeader>
							<CardTitle>
								Total Dibatalkan
								<Tooltip>
									<TooltipTrigger className="align-top ms-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="16px"
											viewBox="0 -960 960 960"
											width="16px"
											fill="currentColor"
										>
											<path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
										</svg>
									</TooltipTrigger>
									<TooltipContent>
										<p>Total pesanan yang dibatalkan per bulan</p>
									</TooltipContent>
								</Tooltip>
							</CardTitle>
							{/* <CardDescription>Card Description</CardDescription> */}
							{/* <CardAction>Card Action</CardAction> */}
						</CardHeader>
						<CardContent>
							<p className="font-bold text-2xl">24</p>
						</CardContent>
						<CardFooter>
							<p>
								Bulan Lalu: <span className="font-bold text-xl">5</span>
							</p>
						</CardFooter>
					</Card>
					<Card className="col-span-2 w-full">
						<CardHeader>
							<CardTitle>
								Total Pendapatan
								<Tooltip>
									<TooltipTrigger className="align-top ms-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="16px"
											viewBox="0 -960 960 960"
											width="16px"
											fill="currentColor"
										>
											<path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
										</svg>
									</TooltipTrigger>
									<TooltipContent>
										<p>Total pendapatan per bulan</p>
									</TooltipContent>
								</Tooltip>
							</CardTitle>
							{/* <CardDescription>Card Description</CardDescription> */}
							{/* <CardAction>Card Action</CardAction> */}
						</CardHeader>
						<CardContent>
							<p className="font-bold text-2xl">Rp65.000.000</p>
						</CardContent>
						<CardFooter>
							<p>
								Bulan Lalu:{" "}
								<span className="font-bold text-xl">Rp45.000.000</span>
							</p>
						</CardFooter>
					</Card>
				</section>
				<section className="my-7 border rounded-md">
					<Table className="">
						{/* <TableCaption>Tabel Penjualan</TableCaption> */}
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">Id</TableHead>
								<TableHead>Nama</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Tanggal Pembelian</TableHead>
								<TableHead>Payment Id</TableHead>
								<TableHead className="text-right">Harga</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell className="font-medium">INV001</TableCell>
								<TableCell>VPS Linux Indonesia</TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>2024-03-07 23:19</TableCell>
								<TableCell>PAY001</TableCell>
								<TableCell className="text-right">Rp150.000</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">INV001</TableCell>
								<TableCell>VPS Linux Indonesia</TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>2024-03-07 23:19</TableCell>
								<TableCell>PAY001</TableCell>
								<TableCell className="text-right">Rp150.000</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">INV001</TableCell>
								<TableCell>VPS Linux Indonesia</TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>2024-03-07 23:19</TableCell>
								<TableCell>PAY001</TableCell>
								<TableCell className="text-right">Rp150.000</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">INV001</TableCell>
								<TableCell>VPS Linux Indonesia</TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>2024-03-07 23:19</TableCell>
								<TableCell>PAY001</TableCell>
								<TableCell className="text-right">Rp150.000</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">INV001</TableCell>
								<TableCell>VPS Linux Indonesia</TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>2024-03-07 23:19</TableCell>
								<TableCell>PAY001</TableCell>
								<TableCell className="text-right">Rp150.000</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">INV001</TableCell>
								<TableCell>VPS Linux Indonesia</TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>2024-03-07 23:19</TableCell>
								<TableCell>PAY001</TableCell>
								<TableCell className="text-right">Rp150.000</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">INV001</TableCell>
								<TableCell>VPS Linux Indonesia</TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>2024-03-07 23:19</TableCell>
								<TableCell>PAY001</TableCell>
								<TableCell className="text-right">Rp150.000</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">INV001</TableCell>
								<TableCell>VPS Linux Indonesia</TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>2024-03-07 23:19</TableCell>
								<TableCell>PAY001</TableCell>
								<TableCell className="text-right">Rp150.000</TableCell>
							</TableRow>
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
			</section>
		</>
	);
}
