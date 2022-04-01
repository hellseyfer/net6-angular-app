import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from 'src/app/features/filter-table/models';

 export interface StorageChange {
  key: string;
  value: any;
  storageArea: 'localStorage' | 'sessionStorage';
} 

export interface StorageGetItem {
  key: string;
  storageArea: 'localStorage' | 'sessionStorage';
}

@Injectable({ providedIn: 'root' })
export class StorageService {
  //public storageChange$: ReplaySubject<StorageChange> = new ReplaySubject<StorageChange>(1);
  public usersChange$: BehaviorSubject<User[]> =
    new BehaviorSubject<User[]>(
      this.getStorageItem({ key: 'users', storageArea: 'localStorage' })
    );

    public eventoTablaChange$: BehaviorSubject<LazyLoadEvent> =
    new BehaviorSubject<LazyLoadEvent>(
      this.getStorageItem({ key: 'eventoTabla', storageArea: 'localStorage' })
    );

  constructor() {}

  public setStorageItem(change: StorageChange): void {
    window[change.storageArea].setItem(
      change.key,
      JSON.stringify(change.value)
    );
    //this.storageChange$.next(change);
    switch (change.key) {
      case "users":
        this.usersChange$.next(change.value);
        break;
      case "eventoTabla":
        this.eventoTablaChange$.next(change.value);
        break;
    }
  }

  public getStorageItem(getItem: StorageGetItem) {
    const ret = window[getItem.storageArea].getItem(getItem.key);
    return JSON.parse(ret);
  }

  public deleteStorageItem(getItem: StorageGetItem): void {
    window[getItem.storageArea].removeItem(getItem.key);
  }


}
