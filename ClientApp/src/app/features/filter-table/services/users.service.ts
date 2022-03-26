import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  endpoint = 'https://jsonplaceholder.typicode.com/users';
  
  constructor(private httpClient: HttpClient) {}

  getUsers(
    skip?: number,
    sortField?: string,
    sortOrder?: number,
    filters?: any
  ): Observable<User[]> {
    const order = sortOrder == 1 ? 'asc' : 'desc';
    const sort = sortField + ' ' + order;
    let queryParams = new HttpParams();
    if (filters?.name?.value) {
      queryParams = queryParams.append('name', filters.name.value); //Create new HttpParams
    }
    if (filters?.username?.value) {
      queryParams = queryParams.append('username', filters.username.value);
    }
    if (filters?.company?.value) {
      console.log(filters?.company?.value);
      queryParams = queryParams.append('company.name', filters?.company?.value);
    }
    queryParams = queryParams.append('orderby', sort);
    queryParams = queryParams.append('skip', skip);
    //queryParams = queryParams.append('take', environment.rows);

    return this.httpClient
      .get<User[]>(this.endpoint, {
        params: queryParams,
      })
      .pipe(map((res) => res.slice(skip, skip + environment.rows))); // fake paginacion
  }
}
