import "./styles.scss";

import { useEffect, useRef, useState } from "react";

import Icon from "../../Icon";
import Image from "../../Image";
import Carousel from "../Carousel";

function Input(props) {
  // type = select
  const [showOptions, setShowOptions] = useState(false);
  const [optionImageName, setOptionImageName] = useState(
    props.selectWithImages?.imagesName[0]
  );
  const selectRef = useRef();

  // type = password
  const [showPassword, setShowPassword] = useState(false);

  // type = image / multiple-images
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);

  // type = step-number
  const [numberValue, setNumberValue] = useState(props.min || 0);

  useEffect(() => {
    document.addEventListener("mousedown", handleSelectClick);

    return () => {
      document.removeEventListener("mousedown", handleSelectClick);
    };
  }, []);

  useEffect(() => {
    const { onValueChange } = props;
    if (onValueChange) {
      onValueChange(numberValue, props.info);
    }
  }, [numberValue]);

  function selectOption(optionName, optionImage) {
    props.setOption(optionName);

    if (props.selectWithImages) {
      setOptionImageName(optionImage);
    }
  }

  function handleSelectClick(event) {
    setShowOptions(false);
  }

  function handleInputImageChange(event) {
    setImage(URL.createObjectURL(event.target.files[0]));
  }

  function handleInputImagesChange(event) {
    const files = [...event.target.files];

    setImages(files);
  }

  function typeSelection(type) {
    if (type === "text") {
      return (
        <>
          <h1 className="input-label">{props.label}</h1>

          <input className="input-text" type="text" {...props} />
        </>
      );
    } else if (type === "text-area") {
      return (
        <>
          <textarea className="input-text-area" {...props}></textarea>
        </>
      );
    } else if (type === "select") {
      return (
        <>
          <h1 className="input-label">{props.label}</h1>

          <div
            className="input-select"
            onClick={() => setShowOptions(!showOptions)}
            ref={selectRef}
            {...props}
          >
            <Icon iconSrc="arrowDown" id="input-select-icon" />
            {props.placeholder}: <p>{props.selectedOption}</p>
            {props.selectWithImages && (
              <div
                className="input-select-image-box"
                style={{ background: props.selectWithImages?.background }}
              >
                <Image src={optionImageName} />
              </div>
            )}
            <div className="input-select-options">
              {showOptions &&
                props.options.map((option, index) => (
                  <>
                    <p
                      className="select-option"
                      onClick={(event) =>
                        selectOption(
                          option,
                          props.selectWithImages?.imagesName[index]
                        )
                      }
                    >
                      {option}
                    </p>
                  </>
                ))}
            </div>
          </div>
        </>
      );
    } else if (type === "password") {
      return (
        <div className="input-password">
          <Icon
            iconSrc="eye"
            id={`${
              showPassword
                ? "input-password-icon-active"
                : "input-password-icon-disabled"
            }`}
            onClick={() => setShowPassword(!showPassword)}
          />
          <input
            {...props}
            className="input-text"
            type={showPassword ? "text" : "password"}
            placeholder={props.placeholder}
          />
        </div>
      );
    } else if (type === "image") {
      return (
        <div className="input-image" {...props}>
          <h1 className="input-label">{props.label}</h1>
          <div className="image-area">
            {image ? (
              <>
                <Icon
                  iconSrc="xButton"
                  id="input-image-delete-button"
                  onClick={() => setImage("")}
                />
                <img src={image} className="input-loaded-image" />
              </>
            ) : (
              <div className="image-area-no-image">
                {" "}
                <input
                  className="image-area-input"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleInputImageChange}
                />
                <Image imageSrc="photos" />
                <p className="image-area-description">
                  Clique nesta área para adicionar uma imagem
                </p>
              </div>
            )}
          </div>
        </div>
      );
    } else if (type === "multiple-images") {
      return (
        <>
          <div className="input-image" {...props}>
            <h1 className="input-label">{props.label}</h1>
            <div className="image-area">
              <div className="image-area-no-image">
                <input
                  className="image-area-input"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  multiple
                  onChange={handleInputImagesChange}
                />
                <Image imageSrc="photos" />
                <p className="image-area-description">
                  Clique nesta área para selecionar as imagens
                </p>
              </div>
            </div>
          </div>

          {images?.map((img) => {
            const preview = URL.createObjectURL(img);
            return <Image src={preview} />;
          })}
        </>
      );
    } else if (type === "number") {
      return (
        <div className="input-number">
          <input type="number" {...props} />
        </div>
      );
    } else if (type === "step-number") {
      return (
        <div className="input-step-number" {...props}>
          <Icon
            iconSrc="minusButton"
            onClick={() => {
              if (numberValue > props.min) {
                setNumberValue(numberValue - props.step);
              }
            }}
          />
          <p>{numberValue}</p>
          <Icon
            iconSrc="plusButton"
            onClick={() => {
              if (numberValue < props.max) {
                setNumberValue(numberValue + props.step);
              }
            }}
          />
        </div>
      );
    }
  }
  return typeSelection(props.type);
}

export default Input;
