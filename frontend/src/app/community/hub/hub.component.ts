import { Component, OnInit } from '@angular/core';

export interface PostData {
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
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss']
})
export class HubComponent implements OnInit {
  selectedLocality: string = '';
  allPosts: PostData[] = MOCK_POSTS;
  filteredPosts: PostData[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onLocalityChange() {
      if (this.selectedLocality) {
          this.filteredPosts = this.allPosts.filter(p => p.locality === this.selectedLocality);
      } else {
          this.filteredPosts = [];
      }
  }
}
