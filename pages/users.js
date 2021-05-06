import Head from "next/head";
import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import Link from "next/link";
import { useRouter } from "next/router";

const Users = () => {
  const { state, dispatch } = useContext(DataContext);
  const { users, auth } = state;

  const router = useRouter();

  if (!auth.user) return null;

  return (
    <div className="container shadow p-4 rounded">
      <Head>
        <title>Quản lý người dùng</title>
      </Head>
      <h1 className="text-uppercase text-center p-3 text-primary">
        Quản lý người dùng
      </h1>
      <div className="table-responsive rounded-bottom">
        <table className="table w-100 text-center">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã người dùng</th>
              <th>Ảnh đại diện</th>
              <th>Họ và tên</th>
              <th>Email</th>
              <th>Quản trị viên</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} style={{ cursor: "pointer" }}>
                <td>{index + 1}</td>
                <td className="text-start">{user._id}</td>
                <td>
                  <img
                    src={user.avatar}
                    alt={user.avatar}
                    className="shadow rounded"
                    style={{
                      width: "35px",
                      height: "35px",
                      overflow: "hidden",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td className="text-start">{user.name}</td>
                <td className="text-start">{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    user.root ? (
                      <i className="fas fa-check text-success">
                        <p style={{ margin: 0, padding: 0 }}>Root</p>
                      </i>
                    ) : (
                      <i className="fas fa-check text-success"></i>
                    )
                  ) : (
                    <i className="fas fa-times text-danger"></i>
                  )}
                </td>
                <td>
                  <Link
                    href={
                      auth.user.root && auth.user.email !== user.email
                        ? `/edit_user/${user._id}`
                        : "#!"
                    }
                  >
                    <a>
                      <i
                        className="fas fa-edit text-info ms-3 me-3"
                        title="Edit"
                      ></i>
                    </a>
                  </Link>
                  {auth.user.root && auth.user.email !== user.email ? (
                    <i
                      className="fas fa-trash-alt text-danger ms-3 me-3"
                      title="Remove"
                      data-bs-toggle="modal"
                      data-bs-target="#itemTrash"
                      onClick={() =>
                        dispatch({
                          type: "ADD_MODAL",
                          payload: [
                            {
                              data: users,
                              id: user._id,
                              title: user.name,
                              type: "ADD_USERS",
                            },
                          ],
                        })
                      }
                    ></i>
                  ) : (
                    <i
                      className="fas fa-trash-alt text-danger ms-3 me-3"
                      title="Remove"
                    ></i>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-dark" onClick={() => router.back()}>
          <i className="fas fa-arrow-circle-left" aria-hidden></i> Trở về
        </button>
      </div>
    </div>
  );
};

export default Users;
