import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const Login = (setIsAuth) => {
  const asd = (resp) => {
    setIsAuth(true);
    console.log(resp);
  };
  return (
    <GoogleOAuthProvider clientId="910888150173-qmfv074i31cd9fcv571u5t1fnrrsf69a.apps.googleusercontent.com">
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
