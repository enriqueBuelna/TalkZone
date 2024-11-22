import { Component, Input } from '@angular/core';
import { GroupPresentation } from '../../../../domain/models/group/presentation-group.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-presentation',
  standalone: true,
  imports: [],
  templateUrl: './group-presentation.component.html',
  styleUrl: './group-presentation.component.css',
})
export class GroupPresentationComponent {
  goToGroup() {
    this._router.navigate(['/home/groups', this.group.getId()]);
  }
  @Input() group!: GroupPresentation;
  constructor(private _router: Router) {}
}
