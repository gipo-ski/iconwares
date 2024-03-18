"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

import useCartService from "@/lib/hooks/useCartStore";

const Menu = () => {
	const { items } = useCartService();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div>
			<ul className='flex items-stretch'>
				<li>
					<Link
						href='/cart'
						className='btn btn-ghost rounded-btn'
					>
						Cart
						{mounted && items.length !== 0 && (
							<div className='badge badge-secondary'>
								{items.reduce(
									(accumulator, currentItem) => accumulator + currentItem.qty,
									0
								)}
							</div>
						)}
					</Link>
				</li>
				<li>
					<button
						className='btn btn-ghost rounded-btn'
						type='button'
					>
						Sign In
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Menu;
