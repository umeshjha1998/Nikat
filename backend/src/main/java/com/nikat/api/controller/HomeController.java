package com.nikat.api.controller;
 
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;
import java.lang.management.ManagementFactory;
 
@RestController
public class HomeController {
 
    private final long startTime = ManagementFactory.getRuntimeMXBean().getStartTime();
 
    @GetMapping(value = "/", produces = MediaType.TEXT_HTML_VALUE)
    public String home() {
        return """
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Nikat Backend | Engine Live</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Space+Grotesk:wght@300;400;600;700&display=swap" rel="stylesheet">
                <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
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
                        padding: 2rem 0;
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
                        filter: blur(80px);
                    }
                    .blob {
                        position: absolute; border-radius: 50%%; opacity: 0.3; animation: move 20s infinite alternate;
                    }
                    .blob-1 { width: 500px; height: 500px; background: var(--primary); top: -200px; left: -100px; }
                    .blob-2 { width: 400px; height: 400px; background: var(--secondary); bottom: -100px; right: -50px; }
                    
                    @keyframes move {
                        0%% { transform: translate(0, 0) scale(1); }
                        100%% { transform: translate(10vw, 10vh) scale(1.1); }
                    }
 
                    .container {
                        width: 95%%;
                        max-width: 1100px;
                        padding: 2.5rem;
                        background: var(--glass-bg);
                        backdrop-filter: blur(20px);
                        border: 1px solid var(--glass-border);
                        border-radius: 40px;
                        box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.8);
                        text-align: center;
                        z-index: 1;
                    }
 
                    .badge {
                        display: inline-flex; align-items: center; gap: 0.75rem; padding: 0.6rem 1.2rem;
                        background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2);
                        border-radius: 9999px; color: var(--success); font-weight: 700; font-size: 0.8rem;
                        letter-spacing: 1px; margin-bottom: 2rem; text-transform: uppercase;
                    }
                    .dot {
                        width: 10px; height: 10px; background: var(--success); border-radius: 50%%;
                        box-shadow: 0 0 15px var(--success); animation: pulse 2s infinite;
                    }
                    @keyframes pulse {
                        0%%, 100%% { transform: scale(1); opacity: 1; }
                        50%% { transform: scale(1.3); opacity: 0.5; }
                    }
 
                    h1 {
                        font-family: 'Outfit', sans-serif; font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 800;
                        background: linear-gradient(to bottom right, #fff, var(--text-dim));
                        -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem;
                    }
 
                    .quote-box {
                        margin: 2.5rem 0; min-height: 80px; display: flex; flex-direction: column; justify-content: center;
                    }
                    #quote { font-weight: 300; font-size: 1.4rem; color: var(--text-main); }
                    #author { color: var(--text-dim); font-size: 0.9rem; margin-top: 0.8rem; }
 
                    .metrics-grid {
                        display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 3rem;
                    }
                    .metric-card {
                        padding: 1.5rem; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--glass-border);
                        border-radius: 24px; transition: all 0.3s ease;
                    }
                    .metric-card:hover { transform: translateY(-5px); background: rgba(255,255,255,0.04); border-color: var(--primary); }
                    .m-label { color: var(--text-dim); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 0.5rem; }
                    .m-value { font-size: 1.25rem; font-weight: 700; }
 
                    .charts-section {
                        display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; margin-top: 3rem;
                    }
                    .chart-container {
                        background: rgba(0, 0, 0, 0.2); border: 1px solid var(--glass-border); border-radius: 28px; padding: 1.5rem;
                    }
                    .chart-title { font-size: 0.8rem; font-weight: 600; color: var(--text-dim); margin-bottom: 1rem; text-align: left; display: flex; justify-content: space-between; }
                    .chart-value { color: #fff; font-weight: 700; }
 
                    .explore { margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--glass-border); }
                    .btn-swagger {
                        padding: 1rem 2.5rem; background: linear-gradient(135deg, var(--primary), var(--secondary));
                        border-radius: 16px; color: #fff; text-decoration: none; font-weight: 700; transition: all 0.3s ease; display: inline-block;
                    }
                    .btn-swagger:hover { transform: scale(1.05); box-shadow: 0 0 30px rgba(99, 102, 241, 0.4); }
                </style>
            </head>
            <body>
                <div class="blobs">
                    <div class="blob blob-1"></div>
                    <div class="blob blob-2"></div>
                </div>
                <div class="container">
                    <div class="badge">
                        <div class="dot"></div>
                        <span>High-Throughput Environment</span>
                    </div>
                    <h1>Nikat <span style="color: var(--primary)">Engine</span></h1>
                    <p style="color: var(--text-dim); font-size: 1.1rem;">Modern Merchant Powerhouse</p>
 
                    <div class="quote-box">
                        <p id="quote">Quality is not an act, it is a habit.</p>
                        <p id="author">— Aristotle</p>
                    </div>
 
                    <div class="metrics-grid">
                        <div class="metric-card">
                            <div class="m-label">System Uptime</div>
                            <div class="m-value" id="val-uptime" style="color: var(--accent)">00:00:00</div>
                        </div>
                        <div class="metric-card">
                            <div class="m-label">Database Status</div>
                            <div class="m-value" id="val-db" style="color: var(--success)">SYNCED</div>
                        </div>
                        <div class="metric-card">
                            <div class="m-label">Version</div>
                            <div class="m-value" id="val-version">1.0.0</div>
                        </div>
                        <div class="metric-card">
                            <div class="m-label">Active Threads</div>
                            <div class="m-value" id="val-threads">-</div>
                        </div>
                    </div>
 
                   <div id="mode-info" style="margin-top: 3rem; text-align: left; background: rgba(0,0,0,0.2); border-radius: 20px; padding: 1.5rem; border: 1px solid var(--glass-border);">
                       <h3 style="font-size: 0.9rem; color: var(--text-dim); margin-bottom: 1rem; text-transform: uppercase;">Engine Mode Comparison</h3>
                       <table style="width: 100%%; border-collapse: collapse; font-size: 0.85rem;">
                           <tr style="border-bottom: 1px solid var(--glass-border);">
                               <th style="padding: 0.5rem; text-align: left;">Feature</th>
                               <th style="padding: 0.5rem; text-align: left; color: var(--success);">Lite (Active)</th>
                               <th style="padding: 0.5rem; text-align: left; color: var(--primary);">Premium</th>
                           </tr>
                           <tr>
                               <td style="padding: 0.5rem; color: var(--text-dim);">Metrics Polling</td>
                               <td id="lite-poll" style="padding: 0.5rem;">20 Minutes</td>
                               <td id="prem-poll" style="padding: 0.5rem;">10 Seconds</td>
                           </tr>
                           <tr>
                               <td style="padding: 0.5rem; color: var(--text-dim);">Auto-Sleep</td>
                               <td style="padding: 0.5rem; color: var(--success);">Enabled</td>
                               <td style="padding: 0.5rem; color: var(--secondary);">Inhibited</td>
                           </tr>
                           <tr>
                               <td style="padding: 0.5rem; color: var(--text-dim);">Cost Efficiency</td>
                               <td style="padding: 0.5rem; color: var(--success);">Maximum</td>
                               <td style="padding: 0.5rem;">Standard</td>
                           </tr>
                       </table>
                   </div>
 
                    <div class="explore">
                        <a href="/swagger-ui.html" class="btn-swagger">API Reference Documentation</a>
                        <button id="mode-btn" onclick="toggleMode()" class="btn-swagger" style="margin-left: 1rem; border: none; cursor: pointer;">Switch Mode</button>
                    </div>
                </div>
 
                <script>
                    const SERVER_START_TIME = %d;
                    const quotes = [
                        { text: "Excellence is never an accident. It is always the result of high intention.", author: "Aristotle" },
                        { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
                        { text: "Technology is best when it brings people together.", author: "Matt Mullenweg" },
                        { text: "Strive for perfection in everything you do.", author: "Henry Royce" }
                    ];
 
                    // Quote Rotation
                    let idx = 0;
                    setInterval(() => {
                        idx = (idx + 1) %% quotes.length;
                        document.getElementById('quote').textContent = quotes[idx].text;
                        document.getElementById('author').textContent = "— " + quotes[idx].author;
                    }, 10000);
 
                    // Uptime Counter
                    function updateUptime() {
                        const now = Date.now();
                        const diff = now - SERVER_START_TIME;
                        const h = Math.floor(diff / 3600000);
                        const m = Math.floor((diff %% 3600000) / 60000);
                        const s = Math.floor((diff %% 60000) / 1000);
                        document.getElementById('val-uptime').textContent = 
                            `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
                    }
                    setInterval(updateUptime, 1000);
 
                    // Charts Setup
                    function createChartConfig(color) {
                        return {
                            series: [{ name: 'Value', data: Array(20).fill(0) }],
                            chart: { type: 'area', height: 160, sparkline: { enabled: true }, animations: { enabled: true, easing: 'linear', dynamicAnimation: { speed: 1000 } } },
                            stroke: { curve: 'smooth', width: 2 },
                            fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05, stops: [20, 100, 100] } },
                            colors: [color],
                            tooltip: { enabled: false }
                        };
                    }
 
                    const memChart = new ApexCharts(document.querySelector("#chart-mem"), createChartConfig('#6366f1'));
                    const cpuChart = new ApexCharts(document.querySelector("#chart-cpu"), createChartConfig('#22d3ee'));
                    memChart.render();
                    cpuChart.render();
 
                    let memData = Array(20).fill(0);
                    let cpuData = Array(20).fill(0);
 
                    async function fetchMetrics() {
                        try {
                            const [hRes, memRes, cpuRes, threadRes] = await Promise.all([
                                fetch('/actuator/health'),
                                fetch('/actuator/metrics/jvm.memory.used?tag=area:heap'),
                                fetch('/actuator/metrics/system.cpu.usage'),
                                fetch('/actuator/metrics/jvm.threads.live')
                            ]);
                            
                            const health = await hRes.json();
                            const mem = await memRes.json();
                            const cpu = await cpuRes.json();
                            const threads = await threadRes.json();
 
                            // Update values
                            const memMB = Math.round(mem.measurements[0].value / 1024 / 1024);
                            const cpuPerc = (cpu.measurements[0].value * 100).toFixed(1);
                            
                            document.getElementById('cur-mem').textContent = memMB + ' MB';
                            document.getElementById('cur-cpu').textContent = cpuPerc + ' %%';
                            document.getElementById('val-threads').textContent = Math.round(threads.measurements[0].value);
                            document.getElementById('val-db').textContent = health.components?.db?.status === 'UP' ? 'SYNCED' : 'ERROR';
 
                            // Update charts
                            memData.shift(); memData.push(memMB);
                            cpuData.shift(); cpuData.push(parseFloat(cpuPerc));
                            
                            memChart.updateSeries([{ data: memData }]);
                            cpuChart.updateSeries([{ data: cpuData }]);
 
                        } catch (e) {
                            console.warn('Metrics polling error', e);
                        }
                    }
                    // Mode Toggle Logic
                    const urlParams = new URLSearchParams(window.location.search);
                    let isPremium = urlParams.get('mode') === 'premium';
                    const pollInterval = isPremium ? 10000 : 1200000; // 10s for premium, 20m for lite

                    function updateModeUI() {
                        const badge = document.querySelector('.badge span');
                        const liteHeader = document.querySelector('th:nth-child(2)');
                        const premHeader = document.querySelector('th:nth-child(3)');
                        
                        if (badge) {
                            badge.textContent = isPremium ? 'Premium Performance Mode' : 'Eco/Lite Mode (Auto-sleep Enabled)';
                            badge.parentElement.style.borderColor = isPremium ? 'var(--primary)' : 'rgba(16, 185, 129, 0.2)';
                        }
                        
                        if (liteHeader && premHeader) {
                            liteHeader.textContent = isPremium ? 'Lite' : 'Lite (Active)';
                            liteHeader.style.opacity = isPremium ? '0.5' : '1';
                            premHeader.textContent = isPremium ? 'Premium (Active)' : 'Premium';
                            premHeader.style.opacity = isPremium ? '1' : '0.5';
                        }
                        
                        const btn = document.getElementById('mode-btn');
                        if (btn) {
                            btn.textContent = isPremium ? 'Switch to Lite Mode' : 'Switch to Premium Mode';
                        }
                    }

                    function toggleMode() {
                        const newMode = isPremium ? 'lite' : 'premium';
                        window.location.href = window.location.origin + window.location.pathname + '?mode=' + newMode;
                    }

                    updateModeUI();
                    setInterval(fetchMetrics, pollInterval);
                    fetchMetrics();
                </script>
            </body>
            </html>
            """.formatted(startTime);
    }
}
