import { create } from 'zustand';

export interface Booking {
  id: string;
  service: string;
  barber: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

interface BookingStore {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  getBookings: () => Booking[];
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookings: [],
  addBooking: (booking) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    set((state) => ({
      bookings: [...state.bookings, newBooking],
    }));
  },
  getBookings: () => get().bookings,
}));
