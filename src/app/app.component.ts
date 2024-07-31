import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarViewComponent } from './calendar/calendar-view/calendar-view.component';
import { DateService } from './date.service';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CalendarViewComponent, DragDropModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'calendar-app';
  dates: Date[] = [];

  constructor(private date: DateService) { }

  ngOnInit() {
    this.initCalendarDates();
  }

  private initCalendarDates() {
    const { year, monthIndex } = this.date.getCurrent();

    this.dates = [
      new Date(year, monthIndex)
    ];
    console.log('this.dates::', this.dates);
  }
}
