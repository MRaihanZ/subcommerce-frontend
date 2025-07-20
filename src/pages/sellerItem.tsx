import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	// TableFooter,
} from "@/components/ui/table";

export default function SellerItem() {
	return (
		<>
			<section className="mt-7">
				<section className="my-7">
					<Table className="">
						<TableCaption>Barang</TableCaption>
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
							<TableRow className="h-20">
								<TableCell className="font-medium">INV001</TableCell>
								<TableCell>VPS Linux Indonesia</TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>2024-03-07 23:19</TableCell>
								<TableCell>PAY001</TableCell>
								<TableCell className="text-right">Rp150.000</TableCell>
							</TableRow>
							<TableRow className="h-20">
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
