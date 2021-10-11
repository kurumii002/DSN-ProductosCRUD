import { Router, Request, Response } from "express";

const router = Router();

//modelo db
import Producto from "../models/Producto"


//RUTAS
router.route("/create")
	.get((req: Request, res: Response) => {
		res.render("productos/create")
	})
	.post(async (req: Request, res: Response) => {
		const { nombre, marca, precio_venta, precio_compra, pais_procedencia } = req.body;

		const newProducto = new Producto({ nombre, marca, precio_venta, precio_compra, pais_procedencia });
		await newProducto.save();

		//cuando se guarda, que redireccione a la lista
		res.redirect("/productos/list");
	});

router.route("/list")
	.get(async (req: Request, res: Response) => {
		const productos = await Producto.find().lean();
		console.log(productos);
		res.render("productos/list", { productos });
	})

router.route("/delete/:id")
	.get(async (req: Request, res: Response) => {
		const { id } = req.params; //guardar el ID
		await Producto.findByIdAndDelete(id); //buscar x ID y eliminar

		res.redirect("/productos/list");
	})

router.route("/edit/:id")
	.get(async (req: Request, res: Response) => {
		const { id } = req.params;
		const producto = await Producto.findById(id).lean();

		res.render("productos/edit", { producto });
	})
	.post(async (req: Request, res: Response) => {
		const { id } = req.params; //obtener el ID x el url
		const { nombre, marca, precio_venta, precio_compra, pais_procedencia } = req.body; //obtener los datos actualizados mediante el form

		await Producto.findByIdAndUpdate(id, { nombre, marca, precio_venta, precio_compra, pais_procedencia });

		res.redirect("/productos/list");
	});

export default router;