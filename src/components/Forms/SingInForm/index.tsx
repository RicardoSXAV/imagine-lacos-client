import "./styles.scss";

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

import Icon from "../../Icon";
import Box from "../../UI/Box";
import Button from "../../UI/Button";
import Divider from "../../UI/Divider";
import Input from "../../UI/Input";
import Image from "../../Image";

function SignInForm(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const history = useHistory();

  function handleFormSubmit(event) {
    event.preventDefault();
    props.loginUser({ email, password });
  }

  function loginWithGoogleFailed() {
    console.log("google sign in failure");
  }

  return (
    <>
      <Icon
        iconSrc="topLogoNoTie"
        id="sign-up-logo"
        onClick={() => history.push("/")}
      />
      <div className="sign-up-form">
        <Image imageSrc="bowTie" id="sign-up-tie-icon" />
        <Box id="sign-up-box">
          <form>
            <h1 className="h1-form">Bem-vindo(a) de volta!</h1>

            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              render={(renderProps) => (
                <Button onClick={renderProps.onClick}>
                  <Icon iconSrc="googleButton" id="sign-in-with-google-icon" />
                  Entrar com o Google
                </Button>
              )}
              onSuccess={props.loginUserWithGoogle}
              onFailure={loginWithGoogleFailed}
              cookiePolicy="single_host_origin"
            />

            <Divider id="sign-up-form-divider">ou</Divider>

            <Input
              type="text"
              placeholder="Endereço de e-mail"
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              type="password"
              placeholder="Senha"
              onChange={(event) => setPassword(event.target.value)}
            />

            <Button
              id="register-button"
              onClick={handleFormSubmit}
              type="submit"
            >
              Entrar
            </Button>
          </form>
        </Box>
      </div>
    </>
  );
}

export default SignInForm;
