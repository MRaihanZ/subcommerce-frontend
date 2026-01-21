import { GetCsrf } from "@/components/utils/csrf";
import { apiUrl } from "@/lib/importEnv";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface EditProductData {
	pId: number;
	pvId: number;
}

interface DeleteProductProps {
	setStateDialog: React.Dispatch<React.SetStateAction<boolean>>;
	data: EditProductData;
}

export default function DeleteProduct({
	setStateDialog,
	data,
}: DeleteProductProps) {
	const deleteProduct = async () => {
		const csrfToken = await GetCsrf();
		try {
			const res = await fetch(
				`${apiUrl}/api/v1/products/` +
					data.pId +
					"/" +
					data.pvId +
					"?state=product",
				{
					method: "DELETE",
					headers: {
						"X-CSRF-TOKEN": csrfToken,
					},
					credentials: "include",
				},
			);
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				window.location.reload();
			} else {
				toast.error(json.error);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			toast.error("Fail. " + errFetch);
		}
	};
	return (
		<>
			<section className="flex gap-5">
				<Button
					className="w-full flex-1 cursor-pointer mt-5"
					onClick={() => setStateDialog(false)}
				>
					Tidak
				</Button>
				<Button
					className="w-full flex-1 cursor-pointer mt-5"
					variant="destructive"
					onClick={deleteProduct}
				>
					Ya
				</Button>
			</section>
		</>
	);
}
