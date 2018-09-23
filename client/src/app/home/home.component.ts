import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription, Observable } from 'rxjs';
import { Device } from '../device';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { DiagnosticsService } from '../diagnostics.service';
const API_URL = 'http://localhost:3000/api/';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  devices: Device[];
  sub: Subscription;
  // tslint:disable-next-line:max-line-length
  constructor(private diagnosticsService: DiagnosticsService, private authService: AuthService, private dataService: DataService, private httpClient: HttpClient) {
  }

  ngOnInit() {
    // this.sub = this.dataService.getDevices()
    //   .subscribe(devices => {
    //     this.devices = devices;
    //   });
    this.getAllDevices().subscribe(devices => this.devices = devices);
    // this.callMe();
    // this.sendMessage();
  }
  callMe() {
    this.diagnosticsService.messages.subscribe(msg => {
      console.log(msg);
    });
  }

  sendMessage() {
    console.log('In SendMessage');
    this.diagnosticsService.sendMsg('Test Message');
  }

  getAllDevices(): Observable<Device[]> {
    return this.httpClient.get<Device[]>(API_URL + 'devices?access_token=' + localStorage.getItem('token'));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
