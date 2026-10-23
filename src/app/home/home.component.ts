import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ListsServices } from '../services/lists.services';
import { IList } from '../structures/lists';

@Component({
  selector: 'app-home',
  template: `
    <div class="page">
      <ng-container *ngIf="lists$ | async as lists">
        <div class="cards" *ngIf="lists.length; else empty">
          <app-list *ngFor="let list of lists" [list]="list"></app-list>
        </div>
      </ng-container>

      <ng-template #empty>
        <p class="empty">Todavía no tienes listas. Crea la primera con el botón +.</p>
      </ng-template>
    </div>

    <a routerLink="/new" class="fab" aria-label="Nueva lista" title="Nueva lista">
      <i class="fa fa-plus"></i>
    </a>
  `
})
export class HomeComponent {
  public lists$: Observable<IList[]>;

  constructor(private lists: ListsServices) {
    this.lists$ = this.lists.getAll();
  }
}
