export const getAge = (birthdate: string): number => {
	const today = new Date();
	const birth = new Date(birthdate);

	let age = today.getFullYear() - birth.getFullYear();

	const monthDiff = today.getMonth() - birth.getMonth();

	if (
		monthDiff < 0 ||
		(monthDiff === 0 && today.getDate() < birth.getDate())
	) {
		age--;
	}

	return age;
};

export const formatDate = (date: string) => {
	return new Intl.DateTimeFormat("en-PH", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(new Date(date));
};
