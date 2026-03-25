import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Booking {
  id: number;
  service: string;
  shop: string;
  month: string;
  day: string;
  time: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  type: 'upcoming' | 'completed' | 'cancelled';
  alt?: boolean;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private _bookings = new BehaviorSubject<Booking[]>([
    { id: 1, service: 'Classic Fade Haircut', shop: 'Urban Fade Barbershop', month: 'OCT', day: '28', time: '2:30 PM', status: 'confirmed', type: 'upcoming', alt: false },
    { id: 2, service: 'Deep Tissue Massage', shop: 'Serenity Spa Hub', month: 'NOV', day: '02', time: '11:00 AM', status: 'confirmed', type: 'upcoming', alt: true },
    { id: 3, service: 'Beard Trim', shop: 'Urban Fade Barbershop', month: 'SEP', day: '15', time: '10:00 AM', status: 'completed', type: 'completed', alt: false },
    { id: 4, service: 'Hair Coloring', shop: 'Style Studio', month: 'OCT', day: '05', time: '4:00 PM', status: 'cancelled', type: 'cancelled', alt: true }
  ]);

  get bookings$(): Observable<Booking[]> {
    return this._bookings.asObservable();
  }

  cancelBooking(id: number) {
    const current = this._bookings.value;
    const updated = current.map(b => 
      b.id === id ? { ...b, status: 'cancelled' as const, type: 'cancelled' as const } : b
    );
    this._bookings.next(updated);
    console.log(`Booking ${id} marked as cancelled in the single source of truth.`);
  }

  rescheduleBooking(id: number, newTime: string) {
    const current = this._bookings.value;
    const updated = current.map(b => 
      b.id === id ? { ...b, time: newTime } : b
    );
    this._bookings.next(updated);
    console.log(`Booking ${id} rescheduled to ${newTime} in the single source of truth.`);
  }

  reactivateBooking(id: number): boolean {
    // Simulated availability check
    const isMockAvailable = true; // In real life, check shop/service timings
    if (isMockAvailable) {
      const current = this._bookings.value;
      const updated = current.map(b => 
        b.id === id ? { ...b, status: 'confirmed' as const, type: 'upcoming' as const } : b
      );
      this._bookings.next(updated);
      console.log(`Booking ${id} reactivated in the single source of truth.`);
      return true;
    }
    return false;
  }
}
