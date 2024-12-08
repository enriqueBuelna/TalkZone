import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-core',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './admin-core.component.html',
  styleUrl: './admin-core.component.css'
})
export class AdminCoreComponent {
  constructor(private _router:Router){

  }

  goToHome(){
    this._router.navigate(['']);
  }
}
