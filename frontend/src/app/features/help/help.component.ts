import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="help-page-premium">
      <!-- Navbar (Consistent) -->
      <nav class="help-nav">
        <div class="nav-inner">
          <a routerLink="/" class="brand">Nikat <span>Support</span></a>
          <div class="nav-links">
            <a href="#faqs">FAQs</a>
            <a href="#contact">Contact</a>
            <a routerLink="/community" class="btn-hub">Community Hub</a>
          </div>
        </div>
      </nav>

      <main class="help-main">
        <!-- Hero Search -->
        <section class="help-hero">
          <div class="hero-content">
            <h1>How can we <span>help you</span> today?</h1>
            <p>Search our knowledge base or browse common topics below.</p>
            
            <div class="help-search-premium">
              <span class="material-icons">search</span>
              <input type="text" placeholder="Search for 'refunds', 'listing a shop', 'shipping'...">
              <kbd>⌘ K</kbd>
            </div>
          </div>
          <div class="hero-bg-glow"></div>
        </section>

        <!-- Topic Cards -->
        <section class="help-topics-grid">
          <div class="topic-card-premium" *ngFor="let topic of helpTopics">
            <div class="t-icon-box" [style.background]="topic.bg">
              <span class="material-icons" [style.color]="topic.color">{{topic.icon}}</span>
            </div>
            <h3>{{topic.title}}</h3>
            <p>{{topic.desc}}</p>
            <button class="btn-topic">Explore <span class="material-icons">east</span></button>
          </div>
        </section>

        <!-- FAQ Section -->
        <section id="faqs" class="faq-section-premium">
          <div class="section-head">
            <span class="tag">Knowledge Base</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          
          <div class="faq-list-premium">
            <div class="faq-item-premium" *ngFor="let faq of faqs" (click)="faq.open = !faq.open" [class.open]="faq.open">
              <div class="faq-q">
                <h4>{{faq.q}}</h4>
                <div class="q-toggle">
                  <span class="material-icons">{{faq.open ? 'remove' : 'add'}}</span>
                </div>
              </div>
              <div class="faq-a" *ngIf="faq.open">
                <div class="a-inner">
                   <p>{{faq.a}}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Contact Options -->
        <section id="contact" class="contact-section-premium">
          <div class="contact-box">
             <div class="cb-info">
               <h2>Still need a hand?</h2>
               <p>Our dedicated support team is here to help you solve any issues 24/7.</p>
               <button class="btn-prime-glow">Open Support Ticket</button>
             </div>
             <div class="cb-channels">
               <div class="chan">
                 <span class="material-icons">mail</span>
                 <div>
                   <h5>Email Us</h5>
                   <span>hello&#64;nikat.com</span>
                 </div>
               </div>
               <div class="chan">
                 <span class="material-icons">forum</span>
                 <div>
                   <h5>Live Chat</h5>
                   <span>Average response: 5 mins</span>
                 </div>
               </div>
               <div class="chan">
                 <span class="material-icons">call</span>
                 <div>
                   <h5>Call Center</h5>
                   <span>+91 1800 555 999</span>
                 </div>
               </div>
             </div>
          </div>
        </section>
      </main>

      <footer class="help-footer">
        <p>&copy; 2024 Nikat Platform. All rights reserved.</p>
        <div class="f-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Manrope:wght@500;600;700;800&display=swap');

    :host {
      --primary: #3b82f6;
      --prime-light: #60a5fa;
      --bg: #020410;
      --glass: rgba(255, 255, 255, 0.03);
      --glass-border: rgba(255, 255, 255, 0.08);
      --text-muted: #94a3b8;
      font-family: 'Manrope', sans-serif;
    }

    .help-page-premium { min-height: 100vh; background: var(--bg); color: #fff; scroll-behavior: smooth; }

    /* Nav */
    .help-nav { height: 5rem; background: rgba(2, 4, 16, 0.6); backdrop-filter: blur(20px); border-bottom: 1px solid var(--glass-border); position: sticky; top: 0; z-index: 1000; }
    .nav-inner { max-width: 1200px; height: 100%; margin: 0 auto; padding: 0 2rem; display: flex; align-items: center; justify-content: space-between; }
    .brand { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 800; color: #fff; text-decoration: none; display: flex; align-items: center; gap: 0.5rem; }
    .brand span { font-weight: 400; color: var(--text-muted); font-size: 1rem; }
    .nav-links { display: flex; align-items: center; gap: 2rem; }
    .nav-links a { color: var(--text-muted); text-decoration: none; font-weight: 700; font-size: 0.9rem; transition: 0.2s; }
    .nav-links a:hover { color: #fff; }
    .btn-hub { background: var(--glass); border: 1px solid var(--glass-border); padding: 0.6rem 1.25rem; border-radius: 1rem; color: #fff !important; }

    /* Hero */
    .help-hero { padding: 8rem 2rem 6rem; text-align: center; position: relative; overflow: hidden; }
    .hero-content { position: relative; z-index: 10; }
    .help-hero h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 4rem; font-weight: 800; margin-bottom: 1.5rem; letter-spacing: -0.02em; }
    .help-hero h1 span { color: var(--primary); }
    .help-hero p { font-size: 1.25rem; color: var(--text-muted); margin-bottom: 3.5rem; }

    .help-search-premium {
      max-width: 680px; margin: 0 auto; background: var(--glass); border: 1px solid var(--glass-border);
      border-radius: 1.5rem; padding: 0.5rem; display: flex; align-items: center; backdrop-filter: blur(20px);
      box-shadow: 0 30px 60px rgba(0,0,0,0.4);
    }
    .help-search-premium .material-icons { margin: 0 1.25rem; color: var(--primary); font-size: 1.75rem; }
    .help-search-premium input { flex: 1; background: transparent; border: none; color: #fff; font-size: 1.15rem; outline: none; padding: 0.75rem 0; font-family: 'Manrope', sans-serif; }
    .help-search-premium kbd { background: rgba(255,255,255,0.1); padding: 0.4rem 0.75rem; border-radius: 0.5rem; font-size: 0.75rem; font-weight: 800; color: var(--text-muted); margin-right: 1rem; }

    .hero-bg-glow { position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(59,130,246,0.1), transparent 70%); top: -100px; left: 50%; transform: translateX(-50%); filter: blur(80px); }

    /* Topic Cards */
    .help-topics-grid { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; transform: translateY(-3rem); }
    .topic-card-premium {
      background: #080c24; border: 1px solid var(--glass-border); border-radius: 2rem; padding: 2.5rem;
      text-align: left; transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    .topic-card-premium:hover { border-color: var(--primary); transform: translateY(-8px); background: #0a113d; }
    .t-icon-box { width: 56px; height: 56px; border-radius: 1.25rem; display: flex; align-items: center; justify-content: center; margin-bottom: 2rem; }
    .t-icon-box .material-icons { font-size: 1.5rem; }
    .topic-card-premium h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.25rem; color: #fff; margin-bottom: 1rem; }
    .topic-card-premium p { font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 2rem; }
    .btn-topic { background: transparent; border: none; color: var(--primary); font-weight: 800; display: flex; align-items: center; gap: 0.5rem; padding: 0; cursor: pointer; font-size: 0.9rem; }
    .btn-topic .material-icons { transition: 0.2s; font-size: 1.25rem; }
    .topic-card-premium:hover .btn-topic .material-icons { transform: translateX(5px); }

    /* FAQ */
    .faq-section-premium { max-width: 900px; margin: 6rem auto; padding: 0 2rem; }
    .section-head { text-align: center; margin-bottom: 4rem; }
    .tag { font-size: 0.75rem; font-weight: 900; color: var(--primary); text-transform: uppercase; letter-spacing: 0.1em; background: rgba(59,130,246,0.1); padding: 0.4rem 1rem; border-radius: 2rem; margin-bottom: 1rem; display: inline-block; }
    .faq-section-premium h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2.5rem; font-weight: 800; }

    .faq-list-premium { display: flex; flex-direction: column; gap: 1.5rem; }
    .faq-item-premium {
       background: var(--glass); border: 1px solid var(--glass-border); border-radius: 1.5rem; cursor: pointer; transition: 0.2s;
    }
    .faq-item-premium:hover { border-color: rgba(255,255,255,0.2); }
    .faq-item-premium.open { border-color: var(--primary); background: rgba(59,130,246,0.05); }
    .faq-q { padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: center; }
    .faq-q h4 { font-size: 1.15rem; font-weight: 700; color: #fff; margin: 0; }
    .q-toggle { width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; transition: 0.3s; }
    .faq-item-premium.open .q-toggle { background: var(--primary); color: #fff; transform: rotate(180deg); }

    .faq-a { border-top: 1px solid var(--glass-border); overflow: hidden; }
    .a-inner { padding: 2rem; }
    .faq-a p { color: var(--text-muted); line-height: 1.7; font-size: 1.05rem; margin: 0; }

    /* Contact Section */
    .contact-section-premium { max-width: 1200px; margin: 8rem auto; padding: 0 2rem; }
    .contact-box {
      background: linear-gradient(135deg, #0a113d, #05091f); border: 1px solid var(--glass-border);
      border-radius: 3rem; padding: 4rem; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;
      box-shadow: 0 40px 100px rgba(0,0,0,0.4);
    }
    .cb-info h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2.5rem; font-weight: 800; margin-bottom: 1.5rem; }
    .cb-info p { font-size: 1.25rem; color: var(--text-muted); margin-bottom: 2.5rem; line-height: 1.6; }
    .btn-prime-glow {
      background: var(--primary); color: #fff; border: none; padding: 1.25rem 2.5rem; border-radius: 1.25rem;
      font-weight: 800; font-size: 1.1rem; cursor: pointer; box-shadow: 0 10px 40px rgba(59, 130, 246, 0.3);
    }

    .cb-channels { display: flex; flex-direction: column; gap: 2.5rem; }
    .chan { display: flex; align-items: center; gap: 1.5rem; }
    .chan .material-icons { font-size: 2rem; color: var(--primary); background: rgba(59,130,246,0.1); width: 64px; height: 64px; border-radius: 1.5rem; display: flex; align-items: center; justify-content: center; }
    .chan h5 { font-size: 1.1rem; font-weight: 800; margin: 0 0 0.25rem; }
    .chan span { color: var(--text-muted); font-weight: 700; font-size: 0.95rem; }

    .help-footer { padding: 4rem 2rem; border-top: 1px solid var(--glass-border); text-align: center; }
    .help-footer p { color: #475569; font-size: 0.9rem; font-weight: 700; }
    .f-links { margin-top: 1rem; display: flex; justify-content: center; gap: 2rem; }
    .f-links a { color: var(--text-muted); text-decoration: none; font-size: 0.85rem; font-weight: 700; transition: 0.2s; }
    .f-links a:hover { color: #fff; }

    @media (max-width: 900px) {
      .help-hero h1 { font-size: 2.5rem; }
      .contact-box { grid-template-columns: 1fr; gap: 3rem; padding: 2.5rem; }
      .help-topics-grid { transform: none; margin-top: 2rem; }
    }
  `]
})
export class HelpComponent {
  helpTopics = [
    { title: 'Getting Started', desc: 'New to Nikat? Learn how to navigate the platform seamlessly.', icon: 'auto_awesome', bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' },
    { title: 'Shop Management', desc: 'Everything you need to know about setting up and running your shop.', icon: 'storefront', bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
    { title: 'Billing & Payouts', desc: 'Manage your earnings, refunds, and subscription plans.', icon: 'account_balance_wallet', bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' },
    { title: 'Safety & Privacy', desc: 'How we protect your data and ensure a secure experience.', icon: 'verified_user', bg: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }
  ];

  faqs: any[] = [
    { q: 'How do I book a service?', a: 'Browse services, select your preferred provider, pick a date and time, then confirm your booking. You\'ll receive a confirmation via email and notification.', open: false },
    { q: 'How do I become a shop owner on Nikat?', a: 'Register for an account, then apply to be a shop owner from your dashboard. Once approved by our admin team, you can start listing your products and services.', open: false },
    { q: 'What payment methods are accepted?', a: 'We accept credit/debit cards, UPI, net banking, and cash on delivery for eligible orders.', open: false },
    { q: 'How do I leave a review?', a: 'After using a service or purchasing from a shop, go to your order history and click "Write Review" on the completed order.', open: false }
  ];
}
