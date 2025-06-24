import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { GroupPresentationComponent } from '../../group-presentation/group-presentation.component';
import { Observable } from 'rxjs';
import { UserService } from '../../../auth/services/user.service';
import { CommunitieService } from '../../../../../domain/services/communitie.service';
import { GroupPresentation } from '../../../../../domain/models/group/presentation-group.model';

@Component({
  selector: 'app-my-groups-created',
  standalone: true,
  imports: [GroupPresentationComponent],
  templateUrl: './my-groups-created.component.html',
  styleUrl: './my-groups-created.component.css',
})
export class MyGroupsCreatedComponent implements OnInit, OnDestroy {
  observable!: Observable<any>;
  myGroups!: GroupPresentation[];
  @Input() option = signal<number>(0);
  constructor(
    private _userService: UserService,
    private _groupService: CommunitieService
  ) {}

  ngOnInit() {
    if (this.option() == 1) {
      this._groupService
        .getMyGroupsCreated(this._userService.getUserId())
        .subscribe((el) => {
          this.myGroups = el;
        });
    } else if (this.option() == 2) {
      this._groupService
        .getGroupsFollowed(this._userService.getUserId())
        .subscribe((el) => {
          this.myGroups = el;
        });
    } else if (this.option() == 3) {
      this._groupService
        .getPendingGroups(this._userService.getUserId())
        .subscribe((el) => {
          this.myGroups = el;
        });
    }
  }

  ngOnDestroy() {
    
  }
}
