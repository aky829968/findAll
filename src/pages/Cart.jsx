import React, { useContext } from "react";
import CartContext from "../context/CartContext";

const Cart = () => {
  // console.log(props.obj);
  const ctx = useContext(CartContext);

  // const handleIncrement = (ans, idx) => {
  //   let obj = { ...ans };
  //   obj.quantity += 1;
  //   obj.price = obj.price + obj.price / obj.quantity;
  //   props.obj[idx] = obj;
  // };
  // const handleDecrement = (ans, idx) => {
  //   let obj = { ...ans };
  //   obj.quantity += 1;
  //   obj.price = obj.price - obj.price / obj.quantity;
  //   props.obj[idx] = obj;
  // };
  // const handleDelete = (ans) => {
  //   let newArr = props.obj.filter((ele) => ele.id != ans.id);
  //   props.obj = [...newArr];
  // };
  return (
    <div>
      {ctx.cartArr.length > 0 && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {ctx.cartArr.map((ele, idx) => {
                return (
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img className="h-24" src={ele.thumbnail} />
                    </th>
                    <td className="px-6 py-4 text-lg font-semibold">
                      {ele.title}
                    </td>
                    <td className="px-6 py-4 text-lg font-semibold">
                      {ele.price}
                    </td>
                    <td className="px-6 py-4 text-lg font-semibold">
                      <button
                        onClick={() => ctx.increase(ele, idx)}
                        className="bg-blue-600 mb-2 text-white py-2 px-1 w-[30px] rounded-md active:scale-90 hover:bg-yellow-500 mr-4"
                      >
                        +
                      </button>
                      {ele.quantity}
                      <button
                        onClick={() => ctx.decrease(ele, idx)}
                        className="bg-blue-600 mb-2 text-white py-2 px-1 w-[30px] rounded-md active:scale-90 hover:bg-yellow-500 ml-4"
                      >
                        -
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => ctx.removeItem(ele, idx)}
                        className="bg-blue-600 mb-2 text-white py-2 px-1 w-[150px] rounded-md active:scale-90 hover:bg-yellow-500 ml-4"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h1 className="text-2xl">Total= {ctx.sum}</h1>
        </div>
      )}

      {ctx.cartArr.length === 0 && (
        <h1 className="text-2xl text-center">Please add some items in cart</h1>
      )}
    </div>
  );
};

export default Cart;
