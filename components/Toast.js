const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <div
      className={`toast show position-fixed text-light shadow ${bgColor}`}
      style={{ top: "5px", right: "5px", zIndex: 9, minWidth: "280px" }}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className={`toast-header ${bgColor} text-light`}>
        <strong className="me-auto">{msg.title}</strong>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          style={{ outline: "none" }}
          onClick={handleShow}
        ></button>
      </div>
      <div className="toast-body">{msg.msg}</div>
    </div>
  );
};

export default Toast;
