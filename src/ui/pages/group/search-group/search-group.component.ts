import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../../utils/header/header.component';
import { UserService } from '../../auth/services/user.service';
import { Observable } from 'rxjs';
import { GroupPresentation } from '../../../../domain/models/group/presentation-group.model';
import { CommunitieService } from '../../../../domain/services/communitie.service';
import { GroupPresentationComponent } from '../group-presentation/group-presentation.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-group',
  standalone: true,
  imports: [HeaderComponent, GroupPresentationComponent],
  templateUrl: './search-group.component.html',
  styleUrl: './search-group.component.css',
})
export class SearchGroupComponent {
  observable!: Observable<any>;
  myGroups!: GroupPresentation[];
  constructor(
    private _userService: UserService,
    private _groupService: CommunitieService,
    private _route: ActivatedRoute
  ) {}
  yetNo = true;
  groupName = signal('');
  ngOnInit() {
    this._route.paramMap.subscribe((params) => {
      this.groupName.set(params.get('group_name') || '');
      this.loadGroups(); // Método para recargar la información
    });
  }

  loadGroups() {
    this._groupService
      .searchGroup(
        this.groupName()
      )
      .subscribe((el) => {
        this.yetNo = false;
        this.myGroups = el;
      });
  }
}
