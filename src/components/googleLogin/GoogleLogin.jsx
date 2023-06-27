import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const Login = (setIsAuth) => {
  const asd = (resp) => {
    setIsAuth(true);
    console.log(resp);
  };
  return (
    <GoogleOAuthProvider>
      <GoogleLogin
        onSuccess={asd}
        onError={() => {
          console.log("err");
        }}
        useOneTap
      />
    </GoogleOAuthProvider>
  );
};

export default Login;
