import "./styles.scss";

import Images from "../../assets/images";

type ImageProps = {
  imageSrc?: keyof typeof Images;
} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

function Image({ imageSrc, ...props }: ImageProps) {
  return <img src={Images[imageSrc]} {...props} />;
}

export default Image;
