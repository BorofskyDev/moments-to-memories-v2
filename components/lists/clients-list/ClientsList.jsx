// components/lists/ClientsList.jsx

import styles from './ClientsList.module.scss'
import Link from 'next/link'

const ClientsList = ({ clients }) => {
  return (
    <ul className={styles.clientsList}>
      {clients.map((client) => (
        <li key={client.id} className={styles.clientItem}>
          <Link href='#'>
            {/* Placeholder for future client profile path, can change later */}
          
              <p className={styles.clientName} title={client.name}>{client.name}</p>
              <p className={styles.clientEmail} title={client.email}>{client.email || 'N/A'}</p>
              <p className={styles.clientPhone} title={client.phone}>{client.phone || 'N/A'}</p>
          
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ClientsList
