import styles from "./AdminListCard.module.css";

function AdminListCard(props) {
  return (
    <>
      <tr>
        <td>
          <div className={styles.info}>{/* <span>{props.name}</span> */}</div>
        </td>
        <td>{/* <span>{props.email}</span> */}</td>
        <td>{/* <span>{props.date}</span> */}</td>
      </tr>
    </>
  );
}
export default AdminListCard;
