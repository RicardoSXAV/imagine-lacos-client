import "./style.scss";

import { useEffect, useState } from "react";

import { api } from "../../services/api";
import { useSessionStorage } from "../../hooks/useSessionStorage";

import Icon from "../Icon";
import UserOrderCard from "../UserOrderCard";

function UserOrderList(props) {
  const [userOrders, setUserOrders] = useSessionStorage({}, "userOrders");

  async function getUserOrders() {
    if (JSON.stringify(userOrders) === "{}") {
      await api
        .get("/order/user")
        .then((response) => {
          const data = response.data.orders;

          const notCompleted = data.filter((item) => item.completed !== true);
          const completed = data.filter((item) => item.completed !== false);

          setUserOrders({ notCompleted, completed });
          console.log(userOrders);
        })
        .catch((error) => console.log(error.response));
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <div
      className="user-order-list"
      style={
        props.showUserOrderList ? { display: "block" } : { display: "none" }
      }
    >
      <div className="user-order-list-box">
        <Icon
          iconSrc="xButton"
          id="user-order-list-close"
          onClick={() => props.setShowUserOrderList(false)}
        />

        <h1>Pedidos</h1>

        <div className="in-progress-tag">
          <h2>Em andamento</h2>
        </div>
        {userOrders?.notCompleted?.map((order) => (
          <UserOrderCard paymentMethod="test" />
        ))}
        <div className="completed-tag">
          <h2>Concluído</h2>
        </div>
      </div>
      {userOrders?.completed?.map((order) => (
        <UserOrderCard paymentMethod="test" />
      ))}
      <div className="background-blur" />
    </div>
  );
}

export default UserOrderList;
