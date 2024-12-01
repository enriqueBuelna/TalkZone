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
import { AuthService } from '../../../../domain/services/auth.service';
import { UserComplete } from '../../../../domain/models/user_complete_information.model';

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
  petitionYet!: boolean;
  userComplete!: UserComplete;
  id!:string;
  constructor(
    private communityService: CommunitieService,
    private route: ActivatedRoute,
    private _userService: UserService,
    private userService: AuthService
  ) {}

  ngOnInit() {
    this.userService
      .getCompleteInformation(this._userService.getUserId())
      .subscribe((el) => {
        this.userComplete = el;
      });

    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') || '';
      if (this.id) {
        // Realiza la solicitud cada vez que cambie el parámetro 'user_id'
        this.communityService.getGroupById(this.id).subscribe((el) => {
          this.myGroup = el;
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
              this.applyButton.set(true);
              this.noAccess.set(true);
              this.typeMember.set('no-member');
              this.communityService
                .viewIfOnePending(this._userService.getUserId(), this.id)
                .subscribe((el) => {
                  if (el) {
                    this.petitionYet = true;
                  } else {
                    this.petitionYet = false;
                  }
                });
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
        this.petitionYet = el;
        this.applyButton.set(true);
      });
  }

  deleteApply() {
    this.communityService.deleteApply(this._userService.getUserId(), this.id).subscribe(el => {
      if(el){
        this.applyButton.set(false);
        this.petitionYet = false;
      }
    })
  }
}
