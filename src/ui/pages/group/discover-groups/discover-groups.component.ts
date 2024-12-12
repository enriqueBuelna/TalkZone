import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../../utils/header/header.component';
import { Observable, withLatestFrom } from 'rxjs';
import { GroupPresentation } from '../../../../domain/models/group/presentation-group.model';
import { CommunitieService } from '../../../../domain/services/communitie.service';
import { UserService } from '../../auth/services/user.service';
import { GroupPresentationComponent } from '../group-presentation/group-presentation.component';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonComponent } from "../../../utils/button/button.component";
import { Router } from '@angular/router';
@Component({
  selector: 'app-discover-groups',
  standalone: true,
  imports: [HeaderComponent, GroupPresentationComponent, SkeletonModule, ButtonComponent],
  templateUrl: './discover-groups.component.html',
  styleUrl: './discover-groups.component.css',
})
export class DiscoverGroupsComponent {
  observable!: Observable<any>;
  myGroups: GroupPresentation[] = [];
  constructor(
    private _userService: UserService,
    private _groupService: CommunitieService,
    private _router: Router
  ) {}
  hasMoreGroups = signal(false);
  page = 1;
  yetNo = signal(true);
  loadPost() {
    this._groupService
      .discoverGroup(this._userService.getUserId(), this.page)
      .subscribe({
        next: (el) => {
          if(el.length === 10){
            this.hasMoreGroups.set(true);
          }else{
            this.hasMoreGroups.set(false);
          }
          console.log("CHIVON")
          if (this.myGroups.length > 0) {
            this.yetNo.set(false);
            el.forEach((ele) => {
              this.myGroups.push(ele);
            });
          } else {
            
            this.yetNo.set(false);
            this.myGroups = el;
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  ngOnInit() {
    this.loadPost();
  }

  showMore() {
    this.page++;
    this.loadPost();
  }

  goToCreate(){
    this._router.navigate(['/home/groups/my-groups'])
  }
  //OCUPO DESCUBRIR LOS GRUPOS, CON RESPECTO A MIS USER_PREFERENC
  showTypeGroup = signal(false);
  showDialogType(){
    this.showTypeGroup.set(!this.showTypeGroup());
  }
}
