// Arquitectura SSOT: Single Source of Truth
// Store: Almacena el estado de la aplicación

import { inject, InjectionToken } from '@angular/core';
import { Character } from '@app/models';
import { CharacterService } from '@app/services';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { lastValueFrom } from 'rxjs';

type StoreState = {
  characters: Character[];
};

const inicialState: StoreState = {
  characters: [],
};

const STORE_STATE = new InjectionToken<StoreState>('GlobalStore', {
  factory: () => inicialState,
});

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withState(() => inject(STORE_STATE)),
  withEntities<Character>(),
  withMethods((store, characterService = inject(CharacterService)) => ({
    getCharacter(id: number) {
      return store.characters().find((ch) => ch.id === id);
    },
    async addCharacter(character: Omit<Character, 'id'>) {
      try {
        await lastValueFrom(characterService.addCharacter(character));
        patchState(store, ({ characters }) => ({
          characters: [
            ...characters,
            { id: new Date().getTime(), ...character },
          ],
        }));
      } catch (error) {}
    },
    async removeCharacter(id: number) {
      try {
        await lastValueFrom(characterService.removeCharacter(id));
        patchState(store, ({ characters }) => ({
          characters: characters.filter((ch) => ch.id !== id),
        }));
      } catch (error) {}
    },
    async updateCharacter(character: Character) {
      try {
        await lastValueFrom(characterService.updateCharacter(character));

        patchState(store, ({ characters }) => ({
          characters: characters.map((ch) =>
            ch.id === character.id ? { ...ch, ...character } : ch,
          ),
        }));
      } catch (error) {}
    },
  })),
  withHooks({
    async onInit(store, characterService = inject(CharacterService)) {
      const characters = await lastValueFrom(
        characterService.getAllCharacters(),
      );
      patchState(store, { characters });
    },
  }),
);
