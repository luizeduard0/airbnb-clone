import getCurrentUser from "@/app/actions/getCurrentUser"
import getListingById from "@/app/actions/getListingById"
import ClientOnly from "@/app/components/ClientOnly"
import ListingClient from "./ListingClient"
import getReservations from "@/app/actions/getReservations"

interface IParams {
  listingId: string
}

export default async function ListingPage({ params }: { params: IParams }) {
  const currentUser = await getCurrentUser()
  const listing = await getListingById(params)
  const reservations = await getReservations(params)

  if(!listing) {
    return (
      <ClientOnly>
        <div>Listing not found</div>
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser!}
        reservations={reservations}
      />
    </ClientOnly>
  )
}