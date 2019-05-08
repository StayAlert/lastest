import { Component, OnInit, Renderer2, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { interval } from 'rxjs';
//import { Routes, RouterModule, Router } from '@angular/router';

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

  PumpAPILinkI:string = 'Nothing';
  PumpAPILinkO:string = 'Nothing';
  PumppWordiOpen:string = '0';
  PumppBitiOpen:string = '0';
  PumppStatusOpen:string = '0';
  PumppWordiClose:string = '0';
  PumppBitiClose:string = '0';
  PumppStatusClose:string = '0';
  PumpwordOUTOUT:string = '0';
  PumpbitOUTPUT:string = '0';

  TankAPILinkO:string = 'Nothing';
  TankwordOUTPUT:string = '0';
  TankbitOUTPUT:string = '0';

  TempAPILinkO:string = 'Nothing';
  TempID:string = 'Nothing';

  public idsOBJ = 'noID';
  public classOBJ = 'noClass';

  @ViewChild('pdfCanvas') divSection: any;

  constructor(private http: HttpClient, private renderer:Renderer2, private el: ElementRef) {}

  ngOnInit() {

    // Create an Observable that will publish a value on an interval
    const secondsCounter = interval(2000);
    //Subscribe to begin publishing values
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
            }else if($(ui.draggable)[0].id == "pipe"){
                var classnn="pipe";
                var target="#exampleModal0"
            }else if($(ui.draggable)[0].id == "temp"){
                var classnn="temp"
                var target="#exampleModal3"
            }
            var clone = ui.draggable.clone(false);
            clone.attr("id",ID)
                 .attr("data-toggle","modal")
                 .attr("data-target",target)
                 .css('left', ui.offset.left-250)
                 .css('top', ui.offset.top)
                 .css('position', 'absolute')
                 .removeClass('ui-draggable ui-draggable-dragging draggablee temp')
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
            })
          }
        }
      });

    $(document).ready(function addDraggable(){
      $(".draggablee").draggable({
      helper: 'clone',
      cursor: 'move'
      });
    })

    // $(document).ready(function addDraggable(){
    //   $(".draggablee").resizable({
    //   helper: 'clone',
    //   cursor: 'move'
    //   });
    // })

    $('body').on('click', 'img, p',function(){
      console.log("inFunc");
      var ids = this.id
      self.idsOBJ = ids;
      var classses = this.className.split(" ")
      self.classOBJ = classses[1];
      //console.log("class2",classses[1])
      self.onSetForm(ids)
    })

    // $('body').on('click', 'p',function(){
    //   console.log("inFunc");
    //   var ids = this.id
    //   self.idsOBJ = ids;
    //   var classses = this.className.split(" ")
    //   self.classOBJ = classses[1];
    //   //console.log("class2",classses[1])
    //   self.onSetForm(ids)
    // })
  

    //$('body').on('mousedown', 'img', addDraggable())

  }

  ngAfterViewInit() {
    console.log(this.divSection.nativeElement);


    this.http.get<any>('http://localhost:3000/getItemInPage').subscribe(result=>{
      console.log(result)
      for (let i = 0; i < result.length; i++){
        //const imgg = this.renderer.createElement('img');
        let classFrom = result[i].classItem.split(" ");
        let thisClasss = classFrom[1];
        console.log(result[i].idItem)
        //id
        //this.renderer.setProperty(imgg, 'id', result[i].idItem);
        if(thisClasss == "temp")
        {
          const imgg = this.renderer.createElement('p');
          //id
          this.renderer.setProperty(imgg, 'id', result[i].idItem);
          console.log("helloTemp")
          //class
          let classes = result[i].classItem.split(" ")
          for(let n=0; n<classes.length; n++)
          {
            this.renderer.addClass(imgg, classes[n]);
          }
          //src
          //this.renderer.setProperty(imgg, 'src', result[i].srcItem);
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
        else
        {
          const imgg = this.renderer.createElement('img');
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
    // let testa = localStorage.getItem("ss");
    // console.log(testa);
    // if(testa == null){
    //   console.log("almost")
    // }
  }

  onSave() {
    var havess;
    var needOutput;
    console.log("save")
    //console.log(this.divSection.nativeElement.querySelectorAll('img'))
    let arr1 = this.divSection.nativeElement.querySelectorAll('img');
    let arr2 = this.divSection.nativeElement.querySelectorAll('p');
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

      console.log("img", myObj)

      if((classs.indexOf("pump")>-1) || (classs.indexOf("tank")>-1)){
        console.log("can save")
        let classForSave = classs.split(" ")

        let showURL = 'http://localhost:3000/addShowOutput';

        let dataOfShow = {
          id: ids,
          class: classForSave[1]
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

    arr2.forEach(element => {
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
      

      console.log("temp", myObj)
      let classForSave = classs.split(" ")

      let showURL = 'http://localhost:3000/addShowOutput';

      let dataOfShow = {
        id: ids,
        class: classForSave[1]
      }

      this.http.post<any>(showURL, dataOfShow).subscribe(res => {
        console.log(res);
      })

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

    if (this.classOBJ == "pump")
    {
      let upURL = 'http://localhost:3000/checkItemPump';
      // console.log(data)

      this.http.post<any>(upURL, data).subscribe(result => {
        console.log(result);
        this.PumppWordiOpen = result.wordInputOpen;
        this.PumppBitiOpen = result.bitInputOpen;
        this.PumppStatusOpen = result.statusInputOpen;
        this.PumppWordiClose = result.wordInputClose;
        this.PumppBitiClose = result.bitInputClose;
        this.PumppStatusClose = result.statusInputClose;
        this.PumpwordOUTOUT = result.wordOutput;
        this.PumpbitOUTPUT = result.bitOutput;
        this.PumpAPILinkI = result.apiLinkI;
        this.PumpAPILinkO = result.apiLinkO;
      })
    }
    else if (this.classOBJ == "tank")
    {
      let upURL = 'http://localhost:3000/checkItemTank';
      this.http.post<any>(upURL, data).subscribe(result => {
        console.log(result);
        this.TankAPILinkO = result.apiLinkO;
        this.TankwordOUTPUT = result.wordOutput;
        this.TankbitOUTPUT = result.bitOutput;
      })
    }
    else if (this.classOBJ == "temp")
    {
      let upURL = 'http://localhost:3000/checkItemTemp';
      this.http.post<any>(upURL, data).subscribe(result => {
        console.log(result);

        this.TempAPILinkO = result.apiLinkO;
        this.TempID = result.TempID;
      })
    }
  }

  onSendAddr(form: NgForm) {
    if (form.invalid) {
      return 0;
    }
    // let idObj0 = this.idsOBJ;
    //this.newTest = this.idsOBJ
    console.log("checkClass",this.classOBJ)
    if(this.classOBJ == "pump")
    {
      console.log("form", form)
      let idObj0 = this.idsOBJ;
      let classObj0 = this.classOBJ;
      let apiLinkI0 = form.value.PumpapiLinkI;
      let apiLinkO0 = form.value.PumpapiLinkO;
      let wordInputOpen0 = form.value.PumpwordInputOpen;
      let bitInputOpen0 = form.value.PumpbitInputOpen;
      let statusInputOpen0 = form.value.PumpstatusInputOpen;
      let wordInputClose0 = form.value.PumpwordInputClose;
      let bitInputClose0 = form.value.PumpbitInputClose;
      let statusInputClose0 = form.value.PumpstatusInputClose;
      let wordOutput0 = form.value.PumpwordOutput;
      let bitOutput0 = form.value.PumpbitOutput;
      //console.log("id", this.newTest)
      let data = {
        idObj: idObj0,
        classObj: classObj0,
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

      let upURL = 'http://localhost:3000/addAddressPump';
      console.log(data)

      this.http.post<any>(upURL, data).subscribe(res => {
        console.log(res);
      })
    }
    else if(this.classOBJ == "tank")
    {
      let idObj0 = this.idsOBJ;
      let classObj0 = this.classOBJ;
      let apiLinkO0 = form.value.TankapiLinkO;
      let wordOutput0 = form.value.TankwordOutput;
      let bitOutput0 = form.value.TankbitOutput;
      let data = {
        idObj: idObj0,
        classObj: classObj0,
        apiLinkO: apiLinkO0,
        wordOutput: wordOutput0,
        bitOutput: bitOutput0
      }
      console.log("form", data)

      let upURL = 'http://localhost:3000/addAddressTank';
      console.log(data)

      this.http.post<any>(upURL, data).subscribe(res => {
        console.log(res);
      })
    }
    else if(this.classOBJ == "temp")
    {
      let idObj0 = this.idsOBJ;
      let classObj0 = this.classOBJ;
      let apiLinkO0 = form.value.TempapiLinkO;
      let TempID0 = form.value.TempID;
      let data = {
        idObj: idObj0,
        classObj: classObj0,
        apiLinkO: apiLinkO0,
        TempID: TempID0
      }
      console.log("form", data)

      let upURL = 'http://localhost:3000/addAddressTemp';
      console.log(data)

      this.http.post<any>(upURL, data).subscribe(res => {
        console.log(res);
      })
    }
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
    body.set('status', this.PumppStatusOpen)
    let sendUrl = this.PumpAPILinkI+this.PumppWordiOpen+this.PumppBitiOpen; 
    console.log("stat", this.PumppStatusOpen)
    console.log("url", sendUrl)

    this.http.put(sendUrl, {"status": this.PumppStatusOpen}).subscribe(result => {
      console.log(result);
    }, err => {
      console.log("err")
    });
  }

  sendToLow() {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let body = new HttpParams();
    body.set('status', this.PumppStatusClose)
    let sendUrl = this.PumpAPILinkI+this.PumppWordiClose+this.PumppBitiClose; 
    console.log("stat", this.PumppStatusClose)
    console.log("url", sendUrl)

    this.http.put(sendUrl, {"status": this.PumppStatusClose}).subscribe(result => {
      console.log(result);
    }, err => {
      console.log("err")
    });
  }

  onDeleteItem() {
    console.log(this.idsOBJ)
    let deleteID = {
      id: this.idsOBJ,
      class: this.classOBJ
    }
    let upURL = 'http://localhost:3000/deleteItem';

    console.log("delete",deleteID)

    this.http.post<any>(upURL, deleteID).subscribe(res => {
      console.log(res);
      if(res.stat=="ok")
      {
        window.location.reload();
      }
    })
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

      result.forEach(item => {
        // console.log("IDitem",item.idItem)
        // console.log("ClASSitem",item.classItem)
        if(item.classItem == "pump")
          {
            let datasss = {
              idddd: item.idItem
            }
            //console.log("OutPump")
            this.http.post<any>('http://localhost:3000/getValuefromAddrPump', datasss).subscribe(res => {
              var LinkOut = res.apiLinkO+res.wordOutput+res.bitOutput

              this.http.get<any>(LinkOut).subscribe(result=>{
                if(result.status == 1)
                {
                  // if(classForShow.indexOf("pump")>-1)
                  // {
                    var elemented = document.querySelector("#"+item.idItem)
                    elemented.setAttribute('src', 'http://localhost:4200/assets/pump-on.png')
                  // }
                }
                else
                {
                  // if(classForShow.indexOf("pump")>-1)
                  // {
                    var elemented = document.querySelector("#"+item.idItem)
                    elemented.setAttribute('src', 'http://localhost:4200/assets/pump.png')
                  // }
                }
              })
            })
          }
        else if(item.classItem == "tank")
          {
            let datasss = {
              idddd: item.idItem
            }
            //console.log("OutPump")
            this.http.post<any>('http://localhost:3000/getValuefromAddrTank', datasss).subscribe(res => {
              var LinkOut = res.apiLinkO+res.wordOutput+res.bitOutput

              this.http.get<any>(LinkOut).subscribe(result=>{
                if(result.status == 1)
                {
                  // if(classForShow.indexOf("pump")>-1)
                  // {
                    var elemented = document.querySelector("#"+item.idItem)
                    elemented.setAttribute('src', 'http://localhost:4200/assets/tank1-on.png')
                  // }
                }
                else
                {
                  // if(classForShow.indexOf("pump")>-1)
                  // {
                    var elemented = document.querySelector("#"+item.idItem)
                    elemented.setAttribute('src', 'http://localhost:4200/assets/tank1.png')
                  // }
                }
              })
            })
          }
        else if(item.classItem == "temp")
        {
          let datasss = {
            idddd: item.idItem
          }
          this.http.post<any>('http://localhost:3000/getValuefromAddrTemp', datasss).subscribe(res => {
            var LinkOut = res.apiLinkO+res.TempID;

            this.http.get<any>(LinkOut).subscribe(result=>{
              var elemented = document.querySelector("#"+item.idItem)
              elemented.textContent = result.PV;
            })
          })
        }
      })
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

  

