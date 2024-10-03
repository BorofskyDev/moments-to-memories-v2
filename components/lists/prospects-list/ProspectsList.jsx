// components/lists/ProspectsList.jsx

import React from 'react'
import Link from 'next/link'
import styles from './ProspectsList.module.scss'

const ProspectsList = ({ prospects }) => {
  return (
    <ul className={styles.prospectsList}>
      {prospects.map((prospect) => (
        <li key={prospect.id} className={styles.clientItem}>
          <Link href='#'>
            {/* Placeholder for future prospect profile path, can change later */}
        
              <p title={prospect.name}>{prospect.name}</p>
              <p title={prospect.email}>{prospect.email || 'N/A'}</p>
              <p title={prospect.phone}>{prospect.phone || 'N/A'}</p>
            
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ProspectsList
