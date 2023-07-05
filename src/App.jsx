import { useDispatch } from "react-redux";
import "./App.css";
import { refresh, runTest, stopDocTest, stopReprTest } from "./store/authSlice";
import { useEffect, useState } from "react";
import ok from "./icon/ok.png";
import error from "./icon/icons8-отмена.svg";
import wait from "./icon/icons8-геометрические-фигуры-окружность-24.png";
import run from "./icon/icons8-начало-48.png";
import stopIcon from "./icon/icons8-выключение-системы-40.png";
import $api from "./http";
import { Inputs } from "./components/inputs/Inputs";
import { convertCamelToNormal } from "./utils";
import Report from "./components/report/Report";
import Login from "./components/googleLogin/GoogleLogin";

function App() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState({});

  const runTestInSharan = (testName) => {
    dispatch(runTest({ testName, name: userData?.name }));
  };

  const refreshTests = () => {
    dispatch(refresh());
  };

  const stop = (name) => {
    if (name === "Representative") {
      dispatch(stopReprTest());
    }
    if (name === "Doctor") {
      dispatch(stopDocTest());
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await $api.get("/getTests");
        setData(response.data);
        fetchData();
      } catch (error) {
        setTimeout(() => {
          console.error(error);
          fetchData();
        }, 1000);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {!isAuth ? (
        <Login setIsAuth={setIsAuth} setUserData={setUserData} />
      ) : (
        <>
          <div className="user-data">
            <span className="user-name">{userData.name}</span>
            <img src={userData.picture} className="picture" />
          </div>
          <button className="refresh" onClick={refreshTests}>
            Refresh
          </button>
          <Inputs />
          <div className="main">
            {data.map((elem) => (
              <div key={elem.name} className="container-tests">
                <div className="main-test ">
                  <span className="main-text">Tests for {elem.name}</span>

                  <div className="buttons">
                    <img src={stopIcon} onClick={() => stop(elem.name)} className="stop-button" alt="" />
                    <img src={run} onClick={() => runTestInSharan(elem.name)} className="button-main-test" alt="" />
                  </div>
                </div>
                {elem.tests.map((test) => (
                  <div key={test.name} className="test">
                    {test.verified ? (
                      test.status ? (
                        <img className="icon" src={ok} alt="" />
                      ) : (
                        <img className="icon" src={error} alt="" />
                      )
                    ) : (
                      <img className="icon-wait" src={wait} alt="" />
                    )}
                    <div className="content">
                      <div className="name-test">
                        <span className="name-tests">
                          {elem.name === "Doctor"
                            ? "DVCSGeneral -" + convertCamelToNormal(test.name)
                            : convertCamelToNormal(test.name)}
                        </span>
                      </div>
                      <div className="buttons-rep">
                        {test.verified ? <Report report={test.report} status={test.status} /> : ""}
                        <img src={run} onClick={() => runTestInSharan(test.name)} className="button-test" alt="" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
