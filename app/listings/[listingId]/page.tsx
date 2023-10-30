import getCurrentUser from "@/app/actions/getCurrentUser"
import getListingById from "@/app/actions/getListingById"
import ClientOnly from "@/app/components/ClientOnly"
import ListingClient from "./ListingClient"

interface IParams {
  listingId: string
}

export default async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingById(params)
  const currentUser = await getCurrentUser()

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
      />
    </ClientOnly>
  )
}