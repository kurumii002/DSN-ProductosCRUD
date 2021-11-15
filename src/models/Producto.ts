import { Model, DataTypes, Optional } from "sequelize";
import { sequelizeConnection as sequelize } from "../database";

//se especifican todos los atributos del modelo Producto
interface ProductoAttributes {
	id: number;
	nombre: string;
	marca: string;
	precio_venta: number;
	precio_compra: number;
	pais_procedencia: string;
	url_imagen: string;
}

//cuando se llama a Producto.create hay atributos opciones como el id y este debe ser especificado
type ProductoCreationAttributes = Optional<ProductoAttributes, "id">

export class Producto extends Model<ProductoAttributes, ProductoCreationAttributes> implements ProductoAttributes {
	public id!: number;
	public nombre!: string;
	public marca!: string;
	public precio_venta!: number;
	public precio_compra!: number;
	public pais_procedencia!: string;
	public url_imagen!: string;
}

Producto.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		nombre: {
			type: new DataTypes.STRING(50),
			allowNull: false,
		},
		marca: {
			type: new DataTypes.STRING(30),
			allowNull: false,
		},
		precio_venta: {
			type: DataTypes.DECIMAL,
			allowNull: false,
		},
		precio_compra: {
			type: DataTypes.DECIMAL,
			allowNull: false,
		},
		pais_procedencia: {
			type: new DataTypes.STRING(30),
			allowNull: false,
		},
		url_imagen: {
			type: new DataTypes.STRING(256),
			allowNull: false,
		},
	},
	{
		tableName: "productos",
		sequelize, // passing the `sequelize` instance is required
	}
);

// async function doStuffWithUser() {
// 	const newUser = await Producto.create({
// 		name: "Johnny",
// 		preferredName: "John",
// 	});
// 	console.log(newUser.id, newUser.name, newUser.preferredName);

// }