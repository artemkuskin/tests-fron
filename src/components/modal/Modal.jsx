import { convertCamelToNormal } from "../../utils";
import "./Modal.css";
const Modal = ({ report, isOpen, onClose, status }) => {
  return (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-header">
          <div className="header">
            <h3 className="modal-title">{convertCamelToNormal(report.testname)}</h3>
            <span className="modal-close" onClick={onClose}>
              &times;
            </span>
          </div>
          <div className="modal-body">
            <div className="modal-content">
              <div>
                <div>
                  <span className="table-content">User</span>: {report.username}
                </div>
                <div>
                  <span className="table-content">Time start test</span>: {report.starttest}
                </div>
                <div>
                  <span className="table-content">Time end test</span>: {report.endtest}
                </div>
                <div>
                  <span className="table-content">Result</span>: {report.result}
                </div>
                <div>
                  <span className="table-content">Message</span>: {report.message}
                </div>
                {status ? (
                  ""
                ) : (
                  <img className="report-img" src={`http://localhost:4000/img/${report.testname}.png`} alt="" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
