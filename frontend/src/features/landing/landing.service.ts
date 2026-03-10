import { api } from "@/lib/api";

export const getClubGalleryPhotos = async () => {
	const res = await api.get("landing/gallery");
	return res.data;
};
