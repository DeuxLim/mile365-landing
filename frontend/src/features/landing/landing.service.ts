import { api } from "@/lib/api";

export const getClubGalleryPhotos = async () => {
	const res = await api.get("api/landing/gallery");
	return res.data;
};
