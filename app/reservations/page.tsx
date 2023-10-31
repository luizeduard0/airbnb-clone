import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

export default async function ReservationsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title='Unauthorized'
          subtitle="You're not authorized to view this page. Please login"
        />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({
    authorId: currentUser.id
  });

  if (!reservations) {
    return (
      <ClientOnly>
        <EmptyState
          title='No reservations'
          subtitle="You don't have any reservations yet."
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}