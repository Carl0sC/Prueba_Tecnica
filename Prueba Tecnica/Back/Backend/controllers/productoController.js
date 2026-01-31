import * as Producto from "../models/productoModel.js";

export const getAll = async (req,res)=> res.json(await Producto.getAll());
export const getOne = async (req,res)=> res.json(await Producto.getById(req.params.id));
export const create = async (req,res)=> res.json(await Producto.create(req.body));
export const update = async (req,res)=> res.json(await Producto.update(req.params.id, req.body));
export const remove = async (req,res)=> { await Producto.remove(req.params.id); res.json({msg:"Eliminado"}); };
