import { useState } from "react";
import { Link } from "react-router-dom";


export default function Cart({ nocart, setno }) {
 const [complete,setcomplete]=useState(false)
  function increaseQty(item) {
    if (item.product.stock == item.count) {
      return; // can't go above stock
    }
    const updated = nocart.map((i) => {
      if(i.product._id == item.product._id) {
        return { ...i, count: i.count + 1 }; // immutably update count
      }
       return i;
    });
    setno(updated);
  }
  function decreaseQty(item) {
    if (item.product.stock == item.count) {
      return; // can't go above stock
    }
    const updated = nocart.map((i) => {
      if (i.product._id == item.product._id) {
        if (i.count !=1) {
          return { ...i, count: i.count - 1 };  // immutably update count
        }
         
      }
      return i;
    });
    setno(updated);
  }

  function removeItems(item) {
    const remove = nocart.filter((i) => {
      if (i.product._id !== item.product._id) {
            return true;
      }
    });
    setno(remove);
  }

  function Order() {
    fetch("https://mini-e-commerce-bgl8.onrender.com/api/v1/order",{
      method:"post",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(nocart)
    })
    .then(()=>{
      setno([]);
      setcomplete(true);
    })
  }


  return (nocart.length>0 ?<>
      <div className="container container-fluid">
        <h2 className="mt-5">
          Your Cart: <b>{nocart.length} items</b>
        </h2>

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            {nocart.map((items, index) => (
              <div key={index}>
                <hr />
                <div className="cart-item">
                  <div className="row">
                    <div className="col-4 col-lg-3">
                      <img
                        src={
                          items.product.images[0]?.image || "/placeholder.jpg"
                        }
                        alt={items.product.name}
                        height="90"
                        width="115"
                      />
                    </div>

                    <div className="col-5 col-lg-3">
                      <Link to={`/product/${items.product._id}`}>
                        {items.product.name}
                      </Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">${items.product.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline">
                        <span
                          className="btn btn-danger minus"
                          onClick={() => decreaseQty(items)}
                        >
                          -
                        </span>
                        <input
                          type="number"
                          className="form-control count d-inline"
                          value={items.count}
                          readOnly
                        />
                        <span
                          className="btn btn-primary plus"
                          onClick={() => increaseQty(items)}
                        >
                          +
                        </span>
                      </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                      <i
                        id="delete_cart_item"
                        className="fa fa-trash btn btn-danger"
                        onClick={() => removeItems(items)}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span className="order-summary-values">
                  {nocart.reduce((acc, items) => acc + items.count, 0)} (Units)
                </span>
              </p>
              <p>
                Est. total: <span className="order-summary-values">{nocart.reduce((acc, items) => acc + items.count * items.product.price, 0)}
</span>
              </p>

              <hr />
              <button id="checkout_btn" onClick={Order} className="btn btn-primary btn-block">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>:(!complete ?<>
    <div className="w-1/2">
      <img className=""  src="./images/emptyCart.png" alt="emptyCart" />  
    </div>
    </>:<>
    <h2 id="products_heading" style={{height:"100vh",marginTop:"5erm"}}>Your Order has been placed successfully</h2>
    </>)
    
  );
}
