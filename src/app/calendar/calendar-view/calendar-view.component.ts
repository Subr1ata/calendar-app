import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment/appointment.servive';
import { DateService } from '../../date.service';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AppointmentComponent } from '../appointment/appointment.component';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [NgFor, CommonModule, AppointmentComponent, AppointmentFormComponent, DragDropModule, MatIconModule],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.css',
})

export class CalendarViewComponent implements OnInit, OnDestroy {
  dates: Date[] = [];
  appointments: any[] = [];
  weekDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  localDate = new Date();
  weeksCount: number = -1;
  weeks: any[] = [];
  currentYear: number;
  currentMonth: number;
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  private appointmentsSubscription: Subscription = new Subscription();

  constructor(private dateService: DateService, private appointmentService: AppointmentService) {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  generateCalendar() {
    this.weeks = [];
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    let currentDate = startDate;
    while (currentDate <= lastDayOfMonth || currentDate.getDay() !== 0) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const dayObj = {
          day: currentDate.getDate(),
          date: new Date(currentDate),
          schedules: this.getAppointmentsForDate(currentDate)
        };
        week.push(dayObj);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      this.weeks.push(week);
    }
  }

  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  ngOnInit(): void {
    this.dates = this.dateService.getDates();

    this.appointmentsSubscription = this.appointmentService.appointments$.subscribe(
      appointments => {
        this.appointments = appointments;
        this.generateCalendar(); // Regenerate the calendar whenever appointments change
      }
    );
    this.generateCalendar();
  }

  ngOnDestroy() {
    this.appointmentsSubscription.unsubscribe();
  }

  getAppointmentsForDate(date: Date) {
    return this.appointmentService.getAppointmentsForDate(date);
  }

  getWeeks() {
    const weeks: Date[][] = [];
    const firstDay = this.dates[0];
    const lastDay = this.dates[this.dates.length - 1];
    const firstDayOfWeek = new Date(firstDay);
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay());
    const lastDayOfWeek = new Date(lastDay);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + (7 - lastDayOfWeek.getDay()));

    for (let date = firstDayOfWeek; date <= lastDayOfWeek; date.setDate(date.getDate() + 7)) {
      const week: Date[] = [];
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(date);
        currentDate.setDate(currentDate.getDate() + i);
        week.push(currentDate);
      }
      weeks.push(week);
    }

    return weeks;
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  initializeDates() {
    const startDate = new Date();
    startDate.setDate(1);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);
    endDate.setDate(0);

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      this.dates.push(new Date(date));
    }
  }

  onDrop(event: CdkDragDrop<any>) {
    const dataDate = event.container.element.nativeElement.getAttribute('data-date');

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log('dataDate::::hit2', dataDate);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  handleDeleteAppointment(appointment: any) {
    this.appointmentService.deleteAppointment(appointment);
  }
}
