import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AdhocRoutingComponent } from './app.router';
import { AdhocScedularDataService} from './app.service';
import { DropdownModule} from 'primeng/primeng';
import { ToasterModule } from 'angular2-toaster';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,FormsModule, HttpModule,BrowserAnimationsModule,ReactiveFormsModule,AdhocRoutingComponent,DropdownModule
  ,ToasterModule],
  providers: [AdhocScedularDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }