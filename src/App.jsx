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
        console.error(error);
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
        </>
      )}
    </div>
  );
}

export default App;

// Клиент
// git clone https://github.com/artemkuskin/tests-fron.git
// npm i
// npm run start

// БД
//  sudo apt-get update
//  sudo apt-get install postgresql postgresql-contrib
//  sudo service postgresql start
//  sudo -u postgres psql
//  CREATE DATABASE tests;
//  CREATE USER postgres WITH PASSWORD 'p01f01';

//  GRANT ALL PRIVILEGES ON DATABASE tests TO postgres;

//  create new terminal

//  sudo su - postgres
//  psql -s tests

//  create TABLE category(
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(255)
// );

// create TABLE tests (
//     name VARCHAR(255),
//     category_id INTEGER,
//     status BOOLEAN,
//     verified BOOLEAN,
//      id SERIAL PRIMARY KEY,
//     report JSONB DEFAULT '{}'::jsonb,
//     FOREIGN KEY (category_id) REFERENCES category (id)
// );

// create TABLE userData(
//     firstName  VARCHAR(255),
//     lastName  VARCHAR(255),
//     id  VARCHAR(255),
//     id2  VARCHAR(255)
// );

// create TABLE report(
//     testName VARCHAR(255),
//     userName  VARCHAR(255),
//     startTest  VARCHAR(255),
//     endTest  VARCHAR(255),
//     result  VARCHAR(255),
//     report_id INTEGER,
//     message TEXT,
//     FOREIGN KEY (report_id) REFERENCES tests (id)
// );

// Тесты
// git clone git@bitbucket.org:sharanproj/auto-test-sharan.git
// git checkout test
// npm i
// npm run start
