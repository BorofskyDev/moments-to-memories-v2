import { useState } from 'react'

const useAddRelation = () => {
  const [isAdding, setIsAdding] = useState(false)

  const handleStart = () => setIsAdding(true)
  const handleCancel = () => setIsAdding(false)

  return {
    isAdding,
    handleStart,
    handleCancel,
  }
}

export default useAddRelation
