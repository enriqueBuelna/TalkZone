import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserCardStatsComponent } from './user-card-stats/user-card-stats.component';
import { Router, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
interface UserStats {
  id: string;
  name: string;
  posts: number;
  followers: number;
  following: number;
  learningTopics: string[];
  voiceRooms: {
    attended: number;
    created: number;
  };
  comments: number;
}

@Component({
  selector: 'app-admin-detail-user',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './admin-detail-user.component.html',
  styleUrl: './admin-detail-user.component.css',
})
export class AdminDetailUserComponent {
  formSearch!: FormGroup;
  constructor(private _formBuilder: FormBuilder, private _router: Router) {
    this.formSearch = this._formBuilder.group({
      search: ['', [Validators.required]],
    });
  }
  userId: string = '';
  user: UserStats | null = null;
  loading: boolean = false;
  error: string | null = null;

  searchUser() {
    if (this.formSearch.valid) {
      let { search } = this.formSearch.value;

      this._router.navigate(['admin', 'users', 'detail-user', search]);
    }
  }
}
