import type { InputHTMLAttributes } from "react";

type TextInputProps = {
	label?: string;
	error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ label, error, ...props }: TextInputProps) {
	return (
		<div className="space-y-1">
			{label && (
				<label className="text-sm font-medium text-neutral-800">
					{label}
				</label>
			)}

			<input
				{...props}
				aria-invalid={!!error}
				className="
                border border-neutral-300
                focus:border-black focus:ring-1 focus:ring-black
                p-3 md:p-4 w-full text-sm md:text-base
                "
			/>

			{error && <p className="text-xs text-red-500">{error}</p>}
		</div>
	);
}
