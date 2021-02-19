import { Component, OnInit } from '@angular/core';
import { HeroeService } from '../../services/heroe.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[]=[];
  cargando=false;

  constructor(private heroesService:HeroeService) { }

  ngOnInit(): void {
    this.cargando=true
    this.heroesService.getHeroes()
      .subscribe(resp=>{
        this.heroes=resp;        
        this.cargando=false;
      })
  }

  deleteHeroe(heroe:HeroeModel, i:number ){
    Swal.fire({
      title:'¿Está seguro?',
      text:`está seguro que desea borrar al héroe ${heroe.nombre}`,
      icon:'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp=>{
      if (resp.value) {
        this.heroes.splice(i,1);
        this.heroesService.deleteHeroe(heroe.id).subscribe();
        
      }
    });
  }

}
