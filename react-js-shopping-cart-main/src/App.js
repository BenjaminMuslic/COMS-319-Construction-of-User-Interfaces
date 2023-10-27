import React, {
	useState,
	useEffect,
} from "react";
import "./style/main.css";
import { GiShoppingBag } from "react-icons/gi";
import RatingStars from "./components/RatingStars";
import ShoppingCart from "./components/ShoppingCart";

const products = [
	{
		id: 1,
		name: "Turbocharger",
		rating: 4.3,
		description:
			"Extra boost = extra horsepower",
		price: 1299,
		image: require("./assets/images/1.png"),
	},
	{
		id: 2,
		name: "Sport Tire",
		rating: 4.2,
		description:
			"Designed for fast situations. Extra grip",
		price: 229,
		image: require("./assets/images/2.png"),
	},
	{
		id: 3,
		name: "Sport Shocks",
		rating: 3.2,
		description:
			"Proivdes a sporty driving feel and performance",
		price: 99,
		image: require("./assets/images/3.png"),
	},
	{
		id: 4,
		name: "Perfomance Brakes",
		rating: 4.8,
		description:
			"Extreme stopping power",
		price: 119,
		image: require("./assets/images/4.png"),
	},
	{
		id: 5,
		name: "Performance Exhaust",
		rating: 4.5,
		description:
			"Loud car = fast car",
		price: 85,
		image: require("./assets/images/5.png"),
	},
	{
		id: 6,
		name: "Spoiler",
		rating: 3.8,
		description:
			"Aerodynamics upgrade. Carbon fiber",
		price: 149,
		image: require("./assets/images/6.webp"),
	},
];

function App() {
	const [cartsVisibilty, setCartVisible] = useState(false);
	const [productsInCart, setProducts] = useState(JSON.parse(localStorage.getItem(
		"shopping-cart"
	)
	) || []
	);

	const [searchInput, setSearchInput] = useState("");

	const filteredProducts = products.filter((product) =>
		product.name.toLowerCase().includes(searchInput.toLowerCase())
	);






	useEffect(() => {
		localStorage.setItem(
			"shopping-cart",
			JSON.stringify(productsInCart)
		);
	}, [productsInCart]);
	const addProductToCart = (product) => {
		const newProduct = {
			...product,
			count: 1,
		};
		setProducts([
			...productsInCart,
			newProduct,
		]);
	};

	const onQuantityChange = (
		productId,
		count
	) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === productId
				);
			if (productsIndex !== -1) {
				oldState[productsIndex].count =
					count;
			}
			return [...oldState];
		});
	};

	const onIncrement = (productId) => {
		setProducts((oldState) => {
			const productsIndex = oldState.findIndex(
				(item) => item.id === productId
			);
			if (productsIndex !== -1) {
				oldState[productsIndex].count += 1;
			}
			return [...oldState];
		});
	};

	const onDecrement = (productId) => {
		setProducts((oldState) => {
			const productsIndex = oldState.findIndex(
				(item) => item.id === productId
			);
			if (productsIndex !== -1 && oldState[productsIndex].count > 1) {
				oldState[productsIndex].count -= 1;
			}
			return [...oldState];
		});
	};

	const onProductRemove = (product) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === product.id
				);
			if (productsIndex !== -1) {
				oldState.splice(productsIndex, 1);
			}
			return [...oldState];
		});
	};

	return (
		<div className="App">
			<ShoppingCart
				visibilty={cartsVisibilty}
				products={productsInCart}
				onClose={() =>
					setCartVisible(false)
				}
				onQuantityChange={
					onQuantityChange
				}
				onProductRemove={onProductRemove}
			/>
			<div className="navbar">
				<h3 className="logo">B&K Autoparts</h3>
				{/* Add search bar */}
				<input
					type="text"
					className="search-bar"
					placeholder="Search products..."
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
				/>
				<button
					className="btn shopping-cart-btn"
					onClick={() => setCartVisible(true)}
				>
					<GiShoppingBag size={24} />
					{productsInCart.length >
						0 && (
							<span className="product-count">
								{
									productsInCart.length
								}
							</span>
						)}
				</button>
			</div>
			<main>
				<h2 className="title">
					Products
				</h2>
				<div className="products">
					{filteredProducts.map((product) => (
						<div
							className="product"
							key={product.id}>
							<img
								className="product-image"
								src={
									product.image
								}
								alt={
									product.image
								}
							/>
							<h4 className="product-name">
								{product.name}
							</h4>
							<RatingStars
								rating={
									product.rating
								}
							/>
							<p>
								{
									product.description
								}
							</p>
							<span className="product-price">
								${product.price}
							</span>
							<div className="buttons">
								<button className="btn">
									Detail
								</button>
								<button
									className="btn"
									onClick={() =>
										addProductToCart(
											product
										)
									}>
									Add to cart
								</button>
							</div>

							<div className="product-details">
	{/* ...other product details */}
	<div className="quantity">
		<button
			className="btn btn-decrement"
			onClick={() => onDecrement(product.id)}
		>
			-
		</button>
		<span className="count">{product.count}</span>
		<button
			className="btn btn-increment"
			onClick={() => onIncrement(product.id)}
		>
			+
		</button>
	</div>
</div>

							
						</div>
					))}
				</div>
			</main>
		</div>
	);
}

export default App;
