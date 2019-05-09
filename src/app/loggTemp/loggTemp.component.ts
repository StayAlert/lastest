import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-loggtemp',
  templateUrl: './loggTemp.component.html',
  styleUrls: ['./loggTemp.component.css']
})

export class LoggTempComponent implements OnInit, AfterViewInit{
  LogArray:any[] = [];

  
  constructor(private http: HttpClient, private el: ElementRef) {}

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/getLogTemperature').subscribe(result=>{
      this.LogArray = result;
      this.LogArray.reverse();
      console.log(this.LogArray)
    })
  }

  ngAfterViewInit() {
    // this.http.get<any>('http://localhost:3000/getLogActibity').subscribe(result=>{
    //   this.LogArray = result;
    //   this.LogArray.reverse();
    //   console.log(this.LogArray)
    // })
  }

}