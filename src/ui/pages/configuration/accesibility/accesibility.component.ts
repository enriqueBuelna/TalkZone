import { Component } from '@angular/core';
import { HeaderComponent } from '../../../utils/header/header.component';

@Component({
  selector: 'app-accesibility',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './accesibility.component.html',
  styleUrl: './accesibility.component.css'
})
export class AccesibilityComponent {
  where = 'home';
  title ="Accesibilidad"

  goTo(option:string){
    this.where = option;
    this.title = option;
  }
}
