import { isAxiosError } from "axios";
import api from "../config/Axios";
import { ProfileForm, User } from "../types";

export async function getUser() {
	try {
		const { data } = await api.get<User>("/user");
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data);
		}

		throw new Error("No se pudo cargar el usuario");
	}
}

export async function updateProfile(formData: User) {
	try {
		const { data } = await api.patch<String>("/user", formData);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			console.log(error.response.data.error);
			throw new Error(error.response.data);
		}
	}
}

export async function uploadImage(file: File) {
	let formData = new FormData();
	formData.append("file", file);

	try {
		const {
			data: { image },
		}: { data: { image: string } } = await api.post("/user/image", formData);
		return image;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			console.log(error.response.data.error);
			throw new Error(error.response.data);
		}
	}
}
