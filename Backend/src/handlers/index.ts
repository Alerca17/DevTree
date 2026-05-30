import User from "../models/User";
import { validationResult } from "express-validator";
import formidable from "formidable";
import { v4 as uuid } from 'uuid'
import { Request, Response } from "express";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";
import cloudinary from "../config/cloudinary"

export const createAccount = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const userExists = await User.findOne({ email });

	if (userExists) {
		return res.status(409).send("El correo electrónico ya está registrado");
	}

	const handle = req.body.handle.trim();
	const handleExists = await User.findOne({ handle });

	if (handleExists) {
		return res.status(409).send("Nombre de usuario no disponible");
	}

	const user = new User(req.body);
	user.password = await hashPassword(password);
	user.handle = handle;
	await user.save();
	res.status(201).send("Usuario creado");
};

export const login = async (req: Request, res: Response) => {
	//Manejar errores de validación
	let errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	//Verificar si el usuario existe
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		return res.status(404).send("El Usuario no existe");
	}

	//Verificar contraseña
	const isPasswordCorrect = await checkPassword(password, user.password);

	if (!isPasswordCorrect) {
		return res.status(401).send("Contraseña incorrecta");
	}

	const token = generateJWT({ id: user._id });

	res.send(token);
};

export const getUser = async (req: Request, res: Response) => {
	res.json(req.user);
};
export const updateProfile = async (req: Request, res: Response) => {
	try {
		const { description } = req.body;
		const handle = req.body.handle.trim();
		const handleExists = await User.findOne({ handle });
		
		if (handleExists && handleExists.email !== req.user.email) {
			return res.status(409).send("Nombre de usuario no disponible");
		}

		req.user.handle = handle;
		req.user.description = description;
		await req.user.save();
		res.send("Perfil actualizado");

	} catch (e) {

		const error = new Error("Hubo un error");
		return res.status(500).json({ error: error.message });
	}
};

export const uploadImage = async (req: Request, res: Response) => {

	const form = formidable({ multiples: false });

	try {

		form.parse(req, async (error, fields, files) => {
			
			if (error) {
				return res.status(400).json({ error: "No se pudo procesar el archivo" });
			}

			const file = Array.isArray(files.file) ? files.file[0] : files.file;

			if (!file) {
				return res.status(400).json({ error: "Debes subir una imagen" });
			}

			if (!file.mimetype?.startsWith("image/")) {
				return res.status(400).json({ error: "El archivo debe ser una imagen válida" });
			}

			cloudinary.uploader.upload(file.filepath, { public_id: uuid() }, async function (error, result) {

				if (error) {
					const error = new Error("Error al subir la imagen");
					return res.status(500).json({ error: error.message });
				}

				if (result) {
					req.user.image = result.secure_url;
					await req.user.save();
					res.json({ image: result.secure_url });

				}
			})
		})

	} catch (e) {
		const error = new Error("Hubo un error");
		return res.status(500).json({ error: error.message });
	}
}