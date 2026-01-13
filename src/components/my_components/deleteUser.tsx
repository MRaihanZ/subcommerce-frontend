import { useState } from "react";

import { GetCsrf } from "@/components/utils/csrf";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DeleteUserProps {
	setStateDialog: React.Dispatch<React.SetStateAction<boolean>>;
	data: string;
}

export default function DeleteUser({ setStateDialog, data }: DeleteUserProps) {
	const [error, setError] = useState<string | null>(null);

	const handleDelete = async () => {
		const csrfToken = await GetCsrf();

		try {
			const send = await fetch(
				"http://localhost:8080/api/v1/admins/users/" + data,
				{
					method: "DELETE",
					headers: {
						"X-CSRF-TOKEN": csrfToken,
					},
					credentials: "include",
				}
			);

			const json = await send.json();
			if (json.code === 200 && json.status === "ok") {
				toast("akun berhasil di hapus");
				window.location.reload();
			} else {
				toast.error("Gagal menghapus akun: " + json.error);
				setError(json.error);
				// setLoading(false);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			toast.error(errFetch);
			setError(errFetch);
			// setLoading(false);
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
					onClick={handleDelete}
				>
					Ya
				</Button>
			</section>
		</>
	);
}
