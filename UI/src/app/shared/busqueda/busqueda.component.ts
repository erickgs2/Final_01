import { Component, OnInit } from '@angular/core';
import { filter, map } from "rxjs/operators";
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'app/services/search.service';
import { SearchModel } from 'app/models/busqueda';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  ciudad: SearchModel[]=[];
  searching: string='';

  constructor(private router: ActivatedRoute,private nav: Router, private searchSvc: SearchService, private route2: Router) { 
    this.router.params.subscribe(params => {
      this.searching=params['criterio'];
      this.searchSvc.getBySearch(this.searching).subscribe((data: SearchModel[])=>{
        this.ciudad=data;
      })
    })
  }
  VerDetalle(codigo:string ){
    this.nav.navigate(['detalle',codigo])
  }

  ngOnInit() {
  }

}
