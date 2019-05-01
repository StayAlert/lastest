import { Component, OnInit, Renderer2, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import * as $ from 'jquery';
declare let $: any;
//declare let $: any;
@Component({
  selector: 'app-createflow',
  templateUrl: './createFlow.component.html',
  styleUrls: ['./createFlow.component.css']

})

export class createFlowComponent implements OnInit, AfterViewInit{
  imgNameArray1:any[] = []

  @ViewChild('pdfCanvas') divSection: any;

  constructor(private http: HttpClient, private renderer:Renderer2, private el: ElementRef) {}

  ngOnInit() {
    // $('body').on('mousedown', 'img', function () {
    //     $('#sidebarCollapse').on('click', function () {
    //         $('#sidebar').toggleClass('active');
    //     });
    // });

    var ID = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
      };


      $("#pdfCanvas").droppable({
        accept: '.draggablee',
        drop: function(e, ui) {
          if ($(ui.draggable)[0].id != "") {

            
            if($(ui.draggable)[0].id == "tank"){
                var classnn="tank";
                var target="#exampleModal"
            }else if($(ui.draggable)[0].id == "pipe"){
                var classnn="pipe";
                var target="#exampleModal2"
            }

            var clone = ui.draggable.clone(false);
            clone.attr("id",ID)
                 .attr("data-toggle","modal")
                 .attr("data-target",target)
                 .css('left', ui.offset.left-250)
                 .css('top', ui.offset.top)
                 .css('position', 'absolute')
                 .removeClass('ui-draggable ui-draggable-dragging draggablee')
                 .addClass(classnn);

            $('#pdfCanvas').append(clone);
            $(clone).draggable({
              containment: 'parent',
              start: function(event, ui) {
                console.log("start")
                console.log(event)
                console.log(ui)
              },
              drag: function(event, ui) {
                console.log("drag")
                console.log(event)
                console.log(ui)
              },
              stop: function(event, ui) {
                console.log("stop")
                console.log(event)
                console.log(ui)
              }
            });
          }
        }
      });

    $(document).ready(function addDraggable(){
      $(".draggablee").draggable({
      helper: 'clone',
      cursor: 'move'
      });
    })

    $('body').on('dblclick', 'img',function(){
      console.log("inFunc");
      var ids = this.id
      console.log(ids);
  })

    //$('body').on('mousedown', 'img', addDraggable())

  }

  ngAfterViewInit() {
    console.log(this.divSection.nativeElement);
    // const div = this.renderer.createElement('div');
    // const text = this.renderer.createText('Hello world!');

    //id
    // this.renderer.setProperty(imgg, 'id', '_jdshdh');
    // //class
    // this.renderer.addClass(imgg, 'ui-draggable-handle');
    // this.renderer.addClass(imgg, 'pipe');
    // this.renderer.addClass(imgg, 'ui-draggable');
    // //src
    // this.renderer.setProperty(imgg, 'src', 'http://localhost:4200/assets/pipe0.png');
    // //css
    // this.renderer.setStyle(imgg, 'width', '100px');
    // this.renderer.setStyle(imgg, 'height', '100px');
    // this.renderer.setStyle(imgg, 'left', '267px');
    // this.renderer.setStyle(imgg, 'top', '236px');
    // this.renderer.setStyle(imgg, 'position', 'absolute');
    // //togle-target
    // this.renderer.setAttribute(imgg, 'data-toggle', 'modal');
    // this.renderer.setAttribute(imgg, 'data-target', '#exampleModal');

    //this.renderer.appendChild(this.divSection.nativeElement, imgg);

    if(localStorage.length > 0)
    {
      for (let i = 0; i < localStorage.length; i++){
        const imgg = this.renderer.createElement('img');
        let key = localStorage.key(i);
        let item = JSON.parse(localStorage.getItem(key));
        console.log(key);
        console.log(item);
        //id
        this.renderer.setProperty(imgg, 'id', item.id);
        //class
        let classes = item.class.split(" ")
        for(let n=0; n<classes.length; n++)
        {
          this.renderer.addClass(imgg, classes[n]);
        }
        //src
         this.renderer.setProperty(imgg, 'src', item.src);
        let cssB = item.css.replace(/\s/g, "")
        let cssA = cssB.split(";");
        console.log(cssA)
        for(let n=0; n<cssA.length; n++)
        {
          console.log(cssA[n])
          let css1 = cssA[n].split(":")
          let cssK = css1[0]
          let cssV = css1[1]
          this.renderer.setStyle(imgg, cssK, cssV);
        }
        this.renderer.setAttribute(imgg, 'data-toggle', item.togle);
        this.renderer.setAttribute(imgg, 'data-target', item.target);

        this.renderer.appendChild(this.divSection.nativeElement, imgg);

        $(imgg).draggable({
          containment: 'parent',
          start: function(event, ui) {
            console.log("start")
            console.log(event)
            console.log(ui)
          },
          drag: function(event, ui) {
            console.log("drag")
            console.log(event)
            console.log(ui)
          },
          stop: function(event, ui) {
            console.log("stop")
            console.log(event)
            console.log(ui)
          }
        });
      }
    }
    // this.renderer.appendChild(div, text);
    // this.renderer.appendChild(this.divSection, div);
  }

  onSave() {
    console.log("save")
    console.log(this.divSection.nativeElement.querySelectorAll('img'))
    let arr1 = this.divSection.nativeElement.querySelectorAll('img');
    arr1.forEach(element => {
      let ids=element.id;
      let classs=element.className;
      let srcc=element.src;
      let csss=element.style.cssText;
      let togglee=element.dataset.toggle;
      let targett=element.dataset.target;
      console.log(element.id)
      console.log(element.className)
      console.log(element.dataset.target)
      console.log(element.dataset.toggle)
      console.log(element.src)
      console.log(element.style.cssText)
      let myObj = {
        id: ids,
        class: classs,
        src: srcc,
        css: csss,
        togle: togglee,
        target: targett
      }

      localStorage.setItem(ids, JSON.stringify(myObj));
    })
    
  }

  // onGetIMG() {
  //   this.http.get<any>('http://localhost:3000/getNameimg').subscribe(result=>{
  //     this.imgNameArray1 = result.data;
  //   });
  // }
}

  

