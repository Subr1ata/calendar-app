import { Component, Input } from '@angular/core';
import { AppointmentService } from './appointment.servive';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule, DragDropModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})

export class AppointmentComponent {
  @Input() appointment: any;

  constructor(private appointmentService: AppointmentService) { }

  deleteAppointment(): void {
    this.appointmentService.deleteAppointment(this.appointment);
  }
}
