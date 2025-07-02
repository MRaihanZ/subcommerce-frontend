import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputFormProfileProps {
	labelName: string;
	id: string;
	name: string;
	type: string;
	value: string;
	setValue: (value: string) => void;
	isDisabled: boolean;
}

export default function InputFormProfile({
	labelName,
	id,
	name,
	type,
	value,
	setValue,
	isDisabled,
}: InputFormProfileProps) {
	return (
		<>
			<section className="mt-5">
				<Label htmlFor={id} className="mb-1">
					{labelName}
				</Label>
				<Input
					disabled={isDisabled}
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
