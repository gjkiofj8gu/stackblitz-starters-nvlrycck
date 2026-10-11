// --- 1. FUNKTION FÜR DAS SEPARATE LOG-FENSTER ---
let logWindow = null;

document.getElementById('openLogBtn').addEventListener('click', () => {
  logWindow = window.open(
    '',
    'LobbyLogWindow',
    'width=450,height=600,resizable=yes,scrollbars=yes'
  );
  logWindow.document.open();
  logWindow.document.write(`
        <!DOCTYPE html>
        <html lang="de">
        <head>
            <meta charset="UTF-8">
            <title>LOBBY UNIVERSE - Live Logs</title>
            <style>
                body { font-family: sans-serif; background: #0d0d13; color: #fff; padding: 20px; margin: 0; }
                h2 { color: #9b51e0; border-bottom: 2px solid #1f1f2e; padding-bottom: 10px; margin-top: 0; }
                .log-container { display: flex; flex-direction: column; gap: 12px; margin-top: 20px; }
                .log-card { background: #151522; border: 1px solid #2a2a40; border-radius: 6px; padding: 12px; font-size: 14px; border-left: 4px solid #9b51e0; }
            </style>
        </head>
        <body>
            <h2>🔴 RECENT ACTIVITIES (Live-Logs)</h2>
            <div id="logContainer" class="log-container"></div>

            <script>
                function updatePopupLogs() {
                    const container = document.getElementById('logContainer');
                    container.innerHTML = '';
                    const logs = JSON.parse(localStorage.getItem('lobbyLogs')) || [];
                    
                    logs.forEach(log => {
                        const card = document.createElement('div');
                        card.className = 'log-card';
                        card.textContent = log;
                        container.appendChild(card);
                    });
                }
                updatePopupLogs();
                window.addEventListener('storage', (e) => {
                    if (e.key === 'lobbyLogs') updatePopupLogs();
                });
            <\/script>
        </body>
        </html>
    `);
  logWindow.document.close();
});

// --- 2. LOGIK FÜR DIE HAUPTSEITE (Damit die Logs rechts wieder Text haben) ---
function loadLogsToMainPage() {
  const container = document.querySelector('.recent-activities-container');
  if (!container) return;

  container.innerHTML = ''; // Leeren
  const logs = JSON.parse(localStorage.getItem('lobbyLogs')) || [];

  logs.forEach((log) => {
    const logHtml = `
            <div style="background: #151522; border: 1px solid #2a2a40; border-radius: 6px; padding: 12px; margin-bottom: 10px; display: flex; gap: 15px; font-size: 14px;">
                <div style="color: #666; font-family: monospace;">[16:00:00]</div>
                <div style="font-weight: bold; color: #fff;">Alex<span style="display:block; color:#9b51e0; font-size:11px;">SERVER</span></div>
                <div style="color: #ccc;">\${log}</div>
            </div>
        `;
    container.insertAdjacentHTML('beforeend', logHtml);
  });
}

// Logs beim Starten der Seite laden
loadLogsToMainPage();
