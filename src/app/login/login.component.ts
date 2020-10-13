import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Created an instance of user (object)
  user = new User('', '');

  constructor(private authService: AuthService, private location: Location) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('submit ');
    // TOKEN AUTH HERE: save token to local storage
    this.authService.postUser(this.user).subscribe((res) => console.log(res));
    this.router.navigate(['/resultslist']);
  }
}
