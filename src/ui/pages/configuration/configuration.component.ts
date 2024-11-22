import { Component } from '@angular/core';
import { AsideComponent } from '../../utils/aside/aside.component';
import { HeaderComponent } from '../../utils/header/header.component';
import { AccountComponent } from "./account/account.component";
import { AccesibilityComponent } from './accesibility/accesibility.component';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [AsideComponent, HeaderComponent, AccountComponent, AccesibilityComponent],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css',
})
export class ConfigurationComponent {
  where = '';

  go(option:string){
    this.where = option;
  }
}