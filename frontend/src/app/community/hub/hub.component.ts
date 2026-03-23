import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '../../shared/shared.module';

export interface PostData {
// ...
    id: string;
    title: string;
    content: string;
    authorName: string;
    postType: string;
    locality: string;
    price?: number;
    eventTime?: Date;
}

const MOCK_POSTS: PostData[] = [
    { id: '1', title: 'Need 2 more for Cricket', content: 'Playing at the central ground at 6PM.', authorName: 'Rahul', postType: 'Game', locality: 'LIG flats', eventTime: new Date() },
    { id: '2', title: 'Selling old cycle', content: 'Good condition, 2 years old.', authorName: 'Amit', postType: 'Marketplace', locality: 'LIG flats', price: 1500 },
    { id: '3', title: 'Cab pool to Cyber City', content: 'Leaving at 9AM tomorrow. Need 1 person.', authorName: 'Priya', postType: 'CabPool', locality: 'Janta Flat' },
];

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule, MatCardModule, MatButtonModule, MatIconModule, MatTabsModule, SharedModule],
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss']
})
export class HubComponent implements OnInit {
  selectedLocality: string = '';
  allPosts: PostData[] = MOCK_POSTS;
  filteredPosts: PostData[] = [];
  activeTab: string = 'All';
  tabs: string[] = ['All', 'Reviews', 'Games', 'Cab Pool', 'Marketplace', 'Issues'];

  constructor() { }

  ngOnInit(): void {
  }

  onLocalityChange() {
      this.filterPosts();
  }

  setActiveTab(tab: string) {
      this.activeTab = tab;
      this.filterPosts();
  }

  filterPosts() {
      let posts = this.allPosts;
      
      // Filter by locality
      if (this.selectedLocality) {
          posts = posts.filter(p => p.locality === this.selectedLocality);
      } else {
          this.filteredPosts = [];
          return;
      }

      // Filter by tab type (Simplified mapping)
      if (this.activeTab !== 'All') {
          const typeMap: any = {
              'Reviews': 'Review',
              'Games': 'Game',
              'Cab Pool': 'CabPool',
              'Marketplace': 'Marketplace',
              'Issues': 'Issue'
          };
          posts = posts.filter(p => p.postType === typeMap[this.activeTab]);
      }

      this.filteredPosts = posts;
  }

  getBentoClass(index: number): string {
      const classes = ['large', 'medium', 'tall', 'medium', 'medium', 'large'];
      return classes[index % classes.length];
  }
}
