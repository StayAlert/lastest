import { Component, ElementRef, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css']
})

export class FlowComponent {
  selectedFile: File = null;

  constructor(private http: HttpClient, private el: ElementRef) {}

  onFileSelected(event) {
    console.log(event.target.files[0]);
    console.log("name: "+event.target.files[0].name);
    //console.log(event.target.files.item(0));
    this.selectedFile = <File>event.target.files[0];
  }


  onUpload() {

    // const HttpUploadOptions = {
    //   headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
    // }
    let upURL = 'http://localhost:3000/addpic';
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');

    let fileCount: number = inputEl.files.length;
    console.log(inputEl);
    console.log(fileCount);

    let fd = new FormData();
    //fd.append('image', this.selectedFile, this.selectedFile.name);

    if(fileCount>0)
    {
      fd.append('photo', this.selectedFile);
      this.http.post(upURL, fd).subscribe(res => {
        console.log(res);
      })
    }

  // onUpload() {
  //   let upURL = 'http://localhost:3000/addpic';
  //   let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');

  //   let fileCount: number = inputEl.files.length;
  //   console.log(inputEl);
  //   console.log(fileCount);

  //   let fd = new FormData();
  //   fd.append('image', this.selectedFile, this.selectedFile.name);

  //   if(fileCount>0)
  //   {
  //     fd.append('photo', this.selectedFile);
  //     this.http.post(upURL, fd).pipe(map((res:Response) => res.json())).subscribe(res => {
  //       console.log(res);
  //     })
  //   }
    // this.http.post('http://localhost:3000/addpic', fd).subscribe(res => {
    //   console.log(res);
    // });
  }
}
