import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TodosServices } from '../services/todos.services';
import { IList } from '../structures/lists';

// Tarjeta de una lista en "Mis listas", con el numero de tareas pendientes
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: []
})


export class ListComponent implements OnInit {

    @Input() list: IList;

    public pending$: Observable<number>;

    constructor(private todos: TodosServices) {}

    ngOnInit(): void {
        this.pending$ = this.todos.getAll(this.list.id).pipe(
            map(todos => todos.filter(todo => !todo.done).length)
        );
    }

    open() {
        console.log(this.list.id);
    }

}
