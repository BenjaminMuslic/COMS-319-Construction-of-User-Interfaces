import React from "react";
import "../style/shoppingCart.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./public/checkout.html"
 
function ShoppingCart({
	visibilty,
	products,
	onProductRemove,
	onClose,
	onQuantityChange,
}) {

	// Function to calculate total price
	const calculateTotalPrice = () => {
		let total = 0;
		products.forEach(product => {
			total += product.price * product.count;
		});
		return total;
	};

	// Event handler for "Proceed to checkout" button
	const handleCheckout = () => {
		window.location.href = "./public/checkout.html"; // Navigate to checkout.html
	};

	return (
		<div
			className="modal"
			style={{
				display: visibilty
					? "block"
					: "none",
			}}>
			<div className="shoppingCart">
				<div className="header">
					<h2>Shopping cart</h2>
					<button
						className="btn close-btn"
						onClick={onClose}>
						<AiFillCloseCircle
							size={30}
						/>
					</button>
				</div>
				<div className="cart-products">
					{products.length === 0 && (
						<span className="empty-text">
							Your basket is
							currently empty
						</span>
					)}
					{products.map((product) => (
						<div
							className="cart-product"
							key={product.id}>
							<img
								src={
									product.image
								}
								alt={product.name}
							/>
							<div className="product-info">
								<h3>
									{product.name}
								</h3>
								<span className="product-price">
									${product.price *
										product.count}
									
								</span>
							</div>
							<select
								className="count"
								value={
									product.count
								}
								onChange={(
									event
								) => {
									onQuantityChange(
										product.id,
										event
											.target
											.value
									);
								}}>
								{[
									...Array(
										10
									).keys(),
								].map(
									(number) => {
										const num =
											number +
											1;
										return (
											<option
												value={
													num
												}
												key={
													num
												}>
												{
													num
												}
											</option>
										);
									}
								)}
							</select>
							<button
								className="btn remove-btn"
								onClick={() =>
									onProductRemove(
										product
									)
								}>
								<RiDeleteBin6Line
									size={20}
								/>
							</button>
						</div>
					))}
					{products.length > 0 && (
						<div>
							
							<button className="btn checkout-btn" onClick={handleCheckout}>
	Proceed to checkout
</button>

									<br></br>
							<span className="total-price">
								Total: ${calculateTotalPrice()}
							</span>

						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default ShoppingCart;
