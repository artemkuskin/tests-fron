import { useDispatch } from "react-redux";
import "./App.css";
import { refresh, runTest, stopDocTest, stopReprTest } from "./store/authSlice";
import { useEffect, useState } from "react";
import ok from "./icon/icons8-ок.svg";
import error from "./icon/icons8-отмена.svg";
import wait from "./icon/icons8-геометрические-фигуры-окружность-24.png";
import run from "./icon/icons8-начало-48.png";
import stopIcon from "./icon/icons8-выключение-системы-40.png";
import $api from "./http";
import { Inputs } from "./components/inputs/Inputs";
import { convertCamelToNormal } from "./utils";
import Report from "./components/report/Report";

function App() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  const runTestInSharan = (testName) => {
    dispatch(runTest(testName));
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
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <button className="refresh" onClick={refreshTests}>
        Refresh
      </button>
      <Inputs />
      <div className="main">
        {data.map((elem) => (
          <div key={elem.name} className="container-tests">
            <div className="main-test ">
              {elem.name}

              <div className="buttons">
                <img src={stopIcon} onClick={() => stop(elem.name)} className="stop-button" alt="" />
                <img src={run} onClick={() => runTestInSharan(elem.name)} className="button-main-test" alt="" />
              </div>
            </div>
            {elem.tests.map((test) => (
              <div key={test.name} className="test">
                {test.verified ? (
                  test.status ? (
                    <img src={ok} alt="" />
                  ) : (
                    <img src={error} alt="" />
                  )
                ) : (
                  <img src={wait} alt="" />
                )}
                <div className="content">
                  <div className="name-test">
                    <div>{convertCamelToNormal(test.name)}</div>
                    {test.verified ? <Report report={test.report} status={test.status} /> : ""}
                  </div>

                  <img src={run} onClick={() => runTestInSharan(test.name)} className="button-test" alt="" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
