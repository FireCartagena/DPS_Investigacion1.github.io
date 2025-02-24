// Clase Carrito donde visualizaremos la eleccion de la compra
class ShoppingCart {
	constructor() {
		this.items = [];
		this.taxRate = 0.13; // 13% IVA
	}
	
	/**
	 * Agregamos un item al carrito de compra
	 */
	addItem(product, quantity) {
		if (!product.reduceStock(quantity)) {
			return false;
		}
		
		const existingItem = this.items.find(item => item.id === product.id);
		if (existingItem) {
			existingItem.quantity += quantity;
		} else {
			this.items.push(new CartItem(product, quantity));
		}
		this.updateBadge();
		return true;
	}
	
	/**
	 * Removemos un item del carrito
	 */
	removeItem(productId) {
		this.items = this.items.filter(item => item.id !== productId);
		this.updateBadge();
	}
	
	/**
	 * Actualizamos la cantidad de items
	 */
	updateBadge() {
		const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
		$('#cart-badge').text(totalItems);
	}
	
	/**
	 * Calculamos el total de la compra con sus impuestos respectivos
	 */
	calculateTotal() {
		const subtotal = this.items.reduce((sum, item) => sum + item.getTotal(), 0);
		const tax = subtotal * this.taxRate;
		return {subtotal, tax, total: subtotal + tax};
	}
	
	/**
	 * Mostramos el ticket final
	 */
	render() {
		if (this.items.length === 0) {
			$('#cart-items').html('<p class="text-center text-muted">El carrito está vacío</p>');
			$('#cart-total').html('');
			$('#checkout').hide();
			return;
		}
		const cartHtml = this.items.map(item => item.render()).join('');
		const total = this.calculateTotal();
		
		$('#cart-items').html(cartHtml);
		$('#cart-total').html(`
			<div class="card">
				<div class="card-body">
					<h6>Subtotal: $${total.subtotal.toFixed(2)}</h6>
					<h6>IVA (13%): $${total.tax.toFixed(2)}</h6>
					<h5>Total: $${total.total.toFixed(2)}</h5>
				</div>
			</div>
		`);
		$('#checkout').show();
	}
	
	/**
	 * Generamos la factura
	 */
	generateInvoice() {
		const total = this.calculateTotal();
		return `
			<div class="table-responsive">
				<table class="table table-striped">
					<thead>
						<tr>
							<th>Producto</th>
							<th>Cantidad</th>
							<th>Precio Unit.</th>
							<th>Subtotal</th>
						</tr>
					</thead>
					<tbody>
						${this.items.map(item => `
						<tr>
							<td>${item.title}</td>
							<td>${item.quantity}</td>
							<td>$${item.price}</td>
							<td>$${item.getTotal().toFixed(2)}</td>
						</tr>
						`).join('')}
					</tbody>
					<tfoot>
						<tr>
							<td colspan="3" class="text-end"><strong>Subtotal:</strong></td>
							<td>$${total.subtotal.toFixed(2)}</td>
						</tr>
						<tr>
							<td colspan="3" class="text-end"><strong>IVA (13%):</strong></td>
							<td>$${total.tax.toFixed(2)}</td>
						</tr>
						<tr>
							<td colspan="3" class="text-end"><strong>Total:</strong></td>
							<td><strong>$${total.total.toFixed(2)}</strong></td>
						</tr>
					</tfoot>
				</table>
			</div>
		`;
	}
	
	/**
	 * Limpiamos el carrito
	 */
	clear() {
		this.items = [];
		this.updateBadge();
	}
}
