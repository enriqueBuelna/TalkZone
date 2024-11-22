import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-group',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent implements OnInit{
  constructor(private _router: Router,){

  }
  ngOnInit(){
    if(true){
      // this._router.navigate(['home', 'groups','welcome']); // Redirigir a la página de bienvenida
    }
  }
}
