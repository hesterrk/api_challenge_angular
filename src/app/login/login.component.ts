import { Component, OnInit } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Created an instance of user (object)
  user = new User('', '');

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('submit ');
  }
}
