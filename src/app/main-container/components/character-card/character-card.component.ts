import { JsonPipe, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Character } from '@app/models';
import { GlobalStore } from '@app/store';

@Component({
  selector: 'app-character-card',
  imports: [NgOptimizedImage, JsonPipe, RouterLink],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CharacterCardComponent {
  character = input.required<Character>();
  readonly store = inject(GlobalStore);

  removeCharacter(id: number) {
    this.store.removeCharacter(id);
  }
}
