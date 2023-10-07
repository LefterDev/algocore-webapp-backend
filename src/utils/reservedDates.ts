import { Reservation } from "../Schemas/ReservationSchema"

export default async () => {
    return await Reservation.find({}).sort("-startDate").exec()
}