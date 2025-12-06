function createNewItem(event){
    event.preventDefault();

    const category_id = parseInt(document.getElementById('newItemCategoryId').value);
    const nombre = document.getElementById('newItemName').value;
    const precio = parseFloat(document.getElementById('newItemPrice').value);
    const stock = parseInt(document.getElementById('newItemStock').value);

    let id = category_id + 1;

    const newItem = {
        id: id,
        category_id: category_id,
        name: nombre,
        price: precio,
        stock: stock
    };

    fetch('products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Producto creado:', data);
    })
    .catch(error => {
        console.error('Error al crear el producto:', error);
    });
}
