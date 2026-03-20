import { api } from "@/lib/api";

export const getClubGalleryPhotos = async () => {
	const res = await api.get("landing/gallery");
	const payload = res.data;

	if (Array.isArray(payload)) return payload;

	// Be tolerant in case the backend returns a wrapped payload.
	if (
		payload &&
		typeof payload === "object" &&
		"resources" in payload &&
		Array.isArray((payload as { resources: unknown }).resources)
	) {
		return (payload as { resources: unknown[] }).resources;
	}

	return [];
};
