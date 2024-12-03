import { Component, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../../utils/header/header.component';
import { ButtonComponent } from '../../../utils/button/button.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MyGroupsCreatedComponent } from "./my-groups-created/my-groups-created.component";

@Component({
  selector: 'app-my-groups',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonComponent,
    CreateGroupComponent,
    ReactiveFormsModule,
    MyGroupsCreatedComponent
],
  templateUrl: './my-groups.component.html',
  styleUrl: './my-groups.component.css',
})
export class MyGroupsComponent implements OnInit {
  formWhichGroups!: FormGroup;
  modalCreate = signal(false);
  option = signal(1);
  constructor(private _formBuilder: FormBuilder) {
    this.formWhichGroups = this._formBuilder.group({
      whichGroup: ['1', [Validators.required]],
    });
  }
  showModal() {
    this.modalCreate.set(!this.modalCreate());
  }

  ngOnInit(): void {
    this.formWhichGroups.get('whichGroup')?.valueChanges.subscribe((value) => {
      if (value == 1) {
        this.option.set(1);
      } else if (value == 2) {
        this.option.set(2);
      } else if (value == 3) {
        this.option.set(3);
      }
    });
  }
}
