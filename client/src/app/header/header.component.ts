import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = (localStorage.getItem('token'))
    ? true : false;
  constructor(private authService: AuthService, private router: Router) {
  }
  onLogout(): void {
    console.log('In logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    this.isLoggedIn = false;
    this.authService.logout().subscribe(user => { });
    this.router.navigateByUrl('/home');
  }
  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
    }
  }
}
