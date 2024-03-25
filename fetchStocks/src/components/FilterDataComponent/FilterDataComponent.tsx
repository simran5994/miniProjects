import React from "react";

const PRODUCTS: any = [
	{ category: "Fruits", price: "$1", stocked: true, name: "Apple" },
	{ category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
	{ category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
	{ category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
	{ category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
	{ category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

function ProductCategoryRow({ category: string }) {
	return (
		<tr>
			<th colSpan='2'>{category}</th>
		</tr>
	);
}

function ProductRow({ product }) {
	return (
		<tr>
			<td>name</td>
			<td>{product.price}</td>
		</tr>
	);
}
function ProductTable({ products }): any {
	let lastCategory: string = "";
	const rows: any = [];
	console.log(products);

	for (let i = 0; i < products.length; i++) {
		console.log(products[i]);
	}
	products.forEach(
		(product: {
			category: string;
			price: string;
			stocked: boolean;
			name: string;
		}) => {
			if (product.category !== lastCategory) {
				rows.push(<ProductCategoryRow category={product.category} />);
			}
			rows.push(<ProductRow product={product} />);
			lastCategory = product.category;
		}
	);
	return (
		<table>
			<thead>
				<tr>Name</tr>
				<tr>Price</tr>
			</thead>
			<tbody>{rows}</tbody>
		</table>
	);
}

const SearchBar = () => {
	return (
		<form>
			<input type='search' placeholder='Search your product'></input>
			<label>
				<input type='checkbox'></input> Only show products in Stock
			</label>
		</form>
	);
};

const FilterDataComponent = (products: any) => {
	return (
		<div>
			<SearchBar />
			<ProductTable products={products} />
		</div>
	);
};
const FilterDataFinalComponent = () => {
	return (
		<div>
			<FilterDataComponent products={PRODUCTS}></FilterDataComponent>
		</div>
	);
};

export default FilterDataFinalComponent;
