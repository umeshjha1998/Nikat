import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="help-page">
      <div class="help-container">
        <div class="help-header">
          <h1>Help & Support</h1>
          <p>Find answers to common questions or reach out to our team</p>
          <div class="search-box">
            <span class="material-icons">search</span>
            <input type="text" placeholder="Search for help...">
          </div>
        </div>

        <div class="help-grid">
          <div class="help-card" *ngFor="let card of helpTopics">
            <div class="card-icon" [style.background]="card.bg"><span class="material-icons" [style.color]="card.color">{{card.icon}}</span></div>
            <h3>{{card.title}}</h3>
            <p>{{card.desc}}</p>
          </div>
        </div>

        <div class="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div class="faq-list">
            <div class="faq-item" *ngFor="let faq of faqs" (click)="faq.open = !faq.open" [class.open]="faq.open">
              <div class="faq-question">
                <h4>{{faq.q}}</h4>
                <span class="material-icons">{{faq.open ? 'expand_less' : 'expand_more'}}</span>
              </div>
              <div class="faq-answer" *ngIf="faq.open"><p>{{faq.a}}</p></div>
            </div>
          </div>
        </div>

        <div class="contact-section">
          <h2>Still need help?</h2>
          <div class="contact-options">
            <div class="contact-card">
              <span class="material-icons">email</span>
              <h4>Email Support</h4>
              <p>support&#64;nikat.com</p>
            </div>
            <div class="contact-card">
              <span class="material-icons">chat</span>
              <h4>Live Chat</h4>
              <p>Available 9 AM - 6 PM</p>
            </div>
            <div class="contact-card">
              <span class="material-icons">phone</span>
              <h4>Phone</h4>
              <p>+91 1800-NIKAT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .help-page { background: #05092f; min-height: 100vh; padding: 3rem 2rem; }
    .help-container { max-width: 900px; margin: 0 auto; }

    .help-header { text-align: center; margin-bottom: 3rem; }
    .help-header h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2.25rem; font-weight: 800; color: #e2e3ff; margin-bottom: 0.5rem; }
    .help-header p { color: #a3a8d5; font-size: 1rem; margin-bottom: 1.5rem; }
    .search-box { display: flex; align-items: center; gap: 0.5rem; background: #080e38; border: 1px solid #40456c; border-radius: 3rem; padding: 0.75rem 1.25rem; max-width: 500px; margin: 0 auto; }
    .search-box .material-icons { color: #6e739d; }
    .search-box input { flex: 1; background: transparent; border: none; color: #e2e3ff; font-size: 0.95rem; outline: none; font-family: 'Manrope', sans-serif; }

    .help-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem; margin-bottom: 3rem; }
    .help-card { background: #080e38; border: 1px solid rgba(255,255,255,0.05); border-radius: 1rem; padding: 1.5rem; text-align: center; cursor: pointer; transition: all 0.2s; }
    .help-card:hover { border-color: #40456c; transform: translateY(-2px); }
    .card-icon { width: 52px; height: 52px; border-radius: 0.75rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; }
    .card-icon .material-icons { font-size: 1.5rem; }
    .help-card h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; color: #e2e3ff; margin-bottom: 0.5rem; }
    .help-card p { font-size: 0.8rem; color: #6e739d; line-height: 1.5; }

    .faq-section { margin-bottom: 3rem; }
    .faq-section h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; color: #e2e3ff; margin-bottom: 1.5rem; }
    .faq-list { display: flex; flex-direction: column; gap: 0.5rem; }
    .faq-item { background: #080e38; border: 1px solid rgba(255,255,255,0.05); border-radius: 0.75rem; cursor: pointer; transition: all 0.2s; overflow: hidden; }
    .faq-item.open { border-color: #40456c; }
    .faq-question { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; }
    .faq-question h4 { font-size: 0.95rem; color: #e2e3ff; font-weight: 600; }
    .faq-question .material-icons { color: #6e739d; }
    .faq-answer { padding: 0 1.25rem 1rem; }
    .faq-answer p { font-size: 0.875rem; color: #a3a8d5; line-height: 1.6; }

    .contact-section { text-align: center; }
    .contact-section h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; color: #e2e3ff; margin-bottom: 1.5rem; }
    .contact-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
    .contact-card { background: #080e38; border: 1px solid rgba(255,255,255,0.05); border-radius: 1rem; padding: 1.5rem; transition: all 0.2s; }
    .contact-card:hover { border-color: #5eb4ff; }
    .contact-card .material-icons { font-size: 2rem; color: #5eb4ff; margin-bottom: 0.75rem; }
    .contact-card h4 { font-size: 1rem; color: #e2e3ff; margin-bottom: 0.25rem; }
    .contact-card p { font-size: 0.85rem; color: #6e739d; }

    @media (max-width: 768px) { .contact-options { grid-template-columns: 1fr; } }
  `]
})
export class HelpComponent {
  helpTopics = [
    { title: 'Getting Started', desc: 'Learn how to use Nikat', icon: 'rocket_launch', bg: 'rgba(94,180,255,0.1)', color: '#5eb4ff' },
    { title: 'Account & Profile', desc: 'Manage your settings', icon: 'manage_accounts', bg: 'rgba(107,254,156,0.1)', color: '#6bfe9c' },
    { title: 'Payments & Billing', desc: 'Transactions and refunds', icon: 'payments', bg: 'rgba(255,179,71,0.1)', color: '#ffb347' },
    { title: 'Shop Owners', desc: 'List and manage your shop', icon: 'storefront', bg: 'rgba(192,132,252,0.1)', color: '#c084fc' }
  ];

  faqs: any[] = [
    { q: 'How do I book a service?', a: 'Browse services, select your preferred provider, pick a date and time, then confirm your booking. You\'ll receive a confirmation via email and notification.', open: false },
    { q: 'How do I become a shop owner on Nikat?', a: 'Register for an account, then apply to be a shop owner from your dashboard. Once approved by our admin team, you can start listing your products and services.', open: false },
    { q: 'What payment methods are accepted?', a: 'We accept credit/debit cards, UPI, net banking, and cash on delivery for eligible orders.', open: false },
    { q: 'How do I leave a review?', a: 'After using a service or purchasing from a shop, go to your order history and click "Write Review" on the completed order.', open: false }
  ];
}
