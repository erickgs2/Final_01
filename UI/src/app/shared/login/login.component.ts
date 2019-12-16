import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from 'app/services/user.service';
export * from './login.component';

import { CookieService } from 'ngx-cookie-service';

import { AuthenticationService } from 'app/services';
import { User } from 'app/models';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    usr: User;
    constructor(
        private formBuilder: FormBuilder,
        private _userService: UserService,
        private router : Router,
        private cookieService: CookieService

    ) {
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) {
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        this._userService.login(this.f.username.value, this.f.password.value).subscribe(data => {

            // this.router.navigateByUrl('http://localhost:3200');
            // document.location.href = 'http://localhost:3200/dashboard?id='+data.id;
            this.cookieService.set( 'key', data.nickname );
            this.router.navigate(['/home']);

        }, error => {
            this.error = "Usuario o contraseña incorrectos";
            this.loading = false;
        })

    }
}
