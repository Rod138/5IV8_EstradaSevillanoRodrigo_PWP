//Este es el middleware
const { Router } = require('express')

//Definir la ruta de consumo del endpoint
const cursosController = require('../Controllers/cursosControl.js');

const cursosRouter = Router();

//Definir los endpoints
cursosRouter.get('/', cursosController.getCursos);
//Necesito búsqueda por id
cursosRouter.get('/:id', cursosController.getCursoById);
//Post
//cursosRouter.post('/registrar-curso', cursosController.createCurso);
//Put
//cursosRouter.post('/:id', cursosController.updateCurso);
//Delete
//cursosRouter.delete('/:id', cursosController.deleteCurso);

module.exports = cursosRouter;
