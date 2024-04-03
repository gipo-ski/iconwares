import Link from "next/link";
import Image from "next/image";

import data from "@/lib/data";
import { convertDocToObj } from "@/lib/utils";
import AddToCart from "@/components/products/AddToCart";
import productService from "@/lib/services/productService";

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}) {
	const product = await productService.getBySlug(params.slug);
	if (!product) {
		return { title: "Product not found" };
	}
	return {
		title: product.name,
		description: product.description,
	};
}

export default async function ProductDetails({
	params,
}: {
	params: { slug: string };
}) {
	const product = await productService.getBySlug(params.slug);

	if (!product) return <div>Product Not Found</div>;

	return (
		<>
			<div className='my-2'>
				<Link href='/'>Back to Products</Link>
			</div>
			<div className='grid md:grid-cols-4 md:gap-3'>
				<div className='md:col-span-2'>
					<Image
						src={product.image}
						alt={product.name}
						width={640}
						height={640}
						sizes='100vw'
						style={{ width: "100%", height: "auto" }}
					/>
				</div>
				<div>
					<ul className='space-y-4'>
						<li>
							<h1 className='text-xl'>{product.name}</h1>
						</li>
						<li>
							{product.rating} of {product.numReviews} reviews
						</li>
						<li>{product.brand}</li>
						<li>
							<div className='divider'></div>
						</li>
						<li>
							Description: <p>{product.description}</p>
						</li>
					</ul>
				</div>
				<div>
					<div className='card bg-base-300 shadow-xl mt-3 md:mt-0'>
						<div className='card-body'>
							<div className='flex justify-between mb-2'>
								<div>Price</div>
								<div>£{product.price}</div>
							</div>
							<div className='flex justify-between mb-2'>
								<div>Status</div>
								<div>
									{product.countInStock > 0 ? "In Stock" : "Unavailable"}
								</div>
							</div>
							{product.countInStock !== 0 && (
								<div className='card-actions justify-center'>
									<AddToCart
										item={{
											...convertDocToObj(product),
											qty: 0,
											colour: "",
											size: "",
										}}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
