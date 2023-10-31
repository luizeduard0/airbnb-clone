import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoritesListings from "../actions/getFavoritesListings";
import FavoritesClient from "./FavoritesClient";

export default async function FavoritesPage() {
  const currentUser = await getCurrentUser()
  const listings = await getFavoritesListings()

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No favorites found'
          subtitle="You don't have any favorites yet."
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <FavoritesClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  )

}