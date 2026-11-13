import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ListsServices } from '../services/lists.services';
import { TodosServices } from '../services/todos.services';
import { IList } from '../structures/lists';
import { ITodo } from '../structures/todos';

// Pantalla de una lista (/list/:id): agregar pendientes y marcarlos como hechos
@Component({
    selector: 'app-list-detail',
    templateUrl: './list.detail.component.html',
    styleUrls: []
})


export class ListDetailComponent implements OnInit {

    public listId: string;
    public list$: Observable<IList>;
    public pending$: Observable<ITodo[]>;
    public newTodo = '';
    public newDescription = '';
    public showForm = true;

    constructor(private route: ActivatedRoute, private lists: ListsServices, private todos: TodosServices) {}

    ngOnInit(): void {
        this.listId = this.route.snapshot.paramMap.get('id');
        this.list$ = this.lists.get(this.listId);
        // Solo se muestran los pendientes; al hacerlos desaparecen de la lista
        this.pending$ = this.todos.getAll(this.listId).pipe(
            map(todos => todos.filter(todo => !todo.done))
        );
    }

    toggleForm() {
        this.showForm = !this.showForm;
    }

    add() {
        const title = this.newTodo.trim();
        if (!title) {
            return;
        }
        const description = this.newDescription.trim();
        this.newTodo = '';
        this.newDescription = '';
        this.todos.add(this.listId, title, description).catch(error => console.error('Error saving todo:', error));
    }

    complete(todo: ITodo) {
        this.todos.complete(this.listId, todo).catch(error => console.error('Error updating todo:', error));
    }

}
