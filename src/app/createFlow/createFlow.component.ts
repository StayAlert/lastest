import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
@Component({
  selector: 'app-createflow',
  templateUrl: './createFlow.component.html',
  styleUrls: ['./createFlow.component.css']

})

export class createFlowComponent {
  imgNameArray1:any[] = []

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.onGetIMG();
    $(alert("can use"))
    
    $("#pdfCanvas").droppable({
      accept: '.resize-drag',
      drop: function(e, ui) {
        if ($(ui.draggable)[0].id != "") {
          var clone = ui.draggable.clone(false);
          clone.css('left', ui.offset.left-250)
               .css('top', ui.offset.top)
               .css('position', 'absolute')
               .removeClass('ui-draggable ui-draggable-dragging resize-drag')
               .addClass('dropped-element');
               
          $('#pdfCanvas').append(clone);
          $(clone).draggable({
            containment: 'parent'
          });
        }
      }
    });

    function addDraggable(){
      $(".resize-drag").draggable({
      helper: 'clone',
      cursor: 'move'
      });
    }
    function dblclickk(){
        //var classN = document.getElementByClassName("dropped-element").className;
        //alert(classN)
        alert("The paragraph was double-clicked.");
    }
    addDraggable();
  }

  onGetIMG() {
    this.http.get<any>('http://localhost:3000/getNameimg').subscribe(result=>{
      this.imgNameArray1 = result.data;
    });
  }
}

  

