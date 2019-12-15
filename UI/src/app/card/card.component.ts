import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styles: []
})
export class CardComponent implements OnInit {
  @Input() ciudad: any[] = [];
  constructor(private router: Router) { }

  ngOnInit() {

  }

  VerDetalle(codigo:string ){
    this.router.navigate(['detalle',codigo])
  }

}
