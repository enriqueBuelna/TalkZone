import { CommonModule } from '@angular/common';
import { Component, DestroyRef, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../domain/services/admin.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProgressSpinner, ProgressSpinnerModule } from 'primeng/progressspinner';
import { Router, RouterOutlet } from '@angular/router';
interface Community {
  id: number;
  name: string;
  description: string;
  mainTopic: string;
  memberCount: number;
  createdAt: Date;
  status: 'active' | 'inactive' | 'suspended';
  moderators: string[];
  recentPosts: {
    id: number;
    title: string;
    author: string;
    createdAt: Date;
  }[];
  lastActivityDate: Date;
}

const MOCK_COMMUNITIES: Community[] = [
  {
    id: 1,
    name: 'Desarrolladores Web',
    description: 'Comunidad para desarrolladores web front-end y back-end',
    mainTopic: 'Programación',
    memberCount: 5420,
    createdAt: new Date('2022-03-15'),
    status: 'active',
    moderators: ['user123', 'user456'],
    recentPosts: [
      {
        id: 101,
        title: 'Mejores prácticas en React 2024',
        author: 'Carlos Mendoza',
        createdAt: new Date('2024-02-20')
      },
      {
        id: 102,
        title: 'Tutorial de TypeScript avanzado',
        author: 'María Rodríguez',
        createdAt: new Date('2024-02-18')
      }
    ],
    lastActivityDate: new Date('2024-02-22')
  },
  {
    id: 2,
    name: 'Diseño UX/UI',
    description: 'Espacio para profesionales y estudiantes de diseño de experiencia de usuario',
    mainTopic: 'Diseño',
    memberCount: 3210,
    createdAt: new Date('2022-07-22'),
    status: 'active',
    moderators: ['user789', 'user101'],
    recentPosts: [
      {
        id: 201,
        title: 'Tendencias de diseño para 2024',
        author: 'Sofía López',
        createdAt: new Date('2024-02-19')
      }
    ],
    lastActivityDate: new Date('2024-02-21')
  },
  {
    id: 3,
    name: 'Marketing Digital',
    description: 'Estrategias y técnicas de marketing en la era digital',
    mainTopic: 'Marketing',
    memberCount: 2850,
    createdAt: new Date('2021-11-05'),
    status: 'inactive',
    moderators: ['user202'],
    recentPosts: [],
    lastActivityDate: new Date('2023-11-15')
  },
  {
    id: 4,
    name: 'Inteligencia Artificial',
    description: 'Discusiones sobre avances en IA y machine learning',
    mainTopic: 'Tecnología',
    memberCount: 4100,
    createdAt: new Date('2023-01-10'),
    status: 'active',
    moderators: ['user303', 'user404'],
    recentPosts: [
      {
        id: 301,
        title: 'Implementaciones prácticas de ChatGPT',
        author: 'Juan Pérez',
        createdAt: new Date('2024-02-17')
      }
    ],
    lastActivityDate: new Date('2024-02-22')
  },
  {
    id: 5,
    name: 'Fotografía Creativa',
    description: 'Comunidad para amantes y profesionales de la fotografía',
    mainTopic: 'Arte',
    memberCount: 1750,
    createdAt: new Date('2022-09-30'),
    status: 'suspended',
    moderators: ['user505'],
    recentPosts: [],
    lastActivityDate: new Date('2023-12-05')
  }
];
@Component({
  selector: 'app-admin-groups',
  standalone: true,
  imports: [CommonModule, FormsModule, ProgressSpinnerModule, RouterOutlet],
  templateUrl: './admin-groups.component.html',
  styleUrl: './admin-groups.component.css'
})
export class AdminGroupsComponent {
  communities: Community[] = MOCK_COMMUNITIES;
  filteredCommunities: any[] = [];

  onlyGroups = signal(true);
  // Filtros
  topicFilter: string = 'all';
  statusFilter: string = 'all';
  searchTerm: string = '';

  constructor(private _adminService:AdminService, private _destroyRef:DestroyRef, private _router:Router){

  }

  // Modal de edición
  selectedCommunity: Community | null = null;
  mostPopular: any;
  mostPopularSpiner = signal(true);
  allGroups: any;
  checkRoute(){
    this.onlyGroups.set(this._router.url === '/admin/groups');
  }
  ngOnInit() {
    this.checkRoute();
    this._adminService.getMostPopular().pipe(takeUntilDestroyed(this._destroyRef)).subscribe(el => {
      console.log(el);
      this.mostPopularSpiner.set(false);
      this.mostPopular = el;
    })
    this._adminService.getAllGroups().pipe(takeUntilDestroyed(this._destroyRef)).subscribe(el => {
      console.log(el);
      this.allGroups = el;
      this.filteredCommunities = this.allGroups;
    })
    this._router.events.subscribe(() => {
      this.checkRoute();
    });
  }

  applyFilters() {
    this.filteredCommunities = this.allGroups.filter((community:any) => {
      const topicMatch = this.topicFilter === 'all' || community.mainTopic === this.topicFilter;
      const statusMatch = this.statusFilter === 'all' || community.status === this.statusFilter;
      const searchMatch = !this.searchTerm || 
        community.getGroupName().toLowerCase().includes(this.searchTerm.toLowerCase()) || 
        community.getTopicName().toLowerCase().includes(this.searchTerm.toLowerCase())
      
      return topicMatch && statusMatch && searchMatch;
    });
  }

  getCommunityTopics(): string[] {
    return [...new Set(this.communities.map(c => c.mainTopic))];
  }

  openEditModal(id:number) {
    // this.selectedCommunity = { ...community };
    this.onlyGroups.set(false);
    this._router.navigate(['admin', 'groups', id]);
  }

  updateCommunity() {
    if (this.selectedCommunity) {
      const index = this.communities.findIndex(c => c.id === this.selectedCommunity!.id);
      this.communities[index] = this.selectedCommunity;
      this.applyFilters();
      this.selectedCommunity = null;
    }
  }

  suspendCommunity(community: Community) {
    community.status = 'suspended';
    this.applyFilters();
  }

  reactivateCommunity(community: Community) {
    community.status = 'active';
    this.applyFilters();
  }

  getActivityStatus(community: Community): string {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    if (community.lastActivityDate > thirtyDaysAgo) {
      return 'Activa';
    } else {
      return 'Inactiva';
    }
  }

  getMostActiveCommunities(): Community[] {
    return this.communities
      .filter(c => c.status === 'active')
      .sort((a, b) => b.memberCount - a.memberCount)
      .slice(0, 3);
  }

  getInactiveCommunities(): Community[] {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return this.communities
      .filter(c => 
        c.lastActivityDate <= thirtyDaysAgo || 
        c.recentPosts.length === 0
      );
  }
}
