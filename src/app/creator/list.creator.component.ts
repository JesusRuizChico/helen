import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListsServices } from '../services/lists.services';

@Component({
    selector: 'app-list-creator',
    templateUrl: './list.creator.component.html',
    styleUrls: []
})


export class ListCreatorComponent {

    public title = '';
    public saving = false;

    constructor(private lists: ListsServices, private router: Router) {}

    save() {
        const title = this.title.trim();
        if (!title || this.saving) {
            return;
        }

        this.saving = true;
        this.lists.add(title).then(() => {
            this.router.navigate(['/']); // Regresa a Mis listas
        }).catch((error) => {
            console.error('Error saving list:', error);
            this.saving = false;
        });
    }

}
