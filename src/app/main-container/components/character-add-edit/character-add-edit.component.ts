import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  Signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomInputComponent } from '@app/components';
import { emptyCharacter } from '@app/models';
import { GlobalStore } from '@app/store';

interface CharacterForm {
  name: FormControl<string>;
  image: FormControl<string>;
}

@Component({
  selector: 'app-character-add-edit',
  imports: [ReactiveFormsModule, CustomInputComponent],
  templateUrl: './character-add-edit.component.html',
  styleUrl: './character-add-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CharacterAddEditComponent {
  id = input<number>();
  readonly store = inject(GlobalStore);

  characterToEdit = computed(
    () => this.store.getCharacter(Number(this.id())) ?? emptyCharacter
  );

  characterForm: Signal<FormGroup> = computed(
    () =>
      new FormGroup<CharacterForm>({
        name: new FormControl(this.characterToEdit().name, {
          nonNullable: true,
          validators: [Validators.required],
        }),
        image: new FormControl(this.characterToEdit().image, {
          nonNullable: true,
          validators: [Validators.required],
        }),
      })
  );

  onSubmit(): void {
    if (this.characterForm().valid) {
      const character = {
        ...(this.id() ? { id: Number(this.id()) } : {}),
        ...this.characterForm().value,
      };

      const methodToUSe = this.id() ? 'updateCharacter' : 'addCharacter';
      this.store[methodToUSe](character);
      this.characterForm().reset();
    }
  }
}
