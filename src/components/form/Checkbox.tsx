import type { InputHTMLAttributes } from "react";

type CheckboxProps = {
	label: React.ReactNode;
	error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Checkbox({ label, error, ...props }: CheckboxProps) {
	return (
		<div className="space-y-1">
			<label className="flex items-start gap-3 text-sm leading-relaxed cursor-pointer">
				<input
					aria-invalid={!!error}
					type="checkbox"
					{...props}
					className="mt-1 size-4 shrink-0"
				/>
				<span className="flex-1">{label}</span>
			</label>

			{error && <p className="text-xs text-red-500">{error}</p>}
		</div>
	);
}
