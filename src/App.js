import React from "react";
import { useState } from "react";
// import Data from "./Data";
// import data from "./Data";

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default function App() {
  return (
    <div>
      <FilterableProductTable products={PRODUCTS} />
    </div>
  );
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        onFilterChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />

      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterChange,
  onInStockOnlyChange,
}) {
  return (
    <>
      <div class="input-group input-group-sm mb-3">
        <div class="input-group-prepend">
          <span
            class="input-group-text"
            id="inputGroup-sizing-sm"
            style={{ paddingLeft: "15px", marginBottom: "3px" }}
          >
            🔍
          </span>
        </div>
        <input
          value={filterText}
          type="text"
          class="form-control"
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          placeholder="Search..."
          onChange={(e) => onFilterChange(e.target.value)}
        ></input>
        <div className="input-group mb-3 align-items-center">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <input
                type="checkbox"
                chacked={inStockOnly}
                onChange={(e) => onInStockOnlyChange(e.target.checked)}
              />
            </div>
          </div>
          <p style={{ marginLeft: "10px", marginBottom: "0" }}>
            Only show products in stock.
          </p>
        </div>
      </div>
    </>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody className="corpo-table">{rows}</tbody>
      </table>
    </>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}
