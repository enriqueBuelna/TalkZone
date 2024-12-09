import { Component, DestroyRef, signal } from '@angular/core';
import { HeaderComponent } from "../../../utils/header/header.component";
import { UserPreferenceService } from '../../../../domain/services/user_preference.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../auth/services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserPreferences } from '../../../../domain/entities/user_preferences/user_preference.interface';
import { SkeletonModule } from 'primeng/skeleton';
import { CardUserComponent } from "../card-user/card-user.component";
import { ButtonComponent } from "../../../utils/button/button.component";
import { AsideComponent } from "../../../utils/aside/aside.component";

@Component({
  selector: 'app-search-connect',
  standalone: true,
  imports: [HeaderComponent, SkeletonModule, CardUserComponent, ButtonComponent, AsideComponent],
  templateUrl: './search-connect.component.html',
  styleUrl: './search-connect.component.css'
})
export class SearchConnectComponent {
showDialogType() {
throw new Error('Method not implemented.');
}
showInfo() {
throw new Error('Method not implemented.');
}
showTagss(_t74: any) {
throw new Error('Method not implemented.');
}
followUser(arg0: any) {
throw new Error('Method not implemented.');
}
goToProfile(arg0: any) {
throw new Error('Method not implemented.');
}
sendMessage(arg0: any) {
throw new Error('Method not implemented.');
}
myUserPreference: any;
formSearch: any;
userPreferenceInformation: any;
textFollow: string = '';
selectCard($event: Event) {
throw new Error('Method not implemented.');
}
showDialog() {
throw new Error('Method not implemented.');
}
  constructor(private _userPreferences: UserPreferenceService, private _route:ActivatedRoute, private _userService:UserService, private _destroyRef:DestroyRef){

  }
  allUserPreferences: UserPreferences[] = [];
  search = signal('')
  ngOnInit(){
    this._route.paramMap.subscribe((params) => {
      this.search.set(params.get('search') || '');
      this.loadUsers();
    });
    
  }

  yetNo = signal(true);
  loadUsers(){
    this._userPreferences.searchConnect(this.search(), this._userService.getUserId()).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: el => {
        this.allUserPreferences = el;
      },
      error: error => {

      }
    })
  }
}
