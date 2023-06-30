import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Login = ({ setIsAuth, setUserData }) => {
  const onSuccess = (resp) => {
    setIsAuth(true);
    const credential = jwt_decode(resp.credential);
    console.log(credential);
    setUserData(credential);
  };

  const err = (res) => {
    console.log(res);
  };

  const clietID = "964139928437-1b507s7ktbs35rsu15osj1tdg3dceecq.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clietID}>
      <GoogleLogin onSuccess={onSuccess} onError={err} useOneTap />
    </GoogleOAuthProvider>
  );
};

export default Login;
