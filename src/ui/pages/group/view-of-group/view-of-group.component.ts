import { Component, OnInit, signal } from '@angular/core';
import { AsideComponent } from '../../../utils/aside/aside.component';
import { CommunitieService } from '../../../../domain/services/communitie.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileInformationComponent } from '../../my-profile/profile-information/profile-information.component';
import { GroupComplete } from '../../../../domain/models/group/groupComplete.model';
import { PostProfileGroupComponent } from './post-groups/post-profile.component';
import { InformationProfileComponent } from '../../my-profile/information-profile/information-profile.component';
import { UserService } from '../../auth/services/user.service';
import { ButtonComponent } from '../../../utils/button/button.component';

@Component({
  selector: 'app-view-of-group',
  standalone: true,
  imports: [
    AsideComponent,
    ProfileInformationComponent,
    PostProfileGroupComponent,
    InformationProfileComponent,
    ButtonComponent,
  ],
  templateUrl: './view-of-group.component.html',
  styleUrl: './view-of-group.component.css',
})
export class ViewOfGroupComponent implements OnInit {
  //ocupo conseguir la informacion basica del grupo, nombre, cuantos integrantes tiene, foto , portada, privacy, los integrantes que tiene
  myGroup!: GroupComplete;
  noAccess = signal(false);
  typeMember = signal('');
  applyButton = signal(false);
  text = signal('Solicitar acceso');
  constructor(
    private communityService: CommunitieService,
    private route: ActivatedRoute,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id') || '';
      if (id) {
        // Realiza la solicitud cada vez que cambie el parámetro 'user_id'
        this.communityService.getGroupById(id).subscribe((el) => {
          this.myGroup = el;
          console.log(this.myGroup)
          if (this.myGroup) {
            if (
              this.myGroup.getPrivacy() &&
              !this.myGroup
                .getAllMembers()
                .some(
                  (el) =>
                    el.getUserDemo().getUserId() ===
                    this._userService.getUserId()
                )
            ) {
              this.noAccess.set(true);
              this.typeMember.set('no-member');
            } else {
              if (
                this.myGroup.getAdminUser() === this._userService.getUserId()
              ) {
                this.typeMember.set('admin');
              } else if (
                this.myGroup
                  .getAllMembers()
                  .some(
                    (el) =>
                      el.getUserDemo().getUserId() ===
                      this._userService.getUserId()
                  )
              ) {
                this.typeMember.set('member');
              } else {
                this.typeMember.set('no-member');
              }
            }
          }
        });
      }
    });
    // this.communityService.getGroupById();
  }

  applyGroup() {
    this.communityService
      .wantToGetInGroup(
        this.myGroup.getId().toString(),
        this._userService.getUserId()
      )
      .subscribe((el) => {
        console.log(el);
        this.applyButton.set(false);
        this.text.set('Esperando respuesta del administrador...');
      });
  }
}
