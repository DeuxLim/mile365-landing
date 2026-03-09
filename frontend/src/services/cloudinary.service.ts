import {
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
	CLOUDINARY_CLOUD_NAME,
} from "@/config/cloudinary";
import { Cloudinary } from "@cloudinary/url-gen";

// Create a Cloudinary instance and set your cloud name.
export const cld = new Cloudinary({
	cloud: {
		cloudName: CLOUDINARY_CLOUD_NAME,
		apiKey: CLOUDINARY_API_KEY,
		apiSecret: CLOUDINARY_API_SECRET,
	},
});

export const getImage = (path: string) => {
	return cld.image(path).toURL();
};

export const getVideo = (path: string) => {
	return cld.video(path).toURL();
};
