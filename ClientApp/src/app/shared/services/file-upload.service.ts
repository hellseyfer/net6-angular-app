import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private _http: HttpClient) { }

  postFile(filesToUpload, format, endpoint){
    const formData: FormData = new FormData();
    for (let file of filesToUpload) {
      formData.append(format, file, file.name);
    }


    let headers = new HttpHeaders();

    return this._http.post(endpoint, formData, { headers: headers });
  }

}
