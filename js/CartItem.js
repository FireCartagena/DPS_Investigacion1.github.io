// Clase Item del Carrito
class CartItem {
	constructor(product, quantity) {
		this.id = product.id;
		this.title = product.title;
		this.price = product.price;
		this.quantity = quantity;
	}
	
	/**
	 * Obtiene el total de la compra
	 */
	getTotal() {
		return this.price * this.quantity;
	}
	
	/**
	 * Mostramos la informacion del carrito de compras
	 */
	render() {
		return `
			<div class="card mb-3">
				<div class="card-body">
					<div class="d-flex justify-content-between align-items-center">
						<div>
							<h6 class="card-title mb-1">${this.title}</h6>
							<p class="card-text mb-0">
								$${this.price} x ${this.quantity} = $${this.getTotal().toFixed(2)}
							</p>
						</div>
						<button class="btn btn-danger btn-sm remove-from-cart" data-id="${this.id}">
							<i class="fa-solid fa-trash"></i>
						</button>
					</div>
				</div>
			</div>
		`;
	}
}