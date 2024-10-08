import ParagraphHeading from "@/components/headings/paragraph-heading/ParagraphHeading"
import MiniClientsList from "@/components/lists/mini-client-list/MiniClientList"
import styles from './AdminDashboard.module.scss'




function AdminDashboard() {
  return (
    <div className={styles.adminDashboard}>
      <div className={styles.adminDashboard__section}>
      <ParagraphHeading>Clients</ParagraphHeading>
      <MiniClientsList />
      </div>
    </div>
  )
}

export default AdminDashboard
