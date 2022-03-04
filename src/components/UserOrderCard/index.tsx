import Image from "../Image";
import "./style.scss";

type UserOrderCardProps = {
  paymentMethod: string;
};

function UserOrderCard({ paymentMethod }: UserOrderCardProps) {
  const paymentIcon = {
    "credit-card": <Image imageSrc="creditCard" id="order-payment-icon" />,
  };

  return <div></div>;
}

export default UserOrderCard;
