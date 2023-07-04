import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userData } from "../../store/authSlice";
import "./Inputs.css";
import $api from "../../http";
import { luhnAlgorithm } from "../../utils";

export const Inputs = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState("");
  const [id2, setId2] = useState("");
  const changeFirstNameInput = (name) => {
    setFirstName(name);
  };

  const changeLastNameInput = (name) => {
    setLastName(name);
  };

  const changeIdInput = (name) => {
    setId(name);
  };

  const changeId2Input = (name) => {
    setId2(name);
  };
  const setUserData = () => {
    dispatch(userData({ firstName, lastName, id, id2 }));
  };

  const generateId = () => {
    luhnAlgorithm(setId);
    luhnAlgorithm(setId2);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await $api.get("/user");
        setFirstName(response.data.firstname);
        setLastName(response.data.lastname);
        setId(response.data.id);
        setId2(response.data.id2);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container-inputs">
      <label className="label-input">
        Firstname
        <input placeholder="User firstname" value={firstName} onChange={(e) => changeFirstNameInput(e.target.value)} />
      </label>
      <label className="label-input">
        Lastname
        <input placeholder="User lastname" value={lastName} onChange={(e) => changeLastNameInput(e.target.value)} />
      </label>
      <label className="label-input">
        ID
        <input placeholder="User id" value={id} onChange={(e) => changeIdInput(e.target.value)} />
      </label>
      <label className="label-input">
        ID2
        <input placeholder="User id2" value={id2} onChange={(e) => changeId2Input(e.target.value)} />
      </label>
      <div className="container-buttons">
        <button className="save-button" onClick={setUserData}>
          Save
        </button>
        <button className="generate-button" onClick={generateId}>
          Generate Id
        </button>
      </div>
    </div>
  );
};
