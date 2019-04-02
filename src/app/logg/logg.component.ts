import { Component } from '@angular/core';

@Component({
  selector: 'app-logg',
  templateUrl: './logg.component.html',
  styleUrls: ['./logg.component.css']
})

export class LoggComponent{
  //displayedColumns = ['position', 'name', 'weight', 'symbol'];
  displayedColumns = ['position', 'name', 'stat'];
  dataSource = ELEMENT_DATA;
}

export interface PeriodicElement {
  name: string;
  position: number;
  stat: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Johny', stat: 'open'},
  {position: 2, name: 'Junjao', stat: 'open'},
  {position: 3, name: 'Cheaeim', stat: 'open'},
  {position: 4, name: 'Tomo', stat: 'open'},
  {position: 5, name: 'Boron', stat: 'close'},
  {position: 6, name: 'Michael', stat: 'close'},
  {position: 7, name: 'MigkyMouse', stat: 'close'},
  {position: 8, name: 'Duck', stat: 'close'},
  {position: 9, name: 'Juro', stat: 'close'},
  {position: 10, name: 'Neon', stat: 'close'},
];
