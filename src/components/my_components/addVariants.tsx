import { Button } from "@/components/ui/button";

interface AddVariantsProps {
	setStateDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddVariants({ setStateDialog }: AddVariantsProps) {
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
				>
					Ya
				</Button>
			</section>
		</>
	);
}
