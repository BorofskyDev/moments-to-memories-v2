'use client'


import EditField from '@/components/layout/edit-field/EditField'
import styles from './BasicClientInfoEdit.module.scss'
import InternalPageLink from '@/components/links/internal-page-link/InternalPageLink'

export const BasicClientInfoEdit = ({
  clientData,
  editedFields,
  canEdit,
  handleInputChange,
  formatDate,
}) => {
  return (
    <section className={styles.basicInfo}>
      {canEdit ? (
        <>
        <InternalPageLink href={`/clients/${clientData.id}`}>{clientData.name}'s profile.</InternalPageLink>
          <EditField
            label='Name'
            fieldName='name'
            type='text'
            value={editedFields.name ?? clientData.name}
            onChange={handleInputChange}
          />
          <EditField
            label='Email'
            fieldName='email'
            type='email'
            value={editedFields.email ?? clientData.email}
            onChange={handleInputChange}
          />
          <EditField
            label='Phone'
            fieldName='phone'
            type='text'
            value={editedFields.phone ?? clientData.phone}
            onChange={handleInputChange}
          />
          <EditField
            label='Age'
            fieldName='age'
            type='number'
            value={editedFields.age ?? clientData.age}
            onChange={handleInputChange}
          />
          <EditField
            label='Birthday'
            fieldName='birthday'
            type='date'
            value={
              editedFields.birthday
                ? formatDate(editedFields.birthday)
                : formatDate(clientData.birthday)
            }
            onChange={handleInputChange}
          />
          <EditField
            label={
              clientData.type === 'client' ? 'Client Since' : 'Prospect Since'
            }
            fieldName='createdAt'
            type='date'
            value={
              editedFields.createdAt
                ? formatDate(editedFields.createdAt)
                : formatDate(clientData.createdAt)
            }
            onChange={handleInputChange}
          />
        </>
      ) : (
        <>
          <p>
            <strong>Name:</strong> {clientData.name}
          </p>
          <p>
            <strong>Email:</strong> {clientData.email}
          </p>
          <p>
            <strong>Phone:</strong> {clientData.phone}
          </p>
          <p>
            <strong>Age:</strong> {clientData.age}
          </p>
          <p>
            <strong>Birthday:</strong> {formatDate(clientData.birthday)}
          </p>
          <p>
            <strong>
              {clientData.type === 'client' ? 'Client Since' : 'Prospect Since'}
              :
            </strong>{' '}
            {formatDate(clientData.createdAt)}
          </p>
        </>
      )}
    </section>
  )
}


