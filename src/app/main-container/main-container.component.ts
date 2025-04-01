import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlobalStore } from '@app/store';
import { CharacterCardComponent } from './components';

@Component({
  selector: 'app-main-container',
  imports: [CharacterCardComponent, RouterLink],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class MainContainerComponent {
  readonly store = inject(GlobalStore);
}
