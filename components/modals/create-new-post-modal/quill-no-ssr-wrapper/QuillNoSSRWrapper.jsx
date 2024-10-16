// components/modals/create-new-post-modal/quill-no-ssr-wrapper/QuillNoSSRWrapper.jsx
'use client'

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const QuillNoSSRWrapper = forwardRef((props, ref) => {
  const localRef = useRef()

  // Expose getEditor method to parent via ref
  useImperativeHandle(ref, () => ({
    getEditor: () => {
      if (localRef.current) {
        console.log('getEditor called')
        return localRef.current.getEditor()
      }
      console.error('localRef.current is undefined')
      return null
    },
  }))

  useEffect(() => {
    console.log('QuillNoSSRWrapper rendered with props:', props)
    console.log('QuillNoSSRWrapper ref:', ref)
  }, [props, ref])

  return <ReactQuill ref={localRef} {...props} />
})

QuillNoSSRWrapper.displayName = 'QuillNoSSRWrapper'

export default QuillNoSSRWrapper
