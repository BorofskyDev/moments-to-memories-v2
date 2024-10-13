// components/pages/services/services-page-component/ServicesPageComponent.jsx

'use client'

import React, { useEffect, useState } from 'react'
import styles from './ServicesPageComponent.module.scss'
import ServiceItem from '@/components/pages/home/services/service-item/ServiceItem'
import { db } from '@/libs/firebase' // Adjust the path if necessary
import { collection, getDocs } from 'firebase/firestore'
import BodyText from '@/components/layout/body-text/BodyText'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import PageHeading from '@/components/headings/page-heading/PageHeading'

const ServicesPageComponent = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesCollection = collection(db, 'services')
        const servicesSnapshot = await getDocs(servicesCollection)
        const servicesList = servicesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setServices(servicesList)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching services:', err)
        setError('Failed to load services.')
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (loading) {
    return <BodyText>Loading services...</BodyText>
  }

  if (error) {
    return <BodyText className={styles.error}>{error}</BodyText>
  }

  return (
    <div className={styles.servicesPage}>
      <PageHeading>It&apos;s your story - how will it be written?</PageHeading>
      <div className={styles.servicesList}>
        {services.map((service) => (
          <ServiceItem
            key={service.id}
            title={service.title}
            imageSrc={service.imageSrc}
            imageAlt={service.imageAlt}
            description={service.description}
            features={service.features}
          />
        ))}
      </div>
    </div>
  )
}

export default ServicesPageComponent
