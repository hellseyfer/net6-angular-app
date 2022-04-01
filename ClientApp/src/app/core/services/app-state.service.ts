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

/*
* Este servicio lo cree para tener registro del estado general de la aplicacion pero a un bajo costo
* sin utilizar herramientas redux.
* De esta manera funciona pero tiene la contra que al subscribirse en stateApp$,
* dentro, perdes la chance de asignar un nuevo valor a alguno de los observables del combineLatest
* del constructor de AppStateService (que es el que asigna el estado finalmente) 
* debido que se puede producir un bucle infinito. todo valor que se asigne dentro del .stateApp$.subscribe()
* debe ser ajeno a las propiedades de AppState.
*/

@Injectable()
export class AppStateService extends StorageService {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  public stateApp$: BehaviorSubject<AppState> = new BehaviorSubject<AppState>(
    this.getStorageItem({key:"appState", storageArea: 'localStorage'})
  );

  constructor() {
    super();
    //asignacion del estado de la app
    combineLatest([
      this.usersChange$,
      this.eventoTablaChange$
    ])
      .pipe(takeUntil(this.destroyed$))
      .pipe(debounceTime(300))
      .subscribe(([usrs, evnt]) => {
        const obj = new AppState(usrs, evnt);
        this.stateApp$.next(obj);
        this.setStorageItem({key:"appState", value:obj, storageArea: 'localStorage'});
      });
  }

  load() {
    return this.stateApp$;
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    console.log('destroyed');
  }
}
