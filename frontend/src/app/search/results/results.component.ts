import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule, MatChipsModule, RouterModule, SharedModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  results = [
    { name: 'The Urban Fade', rating: 4.8, reviews: 124, category: 'Barbershop', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbWhfrGRHzXQyuRyssw5Ur1iznRhh3t-pNC3WXaEC2YRu4pfhDSFqy-v7F-Oqe7f-igaoOIvm2At_uyzK4FReCXrxsPlfPiWEWC1H2XSNf6dIQnh7AGPKJ-XuNbCihX6pX9MKBDeJ9vRLN5uNU5_kiX4B8BK7NO-gBnQhX5A8La2SylpQ69uTNIzBgs5zrRhMSyKvGtEO01CZ-Pebrz5mN7cIX-qoOx1AZ3Vt35TDqH4igM3vbDmk2ixVC7jS0t3BKdL2LcTJFW5B2' },
    { name: 'Gourmet Pizza Central', rating: 4.5, reviews: 89, category: 'Restaurant', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmBdB3YC65aO-ajBlbO1fbSre06lo62Al8nHMwTV2BN11sx9tVLHhWmrSxLjJ9OARFXCUxLLlagu34f8Cu9eSavmhx7bZwFLoBpdGFdRhCChu8B6CYS25jkpSzU3-A4OXrCQa1pT5iMInYmR6C1_p5_HH7lmTqEoGfSYS-5cDdCfR7A3cvg38G1ja6PunxaYdA2cL0byx3vBdYVkCT4DZiYxXq5x4WCWsN-cdkhFRZQA_lRCt4LZsr2f3HcbEyfzDCO_2Skgse8DJl' },
    { name: 'Blue Lagoon Spa', rating: 4.9, reviews: 56, category: 'Wellness', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3RavNrUKucOBtpW-eR0wTqPxnx7vYFPWbvVaSShqkqtCHGGHvYEt6Cg4mHuOE-WYoPtqZQtPzhUlS0IOBNPMo2e8Ok9ljFb8TqgOklByWAa0VFpofKyH6MEHONxkYdAk35K8BG6B2LAA0oauk2mfUTBnyRj0-NR1Z_9BeUHnxWuvhs8ylNAgkPfavuS0LNMlTGdicwPEibXImmVa2B6HkkLhTwhwdbz49MzH202aAnjxOUYZi-H_ML2CH6_f8SujFFolH-aV1DHD2' }
  ];

  constructor() { }

  ngOnInit(): void { }
}
