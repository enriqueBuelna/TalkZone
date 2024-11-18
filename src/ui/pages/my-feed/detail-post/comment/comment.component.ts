import { Component, Input } from '@angular/core';
import { Comment } from '../../../../../domain/models/comment.model';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() comment!:Comment;
}
