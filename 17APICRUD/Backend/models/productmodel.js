import sql from '../config/dbconfig.js';

class Product {
    constructor() {
        this.category_id = product.category_id;
        this.name = product.name;
        this.price = product.price;
        this.stock = product.stock;
    }
    //Vamos a crear un producto
    static create(newProduct, result) {
        if(newProduct.category_id && newProduct.name && newProduct.id){
            sql.query('INSERT INTO products VALUES (?, ?, ?, ?, ?)', [newProduct.id, newProduct.category_id, newProduct.name, newProduct.price, newProduct.stock], (err, res) => {
                if (err) {
                    console.log('Error al crear el producto:', err);
                    result(err, null);
                    return;
                }
                console.log('Producto creado exitosamente:', { id: res.insertId, ...newProduct });
                result(null, { id: res.insertId, ...newProduct });
            });
        } else {
            sql.query('INSERT INTO products (category_id, name, price, stock) VALUES (?, ?, ?, ?)', [newProduct.category_id, newProduct.name, newProduct.price, newProduct.stock], (err, res) => {
                if (err) {
                    console.log(`Error al crear el producto con el nombre ${newProduct.name}:`, err);
                    result(err, null);
                    return;
                } else {
                    console.log('Producto creado exitosamente:', { id: res.insertId, ...newProduct });
                    result(null, { id: res.insertId, ...newProduct });
                }
            });
        }
    }
}

export default Product;
