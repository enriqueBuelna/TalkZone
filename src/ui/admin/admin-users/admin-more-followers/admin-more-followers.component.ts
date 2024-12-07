import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-admin-more-followers',
  standalone: true,
  imports: [TableModule],
  templateUrl: './admin-more-followers.component.html',
  styleUrl: './admin-more-followers.component.css'
})
export class AdminMoreFollowersComponent {
  users : any = [];
}
