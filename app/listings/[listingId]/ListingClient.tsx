'use client'

import Container from "@/app/components/Container"
import { categories } from "@/app/components/navbar/Categories"
import { SafeListing, SafeUser } from "@/app/types"
import { Reservation } from "@prisma/client"
import { useMemo } from "react"
import ListingHead from "./ListingHead"
import ListingInfo from "./ListingInfo"

interface IListingClient {
  reservations?: Reservation[]
  listing: SafeListing & {
    user: SafeUser
  },
  currentUser: SafeUser
}

export default function ListingClient({
  reservations,
  listing,
  currentUser
}: IListingClient) {

  const category = useMemo(() => {
    return categories.find(category => category.label === listing.category)
  }, [listing.category])



  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
          <ListingHead
            id={listing.id}
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            currentUser={currentUser}
          />
          <div
            className='
              grid grid-cols 1
              md:grid-cols-7
              md:gap-10
              mt-6
            '
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}