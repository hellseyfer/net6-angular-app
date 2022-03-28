import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTableComponent } from './filter-table.component';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { UsersService } from './services/users.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

const routes = [
  {
    path: '',
    component: FilterTableComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [FilterTableComponent, TableUsersComponent],
  exports: [FilterTableComponent],
  providers: [UsersService]
})
export class FilterTableModule {}
