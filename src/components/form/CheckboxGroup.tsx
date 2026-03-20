import type { FieldValues, UseFormRegister, Path } from "react-hook-form";
import { RiExternalLinkFill } from "react-icons/ri";

type OptionValue = {
	value: string;
	link?: string;
};

type CheckboxGroupProps<T extends FieldValues> = {
	name: Path<T>;
	options: readonly OptionValue[];
	register: UseFormRegister<T>;
	error?: string;
	columns?: string;
};

export function CheckboxGroup<T extends FieldValues>({
	name,
	options,
	register,
	error,
	columns = "grid-cols-2 sm:grid-cols-3",
}: CheckboxGroupProps<T>) {
	return (
		<div className="space-y-2">
			<div className={`grid ${columns} gap-3 text-sm`}>
				{options.map((option) => (
					<div className="flex items-center justify-start gap-1">
						<label
							key={option.value}
							className="flex items-center gap-2"
						>
							<input
								type="checkbox"
								value={option.value}
								className="size-4"
								{...register(name)}
							/>
							<span className="capitalize">{option.value}</span>
						</label>

						{option.link && (
							<a
								href={option.link}
								target="_blank"
								className="flex items-center justify-center"
							>
								<RiExternalLinkFill className="text-lg" />
							</a>
						)}
					</div>
				))}
			</div>

			{error && <p className="text-xs text-red-500">{error}</p>}
		</div>
	);
}
