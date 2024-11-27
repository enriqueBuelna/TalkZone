import { Component, Input } from '@angular/core';
import { Comment } from '../../../../../domain/models/comment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() comment!:Comment;

  constructor(private _router:Router){

  }

  goToProfile(){
    this._router.navigate(['home','profile', this.comment.getUserInfo().getUserId()]);
  }
}
