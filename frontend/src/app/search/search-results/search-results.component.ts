import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {
  mockResults = [
    {
      id: 1,
      name: "The Fixer's Hub",
      description: "Premium hardware, tool rentals, and expert home renovation consultations.",
      rating: 4.9,
      reviews: 124,
      distance: "1.2 km",
      type: "Premium",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwoLhPWUreL1rPKoYu7afhjBsF4SbTB27EkOslTUOQ7uOvPpKXMIY4gttpXr1xVftsBMiuKgLVRN8UvMfYDBxnqZ_KmP6jy9cUEqEOTjlTiHVyWbWdzrDN-z6nC-jxGzGRqloYouwthY0tQ-Q8gnIqQ4_ca5uSpt1nLpYdWwSIVnjMQ7oUcbdf8zmmWp0xt8rbfHpxaORbVZnXxgEJw2nuBgTKTby-uXzj_6Tb_Krq3TlXQxD8bH7GIneNmH5xGmGDrnBjF8hLmpnq",
      isOpen: true
    },
    {
      id: 2,
      name: "Circuit Surgeons",
      description: "Specialized in laptop, smartphone and micro-electronics repair with warranty.",
      rating: 4.7,
      reviews: 86,
      distance: "3.8 km",
      type: "Tech",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG4TG9uqWMReIoQkCD8cMECbV95NPKAHdkqvjvOD8OGcTQBDr6YoKg9im1Edhp-3sWWIQH1iDm2ul0o1UkVjHTN3GNJWSNbu-kouNZFKmHS2qptK5NagBQKD_4UoxoLPonBNJxpExay3AmnlHkaKxGqmAcpXxbjErSh9o6eI5s2HmdihTekma-dLgjesODjF6jTdGx0iq9yopQq7RzS5-_-sRk_evbvG-olG_x_jltCE_HW8xLV-CgrroO1XI8879vFIHAKjla2eDy",
      isOpen: false
    },
    {
      id: 3,
      name: "Green Thumb Nursery",
      description: "Local exotic plants, gardening tools and organic soil supplies.",
      rating: 4.5,
      reviews: 52,
      distance: "2.5 km",
      type: "Garden",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZsq-XWTNPgwCnmuNumtaHjho5N0Vgk5WIig1Hoy33pZf0wgiGBoI5D5REoinu3-k_-eD0LZLjPcR7LSIvkqruu55Ty1rmJWU-DEHxeQ9CRZXATT2Nkg-Xs7z67VQuVvpwfrbKduOKMmNydg6gArB8kuciTi1rI385x3yzYIdjKz0rbexrm1FOjRFqeEAdtlP2sD4k5RsCYJqzW6JmJrgK_Hp6sPT956WO9LVz3v_xxxfQUuEopl2uylhd77c8xOBOfFzjchGc7Cwh",
      isOpen: true
    }
  ];

  technicians = [
    {
       name: 'Marcus Chen',
       role: 'Master Electrician',
       rating: 5.0,
       reviews: 42,
       tags: ['Wiring', 'EV Stations'],
       verified: true,
       image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZsq-XWTNPgwCnmuNumtaHjho5N0Vgk5WIig1Hoy33pZf0wgiGBoI5D5REoinu3-k_-eD0LZLjPcR7LSIvkqruu55Ty1rmJWU-DEHxeQ9CRZXATT2Nkg-Xs7z67VQuVvpwfrbKduOKMmNydg6gArB8kuciTi1rI385x3yzYIdjKz0rbexrm1FOjRFqeEAdtlP2sD4k5RsCYJqzW6JmJrgK_Hp6sPT956WO9LVz3v_xxxfQUuEopl2uylhd77c8xOBOfFzjchGc7Cwh'
    },
    {
        name: 'Elena Rodriguez',
        role: 'Interior Decorator',
        rating: 4.8,
        reviews: 118,
        tags: ['Color Theory', 'Minimalism'],
        verified: true,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdZYEaGZRJm6OQGztHjnEEdMX7RdlzkDj396Jm20yptWsaOUawDaRxxSv4HgeKkMKntP1WZwrHSDWvb4Ts0OMVGhBxlrW42R82zmaIgfdj_bDf0boeMu8J3zv1ShBpDBzfqKQxqC2uuGqe5ZwH30ISRzX_2AjsANqR8XsD-mWj04ho5dNK80SLetmrCt85RBLBdu-rtUjKWsqmpESIJRfO3qlOhDrEdiSti3j9NeVPWUc6jtfm3YniUrOC6bpm2tj99wnqf87UXVvr'
    }
  ];

  onBook(name: string) {
    console.log('Booking:', name);
    alert(`Initiating booking for ${name}...`);
  }

  onViewDetails(id: number) {
    console.log('Viewing details for:', id);
  }
}
