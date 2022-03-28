//CoreModule should have only services and be imported only once in the AppModule.
//The Core Module is a module we create to define common services. The services defined in the Core Module are instantiated once

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';
import { CustomValidationService } from '../auth/services/custom-validation.service';
import { JWTTokenService } from '../auth/services/jwttoken-service.service';

@NgModule({
  imports: [FormsModule],
  providers:[AuthService, JWTTokenService, CustomValidationService]
})

export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor (
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('YOu shall not run. Import only in AppModule');
    }
  }
}
