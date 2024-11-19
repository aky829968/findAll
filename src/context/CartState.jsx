import React, { useState } from "react";
import CartContext from "./CartContext";

const CartState = (props) => {
  const [cartArr, setCartArr] = useState([]);
  const [searchValue, setsearchValue] = useState("");
  console.log(searchValue);
  function addItem(obj, i) {
    let temparr = [...cartArr];

    let check = temparr.find((ele) => ele.id == obj.id);
    console.log(check);
    if (!check) {
      obj.quantity = 1;
      temparr.push(obj);
    } else {
      obj.quantity += 1;
      obj.price = obj.price + obj.price / obj.quantity;
      temparr[i] = obj;
    }
    setCartArr(temparr);
  }

  function increase(obj, i) {
    let tempobj = {
      ...obj,
      quantity: obj.quantity + 1,
      price: obj.price + obj.price / obj.quantity,
    };

    let temparr = [...cartArr];
    temparr[i] = tempobj;
    setCartArr(temparr);
  }
  function decrease(obj, i) {
    if (obj.quantity > 1) {
      let tempobj = {
        ...obj,
        quantity: obj.quantity - 1,
        price: obj.price - obj.price / obj.quantity,
      };
      let temparr = [...cartArr];
      temparr[i] = tempobj;
      setCartArr(temparr);
    }
  }

  function removeItem(obj) {
    let tempArr = cartArr.filter((ele) => ele.id != obj.id);
    setCartArr(tempArr);
  }

  let sum = 0;
  cartArr.forEach((ele) => {
    sum += ele.price;
  });

  return (
    <CartContext.Provider
      value={{
        cartArr,
        addItem,
        removeItem,
        increase,
        decrease,

        setsearchValue,
        searchValue,
        sum,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
