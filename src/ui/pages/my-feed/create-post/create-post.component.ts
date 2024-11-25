import { Component, Input, signal } from '@angular/core';
import { ModalPostComponent } from './modal-post/modal-post.component';
import { UserDemo } from '../../../../domain/models/user-demo.model';

@Component({
  selector: 'app-tweet-text',
  standalone: true,
  imports: [ModalPostComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  @Input() myUser!:UserDemo;
  @Input() type!:string;
  modalVisible = signal(false);
  showModal() {
    this.modalVisible.set(!this.modalVisible());
  }
}
