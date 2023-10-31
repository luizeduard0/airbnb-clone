'use client'

import { useRouter } from "next/navigation"
import Container from "../components/Container"
import Heading from "../components/Heading"
import ListingCard from "../components/listings/ListingCard"
import { SafeListing, SafeUser } from "../types"
import { useCallback, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

interface IPropertiesClient {
  listings: SafeListing[]
  currentUser: SafeUser
}

export default function PropertiesClient({
  listings,
  currentUser
}: IPropertiesClient) {

  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback((id: string) => {
    setDeletingId(id)
    axios.delete(`/api/listings/${id}`)
      .then(() => {
        toast.success('Listing deleted')
        router.refresh()
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || 'Something went wrong')
      })
      .finally(() => {
        setDeletingId('')
      })
  }, [router])

  return (
    <Container>
      <Heading
        title='Properties'
        subtitle="List of properties you've added."
      />
      <div
        className='
          mt-10 grid grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        '
      >
        {listings.map(listing => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel='Delete Property'
          />
        ))}
      </div>
    </Container>
  )
}