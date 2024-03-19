"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { OrderItem } from "@/lib/models/OrderModel";
import useCartService from "@/lib/hooks/useCartStore";

export default function AddToCart({ item }: { item: OrderItem }) {
	const router = useRouter();
	const { items, increase, decrease } = useCartService();
	const [existItem, setExistItem] = useState<OrderItem | undefined>();

	useEffect(() => {
		setExistItem(items.find((x) => x.slug === item.slug));
	}, [item, items]);

	const addToCartHandler = () => {
		increase(item);
	};
	return existItem ? (
		<div>
			<button
				className='btn'
				type='button'
				onClick={() => decrease(existItem)}
			>
				-
			</button>
			<span>{existItem.qty}</span>
			<button
				className='btn'
				type='button'
				onClick={() => increase(existItem)}
			>
				+
			</button>
		</div>
	) : (
		<button
			className='btn btn-primary w-full'
			type='button'
			onClick={addToCartHandler}
		>
			Add To Cart
		</button>
	);
}
