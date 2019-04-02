import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})

export class ControlComponent implements OnInit{

  imgNameArray1:any[] = []

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.onGetIMG();
  }

  onGetIMG() {
    this.http.get<any>('http://localhost:3000/getNameimg').subscribe(result=>{
      this.imgNameArray1 = result.data;
    });
  }

}
