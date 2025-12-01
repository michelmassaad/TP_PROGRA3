import { Router } from "express";
const router = Router();

import { crearUsuario } from "../controllers/usuarios.controllers.js";

// POST -> Crear nuevo usuario
router.post("/", crearUsuario);

export default router;