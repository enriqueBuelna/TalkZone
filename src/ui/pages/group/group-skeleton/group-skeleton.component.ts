import { Component } from '@angular/core';
import { HeaderComponent } from "../../../utils/header/header.component";
import { AsideComponent } from "../../../utils/aside/aside.component";
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-group-skeleton',
  standalone: true,
  imports: [HeaderComponent, AsideComponent, RouterOutlet],
  templateUrl: './group-skeleton.component.html',
  styleUrl: './group-skeleton.component.css'
})
export class GroupSkeletonComponent {
  constructor(private _router:Router){

  }

  goToFeed(){
    this._router.navigate(['home','groups','my-feed'])
  }

  goToMyGroups(){
    this._router.navigate(['home','groups','my-groups'])
  }

  goToDiscover(){
    this._router.navigate(['home','groups'])
  }
}
