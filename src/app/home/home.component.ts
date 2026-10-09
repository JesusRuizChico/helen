import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ListsServices } from '../services/lists.services';
import { IList } from '../structures/lists';

@Component({
  selector: 'app-home',
  template: `
    <div class="page">
      <a routerLink="/new" class="primary-button">
        <i class="fa fa-plus"></i> Nueva lista
      </a>

      <ng-container *ngIf="lists$ | async as lists">
        <ul class="lists" *ngIf="lists.length; else empty">
          <li class="list-item" *ngFor="let list of lists">{{ list.name }}</li>
        </ul>
      </ng-container>

      <ng-template #empty>
        <p>Todavía no tienes listas. Crea la primera con "Nueva lista".</p>
      </ng-template>
    </div>
  `
})
export class HomeComponent {
  public lists$: Observable<IList[]>;

  constructor(private lists: ListsServices) {
    this.lists$ = this.lists.getAll().pipe(
      tap(lists => console.log('Mis listas:', lists))
    );
  }
}
