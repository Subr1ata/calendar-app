import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    private appointmentsSubject = new BehaviorSubject<any[]>([]);
    appointments$ = this.appointmentsSubject.asObservable();

    addAppointment(appointment: any): void {
        const currentAppointments = this.appointmentsSubject.value;
        currentAppointments.push(appointment);
        this.appointmentsSubject.next(currentAppointments);
    }

    deleteAppointment(appointment: any): void {
        const currentAppointments = this.appointmentsSubject.value.filter(a => a !== appointment);
        this.appointmentsSubject.next(currentAppointments);
    }

    getAppointmentsForDate(date: Date): any[] {
        return this.appointmentsSubject.value.filter(a => new Date(a.date).toDateString() === date.toDateString());
    }

    getAppointments() {
        return this.appointmentsSubject;
    }
}
