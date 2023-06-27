import { useState } from "react";
import { report } from "../../utils/constants";
import Modal from "../modal/Modal";

const Report = ({ report, status }) => {
  const [state, setState] = useState(false);

  const getReport = () => {
    if (!state) {
      setState(true);
    } else {
      setState(false);
    }
  };
  return (
    <div>
      <button onClick={getReport}>report</button>
      {state ? <Modal report={report} isOpen={state} onClose={getReport} status={status} /> : ""}
    </div>
  );
};
export default Report;
