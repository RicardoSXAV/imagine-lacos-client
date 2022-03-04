import "./styles.scss";

import { useState } from "react";
import { useHistory } from "react-router-dom";

import Icon from "../Icon";
import Button from "../UI/Button";

import priceFormatter from "../../utils/priceFormatter";

function ProductCard(props) {
  const [isHovering, setIsHovering] = useState(false);
  const [isPressing, setIsPressing] = useState(false);

  const history = useHistory();

  function renderPlusButton() {
    if (props.haveInCart === false) {
      return (
        <Icon
          iconSrc="plusButton"
          id="add-product-icon"
          onClick={() => props.addToCart(props.id)}
        />
      );
    }
  }

  return (
    <div
      className={`product-card ${isHovering && "product-card-hover"} ${
        isPressing && "product-card-active"
      }`}
    >
      {props.admin ? (
        <Icon
          iconSrc="xButton"
          id="remove-product-icon"
          onClick={() => props.remove(props.id)}
        />
      ) : (
        renderPlusButton()
      )}

      <div
        className="product-image"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseDown={() => setIsPressing(true)}
        onMouseUp={() => setIsPressing(false)}
      >
        {props.children}
      </div>
      <p>{props.title}</p>
      <div className={props.admin && "product-information"}>
        <h1>{priceFormatter.format(props.price)}</h1>
        <Button onClick={() => history.push("/categoria/" + props.categoryId)}>
          {props.category}
        </Button>
      </div>
      {props.admin && (
        <div className="product-card-bottom">
          <div className="product-quantity-circle">
            <h1>{props.quantity}</h1>
          </div>
          <Icon iconSrc="editButton" id="edit-product-icon" />
        </div>
      )}
    </div>
  );
}

export default ProductCard;
