import { Component } from '@angular/core';
import { HeaderComponent } from "../../../utils/header/header.component";
import { AsideComponent } from "../../../utils/aside/aside.component";
import { Router, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-group-skeleton',
  standalone: true,
  imports: [ AsideComponent, RouterOutlet, ReactiveFormsModule],
  templateUrl: './group-skeleton.component.html',
  styleUrl: './group-skeleton.component.css'
})
export class GroupSkeletonComponent {
  formSearch!:FormGroup;
  constructor(private _router:Router, private _formBuilder:FormBuilder){
    this.formSearch = this._formBuilder.group({
      search: ['',[Validators.required]]
    })
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

  search(){
    
  }
}
