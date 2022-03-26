import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { User } from '../../models';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css'],
})
export class TableUsersComponent implements OnInit {
  @Input() users: User[];
  @Output() event = new EventEmitter<LazyLoadEvent>();
  @Input() loading: boolean;
  @Output() export = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  loadUsers(e) {
    console.log(e);
    this.event.emit(e);
  }

  exportExcel(){
    this.export.emit();
  }

}
