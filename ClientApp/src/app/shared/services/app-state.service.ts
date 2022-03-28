import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { BehaviorSubject, combineLatest, ReplaySubject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { User } from 'src/app/features/filter-table/models';
import { StorageChange, StorageService } from './storage.service';

export class AppState {
  users: User[];
  eventoTabla: LazyLoadEvent
  constructor(u: User[], e: LazyLoadEvent) {
    this.users = u;
    this.eventoTabla = e;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  public stateApp$: BehaviorSubject<AppState> = new BehaviorSubject<AppState>(
    null
  );

  constructor(private _storage: StorageService) {
    combineLatest([
      this._storage.usersChange$,
      this._storage.eventoTablaChange$
    ])
      .pipe(takeUntil(this.destroyed$))
      .pipe(debounceTime(500))
      .subscribe(([usrs, evnt]) => {
        const obj = new AppState(usrs, evnt);
        this.stateApp$.next(obj);
        this.setStorageItem({key:"appState", value:obj, storageArea: 'localStorage'});
      });
  }

  setStorageItem(change) {
    this._storage.setStorageItem(change);
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    console.log('destroyed');
  }
}
