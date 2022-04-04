//SharedModule should have anything but services and be imported in all modules that need the shared stuff (which could also be the AppModule).

import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import {FileUploadModule} from 'primeng/fileupload';

const material = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule
];

const primeng = [
  FileUploadModule,

]

@NgModule({
  declarations: [NavBarComponent, FileUploadComponent],
  imports: [
    CommonModule,
    material,
    primeng,
    RouterModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forChild()
  ],
  exports: [NavBarComponent, material, FormsModule, ReactiveFormsModule, FileUploadComponent],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> { // This ensures that services will be singletons.
      return {
        ngModule: SharedModule,
        providers: []
      };
    }
}
