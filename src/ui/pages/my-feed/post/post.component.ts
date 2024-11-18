import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../../../../domain/models/post.model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterLink,],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() postContent!: Post;
}
