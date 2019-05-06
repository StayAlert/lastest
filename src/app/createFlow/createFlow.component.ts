import { Component, OnInit, Renderer2, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { interval } from 'rxjs';

// import * as $ from 'jquery';
declare let $: any;
//declare let $: any;
@Component({
  selector: 'app-createflow',
  templateUrl: './createFlow.component.html',
  styleUrls: ['./createFlow.component.css']

})

export class createFlowComponent implements OnInit, AfterViewInit{
  imgNameArray1:any[] = [];

  OutputsArr:any[] = [];

  APILinkI:string = 'Nothing';
  APILinkO:string = 'Nothing';
  pWordiOpen:string = '0';
  pBitiOpen:string = '0';
  pStatusOpen:string = '0';
  pWordiClose:string = '0';
  pBitiClose:string = '0';
  pStatusClose:string = '0';
  wordOUTOUT:string = '0';
  bitOUTPUT:string = '0';

  public idsOBJ = 'noID';

  @ViewChild('pdfCanvas') divSection: any;

  constructor(private http: HttpClient, private renderer:Renderer2, private el: ElementRef) {}

  ngOnInit() {

    // Create an Observable that will publish a value on an interval
    const secondsCounter = interval(5000);
    // Subscribe to begin publishing values
    secondsCounter.subscribe(n =>
    // console.log(`It's been ${n} seconds since subscribing!`)
      this.getOutput()
    );

    var self = this;

    var ID = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
      };


      $("#pdfCanvas").droppable({
        accept: '.draggablee',
        drop: function(e, ui) {
          if ($(ui.draggable)[0].id != "") {

            
            if($(ui.draggable)[0].id == "tank"){
                var classnn="tank";
                var target="#exampleModal2"
            }else if($(ui.draggable)[0].id == "pump"){
                var classnn="pump";
                var target="#exampleModal"
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

              },
              drag: function(event, ui) {

              },
              stop: function(event, ui) {

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

    $('body').on('click', 'img',function(){
      console.log("inFunc");
      var ids = this.id
      self.idsOBJ = ids;
      self.onSetForm(ids)
    })
  

    //$('body').on('mousedown', 'img', addDraggable())

  }

  ngAfterViewInit() {
    console.log(this.divSection.nativeElement);


    this.http.get<any>('http://localhost:3000/getItemInPage').subscribe(result=>{
      console.log(result)
      for (let i = 0; i < result.length; i++){
        const imgg = this.renderer.createElement('img');
        console.log(result[i].idItem)
        //id
        this.renderer.setProperty(imgg, 'id', result[i].idItem);
        //class
        let classes = result[i].classItem.split(" ")
        for(let n=0; n<classes.length; n++)
        {
          this.renderer.addClass(imgg, classes[n]);
        }
        //src
         this.renderer.setProperty(imgg, 'src', result[i].srcItem);
        //css
        let cssB = result[i].cssItem.replace(/\s/g, "")
        let cssA = cssB.split(";");
        console.log("cssA", cssA)
        for(let n=0; n<cssA.length; n++)
        {
          let css1 = cssA[n].split(":")
          let cssK = css1[0]
          let cssV = css1[1]
          this.renderer.setStyle(imgg, cssK, cssV);
        }
        this.renderer.setAttribute(imgg, 'data-toggle', result[i].toggleItem);
        this.renderer.setAttribute(imgg, 'data-target', result[i].targetItem);

        this.renderer.appendChild(this.divSection.nativeElement, imgg);

        $(imgg).draggable({
          containment: 'parent',
          start: function(event, ui) {
            // console.log("start")
            // console.log(event)
            // console.log(ui)
          },
          drag: function(event, ui) {
            // console.log("drag")
            // console.log(event)
            // console.log(ui)
          },
          stop: function(event, ui) {
            console.log("stop")
            console.log(event)
            console.log(ui)
          }
        });
      }
    });

    //console.log(Items.length)

    // if(localStorage.length > 0)
    // {
    //   for (let i = 0; i < localStorage.length; i++){
    //     const imgg = this.renderer.createElement('img');
    //     let key = localStorage.key(i);
    //     let item = JSON.parse(localStorage.getItem(key));
    //     // console.log(key);
    //     // console.log(item);
    //     //id
    //     this.renderer.setProperty(imgg, 'id', item.id);
    //     //class
    //     let classes = item.class.split(" ")
    //     for(let n=0; n<classes.length; n++)
    //     {
    //       this.renderer.addClass(imgg, classes[n]);
    //     }
    //     //src
    //      this.renderer.setProperty(imgg, 'src', item.src);
    //     let cssB = item.css.replace(/\s/g, "")
    //     let cssA = cssB.split(";");
    //     console.log(cssA)
    //     for(let n=0; n<cssA.length; n++)
    //     {
    //       console.log(cssA[n])
    //       let css1 = cssA[n].split(":")
    //       let cssK = css1[0]
    //       let cssV = css1[1]
    //       this.renderer.setStyle(imgg, cssK, cssV);
    //     }
    //     this.renderer.setAttribute(imgg, 'data-toggle', item.togle);
    //     this.renderer.setAttribute(imgg, 'data-target', item.target);

    //     this.renderer.appendChild(this.divSection.nativeElement, imgg);

    //     $(imgg).draggable({
    //       containment: 'parent',
    //       start: function(event, ui) {
    //         // console.log("start")
    //         // console.log(event)
    //         // console.log(ui)
    //       },
    //       drag: function(event, ui) {
    //         // console.log("drag")
    //         // console.log(event)
    //         // console.log(ui)
    //       },
    //       stop: function(event, ui) {
    //         console.log("stop")
    //         console.log(event)
    //         console.log(ui)
    //       }
    //     });
    //   }
    // }
    // this.renderer.appendChild(div, text);
    // this.renderer.appendChild(this.divSection, div);
  }

  onTestFind() {
    let testa = localStorage.getItem("ss");
    console.log(testa);
    if(testa == null){
      console.log("almost")
    }
  }

  onSave() {
    var havess;
    var needOutput;
    console.log("save")
    //console.log(this.divSection.nativeElement.querySelectorAll('img'))
    let arr1 = this.divSection.nativeElement.querySelectorAll('img');
    arr1.forEach(element => {
      let ids=element.id;
      let classs=element.className;
      let srcc=element.src;
      let csss=element.style.cssText;
      let togglee=element.dataset.toggle;
      let targett=element.dataset.target;
      let myObj = {
        id: ids,
        class: classs,
        src: srcc,
        css: csss,
        togle: togglee,
        target: targett
      }

      if((classs.indexOf("pump")>-1) || (classs.indexOf("tank")>-1)){
        console.log("can save")

        let showURL = 'http://localhost:3000/addShowOutput';

        let dataOfShow = {
          id: ids,
          class: classs
        }

        this.http.post<any>(showURL, dataOfShow).subscribe(res => {
        console.log(res);
        })
      }
      // let checkdata = {
      //   id: ids
      // }
      // let checkURL = 'http://localhost:3000/checkItem';
      
      // this.http.post<any>(checkURL, checkdata).subscribe(result => {
      //   console.log("checkDAta", result);
      //   console.log(result.Object)
      //   if(result.Object == "not thing"){
      //     havess = 0;
      //   }else{
      //     havess = 1;
      //   }
      // })

      let upURL = 'http://localhost:3000/addItemtoPage';

      this.http.post<any>(upURL, myObj).subscribe(res => {
      console.log(res);
      })
    }) 
  }

  onSetForm(idF) {
    //this.upDateForm.setValue('300');
    console.log(idF)
    let data = {
      id: idF
    }
    let reciveData;

    let upURL = 'http://localhost:3000/checkItem';
    // console.log(data)

    this.http.post<any>(upURL, data).subscribe(result => {
      reciveData = result;
      console.log(result);
      this.pWordiOpen = result.wordInputOpen;
      this.pBitiOpen = result.bitInputOpen;
      this.pStatusOpen = result.statusInputOpen;
      this.pWordiClose = result.wordInputClose;
      this.pBitiClose = result.bitInputClose;
      this.pStatusClose = result.statusInputClose;
      this.wordOUTOUT = result.wordOutput;
      this.bitOUTPUT = result.bitOutput;
      this.APILinkI = result.apiLinkI;
      this.APILinkO = result.apiLinkO;

      // console.log("1", this.pWordiOpen)
      // console.log("2", this.pBitiOpen)
      // console.log("3", this.pStatusOpen)
      // console.log("4", this.pWordiClose)
      // console.log("5", this.pBitiClose)
      // console.log("6", this.pStatusClose)
    })
  }

  onSendAddr(form: NgForm) {
    if (form.invalid) {
      return 0;
    }
    // let idObj0 = this.idsOBJ;
    //this.newTest = this.idsOBJ
    let idObj0 = this.idsOBJ;
    let apiLinkI0 = form.value.apiLinkI;
    let apiLinkO0 = form.value.apiLinkO;
    let wordInputOpen0 = form.value.wordInputOpen;
    let bitInputOpen0 = form.value.bitInputOpen;
    let statusInputOpen0 = form.value.statusInputOpen;
    let wordInputClose0 = form.value.wordInputClose;
    let bitInputClose0 = form.value.bitInputClose;
    let statusInputClose0 = form.value.statusInputClose;
    let wordOutput0 = form.value.wordOutput;
    let bitOutput0 = form.value.bitOutput;
    //console.log("id", this.newTest)
    let data = {
      idObj: idObj0,
      apiLinkI: apiLinkI0,
      apiLinkO: apiLinkO0,
      wordInputOpen: wordInputOpen0,
      bitInputOpen: bitInputOpen0,
      statusInputOpen: statusInputOpen0,
      wordInputClose: wordInputClose0,
      bitInputClose: bitInputClose0,
      statusInputClose: statusInputClose0,
      wordOutput: wordOutput0,
      bitOutput: bitOutput0
    }
    console.log("form", data)

    let upURL = 'http://localhost:3000/addAddress';
    console.log(data)

    this.http.post<any>(upURL, data).subscribe(res => {
      console.log(res);
    })
  }

  sendToHigh() {
    // const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    // let body = new HttpParams();
    // body.set('status', "1");
    // const sendUrl = 'http://localhost:3700/ControlInput1/00';
    // this.http.put(sendUrl, {"status": "1"}).subscribe(result => {
    //   console.log(result);
    // }, err => {
    //   console.log("err")
    // });

    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let body = new HttpParams();
    body.set('status', this.pStatusOpen)
    let sendUrl = this.APILinkI+this.pWordiOpen+this.pBitiOpen; 
    console.log("stat", this.pStatusOpen)
    console.log("url", sendUrl)

    this.http.put(sendUrl, {"status": this.pStatusOpen}).subscribe(result => {
      console.log(result);
    }, err => {
      console.log("err")
    });
  }

  sendToLow() {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let body = new HttpParams();
    body.set('status', this.pStatusClose)
    let sendUrl = this.APILinkO+this.pWordiClose+this.pBitiClose; 
    console.log("stat", this.pStatusClose)
    console.log("url", sendUrl)

    this.http.put(sendUrl, {"status": this.pStatusClose}).subscribe(result => {
      console.log(result);
    }, err => {
      console.log("err")
    });
  }

  getOutput() {
    // var a = [1,2,3]
    // for (let j of a)
    // {
    //   console.log(j)
    // }

    var idForShow;
    var classForShow;
    this.http.get<any>('http://localhost:3000/getShowOutout').subscribe(result=>{
      for(let s of result){
        idForShow = s.idItem;
        classForShow = s.classItem;
        let datasss = {
          idddd: s.idItem
        }
        this.http.post<any>('http://localhost:3000/getValuefromAddr', datasss).subscribe(res => {
          var LinkOut = res.apiLinkO+res.wordOutput+res.bitOutput

          this.http.get<any>(LinkOut).subscribe(result=>{
            // console.log("status", result.status)
            // console.log(idForShow)
            // console.log(classForShow)
            if(result.status == 1)
            {
              if(classForShow.indexOf("pump")>-1)
              {
                var elemented = document.querySelector("#"+idForShow)
                elemented.setAttribute('src', 'http://localhost:4200/assets/pump-on.png')
              }
            }
            else
            {
              if(classForShow.indexOf("pump")>-1)
              {
                var elemented = document.querySelector("#"+idForShow)
                elemented.setAttribute('src', 'http://localhost:4200/assets/pump.png')
              }
            }
          })
        })
      }
    });
  }

  // onGetidd() {
  //   var ids = this.newTest;
  //   console.log("inGetId", ids)
  //   return ids;
  // }
  // onGetIMG() {
  //   this.http.get<any>('http://localhost:3000/getNameimg').subscribe(result=>{
  //     this.imgNameArray1 = result.data;
  //   });
  // }
}

  

