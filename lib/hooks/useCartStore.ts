import { create } from "zustand";
import { persist } from "zustand/middleware";

import { round2 } from "../utils";
import { OrderItem, ShippingAddress } from "../models/OrderModel";

type Cart = {
	items: OrderItem[];
	itemsPrice: number;
	taxPrice: number;
	shippingPrice: number;
	totalPrice: number;
	paymentMethod: string;
	shippingAddress: ShippingAddress;
};

const initialState: Cart = {
	items: [],
	itemsPrice: 0,
	taxPrice: 0,
	shippingPrice: 0,
	totalPrice: 0,
	paymentMethod: "PayPal",
	shippingAddress: {
		fullName: "",
		address: "",
		city: "",
		postalCode: "",
		country: "",
	},
};

//use local storage to persistently hold the cart items in the cart even after page refresh
export const cartStore = create<Cart>()(
	persist(() => initialState, { name: "cartStore" })
);

export default function useCartService() {
	const { items, itemsPrice, taxPrice, shippingPrice, totalPrice } =
		cartStore();

	return {
		items,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		increase: (item: OrderItem) => {
			const exist = items.find((x) => x.slug === item.slug);
			const updatedCartItems = exist
				? items.map((x) =>
						x.slug === item.slug ? { ...exist, qty: exist.qty + 1 } : x
				  )
				: [...items, { ...item, qty: 1 }];

			const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
				calcPrice(updatedCartItems);
			cartStore.setState({
				items: updatedCartItems,
				itemsPrice,
				taxPrice,
				shippingPrice,
				totalPrice,
			});
		},

		decrease: (item: OrderItem) => {
			const exist = items.find((x) => x.slug === item.slug);

			if (!exist) return;

			const updatedCartItems =
				exist.qty === 1
					? items.filter((x: OrderItem) => x.slug !== item.slug)
					: items.map((x) =>
							item.slug ? { ...exist, qty: exist.qty - 1 } : x
					  );
			const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
				calcPrice(updatedCartItems);
			cartStore.setState({
				items: updatedCartItems,
				itemsPrice,
				taxPrice,
				shippingPrice,
				totalPrice,
			});
		},
		
		init: () => cartStore.setState(initialState),
	};
}

const calcPrice = (items: OrderItem[]) => {
	const itemsPrice = round2(
			items.reduce(
				(accummulator, item) => accummulator + item.price * item.qty,
				0
			)
		),
		shippingPrice = round2(itemsPrice > 100 ? 0 : 100),
		taxPrice = round2(Number(0.2 * itemsPrice)),
		totalPrice = round2(itemsPrice + taxPrice + shippingPrice);
	return { itemsPrice, taxPrice, shippingPrice, totalPrice };
};
