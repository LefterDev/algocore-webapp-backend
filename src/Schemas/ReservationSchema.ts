import { Schema, model } from "mongoose";

const ReservationSchema = new Schema(
    {
        userid:{
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: String,
            required: true
        },
        bookDetails: {
            type: String,
            required: true
        }
    }
)

export const Reservation = model("Reservations", ReservationSchema, "Reservations");