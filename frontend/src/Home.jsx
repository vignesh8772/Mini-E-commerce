import { Fragment, useEffect, useState } from "react";
import ProductCard from "./components/pages/ProductCard";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetch("https://mini-e-commerce-bgl8.onrender.com/api/v1/product?" + searchParams)
      .then((res) => res.json()) // ✅ return JSON
      .then((data) => {
        setProducts(data.products); // ✅ adjust to your API response shape
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  }, [searchParams]);

  return (
    <Fragment>
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
          {products.map((product) => (
            <ProductCard key={crypto.randomUUID()} product={product} />
          ))}
        </div>
      </section>
    </Fragment>
  );
}
