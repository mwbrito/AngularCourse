import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { uploadProgress, filterResponse } from 'src/app/shared/rxjs-operators';
import { environment } from 'src/environments/environment';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files: Set<File>;
  progress = 0;

  constructor(private service: UploadFileService) { }

  ngOnInit(): void {
  }

  onChange(event) {
    const selectedFiles = <FileList>event.srcElement.files;
    const filesNames = [];
    this.files = new Set();

    for (let i = 0; i < selectedFiles.length; i++) {
      filesNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }

    document.getElementById('customFileLabel').innerHTML = filesNames.join();

    this.progress = 0;
  }

  onUpload() {

    if (this.files && this.files.size > 0) {

      this.service.upload(this.files, "/api/upload")
        .pipe(
          uploadProgress(progress => this.progress = progress),
          filterResponse()
        )
        .subscribe();

      // .subscribe(
      //   (event : HttpEvent<Object>) => { 
      //     if(event.type === HttpEventType.UploadProgress){
      //       this.progress = Math.round((event.loaded * 100) / event.total);
      //     } 
      //     else if(event.type === HttpEventType.Response)
      //       console.log("Upload concluido");

      //    }
      // );
    }
  }

  onDownloadExcel() {
    this.service.download('/api/downloadExcel').subscribe((res: any) => {
      const file = new Blob([res], { type: res.type });


      // IE
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file);
        return;
      }

      const blob = window.URL.createObjectURL(file);

      const link = document.createElement('a');
      link.href = blob;
      link.download = 'report.xlsx';

      //link.click();

      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(() => {
        window.URL.revokeObjectURL(blob);
        link.remove();
      }, 100);


    });
  }

  onDownloadPDF() {
    this.service.download('/api/downloadExcel').subscribe((res: any) => {
      const file = new Blob([res], { type: res.type });


      // IE
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file);
        return;
      }

      const blob = window.URL.createObjectURL(file);

      const link = document.createElement('a');
      link.href = blob;
      link.download = 'report.pdf';

      //link.click();

      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(() => {
        window.URL.revokeObjectURL(blob);
        link.remove();
      }, 100);


    });
  }
}
