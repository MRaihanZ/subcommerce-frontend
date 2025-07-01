import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputFormProfileProps {
	labelName: string;
	id: string;
	name: string;
	type: string;
	value: string;
	setValue: (value: string) => void;
}

export default function InputFormProfile({
	labelName,
	id,
	name,
	type,
	value,
	setValue,
}: InputFormProfileProps) {
	return (
		<>
			<section className="mt-5">
				<Label htmlFor={id}>{labelName}</Label>
				<Input
					id={id}
					name={name}
					type={type}
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
			</section>
		</>
	);
}
