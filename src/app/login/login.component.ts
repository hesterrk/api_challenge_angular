import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Created an instance of user (object)
  user = new User('', '');

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('submit ');
    this.authService.postUser(this.user).subscribe(res => console.log(res))
  }
}
