import AddAdmin from "../mini-components/AddAdmin/AddAdmin";
import AdminListCard from "../mini-components/AdminList/AdminListCard";
import styles from "./AdminList.module.css";
const clubs = [
  {
    name: "Admin 1",
    email: "admin@gmail.com",
    date: "12 APR/2023",
  },
  {
    name: "Admin 2",
    email: "admin2@gmail.com",
    date: "12 APR/2023",
  },
];
function AdminList() {
  return (
    <>
      <h1>Admin List</h1>
      <AddAdmin />
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {clubs.map((route, index) => {
            return (
              <AdminListCard
                key={index}
                name={route.name}
                email={route.email}
                date={route.date}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default AdminList;
