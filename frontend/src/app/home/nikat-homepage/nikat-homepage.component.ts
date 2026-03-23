import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nikat-homepage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nikat-homepage.component.html',
  styleUrl: './nikat-homepage.component.scss'
})
export class NikatHomepageComponent {

}
