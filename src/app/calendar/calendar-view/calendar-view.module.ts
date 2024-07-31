import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarViewComponent } from './calendar-view.component';
import { AppointmentComponent } from '../appointment/appointment.component';

@NgModule({
    declarations: [],
    imports: [CommonModule, CalendarViewComponent, AppointmentComponent]
})
export class CalendarViewModule { }