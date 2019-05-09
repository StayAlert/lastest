import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataService } from './data.service';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FlowComponent } from './flows/flow.component';
import { HomeComponent } from './home/home.component';
import { createFlowComponent } from './createFlow/createFlow.component';
import { LoggComponent } from './logg/logg.component';
import { LoggTempComponent } from './loggTemp/loggTemp.component';
import { ControlComponent } from './control/control.component';


import { MatInputModule, MatFormFieldModule, MatToolbarModule, MatButtonModule, MatIconModule, MatTableModule, MatCardModule } from '@angular/material';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatTableModule } from '@angular/material/table';
// import { MatCardModule } from '@angular/material';

import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    FlowComponent,
    HomeComponent,
    createFlowComponent,
    LoggComponent,
    LoggTempComponent,
    ControlComponent
  ],
  imports: [
    DragDropModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'flow', component: FlowComponent },
      { path: 'createflow', component: createFlowComponent},
      { path: 'logg', component: LoggComponent },
      { path: 'loggTemp', component: LoggTempComponent },
      { path: 'control', component: ControlComponent }
    ]),
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
