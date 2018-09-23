import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Device } from './device';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
}
