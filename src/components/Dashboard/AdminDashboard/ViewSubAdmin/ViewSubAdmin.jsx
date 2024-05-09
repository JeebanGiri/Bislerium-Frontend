import style from "./ViewSubAdmin.module.css";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useQuery, useQueryClient } from "react-query";
import { deleteSubAdmin, getSubAdmin } from "../../../../constants/Api";

const ViewSubAdmin = () => {
  const queryClient = useQueryClient();

  const token = localStorage.getItem("token");

  //--------FETCH Blogger INFO-------------
  const { data: AdminInfo } = useQuery("admin-details", () =>
    getSubAdmin(token)
  );

  console.log(AdminInfo, "admininfo");
  console.log(AdminInfo, "Admins");

  const blogId = AdminInfo?.data[0]?.id;
  console.log(blogId, "adminId");

  const tableData = AdminInfo?.data;
  console.log(tableData, "tables");

  const handleDeleteAdmin = async (blogId) => {
    try {
      await deleteSubAdmin(blogId, token);
      queryClient.invalidateQueries("admin-details");

      // Optimistically update the frontend state by removing the deleted room
      queryClient.setQueryData("admin-details", (oldData) =>
        oldData.filter((blog) => blog.id !== blogId)
      );

      // Optionally, you can refetch the data to ensure consistency with the backend
      await queryClient.refetchQueries("blog-details");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className={style["subadmin-table"]}>
        <table>
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Username</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Last Updated Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData &&
              tableData.map((admin, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{admin.fullName}</td>
                  <td>{admin.email}</td>
                  <td>{admin.role}</td>
                  <td>{admin.lastUpdatedDate || "-"}</td>
                  <td className={style.icons}>
                    <span>
                      <FiEdit2 /> Edit
                    </span>
                    <span onClick={() => handleDeleteAdmin(admin.userId)}>
                      <MdDelete /> Delete
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewSubAdmin;
