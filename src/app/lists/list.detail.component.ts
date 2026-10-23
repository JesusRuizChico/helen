import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ListsServices } from '../services/lists.services';
import { TodosServices } from '../services/todos.services';
import { IList } from '../structures/lists';
import { ITodo } from '../structures/todos';

// Pantalla de una lista (/lists/:id): agregar, marcar y borrar tareas
@Component({
    selector: 'app-list-detail',
    templateUrl: './list.detail.component.html',
    styleUrls: []
})


export class ListDetailComponent implements OnInit {

    public listId: string;
    public list$: Observable<IList>;
    public todos$: Observable<ITodo[]>;
    public newTodo = '';

    constructor(private route: ActivatedRoute, private lists: ListsServices, private todos: TodosServices) {}

    ngOnInit(): void {
        this.listId = this.route.snapshot.paramMap.get('id');
        this.list$ = this.lists.get(this.listId);
        this.todos$ = this.todos.getAll(this.listId);
    }

    add() {
        const title = this.newTodo.trim();
        if (!title) {
            return;
        }
        this.newTodo = '';
        this.todos.add(this.listId, title).catch(error => console.error('Error saving todo:', error));
    }

    toggle(todo: ITodo) {
        this.todos.toggle(this.listId, todo).catch(error => console.error('Error updating todo:', error));
    }

    remove(todo: ITodo) {
        this.todos.remove(this.listId, todo).catch(error => console.error('Error deleting todo:', error));
    }

}
