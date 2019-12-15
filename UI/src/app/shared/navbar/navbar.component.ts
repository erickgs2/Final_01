import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { filter, map } from "rxjs/operators";
import { Router, ActivationEnd } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    
    breadcrumb: any={};

    constructor(public location: Location, 
        private element : ElementRef, 
        private cookieService: CookieService,
        private router: Router) {
        this._getBreadcrumb().subscribe(event =>{
            this.breadcrumb=event;
          });
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }

    search(criterio: string){
        this.router.navigate(['/busqueda', criterio])
        //console.log('El criterio de busqueda es '), criterio;
        //console.log(criterio);
      }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
    isHome() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/home' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }

    _getBreadcrumb(){
        return this.router.events.pipe(
          filter(event => event instanceof ActivationEnd),
          map((event: ActivationEnd) => event.snapshot.data)
        )
      }

      cart(){
          var key = this.cookieService.get('key');
        if(key == null){
            this.router.navigate(['/login']);
        }else{
            this.router.navigate(['/cart']);
        }
      }
}
