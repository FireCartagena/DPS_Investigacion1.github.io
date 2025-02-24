// Clase para el producto
class Product {
	constructor(id, title, price, stock, image, description) {
		this.id = id;
        this.title = title;
        this.price = price;
        this.stock = stock;
        this.image = image;
        this.description = description;
	}
	
	/**
	 * Reducir existencia
	 */
	reduceStock(quantity) {
		if (this.stock >= quantity) {
			this.stock -= quantity;
			return true;
		}
        return false;
	}
	
	/**
	 * Incrementar existencia
	 */
    increaseStock(quantity) {
		this.stock += quantity;
	}
	
	/**
	 * Mostramos el detalle del producto
	 */
	render() {
		return `
			<div class="col-12 col-md-4 col-lg-3">
				<div class="card h-100" data-id="${this.id}">
					<img src="${this.image}" class="img img-fluid" style="height:200px" alt="${this.title}">
					<div class="card-body">
						<h5 class="card-title">${this.title.slice(0, 25)}</h5>
						<p class="card-text">${this.description.slice(0, 100)}</p>
						<div class="d-flex justify-content-between align-items-center mb-2">
							<h6 class="mb-0">Precio: $${this.price}</h6>
							<span class="badge bg-secondary">Stock: ${this.stock}</span>
						</div>
						<div class="d-flex gap-2">
							<input type="number" class="form-control quantity-input" min="1" max="${this.stock}" value="1">
							<button class="btn btn-primary btn-block add-to-cart">
								<i class="bi bi-cart-plus"></i> Agregar
							</button>
						</div>
						<div class="error text-danger mt-2"></div>
					</div>
				</div>
			</div>
		`;
	}
}