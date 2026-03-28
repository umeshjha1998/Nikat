package com.nikat.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;

@RestController
public class HomeController {

    @GetMapping(value = "/", produces = MediaType.TEXT_HTML_VALUE)
    public String home() {
        return """
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Nikat Backend | Premium Gateway</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Space+Grotesk:wght@300;400;600;700&display=swap" rel="stylesheet">
                <style>
                    :root {
                        --bg-color: #030712;
                        --glass-bg: rgba(255, 255, 255, 0.03);
                        --glass-border: rgba(255, 255, 255, 0.08);
                        --primary: #6366f1;
                        --secondary: #a855f7;
                        --accent: #22d3ee;
                        --text-glow: rgba(99, 102, 241, 0.5);
                        --text-main: #f8fafc;
                        --text-dim: #94a3b8;
                        --success: #10b981;
                    }
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body {
                        font-family: 'Space Grotesk', sans-serif;
                        background: var(--bg-color);
                        color: var(--text-main);
                        min-height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        overflow-x: hidden;
                    }
                    .blobs {
                        position: fixed;
                        width: 100vw;
                        height: 100vh;
                        z-index: -1;
                        overflow: hidden;
                        filter: blur(80px);
                    }
                    .blob {
                        position: absolute;
                        border-radius: 50%;
                        opacity: 0.4;
                        animation: move 20s infinite alternate;
                    }
                    .blob-1 { width: 400px; height: 400px; background: var(--primary); top: -100px; left: -100px; animation-duration: 25s; }
                    .blob-2 { width: 350px; height: 350px; background: var(--secondary); bottom: -50px; right: -50px; animation-duration: 20s; }
                    .blob-3 { width: 300px; height: 300px; background: var(--accent); top: 50%; left: 50%; animation-duration: 15s; }
                    
                    @keyframes move {
                        0% { transform: translate(0, 0) scale(1); }
                        100% { transform: translate(10vw, 10vh) scale(1.2); }
                    }

                    .card {
                        width: 90%;
                        max-width: 900px;
                        padding: 3rem;
                        background: var(--glass-bg);
                        backdrop-filter: blur(25px);
                        border: 1px solid var(--glass-border);
                        border-radius: 32px;
                        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
                        text-align: center;
                        animation: fadeIn 1s ease-out;
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    .badge {
                        display: inline-flex;
                        align-items: center;
                        gap: 0.75rem;
                        padding: 0.6rem 1.2rem;
                        background: rgba(16, 185, 129, 0.08);
                        border: 1px solid rgba(16, 185, 129, 0.2);
                        border-radius: 9999px;
                        color: var(--success);
                        font-weight: 700;
                        font-size: 0.85rem;
                        letter-spacing: 1px;
                        margin-bottom: 2.5rem;
                        text-transform: uppercase;
                    }
                    .dot {
                        width: 10px;
                        height: 10px;
                        background: var(--success);
                        border-radius: 50%;
                        box-shadow: 0 0 15px var(--success);
                        animation: pulse 2s infinite;
                    }
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); opacity: 1; }
                        50% { transform: scale(1.3); opacity: 0.5; }
                    }

                    h1 {
                        font-family: 'Outfit', sans-serif;
                        font-size: clamp(2.5rem, 5vw, 4rem);
                        font-weight: 800;
                        background: linear-gradient(to bottom right, #fff, #94a3b8);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        margin-bottom: 1rem;
                    }

                    .quote-box {
                        margin: 3rem 0;
                        min-height: 120px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                    }
                    #quote {
                        font-size: 1.6rem;
                        line-height: 1.4;
                        color: var(--text-main);
                        font-weight: 300;
                        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    #author {
                        margin-top: 1.2rem;
                        color: var(--text-dim);
                        font-size: 1rem;
                        opacity: 0.8;
                    }

                    .metrics {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                        gap: 1.5rem;
                        margin-top: 4rem;
                    }
                    .metric {
                        padding: 1.5rem;
                        background: rgba(255, 255, 255, 0.02);
                        border: 1px solid var(--glass-border);
                        border-radius: 20px;
                        transition: all 0.3s ease;
                    }
                    .metric:hover {
                        background: rgba(255, 255, 255, 0.05);
                        border-color: var(--primary);
                        transform: translateY(-8px);
                    }
                    .m-label { color: var(--text-dim); font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: 2px; }
                    .m-value { font-size: 1.2rem; font-weight: 700; color: #fff; }

                    .explore {
                        margin-top: 3.5rem;
                        padding-top: 2rem;
                        border-top: 1px solid var(--glass-border);
                    }
                    .btn-swagger {
                        padding: 0.8rem 2rem;
                        background: linear-gradient(135deg, var(--primary), var(--secondary));
                        border-radius: 12px;
                        color: #fff;
                        text-decoration: none;
                        font-weight: 600;
                        transition: all 0.3s ease;
                        display: inline-block;
                    }
                    .btn-swagger:hover {
                        transform: scale(1.05);
                        box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
                    }
                </style>
            </head>
            <body>
                <div class="blobs">
                    <div class="blob blob-1"></div>
                    <div class="blob blob-2"></div>
                    <div class="blob blob-3"></div>
                </div>
                <div class="card">
                    <div class="badge">
                        <div class="dot"></div>
                        <span>Production Engine Live</span>
                    </div>
                    <h1>Nikat <span style="color: var(--primary)">Backend</span></h1>
                    <p style="color: var(--text-dim); font-size: 1.1rem;">Operational Excellence In Local Commerce</p>

                    <div class="quote-box">
                        <p id="quote">Excellence is never an accident. It is always the result of high intention.</p>
                        <p id="author">— Aristotle</p>
                    </div>

                    <div class="metrics">
                        <div class="metric">
                            <div class="m-label">Platform Version</div>
                            <div class="m-value" id="val-version">0.0.1</div>
                        </div>
                        <div class="metric">
                            <div class="m-label">Cloud Gateway</div>
                            <div class="m-value" id="val-health">ACTIVE</div>
                        </div>
                        <div class="metric">
                            <div class="m-label">Neon Database</div>
                            <div class="m-value" id="val-db">SYNCED</div>
                        </div>
                        <div class="metric">
                            <div class="m-label">Session Uptime</div>
                            <div class="m-value" id="val-uptime">00:00:00</div>
                        </div>
                    </div>

                    <div class="explore">
                        <a href="/swagger-ui.html" class="btn-swagger">Explore API Docs</a>
                    </div>
                </div>

                <script>
                    const quotes = [
                        { text: "Excellence is never an accident. It is always the result of high intention.", author: "Aristotle" },
                        { text: "Strive for perfection in everything you do. Take the best that exists and make it better.", author: "Henry Royce" },
                        { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
                        { text: "Service to others is the rent you pay for your room here on earth.", author: "Muhammad Ali" },
                        { text: "Technology is best when it brings people together.", author: "Matt Mullenweg" },
                        { text: "Great things are done by a series of small things brought together.", author: "Vincent Van Gogh" }
                    ];

                    let idx = 0;
                    function rotateQuotes() {
                        const q = document.getElementById('quote');
                        const a = document.getElementById('author');
                        q.style.opacity = 0;
                        q.style.transform = 'translateY(-10px)';
                        setTimeout(() => {
                            idx = (idx + 1) % quotes.length;
                            q.textContent = quotes[idx].text;
                            a.textContent = "— " + quotes[idx].author;
                            q.style.opacity = 1;
                            q.style.transform = 'translateY(0)';
                        }, 600);
                    }
                    setInterval(rotateQuotes, 12000);

                    async function updateMetrics() {
                        try {
                            const [hRes, iRes] = await Promise.all([
                                fetch('/actuator/health'),
                                fetch('/actuator/info')
                            ]);
                            const health = await hRes.json();
                            const info = await iRes.json();
                            
                            document.getElementById('val-health').textContent = health.status === 'UP' ? 'OPTIMAL' : 'DEGRADED';
                            document.getElementById('val-version').textContent = info.app?.version || '0.0.1';
                            if(health.components?.db) {
                                document.getElementById('val-db').textContent = health.components.db.status === 'UP' ? 'SYNCED' : 'OFFLINE';
                            }
                        } catch (e) {
                            console.warn('Actuator endpoints unreachable');
                        }
                    }
                    updateMetrics();

                    const start = Date.now();
                    function up() {
                        const d = Date.now() - start;
                        const h = Math.floor(d / 3600000);
                        const m = Math.floor((d % 3600000) / 60000);
                        const s = Math.floor((d % 60000) / 1000);
                        document.getElementById('val-uptime').textContent = 
                            `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
                    }
                    setInterval(up, 1000);
                </script>
            </body>
            </html>
            """;
    }
}
