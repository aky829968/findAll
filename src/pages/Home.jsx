import React, { useEffect, useState, useContext } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { Card } from "antd";
import { Button, Modal } from "antd";
import CartContext from "../context/CartContext";

const Home = () => {
  const ctx = useContext(CartContext);
  console.log(ctx);
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const showModal = (ans) => {
    // console.log(ans);
    setSelectedItem(ans);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getAllData = async () => {
    let data = await fetch("https://dummyjson.com/products?limit=0");
    let products = await data.json();
    console.log(products);
    setItems(products.products);
    console.log(items);
  };
  useEffect(() => {
    getAllData();
  }, []);

  // const handleCart = (ans) => {
  //   props.data(ans);
  // // };
  let search = ctx.searchValue;
  // search = search.toLowerCase();
  // // ****** Pagination code ******
  console.log(search);
  let filteredArr = items.filter(
    (ele) =>
      ele.title.toLowerCase().includes(search) ||
      ele.category.toLowerCase().includes(search)
  );
  console.log(filteredArr);
  const [currentPage, setcurrentPage] = useState(1);
  let itemPerPage = 12;
  let lastIndex = itemPerPage * currentPage;
  let firstIndex = lastIndex - itemPerPage;
  let slicedArr = filteredArr.slice(firstIndex, lastIndex);
  let totalPage = Math.ceil(filteredArr.length / itemPerPage);
  let handlePage = () => {
    if (currentPage < totalPage) {
      setcurrentPage(currentPage + 1);
    }
  };
  let handlePageDec = () => {
    if (currentPage > 1) {
      setcurrentPage(currentPage - 1);
    }
  };
  console.log(totalPage);
  let pageArr = [];
  for (let i = 1; i <= totalPage; i++) {
    pageArr.push(i);
  }
  function handlePageClick(num) {
    setcurrentPage(num);
  }
  return (
    <>
      <div className="grid grid-cols-12 mx-auto w-max gap-5 p-4 ">
        <Modal
          width={800}
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="flex flex-col  md:flex-row ">
            <img src={selectedItem.thumbnail} />
            <div className="flex flex-col gap-3">
              <h1>
                <b>Title : </b>
                {selectedItem.title}
              </h1>
              <h1>
                <b>Brand : </b>
                {selectedItem.brand}
              </h1>
              <h1>
                <b>price : </b>${selectedItem.price}
              </h1>
              <h1>
                <b>Rating : </b>
                {selectedItem.rating}
              </h1>
              <h1>
                <b>Category : </b>
                {selectedItem.category}
              </h1>
              <h1>
                <b> {selectedItem.description} </b>
              </h1>
              <button
                onClick={() => handleCart(elem)}
                className="bg-blue-600 mb-2 text-white py-2 px-1 w-[150px] rounded-md active:scale-90 hover:bg-yellow-500 ml-4"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </Modal>

        {slicedArr.map((elem) => {
          return (
            <Card
              className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12 border border-sky-800 flex flex-col justify-between"
              style={{
                width: 280,
                height: 380,
              }}
              cover={
                <img
                  alt="example"
                  src={elem.thumbnail}
                  className=" h-[230px]"
                />
              }
            >
              <MdRemoveRedEye
                type="primary"
                onClick={() => showModal(elem)}
                className="text-2xl  cursor-pointer absolute top-3 right-3 bg-transparent text-black  border-none hover:text-blue-500 active:scale-90 "
              />

              <h1 className=" h-9 text-xl font-semibold mb-8">{elem.title}</h1>
              <button
                onClick={() => showModal(elem)}
                className="bg-emerald-600 mb-2 text-white py-2 px-4 rounded-md active:scale-90 hover:bg-green-600"
              >
                View Product
              </button>
              <button
                onClick={() => ctx.addItem(elem)}
                className="bg-blue-600 mb-2 text-white py-2 px-4 rounded-md active:scale-90 hover:bg-yellow-500 ml-4"
              >
                Add to cart
              </button>
            </Card>
          );
        })}
      </div>
      <nav aria-label="Page navigation example">
        <ul className=" w-max mx-auto flex  -space-x-px text-sm">
          <li
            onClick={handlePageDec}
            className=" cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-gray-800 border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </li>

          {pageArr.map((ele) => {
            return (
              <li
                onClick={() => handlePageClick(ele)}
                className={
                  currentPage === ele
                    ? "cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-white font-bold bg-blue-800 border border-e-0 border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-800 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }
              >
                {ele}
              </li>
            );
          })}

          <li
            onClick={handlePage}
            className=" cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-800 border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Home;
