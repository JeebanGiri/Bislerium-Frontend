import style from "./ViewSubAdmin.module.css";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const ViewSubAdmin = () => {
  return (
    <>
      <h1>View SubAdmin</h1>
      <br />
      <div className="add-button">
        <button type="add" className={style.submitButton}>
          Add
        </button>
      </div>

      <div className={style["subadmin-table"]}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Posting Date</th>
              <th>Last Updated Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>subadmin</td>
              <td>sudamind@gmail.com</td>
              <td>2021-11-10 24:58:11</td>
              <td>2022-03-27 11:27</td>
              <td className={style.icons}>
                <span>
                  <FiEdit2 />
                </span>
                <span>
                  <MdDelete />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewSubAdmin;
