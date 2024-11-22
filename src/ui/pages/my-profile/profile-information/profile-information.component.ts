import { Component, Input } from '@angular/core';
import { UserComplete } from '../../../../domain/models/user_complete_information.model';
import { GroupComplete } from '../../../../domain/models/group/groupComplete.model';

@Component({
  selector: 'app-profile-information',
  standalone: true,
  imports: [],
  templateUrl: './profile-information.component.html',
  styleUrl: './profile-information.component.css'
})
export class ProfileInformationComponent {
  @Input() myUser!:UserComplete;
  @Input() myGroup!:GroupComplete;
  @Input() type!:string;
}
