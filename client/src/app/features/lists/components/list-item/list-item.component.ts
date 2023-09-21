import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ListItem } from '@app/shared/types/list-item';


@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() listItem!: ListItem;
  @Output() deleteItem = new EventEmitter<ListItem>();

  constructor() {
  }

  onDeleteClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (confirm(`Are you sure you want to delete the list "${this.listItem.title}"?`)) {
      this.deleteItem.emit(this.listItem);
    }
  }

  ngOnInit(): void {
  }

}
