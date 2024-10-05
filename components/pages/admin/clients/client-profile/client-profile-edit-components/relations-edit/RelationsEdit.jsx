'use client'

import React from 'react'
import PropTypes from 'prop-types'
import EditField from '@/components/layout/edit-field/EditField'
import DeleteButton from '@/components/buttons/delete-button/DeleteButton'
import AddButton from '@/components/buttons/add-button/AddButton'
import styles from './RelationsEdit.module.scss'

export const RelationsEdit = ({
  relations,
  canEdit,
  editedFields,
  handleInputChange,
  handleUpdateRelation,
  handleDeleteRelation,
  handleAddRelation,
}) => {
  return (
    <section className={styles.relations}>
      <h2>Relations</h2>
      {relations && relations.length > 0 ? (
        <ul>
          {relations.map((relation, index) => (
            <li key={index} className={styles.relationItem}>
              {canEdit ? (
                <>
                  <EditField
                    label='Name'
                    fieldName={`relationName-${index}`}
                    type='text'
                    value={
                      editedFields[`relationName-${index}`] ?? relation.name
                    }
                    onChange={(fieldName, value) => {
                      handleUpdateRelation(index, 'name', value)
                    }}
                  />
                  <EditField
                    label='Age'
                    fieldName={`relationAge-${index}`}
                    type='number'
                    value={editedFields[`relationAge-${index}`] ?? relation.age}
                    onChange={(fieldName, value) => {
                      handleUpdateRelation(index, 'age', value)
                    }}
                  />
                  <EditField
                    label='Relationship'
                    fieldName={`relationshipType-${index}`}
                    type='text'
                    value={
                      editedFields[`relationshipType-${index}`] ??
                      relation.relationshipType
                    }
                    onChange={(fieldName, value) => {
                      handleUpdateRelation(index, 'relationshipType', value)
                    }}
                  />
                  <DeleteButton
                    onClick={() => handleDeleteRelation(index)}
                    className={styles.deleteButton}
                    text='Delete Relation'
                  />
                </>
              ) : (
                <>
                  <p>
                    <strong>Name:</strong> {relation.name}
                  </p>
                  <p>
                    <strong>Age:</strong> {relation.age}
                  </p>
                  <p>
                    <strong>Relationship:</strong> {relation.relationshipType}
                  </p>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No relations added.</p>
      )}
      {canEdit && (
        <AddButton onClick={handleAddRelation} className={styles.addButton} />
      )}
    </section>
  )
}

RelationsEdit.propTypes = {
  relations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      age: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      relationshipType: PropTypes.string.isRequired,
    })
  ).isRequired,
  canEdit: PropTypes.bool.isRequired,
  editedFields: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleDeleteRelation: PropTypes.func.isRequired,
  handleAddRelation: PropTypes.func.isRequired,
}
