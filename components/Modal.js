import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import { deleteItem } from "../store/Actions";

const Modal = () => {
  const { state, dispatch } = useContext(DataContext);
  const { modal } = state;

  const handleSubmit = (e) => {
    dispatch(deleteItem(modal.data, modal.id, "ADD_CART"));
    dispatch({ type: "ADD_MODAL", payload: {} });
  };

  return (
    <div
      className="modal fade"
      id="itemTrash"
      tabIndex="-1"
      aria-labelledby="itemTrashLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="itemTrashLabel">
              {modal.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Bạn có muốn xóa sản phẩm này ra khỏi giỏ hàng?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleSubmit}
            >
              Có
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Không
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
