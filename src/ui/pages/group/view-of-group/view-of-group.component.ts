import { Component, OnInit, signal } from '@angular/core';
import { AsideComponent } from '../../../utils/aside/aside.component';
import { CommunitieService } from '../../../../domain/services/communitie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileInformationComponent } from '../../my-profile/profile-information/profile-information.component';
import { GroupComplete } from '../../../../domain/models/group/groupComplete.model';
import { PostProfileGroupComponent } from './post-groups/post-profile.component';
import { InformationProfileComponent } from '../../my-profile/information-profile/information-profile.component';
import { UserService } from '../../auth/services/user.service';
import { ButtonComponent } from '../../../utils/button/button.component';
import { AuthService } from '../../../../domain/services/auth.service';
import { UserComplete } from '../../../../domain/models/user_complete_information.model';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'app-view-of-group',
  standalone: true,
  imports: [
    AsideComponent,
    ProfileInformationComponent,
    PostProfileGroupComponent,
    InformationProfileComponent,
    ButtonComponent,
    SkeletonModule,
    ProgressSpinnerModule
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
  groupNotFound = false;
  groupRestricted = false;
  id!: string;
  yetNo = signal(true);
  constructor(
    private communityService: CommunitieService,
    private route: ActivatedRoute,
    private _userService: UserService,
    private userService: AuthService,
    private _router:Router
  ) {}

  groupSuspended = signal(false);
  ngOnInit() {
    combineLatest([
      this.userService.getCompleteInformation(this._userService.getUserId()),
      this.route.paramMap.pipe(
        switchMap((params) => {
          this.id = params.get('id') || '';
          if (this.id) {
            return this.communityService.getGroupById(this.id);
          } else {
            throw new Error('No se encontró el ID del grupo');
          }
        })
      ),
    ]).subscribe({
      next: ([userComplete, group]) => {
        this.yetNo.set(false);
        this.userComplete = userComplete;
        this.myGroup = group;
        if (
          this.myGroup.getType() === 'mentor' &&
          !this.userComplete
            .getUserPreferences()
            .some((el) => this.myGroup.getTopicName() === el.getTopicName()) &&
          this.userComplete.getUserDemo().getUserId() !==
            this.myGroup.getAdminUser()
        ) {
          this.groupRestricted = true;
        } else {
          if (this.myGroup) {
            const userId = this._userService.getUserId();

            // Verificar si el grupo es privado y si el usuario no es miembro
            if (
              this.myGroup.getPrivacy() &&
              !this.myGroup
                .getAllMembers()
                .some((member) => member.getUserDemo().getUserId() === userId)
            ) {
              this.applyButton.set(true);
              this.noAccess.set(true);
              this.typeMember.set('no-member');

              this.communityService
                .viewIfOnePending(userId, this.id)
                .subscribe((isPending) => {
                  this.petitionYet = isPending;
                });
            } else {
              // Verificar el tipo de miembro
              if (this.myGroup.getAdminUser() === userId) {
                this.typeMember.set('admin');
              } else if (
                this.myGroup
                  .getAllMembers()
                  .some((member) => member.getUserDemo().getUserId() === userId)
              ) {
                this.typeMember.set('member');
              } else {
                this.typeMember.set('no-member');
              }
            }
          }
        }

        if(this.myGroup.getStatus() === 'suspended' && this.userComplete.getUserDemo().getUserId() !==
        this.myGroup.getAdminUser()){
          this.groupSuspended.set(true);
        }
      },
      error: (error) => {
        console.error(error);
        this.groupNotFound = true;
      },
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
    this.communityService
      .deleteApply(this._userService.getUserId(), this.id)
      .subscribe((el) => {
        if (el) {
          this.applyButton.set(false);
          this.petitionYet = false;
        }
      });
  }

  goToDiscover(){
    this._router.navigate(['home','groups']);
  }
}
