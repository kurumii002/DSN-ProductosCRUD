import { Router, Request, Response } from "express";
import { uploadToCloudinary, deleteImage } from "../cloudinary";
import { config } from "dotenv";
config();

const router = Router();

const upload = uploadToCloudinary();

//importar modelo db
import { Producto } from "../models/Producto";

//RUTAS
router.route("/create")
	.get((req: Request, res: Response) => {
		res.render("productos/create");
	})
	.post(upload.single("imagen"), async (req: Request, res: Response) => {
		const url_img = req.file!.path; //obtiene la url de la imagen subida a Cloudinary
		const { nombre, marca, precio_venta, precio_compra, pais_procedencia } = req.body;

		await Producto.create({
			nombre: nombre,
			marca: marca,
			precio_venta: precio_venta,
			precio_compra: precio_compra,
			pais_procedencia: pais_procedencia,
			url_imagen: url_img
		});

		//cuando se guarda el producto, que redireccione a la lista
		res.redirect("/productos/list");
	});

router.route("/list")
	.get(async (req: Request, res: Response) => {
		const productos = await Producto.findAll();
		// console.log(productos);
		res.render("productos/list", { productos });
	});

router.route("/delete/:id")
	.get(async (req: Request, res: Response) => {
		//guardar el ID que se obtiene de la url
		const { id } = req.params;
		//busca x ID, obtiene los datos del producto y elimina esa columna
		const producto_data = await Producto.findByPk(id);

		if (producto_data) {
			//se obtiene el public id de la imagen
			const url_components = (producto_data.url_imagen).split("/");
			const id_img = url_components[8].split(".")[0];
			const public_id = `${url_components[7]}/${id_img}`;

			//se elimina la imagen de cloudinary
			deleteImage(public_id);

			//se elimina el producto de la BD
			await Producto.destroy({ where: { id: id } });
		}

		res.redirect("/productos/list");
	});

router.route("/edit/:id")
	.get(async (req: Request, res: Response) => {
		const producto = await Producto.findByPk(req.params.id);

		res.render("productos/edit", { producto });
	})
	.post(upload.single("imagen"), async (req: Request, res: Response) => {
		const { id } = req.params;
		//obtener los datos actualizados mediante el form
		const { nombre, marca, precio_venta, precio_compra, pais_procedencia } = req.body;

		const producto_data = await Producto.findByPk(id);

		if (req.file) { //si se sube una imagen en el formulario
			if (producto_data) {
				//se obtiene el public id de la imagen
				const url_components = (producto_data.url_imagen).split("/");
				const id_img = url_components[8].split(".")[0];
				const public_id = `${url_components[7]}/${id_img}`;

				//se elimina la imagen antigua de cloudinary
				deleteImage(public_id);
			}

			const url_img = req.file.path;

			//actualiza los datos del producto includa la imagen
			producto_data?.set({
				nombre: nombre,
				marca: marca,
				precio_venta: precio_venta,
				precio_compra: precio_compra,
				pais_procedencia: pais_procedencia,
				url_imagen: url_img
			});
			await producto_data?.save();
		}

		//sino solo actualiza los demas datos sin img
		producto_data?.set({
			nombre: nombre,
			marca: marca,
			precio_venta: precio_venta,
			precio_compra: precio_compra,
			pais_procedencia: pais_procedencia,
		});
		await producto_data?.save();

		res.redirect("/productos/list");
	});

router.route("/search")
	.get((req: Request, res: Response) => {
		res.render("productos/search");
	})
	.post(async (req: Request, res: Response) => {
		//obtiene el texto que se quiere buscar
		const txt: string = req.body.frmBuscar;
		//convierte el texto a minuscula para una mejor busqueda
		const keyword = txt.toLowerCase(); 
		
		//obtiene todos los productos
		const productos = await Producto.findAll();

		//guarda los productos encontrados
		const prods = [];

		//itera cada objeto en el array de objetos que se obtuvo de la BD
		for (const producto of productos) {
			//convierte el nombre del producto a minus para una mejor busqueda
			const nombre = producto.nombre.toLowerCase();
			
			//si el keyword tiene cierta coincidencia con el nombre
			if (nombre.indexOf(keyword) !== -1) {
				prods.push(producto); //guarda los resultados
			}
		}

		res.render("productos/search", { prods });
	});

export default router;