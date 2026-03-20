type Option = {
	label: string;
	value: string;
};

type SelectInputProps = {
	options: Option[];
	placeholder?: string;
	error?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export function SelectInput({
	options,
	placeholder,
	error,
	...props
}: SelectInputProps) {
	return (
		<div className="space-y-1">
			<select
				aria-invalid={!!error}
				{...props}
				className="
          border border-neutral-300
          focus:border-black focus:ring-1 focus:ring-black
          p-3 md:p-4 w-full text-sm md:text-base bg-white
        "
			>
				{placeholder && <option value="">{placeholder}</option>}

				{options.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>

			{error && <p className="text-xs text-red-500">{error}</p>}
		</div>
	);
}
