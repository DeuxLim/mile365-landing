import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

type Props = {
	onFinish: () => void;
};

export default function PageLoader({ onFinish }: Props) {
	const [fade, setFade] = useState(false);

	return (
		<div
			className={`
				fixed inset-0 z-9999
				bg-black text-white
				flex items-center justify-center
				transition-opacity duration-700 ease-out
				${fade ? "opacity-0" : "opacity-100"}
			`}
		>
			<h1 className="text-3xl md:text-6xl font-heading font-black uppercase tracking-tight text-center px-6">
				<TypeAnimation
					sequence={[
						"YOU'RE NOT RUNNING ALONE.",
						1600,
						"365 DAYS.",
						1400,
						"ONE COMMITMENT.",
						2600,
						() => {
							// start fade out
							setFade(true);

							// allow fade animation to complete before mounting app
							setTimeout(() => {
								onFinish();
							}, 700);
						},
					]}
					speed={45}
					repeat={0}
					cursor
				/>
			</h1>
		</div>
	);
}
