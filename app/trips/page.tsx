import { redirect } from "next/navigation";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/");

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0)
    return (
      <EmptyState
        title="No trips found"
        subtitle="You have not made any reservations."
      />
    );

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;
