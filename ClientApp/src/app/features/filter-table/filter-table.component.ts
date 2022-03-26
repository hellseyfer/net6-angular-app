import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { Company, User } from './models';
import { UsersService } from './services/users.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.css'],
})
export class FilterTableComponent implements OnInit {
  users: User[];
  loading: boolean;
  eventoTabla: LazyLoadEvent;

  constructor(private _us: UsersService) {}

  ngOnInit() {}

  buildRequestUsers(
    skip: number,
    sortField?: string,
    sortOrder?: number,
    filters?: any
  ) {
    //this.request.skip = skip;
    this.loading = true;
    this._us.getUsers(skip, sortField, sortOrder, filters).subscribe((res) => {
      console.log(res);
      this.users = res;
      this.loading = false;
    });
  }

  onLazyLoad(e: LazyLoadEvent) {
    this.eventoTabla = e;
    const sortField = e.sortField ?? 'name';
    this.buildRequestUsers(e.first, sortField, e.sortOrder, e.filters);
  }

  onExport() {
    import('xlsx').then((xlsx) => {
      // saco los id de los users con 'destructuring synax'
      const obj = this.users.map((user) => {
        const { id, ...newUser } = user;
        return newUser;
      });

      // aplano el objeto
      const rows = obj.map(row => ({
        ... row,
        company: row.company.name
      }));

      // creo hoja del excel
      const worksheet = xlsx.utils.json_to_sheet(rows);
      // calculo ancho columnas
      const max_width_name = this.users.reduce(
        (w, r) => Math.max(w, r.name.length),
        10
      );
      const max_width_username = this.users.reduce(
        (w, r) => Math.max(w, r.username.length),
        10
      );
      //asigno anch columnas
      worksheet['!cols'] = [
        { wch: max_width_name },
        { wch: max_width_username },
        { wch: 20 },
        { wch: 10 },
        { wch: 20 },
        { wch: 14 },
        { wch: 10 },
        { wch: 15 }
      ];

      // creo conjunto de hojas (workbook)
      const workbook = { Sheets: { users: worksheet }, SheetNames: ['users'] };

      //creo hojas para las compañias y las añado al workbook
      const rows_company: Company[] = obj.map(row => row.company);

      rows_company.forEach(row => {
        let arr = [];
        arr.push(row);
        const worksheet = xlsx.utils.json_to_sheet(arr);
        xlsx.utils.book_append_sheet(workbook, worksheet, row.name);
      })

      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'sales');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
