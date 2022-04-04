import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { User } from '../../models';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css'],
})
export class TableUsersComponent{
  @Input() users: User[];
  @Output() tableEvent = new EventEmitter<LazyLoadEvent>();
  @Input() loading: boolean;
  @Output() export = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<boolean>();

  public endpoint ="/v1/up-my-file"

  loadUsers(e) {
    console.log(e);
    this.tableEvent.emit(e);
  }

  exportExcel(){
    this.export.emit();
  }

  onUpdate(){
    this.update.emit();
  }
 

}
