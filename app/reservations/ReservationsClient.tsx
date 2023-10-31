'use client'

import { useRouter } from "next/navigation"
import Container from "../components/Container"
import Heading from "../components/Heading"
import ListingCard from "../components/listings/ListingCard"
import { SafeReservation, SafeUser } from "../types"
import axios from "axios"
import { useState, useCallback } from "react"
import toast from "react-hot-toast"

interface IReservationsClient {
  reservations: SafeReservation[]
  currentUser: SafeUser | null
}

export default function ReservationsClient({
  reservations,
  currentUser
}: IReservationsClient) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback((id: string) => {
    setDeletingId(id)
    axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success('Reservation cancelled')
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
        title='Reservations'
        subtitle="Where you've been and where you're going to"
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
        {reservations.map(reservation => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            currentUser={currentUser}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel='Cancel Reservation'
          />
        ))}
      </div>
    </Container>
  )
}