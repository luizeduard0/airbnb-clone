import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import TripsClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="You'll need to sign in or sign up first."
          subtitle="Please login"
        />
      </ClientOnly>
    )
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if(!listings.length) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found."
          subtitle="Looks like you haven't add any properties yet"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <TripsClient 
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default PropertiesPage