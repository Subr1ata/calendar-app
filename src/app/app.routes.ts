import { Routes } from '@angular/router';

export const routes: Routes = [{ path: '', redirectTo: 'calendar', pathMatch: 'full' },
{ path: 'calendar', loadComponent: () => import('./calendar/calendar-view/calendar-view.component').then(m => m.CalendarViewComponent) },
{ path: 'add-appointment', loadComponent: () => import('./calendar/appointment-form/appointment-form.component').then(m => m.AppointmentFormComponent) }
];
