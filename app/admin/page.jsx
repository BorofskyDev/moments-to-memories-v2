import styles from './AdminDashboard.module.scss'
import DailyTodoList from "@/components/pages/admin/daily-todo-list/DailyTodoList"




function AdminDashboard() {
  return (
    <div className={styles.adminDashboard}>
      <div className={styles.adminDashboard__section}>
        <DailyTodoList />
      </div>
    </div>
  )
}

export default AdminDashboard
