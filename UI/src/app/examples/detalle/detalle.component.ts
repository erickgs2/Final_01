import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HabService } from '../../services/hab.service';
import { Habitacion } from 'app/models/habitacion';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  
  habitacion: Habitacion;

  constructor(private router: ActivatedRoute, private productSvc: HabService) {
    this.router.params.subscribe(params =>{
      const code=params['code'];
      this.productSvc.getById(code).subscribe((data: Habitacion) => {
        this.habitacion=data;
      })
      
    })
   }

  ngOnInit() {
  }

}
