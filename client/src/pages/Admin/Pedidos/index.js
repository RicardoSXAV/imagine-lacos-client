import { useEffect, useState } from "react";

import "./styles.scss";
import Navbar from "../../../components/Navbar";
import Pagination from "../../../components/Pagination";
import Input from "../../../components/UI/Input";
import OrderView from "../../../components/OrderView";
import OrderDetails from "../../../components/OrderDetails";

function Pedidos(props) {
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    if (JSON.stringify(props.orderList) === "{}") {
      props.getOrders();
    }
  }, []);

  function showOrderDetails(postalInfo) {
    setOrderDetails(postalInfo);
  }

  return (
    <>
      <OrderDetails
        orderDetails={orderDetails}
        setOrderDetails={setOrderDetails}
      />
      <Navbar admin userData={props.userData} />
      <div className="order-page-container">
        <Input
          type="select"
          placeholder="Ordenar por"
          id="order-filter-select"
          options={["Recentes", "Antigos"]}
          setOption={props.setProductsFilter}
          selectedOption={props.productsFilter}
        />

        <div className="order-page-list">
          {props.orderList?.orders?.map((order) => (
            <OrderView
              clientName={order.userInfo.name}
              clientEmail={order.userInfo.email}
              clientImage={order.userInfo.profileImage}
              clientNumber={order.userInfo.phoneNumber}
              paymentMethod={order.paymentMethod}
              paymentStatus={order.paymentStatus}
              postalInformation={order.postalInformation}
              showOrderDetails={showOrderDetails}
            />
          ))}
        </div>

        <Pagination
          totalPages={props.orderList.totalPages}
          currentPage={props.orderList.page}
          setCurrentPage={() => console.log("set")}
        />
      </div>
    </>
  );
}

export default Pedidos;