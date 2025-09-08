import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";


export default function productdetail({ nocart, setno }) {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [count, setcount] = useState(1);
  useEffect(() => {
    //fetch(process.env.REACT_APP_API_URL+'/product/'+id)
    fetch("http://localhost:8000/api/v1/products/" + id)
      .then((res) => res.json())
      .then((data) => {
        // adjust this depending on API structure
        setProduct(data.single);
      });
  }, []);

  function addToCart() {
    const itemexist = nocart.find((items) => {
      return items.product._id == product._id;
    });
    if (!itemexist) {
      const newqty = { product, count };
      setno((e) => [...e, newqty]);
      toast.success("Cart Item added.");
    } else {
      toast.error("your Cart Item already added.");
    }
  }

  return (
    product && (
      <div className="container container-fluid">
        <div className="row f-flex justify-content-around">
          <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <img
              src={product.images[0].image}
              alt="sdf"
              height="500"
              width="500"
            />
          </div>

          <div className="col-12 col-lg-5 mt-5">
            <h3>{product.name}</h3>
            <p id="product_id">{"#" + crypto.randomUUID()}</p>

            <hr />

            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>

            <hr />

            <p id="product_price">${product.price}</p>
            <div className="stockCounter d-inline">
              <span
                className="btn btn-danger minus"
                onClick={() => setcount((prev) => Math.max(1, prev - 1))}
              >
                -
              </span>

              <input
                type="number"
                className="form-control count d-inline"
                value={count}
                readOnly
              />
              <span
                className="btn btn-primary plus"
                onClick={() =>{if (product.stock==count) {
                  return;
                } setcount((prev) => prev + 1)}}
              >
                +
              </span>
            </div>
            <button
              type="button"
              id="cart_btn"
              className="btn btn-primary d-inline ml-4"
              onClick={addToCart}
              disabled={product.stock==0}
            >
              Add to Cart
            </button>

            <hr />

            <p>
              Status:{" "}
              <span
                id="stock_status"
                className={product.stock > 0 ? "text-success" : "text-danger"}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>

            <hr />

            <h4 className="mt-2">Description:</h4>
            <p>{product.description}</p>
            <hr />
            <p id="product_seller mb-3">
              Sold by: <strong>{product.seller}</strong>
            </p>

            <div className="rating w-50"></div>
          </div>
        </div>
      </div>
    )
  );
}
