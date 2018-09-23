import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user: User = new User();
  constructor(private auth: AuthService, private router: Router
  ) { }
  isValidUser(user) {
    return user.email === '' || user.email === undefined || user.password === '' || user.password === undefined;
  }
  onLogin(): void {
    if (!this.isValidUser(this.user)) {
      this.auth.login(this.user).subscribe(user => {
        localStorage.setItem('token', user.id);
        localStorage.setItem('user_id', user.userId);
        this.router.navigateByUrl('/home');
      });
    } else {
      console.log('failed');
    }
  }
  ngOnInit() {
  }

}
