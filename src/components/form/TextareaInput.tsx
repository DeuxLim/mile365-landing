import type { TextareaHTMLAttributes } from "react";

type TextareaInputProps = {
	error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextareaInput({ error, ...props }: TextareaInputProps) {
	return (
		<div className="space-y-1">
			<textarea
				aria-invalid={!!error}
				{...props}
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
