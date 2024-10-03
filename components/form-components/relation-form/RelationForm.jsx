'use client'

import PropTypes from 'prop-types'
import FormInput from '../form-input/FormInput'
import FlashWrapper from '@/libs/hoc/FlashWrapper'
import DeleteButton from '@/components/buttons/delete-button/DeleteButton'
import styles from './RelationForm.module.scss'

const RelationForm = ({
  relation,
  index,
  handleRelationChange,
  handleRemoveRelation,
}) => {
  return (
    <FlashWrapper>
      <div className={styles.relationForm}>
        <FormInput
          label='Name'
          type='text'
          id={`relation-name-${index}`}
          name='name'
          value={relation.name}
          onChange={(e) => handleRelationChange('name', e.target.value)}
          required
          placeholder='Name'
        />
        <FormInput
          label='Relationship Type'
          type='text'
          id={`relation-relationshipType-${index}`}
          name='relationshipType'
          value={relation.relationshipType}
          onChange={(e) =>
            handleRelationChange('relationshipType', e.target.value)
          }
          placeholder='Relationship Type'
        />
        <FormInput
          label='Age'
          type='number'
          id={`relation-age-${index}`}
          name='age'
          value={relation.age}
          onChange={(e) => handleRelationChange('age', e.target.value)}
          placeholder='Age'
        />
        {handleRemoveRelation && (
          <DeleteButton
            type='button'
            onClick={() => handleRemoveRelation(index)}
          />
        )}
      </div>
    </FlashWrapper>
  )
}

RelationForm.propTypes = {
  relation: PropTypes.shape({
    name: PropTypes.string,
    relationshipType: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleRelationChange: PropTypes.func.isRequired,
  handleRemoveRelation: PropTypes.func,
}

export default RelationForm
