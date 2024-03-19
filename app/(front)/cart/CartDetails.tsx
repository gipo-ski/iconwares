"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import useCartService, { cartStore } from "@/lib/hooks/useCartStore";

export default function CartDetails() {
	const router = useRouter();
	const { items, itemsPrice, decrease, increase } = useCartService();

	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return <></>;

	return (
		<>
			<h1 className='py-4 text-2xl'>Shopping Cart</h1>
			{items.length === 0 ? (
				<div>
					Cart is Empty. <Link href='/'>Go Shopping</Link>
				</div>
			) : (
				<div className='grid md:grid-cols-4 md:gap-5'>
					<div className='overflow-m-auto md:col-span-3'>
						<table className='table'>
							<thead>
								<tr>
									<th>Item</th>
									<th>Quantity</th>
									<th>Price</th>
								</tr>
							</thead>
							<tbody>
								{items.map((item) => (
									<tr key={item.slug}>
										<td>
											<Link
												href={`/product/${item.slug}`}
												className='flex items-center'
											>
												<Image
													src={item.image}
													alt={item.name}
													width={50}
													height={50}
													className=''
												/>
												<span className='px-2'>
													{item.name}
													{/* ({item.colour}
													{item.size}) */}
												</span>
											</Link>
										</td>
										<td>
											<button
												className='btn'
												type='button'
												onClick={() => {
													decrease(item);
												}}
											>
												-
											</button>
											<span className='px-2'>{item.qty}</span>
											<button
												className='btn'
												type='button'
												onClick={() => {
													increase(item);
												}}
											>
												+
											</button>
										</td>
										<td>£{item.price}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div>
						<div className='card bg-base-300'>
							<div className='card-body'>
								<ul>
									<li>
										<div className='pb-3 text-xl'>
											Subtotal (
											{items.reduce(
												(accumulator, currentItem) =>
													accumulator + currentItem.qty,
												0
											)}
											): £{itemsPrice}
										</div>
									</li>
									<li>
										<button
											onClick={() => router.push("/shipping")}
											className='btn btn-primary w-full'
										>
											Proceed to Checkout
										</button>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
