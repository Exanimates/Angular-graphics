import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { Resources } from '../types/resources';


@Component({
  selector: 'resource-form',
  standalone: true,
  imports: [
    FormsModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatButtonModule,
    MatGridListModule
  ],
  providers: [
    provideNativeDateAdapter(), 
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
  templateUrl: './resource-form.component.html',
  styleUrl: './resource-form.component.scss'
})
export class ResourceFormComponent {
    @Output() resourceSizeChange = new EventEmitter<Resources>();

    validationMessage: string = '';

    resource: (string | null) = null;
    dateInputResource: (Date | null) = null;

    minDate: Date = new Date();

    save() {
      if (parseFloat(this.resource!) < 0 || parseFloat(this.resource!) > 1000) {
        this.validationMessage = 'Допустимое значение от 0 до 1000';
        return;
      }

      this.validationMessage = '';

      if (this.resource != null && this.dateInputResource != null) {
        this.resourceSizeChange.emit({ resource: this.resource, dateInputResource: this.dateInputResource });
      }
    }

    clear() {
      this.validationMessage = '';
      this.resource = null;
      this.dateInputResource = null;
    }
}
