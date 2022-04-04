import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FileUpload } from 'primeng/fileupload';
import { FileUploadService } from '../../services/file-upload.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {
  @Input() format: string;
  @Input() endpoint: string;
  @Input() label:string;
  @ViewChild('myUploader') myUploader:FileUpload;

  toUpload: File[];

  constructor(private _fs: FileUploadService, 
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onBasicUploadAuto(event){
    this.toUpload = [];
    for (let file of event.files) {
      this.toUpload.push(file);
    }
    this.uploadFileToActivity();
  }

  uploadFileToActivity() {
    this._fs.postFile(this.toUpload, this.format, this.endpoint).subscribe(data => {
      //alert('Success');
      this._snackBar.open('Archivo subido correctamente.',
      "Hecho");
      this.myUploader.clear();
    }, error => {
      this._snackBar.open("Esto es solo una demostracion", "Error");
      this.myUploader.clear();

      console.log(error);
    });
  }

}
