declare module "*.jpg";
declare module "*.png";
declare module "*.svg";

interface Window {
  generatePaymentToken: (object: any) => void;
}
