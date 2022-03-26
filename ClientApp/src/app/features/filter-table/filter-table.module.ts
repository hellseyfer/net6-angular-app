import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTableComponent } from './filter-table.component';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

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
    RouterModule.forChild(routes),
  ],
  declarations: [FilterTableComponent, TableUsersComponent],
  exports: [FilterTableComponent],
})
export class FilterTableModule {}
