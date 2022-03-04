import "./styles.scss";

import Icon from "../../Icon";

function Carousel(props) {
  function scrollLeft() {
    document.querySelector(".carousel-container").scrollBy(-600, 0);
  }

  function scrollRight() {
    document.querySelector(".carousel-container").scrollBy(600, 0);
  }

  return (
    <>
      <div className="carousel">
        <Icon
          iconSrc="prevButton"
          id="carousel-prev-button"
          onClick={scrollLeft}
        />
        <Icon
          iconSrc="nextButton"
          id="carousel-next-button"
          onClick={scrollRight}
        />

        <div className="carousel-container">
          {props.children?.map((image) => (
            <div className="carousel-card">
              {props.deletable && (
                <Icon
                  iconSrc="xButton"
                  id="carousel-card-delete"
                  onClick={() => props.deleteCard(image.key)}
                />
              )}
              {props.gradient ? (
                <div
                  className="carousel-gradient"
                  onClick={() => props.clickCard(image.key)}
                >
                  <img src={image.props.path} />
                </div>
              ) : (
                <img src={image.props.path} />
              )}
              <h1
                className={
                  image.props.children.includes(" ") &&
                  "carousel-card-large-text"
                }
              >
                {image.props.children}
              </h1>
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-space" />
    </>
  );
}

export default Carousel;
