const mirrow = (req, res) => {
    const methods = [{
        method: 'POST',
        hasBody: true,
        purpouse: "El método POST se utiliza para enviar una entidad a un recurso específico, causando a menudo un cambio en el estado o efectos secundarios en el servidor."
    }, {
        method: 'PUT',
        hasBody: true,
        purpouse: "El método PUT remplaza todas las representaciones actuales del recurso de destino con la carga útil de la solicitud."
    }, {
        method: 'PATCH',
        hasBody: true,
        purpouse: "El método PATCH es utilizado para aplicar modificaciones parciales a un recurso."
    }, {
        method: 'HEAD',
        hasBody: false,
        purpouse: "El método HEAD pide una respuesta idéntica a la de una petición GET, pero sin el cuerpo de la respuesta."
    }, {
        method: 'GET',
        hasBody: false,
        purpouse: "El método GET solicita una representación de un recurso específico. Las peticiones que utilizan este método solo deben recuperar datos."
    }, {
        method: 'DELETE',
        hasBody: false,
        purpouse: "El método DELETE elimina el recurso especificado."
    }];

    const requestMethod = methods.find(m => m.method === req.method) || {
        method: req.method,
        hasBody: false,
        purpouse: "No tiene un body, no hay una respuesta, método no soportado."
    };
    requestMethod.purpouse += requestMethod.hasBody ? "Tiene cuerpo" : "No tiene cuerpo";
    if (requestMethod.hasBody) {
        req.body; //JS debe de parsear mediante un JSON el objeto necesario
        res.json({...req.body, ruta_consumida: req.route.path, ...requestMethod});
    } else {
        res.json({ruta_consumida: req.originalUrl, ...requestMethod});
    }
};

module.exports = mirrow;