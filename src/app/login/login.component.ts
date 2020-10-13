import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Created an instance of user (object)
  user = new User('', '');

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('submit ');
    this.authService
      .postUser(this.user)
      .subscribe((res) =>
        localStorage.setItem('token', JSON.stringify(res.Result.auth.token))
      );
    this.router.navigate(['/resultslist']);
  }
}
