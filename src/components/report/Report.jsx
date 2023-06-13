import { useState } from "react";
import { report } from "../../utils/constants";

const Report = () => {
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
      {state ? (
        <div>
          <div>{report.user}</div> <div>{report.start}</div> <div>{report.end}</div> <div>{report.result}</div>
          <img className="report-img" src={report.sreenshot} alt="" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Report;
