import { Component } from '@angular/core';
import { User } from './user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
	// Created an instance of user (object)
	private user = new User('', '');

	constructor(private authService: AuthService, private router: Router) {}

	public onSubmit(): void {
		console.log('submit ');
		this.authService
			.postUser(this.user)
			.subscribe((res) =>
				localStorage.setItem('token', JSON.stringify(res.Result.auth.token))
			);
		this.router.navigate(['/resultslist']);
	}
}
