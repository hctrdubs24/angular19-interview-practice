import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  imports: [ReactiveFormsModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CustomInputComponent {
  control = input.required<FormControl>();
  label = input.required<string>();
  type = input.required<string>();
  placeholder = input.required<string>();
  errorMessage = input.required<string>();
}
