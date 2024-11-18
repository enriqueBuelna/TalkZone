import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css',
})
export class AsideComponent implements OnInit {
  widthAside!: string;
  constructor() {}

  ngOnInit() {
    let navbarLeft = document.getElementById('aside')?.clientWidth;
    if(navbarLeft){
      navbarLeft -= 7;
    }
    this.widthAside = navbarLeft ? `${navbarLeft}px` : 'auto';
    console.log(this.widthAside);
  }
}
