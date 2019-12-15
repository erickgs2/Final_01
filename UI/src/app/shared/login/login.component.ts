import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from 'app/services/user.service';
export * from './login.component';

import { AuthenticationService } from 'app/services';
import { CookieService } from 'angular2-cookie';
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
        private route: ActivatedRoute,
        private router: Router,
        private _userService: UserService,
        private cookie: CookieService,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
        // this.authenticationService.login(this.f.username.value, this.f.password.value)
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //             this.router.navigate([this.returnUrl]);
        //         },
        //         error => {
        //             this.error = error;
        //             this.loading = false;
        //         });
        this._userService.login(this.f.username.value, this.f.password.value).subscribe(data=> {

            console.log("Admin")
                // this.router.navigateByUrl('http://localhost:3200');
                this.cookie.put("usr", data.id)
                document.location.href = 'http://localhost:3200';
            
        },error => {
            this.error = "Usuario o contraseña incorrectos";
            this.loading = false;
        })

    }
}
