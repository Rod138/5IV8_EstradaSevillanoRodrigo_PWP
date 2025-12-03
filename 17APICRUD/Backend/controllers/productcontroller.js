import Product from "../models/productmodel.js";

export const create = (req, res) => {
    let category_id = req.body.category_id;
    if(!req.body.name || (!isNaN(parseInt(category_id)) && category_id === 0)){
        res.status(400).send({message: "El nombre y la categoría son obligatorios"});
        return;
    }
    const newProduct = new Product({
        category_id: req.body.category_id,
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
    });

    let id = req.body.id;
    console.log("ID recibido: ", id);
    if(id && id != 0 && typeof parseInt(id) === 'number' ? true : false){Product.id = id;}
    console.log("Nuevo producto a crear: ", newProduct);

    Product.create(newProduct, (err, data) => {
        if (err) {
            res.status(500).send({message: err.message || "Ocurrió un error al crear el producto.",});
        } else {
            res.send({message: `Product ${data.name} con ${data.id} creado exitosamente y categoría ID ${data.category_id} creada exitosamente`});
        }
    });
}
