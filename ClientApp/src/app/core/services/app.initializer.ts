import { APP_INITIALIZER, FactoryProvider } from "@angular/core";
import { tap } from "rxjs/operators";
import { AppStateService } from "./app-state.service";


function loadConfigFactory(_as: AppStateService) {
  // Easy as pie 🥧
  return () => _as.load().pipe(tap(value => console.log(value))); // 👈

  // How you might've done it "before"
  // return () => configService.getConfig().toPromise();
}

export const loadConfigProvider: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: loadConfigFactory,
  deps: [AppStateService],
  multi: true
};