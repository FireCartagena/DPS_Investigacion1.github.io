// Inicialización y Event Listeners
$(document).ready(function() {
	// Creamos la variable: productos
	// Creamos la variable: carrito
	
	// Creamos la tienda con los productos
	const store = new Store();
	store.renderProducts();
    store.cart.render();
    
    // Agregar al carrito
    $(document).on('click', '.add-to-cart', function() {
		const card = $(this).closest('.card');
		const productId = parseInt(card.data('id'));
		const quantity = parseInt(card.find('.quantity-input').val());
		const product = store.getProduct(productId);
		
		if (store.cart.addItem(product, quantity)) {
			card.find('.error').text('');
			store.renderProducts();
			store.cart.render();
			// Mostrar toast de éxito
			const toast = new bootstrap.Toast($('<div class="toast" role="alert"><div class="toast-body">Producto agregado al carrito</div></div>'));
			toast.show();
		} else {
			card.find('.error').text('Stock insuficiente');
		}
	});
	
	// Eliminar del carrito
	$(document).on('click', '.remove-from-cart', function() {
		const productId = $(this).data('id');
		const cartItem = store.cart.items.find(item => item.id === productId);
		const product = store.getProduct(productId);
		
		product.increaseStock(cartItem.quantity);
		store.cart.removeItem(productId);
		store.renderProducts();
		store.cart.render();
		
		// Mostrar toast de eliminación
		const toast = new bootstrap.Toast($(`
			<div class="toast align-items-center text-white bg-danger border-0" role="alert">
				<div class="d-flex">
					<div class="toast-body">Producto eliminado del carrito</div>
					<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
				</div>
			</div>
		`));
		toast.show();
	});
	
	// Finalizar compra
	$('#checkout').click(function() {
		store.showInvoice();
	});
	
	// Seguir comprando
	$('#continue-shopping').click(function() {
		store.continueShopping();
	});
	
	// Validación de cantidad
	$(document).on('input', '.quantity-input', function() {
		const max 	= parseInt($(this).attr('max'));
		const value = parseInt($(this).val());
		if (value > max) {
			$(this).val(max);
		} else if (value < 1) {
			$(this).val(1);
		}
	});
	
	// Mostrar toast container
	$('body').append(`<div class="toast-container position-fixed bottom-0 end-0 p-3"></div>`);
});