import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { membershipRequestInputSchema } from "../schemas/membership-request.schema";
import { useMutation } from "@tanstack/react-query";
import { submitMembershipRequest } from "../membership.service";
import type { AxiosError } from "axios";
import type {
	LaravelValidationError,
	MembershipRequestInput,
	MembershipRequestOutput,
} from "../types/membership-request.types";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
	CommunityPlatformsSection,
	CommunitySection,
	HealthSafetySection,
	LocationSection,
	MembershipExpectationsSection,
	PersonalInformationSection,
	TrainingProfileSection,
	WaiverAgreementSection,
} from "./JoinFormSections";

export default function JoinForm() {
	const navigate = useNavigate();
	const submitAnchorRef = useRef<HTMLDivElement | null>(null);
	const [isSubmitInView, setIsSubmitInView] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isDirty },
	} = useForm<MembershipRequestInput, unknown, MembershipRequestOutput>({
		resolver: zodResolver(membershipRequestInputSchema),
		defaultValues: {
			training_types: [],
			platforms_joined: [],
		},
	});

	const { mutate, isError, error, isPending } = useMutation({
		mutationFn: submitMembershipRequest,

		onSuccess: (response) => {
			reset();

			navigate("/join/success", {
				state: {
					applicationId: response.data.id,
				},
			});
		},

		onError: (error: AxiosError<LaravelValidationError>): void => {
			if (!error.response) return;

			if (error.response.status === 422) {
				const validationErrors = error.response.data.errors;

				Object.entries(validationErrors).forEach(
					([field, messages]) => {
						setError(field as keyof MembershipRequestInput, {
							type: "server",
							message: (messages as string[])[0],
						});
					},
				);

				setTimeout(() => {
					const firstError = document.querySelector(
						"[aria-invalid='true']",
					) as HTMLElement | null;

					firstError?.scrollIntoView({
						behavior: "smooth",
						block: "center",
					});

					firstError?.focus();
				}, 100);

				return;
			}

			console.error("Server error:", error.response.data);
		},
	});

	const globalError =
		isError && !error?.response
			? "Something went wrong. Please try again."
			: null;

	const submitForm: SubmitHandler<MembershipRequestOutput> = async (data) => {
		mutate(data);
	};

	useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			if (!isDirty) return;

			e.preventDefault();
			e.returnValue = "";
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [isDirty]);

	useEffect(() => {
		if (!submitAnchorRef.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsSubmitInView(entry.isIntersecting);
			},
			{
				threshold: 0.1,
			},
		);

		observer.observe(submitAnchorRef.current);

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<form
			noValidate
			onSubmit={handleSubmit(submitForm, (): void => {
				const firstError = document.querySelector(
					"[aria-invalid='true']",
				) as HTMLElement | null;

				firstError?.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});

				firstError?.focus();
			})}
			className="space-y-14 md:space-y-16 max-w-4xl mx-auto pb-32 md:pb-36"
		>
			{globalError && (
				<div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
					{globalError}
				</div>
			)}

			<PersonalInformationSection register={register} errors={errors} />
			<LocationSection register={register} errors={errors} />
			<TrainingProfileSection register={register} errors={errors} />
			<CommunityPlatformsSection register={register} errors={errors} />
			<HealthSafetySection register={register} errors={errors} />
			<MembershipExpectationsSection
				register={register}
				errors={errors}
			/>
			<CommunitySection register={register} errors={errors} />
			<WaiverAgreementSection register={register} errors={errors} />

			<div ref={submitAnchorRef}>
				<button
					type="submit"
					disabled={isPending}
					className="w-full md:w-auto bg-black text-white py-4 px-10 uppercase tracking-widest text-xs hover:bg-neutral-800 transition flex items-center justify-center gap-2 disabled:opacity-60"
				>
					{isPending && (
						<span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
					)}

					{isPending ? "Submitting..." : "Submit Application"}
				</button>
			</div>

			{!isSubmitInView && (
				<div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 backdrop-blur-sm">
					<div className="max-w-4xl mx-auto px-4 py-3 md:px-0 md:py-4">
						<button
							type="submit"
							disabled={isPending}
							className="w-full md:w-auto bg-black text-white py-4 px-10 uppercase tracking-widest text-xs hover:bg-neutral-800 transition flex items-center justify-center gap-2 disabled:opacity-60"
						>
							{isPending && (
								<span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
							)}

							{isPending ? "Submitting..." : "Submit Application"}
						</button>
					</div>
				</div>
			)}
		</form>
	);
}
