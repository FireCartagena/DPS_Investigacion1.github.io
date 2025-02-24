/**
 * Clase Store para controlar la tienda en general
 */
class Store {
	constructor() {
		this.products = [];
		this.cart = new ShoppingCart();
		this.initializeProducts();
	}
	
	/**
	 * Cargamos los datos de los productos desde fakestore api
	 */
	initializeProducts() {
		// Validamos si existe el localStorage
		if (localStorage.getItem('DataProduct') === null) {
			// Consultamos la API y creamos los productos
			fetch('https://fakestoreapi.com/products')
				.then(res => res.json())
				.then(json => {
					// Agregamos el campo "stock" a cada producto
					const productosConStock = json.map(producto => {
						const stock = Math.floor(Math.random() * 11);
						return {
							...producto,
							stock: stock
						};
					});

					// Guardamos los productos en el localStorage
					localStorage.setItem('DataProduct', JSON.stringify(productosConStock));
					// Convertimos los datos en instancias de Product
					this.products = productosConStock.map(data =>
						new Product(data.id, data.title, data.price, data.stock, data.image, data.description)
					);
        			console.log('Productos inicializados desde la API:', this.products);
        		})
      			.catch(error => {
					  console.error('Error al obtener los productos:', error);
				});
		} else {
			// Si ya existen datos en el localStorage, los cargamos
			const productsData = JSON.parse(localStorage.getItem('DataProduct'));
			// Convertimos los datos en instancias de Product
			this.products = productsData.map(data =>
				new Product(data.id, data.title, data.price, data.stock, data.image, data.description)
			);
			console.log('Productos cargados desde el localStorage:', this.products);
		}
	}
	
	/**
	 * Mostramos los productos a renderizar
	 */
	renderProducts() {
		const productsHtml = this.products.map(product => product.render()).join('');
		$('#products').html(productsHtml);
	}
	
	/**
	 * Obtenemos un producto por su id
	 */
	getProduct(id) {
		return this.products.find(p => p.id === id);
	}
	
	/**
	 * Mostramos la factura al comprador
	 */
	showInvoice() {
    	$('#invoice-content').html(this.cart.generateInvoice());
        const invoiceModal = new bootstrap.Modal($('#invoiceModal'));
    	invoiceModal.show();
	}
    
    /**
	 * Cancelar la compra cierra la vista del carrito
	 */
    continueShopping() {
     	this.cart.clear();
        $('#invoiceModal').modal('hide');
        this.cart.render();
	}
}