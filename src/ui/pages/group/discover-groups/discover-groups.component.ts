import { Component } from '@angular/core';
import { HeaderComponent } from '../../../utils/header/header.component';
import { Observable } from 'rxjs';
import { GroupPresentation } from '../../../../domain/models/group/presentation-group.model';
import { CommunitieService } from '../../../../domain/services/communitie.service';
import { UserService } from '../../auth/services/user.service';
import { GroupPresentationComponent } from '../group-presentation/group-presentation.component';

@Component({
  selector: 'app-discover-groups',
  standalone: true,
  imports: [HeaderComponent, GroupPresentationComponent],
  templateUrl: './discover-groups.component.html',
  styleUrl: './discover-groups.component.css',
})
export class DiscoverGroupsComponent {
  observable!: Observable<any>;
  myGroups!: GroupPresentation[];
  constructor(
    private _userService: UserService,
    private _groupService: CommunitieService
  ) {}

  ngOnInit() {
    this._groupService
      .discoverGroup(this._userService.getUserId())
      .subscribe((el) => {
        this.myGroups = el;
      });
  }
  //OCUPO DESCUBRIR LOS GRUPOS, CON RESPECTO A MIS USER_PREFERENCE
}
