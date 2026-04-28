```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TechFinds Radar | Portal de Ofertas e Ativos em Alta Conversão</title>
  <meta name="description" content="Portal profissional de arbitragem para tecnologia e ativos financeiros, com monitoramento simulado, links afiliados automáticos e foco em conversão rápida." />
  <style>
    :root {
      --bg: #07111a;
      --bg-soft: #0d1b26;
      --panel: rgba(13, 27, 38, 0.92);
      --panel-2: rgba(16, 34, 47, 0.88);
      --line: rgba(143, 198, 255, 0.16);
      --text: #e9f3fb;
      --muted: #98afc4;
      --teal: #18d1b5;
      --cyan: #59b8ff;
      --gold: #ffba57;
      --danger: #ff6e6e;
      --shadow: 0 28px 80px rgba(2, 8, 15, 0.45);
      --radius: 24px;
    }

    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      color: var(--text);
      font-family: "Segoe UI", "Roboto", system-ui, -apple-system, sans-serif;
      background:
        radial-gradient(circle at top left, rgba(24, 209, 181, 0.10), transparent 24%),
        radial-gradient(circle at 90% 0%, rgba(89, 184, 255, 0.10), transparent 20%),
        linear-gradient(180deg, #07111a 0%, #0a1520 45%, #08111a 100%);
    }

    body::before {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      background-image:
        linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
      background-size: 24px 24px;
      mask-image: linear-gradient(180deg, rgba(255,255,255,0.65), transparent 90%);
    }

    a { color: inherit; text-decoration: none; }
    button, input { font: inherit; }

    .shell {
      width: min(1280px, calc(100% - 28px));
      margin: 0 auto;
      padding: 22px 0 40px;
    }

    .topbar,
    .hero,
    .panel,
    .sticky-cta {
      border: 1px solid var(--line);
      background: linear-gradient(180deg, rgba(13, 27, 38, 0.95), rgba(9, 20, 30, 0.92));
      box-shadow: var(--shadow);
      backdrop-filter: blur(16px);
    }

    .topbar {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 18px;
      border-radius: 26px;
      padding: 18px;
      margin-bottom: 18px;
      position: sticky;
      top: 14px;
      z-index: 40;
    }

    .brand {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .brand-badge {
      width: 52px;
      height: 52px;
      border-radius: 18px;
      display: grid;
      place-items: center;
      font-weight: 800;
      letter-spacing: 0.04em;
      color: #08111a;
      background: linear-gradient(135deg, var(--teal), #7ef0df);
      box-shadow: 0 18px 30px rgba(24, 209, 181, 0.22);
      flex: 0 0 auto;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 999px;
      font-size: 12px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--muted);
      background: rgba(255,255,255,0.03);
    }

    .pulse {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--gold);
      box-shadow: 0 0 0 0 rgba(255, 186, 87, 0.40);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      70% { box-shadow: 0 0 0 12px rgba(255, 186, 87, 0); }
      100% { box-shadow: 0 0 0 0 rgba(255, 186, 87, 0); }
    }

    .brand h1 {
      margin: 10px 0 0;
      font-size: clamp(28px, 4.8vw, 54px);
      line-height: 0.94;
      letter-spacing: -0.05em;
      max-width: 11ch;
    }

    .brand p {
      margin: 10px 0 0;
      color: var(--muted);
      line-height: 1.65;
      max-width: 64ch;
      font-size: 14.5px;
    }

    .affiliate-box {
      display: flex;
      flex-direction: column;
      gap: 12px;
      justify-content: space-between;
      border-radius: 24px;
      padding: 16px;
      background: linear-gradient(180deg, rgba(14, 31, 44, 0.92), rgba(10, 23, 34, 0.96));
      border: 1px solid rgba(89, 184, 255, 0.16);
    }

    .affiliate-box label {
      font-size: 12px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .affiliate-box small {
      color: var(--muted);
      line-height: 1.6;
    }

    .affiliate-row {
      display: grid;
      grid-template-columns: 1fr auto auto;
      gap: 10px;
    }

    .affiliate-row input {
      min-width: 0;
      width: 100%;
      height: 52px;
      border-radius: 16px;
      border: 1px solid rgba(255,255,255,0.10);
      background: rgba(5, 13, 20, 0.9);
      color: var(--text);
      padding: 0 16px;
      outline: none;
    }

    .btn,
    .ghost {
      height: 52px;
      border-radius: 16px;
      border: 0;
      padding: 0 18px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;
      white-space: nowrap;
    }

    .btn:hover,
    .ghost:hover,
    .cta:hover,
    .copy:hover {
      transform: translateY(-1px);
    }

    .btn {
      background: linear-gradient(135deg, var(--teal), #67f1df);
      color: #051219;
      box-shadow: 0 20px 40px rgba(24, 209, 181, 0.18);
    }

    .ghost {
      border: 1px solid rgba(255,255,255,0.10);
      background: rgba(255,255,255,0.04);
      color: var(--text);
    }

    .hero {
      display: grid;
      grid-template-columns: 1.14fr 0.86fr;
      gap: 18px;
      border-radius: 30px;
      padding: 18px;
      margin-bottom: 18px;
      overflow: hidden;
    }

    .lead-panel {
      position: relative;
      border-radius: 26px;
      padding: 26px;
      background:
        radial-gradient(circle at top right, rgba(89, 184, 255, 0.12), transparent 28%),
        linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015));
      border: 1px solid rgba(255,255,255,0.06);
      overflow: hidden;
    }

    .lead-panel::before {
      content: "";
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 30px 30px;
      mask-image: linear-gradient(180deg, rgba(255,255,255,0.75), transparent 92%);
      pointer-events: none;
    }

    .lead-panel > * { position: relative; z-index: 1; }
    .lead-tag {
      display: inline-flex;
      gap: 10px;
      align-items: center;
      padding: 8px 12px;
      border-radius: 999px;
      font-size: 12px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #b9ecff;
      background: rgba(89, 184, 255, 0.08);
      border: 1px solid rgba(89, 184, 255, 0.14);
    }

    .lead-title {
      margin: 18px 0 14px;
      font-size: clamp(34px, 6vw, 74px);
      line-height: 0.92;
      letter-spacing: -0.06em;
      max-width: 9ch;
    }

    .lead-copy {
      margin: 0 0 22px;
      color: var(--muted);
      line-height: 1.7;
      max-width: 66ch;
      font-size: 15px;
    }

    .lead-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 18px;
    }

    .mini {
      border-radius: 20px;
      padding: 16px;
      border: 1px solid rgba(255,255,255,0.07);
      background: rgba(7, 17, 26, 0.66);
    }

    .mini span {
      display: block;
      font-size: 11px;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.14em;
      margin-bottom: 8px;
    }

    .mini strong {
      display: block;
      font-size: clamp(18px, 3vw, 28px);
      letter-spacing: -0.04em;
    }

    .mini small {
      color: var(--muted);
      display: block;
      margin-top: 6px;
      line-height: 1.5;
    }

    .lead-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .cta,
    .copy {
      height: 54px;
      padding: 0 20px;
      border-radius: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-weight: 800;
      border: 1px solid transparent;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .cta {
      background: linear-gradient(135deg, var(--teal), #71eedf);
      color: #06131a;
      box-shadow: 0 18px 42px rgba(24, 209, 181, 0.2);
    }

    .copy {
      color: var(--text);
      background: rgba(255,255,255,0.04);
      border-color: rgba(255,255,255,0.10);
    }

    .side-stack {
      display: grid;
      gap: 14px;
    }

    .radar-visual {
      min-height: 252px;
      border-radius: 26px;
      border: 1px solid rgba(255,255,255,0.07);
      background:
        radial-gradient(circle at 50% 50%, rgba(24, 209, 181, 0.14), transparent 24%),
        radial-gradient(circle at 50% 50%, rgba(89, 184, 255, 0.12), transparent 38%),
        linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015));
      display: grid;
      place-items: center;
      position: relative;
      overflow: hidden;
    }

    .radar-core {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      position: relative;
      border: 1px solid rgba(89, 184, 255, 0.16);
      box-shadow: inset 0 0 0 1px rgba(24,209,181,0.08);
    }

    .radar-core::before,
    .radar-core::after {
      content: "";
      position: absolute;
      inset: 16px;
      border-radius: 50%;
      border: 1px solid rgba(89, 184, 255, 0.12);
    }

    .radar-core::after { inset: 44px; }

    .sweep {
      position: absolute;
      inset: -24px;
      background: conic-gradient(from 0deg, rgba(24,209,181,0) 0deg, rgba(24,209,181,0.18) 56deg, rgba(24,209,181,0) 110deg);
      animation: sweep 3.2s linear infinite;
      mask: radial-gradient(circle, transparent 0 56px, #000 56px);
    }

    @keyframes sweep { to { transform: rotate(360deg); } }

    .dot {
      position: absolute;
      border-radius: 50%;
      background: var(--gold);
      box-shadow: 0 0 18px rgba(255,186,87,0.75);
    }

    .dot:nth-child(2) { width: 10px; height: 10px; top: 28px; left: 68px; }
    .dot:nth-child(3) { width: 12px; height: 12px; bottom: 42px; left: 30px; }
    .dot:nth-child(4) { width: 8px; height: 8px; right: 24px; top: 72px; }

    .panel {
      border-radius: 26px;
      padding: 18px;
    }

    .panel h3 {
      margin: 0;
      font-size: 22px;
      line-height: 1.05;
      letter-spacing: -0.04em;
    }

    .panel p,
    .panel li,
    .panel small {
      color: var(--muted);
      line-height: 1.7;
    }

    .metrics {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      margin-top: 14px;
    }

    .metric-chip {
      border-radius: 18px;
      padding: 14px;
      border: 1px solid rgba(255,255,255,0.08);
      background: rgba(255,255,255,0.025);
    }

    .metric-chip strong {
      display: block;
      font-size: 22px;
      margin-top: 6px;
      letter-spacing: -0.04em;
      color: var(--text);
    }

    .main-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 360px;
      gap: 18px;
      align-items: start;
    }

    .toolbar {
      display: flex;
      gap: 12px;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
      flex-wrap: wrap;
    }

    .toolbar h2 {
      margin: 0;
      font-size: clamp(24px, 3vw, 34px);
      letter-spacing: -0.04em;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .chip {
      border-radius: 999px;
      height: 42px;
      border: 1px solid rgba(255,255,255,0.10);
      background: rgba(255,255,255,0.03);
      color: var(--text);
      padding: 0 16px;
      font-weight: 700;
      cursor: pointer;
    }

    .chip.active {
      border-color: rgba(24, 209, 181, 0.25);
      background: linear-gradient(135deg, rgba(24,209,181,0.18), rgba(89,184,255,0.14));
      box-shadow: 0 18px 32px rgba(24,209,181,0.14);
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
    }

    .card {
      border-radius: 24px;
      border: 1px solid rgba(255,255,255,0.08);
      background: linear-gradient(180deg, rgba(12, 26, 36, 0.95), rgba(8, 18, 27, 0.92));
      padding: 18px;
      position: relative;
      overflow: hidden;
      min-height: 100%;
    }

    .card::before {
      content: "";
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at top right, rgba(89,184,255,0.10), transparent 24%);
      pointer-events: none;
    }

    .card > * { position: relative; z-index: 1; }

    .card-top {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: start;
      margin-bottom: 12px;
    }

    .label-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 10px;
    }

    .label,
    .store {
      padding: 6px 10px;
      border-radius: 999px;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
    }

    .label {
      background: rgba(24, 209, 181, 0.12);
      color: #8ef8e8;
      border: 1px solid rgba(24,209,181,0.18);
    }

    .store {
      background: rgba(255,255,255,0.04);
      color: var(--muted);
      border: 1px solid rgba(255,255,255,0.08);
    }

    .card h4 {
      margin: 0 0 8px;
      font-size: 24px;
      letter-spacing: -0.04em;
    }

    .card-headline {
      margin: 0 0 10px;
      font-size: 16px;
      line-height: 1.45;
      color: var(--text);
    }

    .card-copy { margin: 0 0 14px; font-size: 14px; }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      margin-bottom: 12px;
    }

    .stat-box {
      border-radius: 18px;
      padding: 14px;
      border: 1px solid rgba(255,255,255,0.08);
      background: rgba(255,255,255,0.03);
    }

    .stat-box span {
      display: block;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.11em;
      font-size: 11px;
      margin-bottom: 8px;
    }

    .stat-box strong {
      display: block;
      font-size: 22px;
      letter-spacing: -0.04em;
      margin-bottom: 4px;
    }

    .stat-box em {
      font-style: normal;
      color: var(--muted);
      font-size: 13px;
      line-height: 1.6;
    }

    .score {
      padding: 8px 12px;
      border-radius: 999px;
      font-weight: 800;
      background: rgba(89, 184, 255, 0.12);
      border: 1px solid rgba(89, 184, 255, 0.18);
      color: #b6e4ff;
      white-space: nowrap;
    }

    .sparkline {
      width: 100%;
      height: 72px;
      display: block;
      margin: 4px 0 10px;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 14px;
    }

    .tag {
      padding: 7px 10px;
      border-radius: 999px;
      font-size: 12px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      color: var(--muted);
    }

    .card-actions {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 10px;
    }

    .mini-copy {
      height: 50px;
      padding: 0 16px;
      border-radius: 16px;
      border: 1px solid rgba(255,255,255,0.10);
      background: rgba(255,255,255,0.04);
      color: var(--text);
      cursor: pointer;
      font-weight: 700;
    }

    .aside-stack {
      position: sticky;
      top: 112px;
      display: grid;
      gap: 14px;
    }

    .seo-preview code {
      display: block;
      margin-top: 8px;
      padding: 12px 14px;
      border-radius: 16px;
      background: rgba(5, 13, 20, 0.9);
      border: 1px solid rgba(255,255,255,0.07);
      color: #9be6ff;
      white-space: pre-wrap;
      word-break: break-word;
      font-size: 13px;
      line-height: 1.65;
    }

    .banner-slot {
      padding: 18px;
      border-radius: 22px;
      border: 1px solid rgba(255, 186, 87, 0.18);
      background: linear-gradient(135deg, rgba(255,186,87,0.10), rgba(255,255,255,0.02));
    }

    .banner-slot strong { display: block; font-size: 20px; margin-bottom: 10px; }

    .tech-list {
      margin: 0;
      padding-left: 18px;
    }

    .sticky-cta {
      display: none;
      position: fixed;
      left: 12px;
      right: 12px;
      bottom: 12px;
      z-index: 60;
      border-radius: 24px;
      padding: 14px;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 12px;
      align-items: center;
    }

    .sticky-cta .label-title {
      font-weight: 800;
      font-size: 15px;
      line-height: 1.35;
      letter-spacing: -0.02em;
      margin-bottom: 4px;
    }

    .sticky-cta .label-copy {
      color: var(--muted);
      font-size: 13px;
      line-height: 1.5;
    }

    .notice {
      margin-top: 12px;
      color: #9be6ff;
      font-size: 13px;
      min-height: 18px;
    }

    @media (max-width: 1080px) {
      .topbar,
      .hero,
      .main-grid,
      .cards {
        grid-template-columns: 1fr;
      }
      .aside-stack { position: static; }
      .brand h1 { max-width: none; }
    }

    @media (max-width: 720px) {
      .shell { width: min(100% - 18px, 100%); }
      .topbar, .hero, .panel { padding: 14px; border-radius: 22px; }
      .lead-panel { padding: 18px; }
      .lead-stats,
      .metrics,
      .stats-grid,
      .affiliate-row,
      .card-actions { grid-template-columns: 1fr; }
      .affiliate-row .btn,
      .affiliate-row .ghost,
      .card-actions .mini-copy,
      .card-actions .cta { width: 100%; }
      .sticky-cta { display: grid; }
      body { padding-bottom: 92px; }
    }
  </style>
</head>
<body>
  <div class="shell">
    <header class="topbar">
      <div class="brand">
        <div class="brand-badge">TF</div>
        <div>
          <span class="eyebrow"><span class="pulse"></span> Monitoramento inteligente de tecnologia e renda</span>
          <h1>Portal TechFinds de conversão rápida.</h1>
          <p>Este ficheiro já vem preparado para usar o seu identificador global de afiliado. Todos os botões de compra e análise concatenam automaticamente o ID informado no topo da interface e no bloco de configuração do JavaScript.</p>
        </div>
      </div>

      <div class="affiliate-box">
        <div>
          <label for="affiliateInput">ID global de afiliado</label>
          <div class="affiliate-row">
            <input id="affiliateInput" type="text" placeholder="Cole aqui algo como meuuser-20 ou o seu ID do parceiro" />
            <button class="btn" id="saveAffiliateBtn">Guardar ID</button>
            <button class="ghost" id="copyAffiliateBtn">Copiar</button>
          </div>
        </div>
        <small>Valor inicial configurado: <strong id="affiliatePreview">techfinds0d70-20</strong>. Pode alterar o ID sem mexer na estrutura do portal. Os parâmetros UTM e o identificador são aplicados automaticamente aos links gerados.</small>
      </div>
    </header>

    <section class="hero">
      <div class="lead-panel">
        <div class="lead-tag" id="leadTag">Radar prioritário • alta intenção de compra</div>
        <h2 class="lead-title" id="leadTitle">A carregar oportunidades...</h2>
        <p class="lead-copy" id="leadCopy">A preparar a melhor combinação de tecnologia, oportunidade e monetização.</p>
        <div class="lead-stats">
          <article class="mini">
            <span>Oportunidade líder</span>
            <strong id="leadPrice">--</strong>
            <small id="leadReference">--</small>
          </article>
          <article class="mini">
            <span>Grau de vantagem</span>
            <strong id="leadScore">--</strong>
            <small id="leadReason">--</small>
          </article>
          <article class="mini">
            <span>Ritmo do radar</span>
            <strong id="refreshMetric">30 min</strong>
            <small id="leadSource">Sincronizado com monitoramento simulado</small>
          </article>
        </div>
        <div class="lead-actions">
          <a class="cta" id="leadButton" href="#" target="_blank" rel="noopener noreferrer">Comprar agora</a>
          <button class="copy" id="copyLeadLink">Copiar link do destaque</button>
        </div>
        <div class="notice" id="notice"></div>
      </div>

      <div class="side-stack">
        <div class="radar-visual">
          <div class="radar-core">
            <div class="sweep"></div>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>

        <section class="panel">
          <span class="eyebrow">Saúde operacional</span>
          <h3>Fluxo pronto para vender e rankear.</h3>
          <p>O portal combina sinais simulados, copy orientada a intenção, SEO dinâmico e CTA direto. O objetivo é reduzir fricção e levar o utilizador da descoberta à ação em poucos segundos.</p>
          <div class="metrics">
            <div class="metric-chip">
              <small>Fontes</small>
              <strong>05</strong>
            </div>
            <div class="metric-chip">
              <small>Build</small>
              <strong>HTML único</strong>
            </div>
            <div class="metric-chip">
              <small>Afiliado</small>
              <strong id="metricAffiliate">ativo</strong>
            </div>
          </div>
        </section>
      </div>
    </section>

    <section class="main-grid">
      <div>
        <div class="toolbar">
          <div>
            <span class="eyebrow">Feed comercial</span>
            <h2>Ofertas e ativos ordenados por potencial de conversão</h2>
          </div>
          <div class="chips">
            <button class="chip active" data-filter="all">Tudo</button>
            <button class="chip" data-filter="ecommerce">Comprar</button>
            <button class="chip" data-filter="fii">FIIs</button>
          </div>
        </div>
        <div class="cards" id="cards"></div>
      </div>

      <aside class="aside-stack">
        <section class="panel seo-preview">
          <span class="eyebrow">SEO automático</span>
          <h3>Metadados do destaque</h3>
          <p>O título, a descrição e o canonical do documento são atualizados automaticamente com base no item líder do momento.</p>
          <code id="seoOutput">A gerar metadados...</code>
        </section>

        <section class="banner-slot">
          <span class="eyebrow">Zona premium</span>
          <strong>Espaço para banner patrocinado ou cupom de urgência.</strong>
          <p>Este bloco foi mantido visível e elegante para acomodar comparadores, promos relâmpago ou parceiros de tecnologia sem quebrar a confiança visual do portal.</p>
          <a class="cta" id="bannerCta" href="#" target="_blank" rel="noopener noreferrer">Abrir campanha líder</a>
        </section>

        <section class="panel">
          <span class="eyebrow">Arquitetura funcional</span>
          <h3>Como o HTML único trabalha.</h3>
          <ol class="tech-list">
            <li>O JavaScript define um ID global editável no topo do código.</li>
            <li>O monitoramento simulado calcula scores e monta os cards.</li>
            <li>Cada botão concatena automaticamente o seu afiliado à URL base.</li>
            <li>A interface prioriza prova visual, escassez e ação imediata.</li>
          </ol>
        </section>
      </aside>
    </section>
  </div>

  <div class="sticky-cta" id="stickyBar">
    <div>
      <div class="label-title" id="stickyTitle">A carregar destaque</div>
      <div class="label-copy" id="stickyCopy">A preparar a melhor rota de conversão.</div>
    </div>
    <a class="cta" id="stickyButton" href="#" target="_blank" rel="noopener noreferrer">Comprar</a>
  </div>

  <script>
    /*
      COLE AQUI O SEU ID GLOBAL DE AFILIADO.
      Exemplo: meuuser-20, techfinds0d70-20 ou o identificador do parceiro.
      Se preferir, altere diretamente esta linha e o portal inteiro passará a usar o novo valor.
    */
    window.AFFILIATE_ID = localStorage.getItem("techfinds_affiliate_id") || "techfinds0d70-20";

    const MONITOR_SOURCE = [
      {
            "slug": "kncr11-radar",
            "title": "KNCR11",
            "category": "fii",
            "source": "Funds Explorer",
            "sourceUrl": "https://www.fundsexplorer.com.br/funds/kncr11",
            "headline": "KNCR11 entra no radar quando o retorno defensivo sobe em relação à base histórica curta.",
            "summary": "Ativo útil para páginas orientadas a estabilidade, fluxo e proteção em renda imobiliária.",
            "referenceValue": 11.1,
            "currentValue": 13.74,
            "tags": [
                  "kncr11",
                  "papel",
                  "fii",
                  "renda"
            ]
      },
      {
            "slug": "smart-tv-55-qled",
            "title": "Smart TV 55 QLED",
            "category": "ecommerce",
            "source": "Magazine Luiza",
            "sourceUrl": "https://www.magazineluiza.com.br/busca/smart+tv+55+qled/",
            "headline": "Televisores premium geram decisão rápida quando o desconto atravessa a média recente.",
            "summary": "Bom item de conversão para tráfego orientado a upgrade de sala e eventos promocionais.",
            "referenceValue": 3299,
            "currentValue": 2564.05,
            "tags": [
                  "tv",
                  "qled",
                  "sala",
                  "eletronicos"
            ]
      },
      {
            "slug": "mxrf11-rendimento",
            "title": "MXRF11",
            "category": "fii",
            "source": "Funds Explorer",
            "sourceUrl": "https://www.fundsexplorer.com.br/funds/mxrf11",
            "headline": "MXRF11 volta a ganhar atenção por rendimento relativo acima da base recente.",
            "summary": "Ativo líquido e recorrente em conteúdos de renda mensal e comparação entre FIIs.",
            "referenceValue": 10.15,
            "currentValue": 12.08,
            "tags": [
                  "mxrf11",
                  "fii",
                  "dividendos",
                  "rendimento"
            ]
      }
]

    const state = {
      filter: "all",
      affiliateId: window.AFFILIATE_ID,
      items: []
    };

    const cardsEl = document.getElementById("cards");
    const leadTitleEl = document.getElementById("leadTitle");
    const leadCopyEl = document.getElementById("leadCopy");
    const leadPriceEl = document.getElementById("leadPrice");
    const leadReferenceEl = document.getElementById("leadReference");
    const leadScoreEl = document.getElementById("leadScore");
    const leadReasonEl = document.getElementById("leadReason");
    const leadSourceEl = document.getElementById("leadSource");
    const leadButtonEl = document.getElementById("leadButton");
    const bannerCtaEl = document.getElementById("bannerCta");
    const copyLeadLinkEl = document.getElementById("copyLeadLink");
    const seoOutputEl = document.getElementById("seoOutput");
    const affiliateInputEl = document.getElementById("affiliateInput");
    const affiliatePreviewEl = document.getElementById("affiliatePreview");
    const metricAffiliateEl = document.getElementById("metricAffiliate");
    const noticeEl = document.getElementById("notice");
    const stickyTitleEl = document.getElementById("stickyTitle");
    const stickyCopyEl = document.getElementById("stickyCopy");
    const stickyButtonEl = document.getElementById("stickyButton");
    const leadTagEl = document.getElementById("leadTag");

    affiliateInputEl.value = state.affiliateId;

    function formatCurrency(value) {
      return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
    }

    function formatYield(value) {
      return `${value.toFixed(2).replace('.', ',')}% a.a.`;
    }

    function normalizeHost(hostname) {
      return hostname.replace(/^www\./, "");
    }

    function buildAffiliateUrl(item) {
      const url = new URL(item.sourceUrl);
      const host = normalizeHost(url.hostname);
      const affiliateId = (state.affiliateId || "techfinds0d70-20").trim();

      url.searchParams.set("utm_source", "techfinds_portal");
      url.searchParams.set("utm_medium", "affiliate");
      url.searchParams.set("utm_campaign", item.slug);
      url.searchParams.set("utm_content", item.category);
      url.searchParams.set("ref", affiliateId);
      url.searchParams.set("affiliate_id", affiliateId);
      url.searchParams.set("aff_id", affiliateId);

      if (host.includes("amazon.com.br")) {
        url.searchParams.set("tag", affiliateId);
      }
      if (host.includes("mercadolivre.com.br")) {
        url.searchParams.set("matt_tool", affiliateId);
        url.searchParams.set("matt_word", item.slug);
      }
      if (host.includes("magazineluiza.com.br")) {
        url.searchParams.set("partner_id", affiliateId);
      }
      if (host.includes("statusinvest.com.br") || host.includes("fundsexplorer.com.br")) {
        url.searchParams.set("affiliate", affiliateId);
      }

      return url.toString();
    }

    function buildHistory(referenceValue, currentValue) {
      const history = [];
      for (let i = 0; i < 7; i += 1) {
        const bridge = i / 6;
        const base = referenceValue + (currentValue - referenceValue) * bridge;
        const oscillation = Math.sin((i + 1) * 0.9) * referenceValue * 0.018;
        history.push(Number((base + oscillation).toFixed(2)));
      }
      history[history.length - 1] = currentValue;
      return history;
    }

    function computeItem(raw) {
      const deltaPercent = Number((((raw.currentValue - raw.referenceValue) / raw.referenceValue) * 100).toFixed(2));
      const velocity = raw.category === "ecommerce" ? 0.94 : 0.77;
      const magnitude = Math.min(Math.abs(deltaPercent) * 1.9, 29);
      const categoryBonus = raw.category === "ecommerce" ? 4.8 : 4.2;
      const score = Number((46 + magnitude + (velocity * 12.5) + categoryBonus).toFixed(1));
      const isEcommerce = raw.category === "ecommerce";

      return {
        ...raw,
        deltaPercent,
        score,
        currentLabel: isEcommerce ? formatCurrency(raw.currentValue) : formatYield(raw.currentValue),
        referenceLabel: isEcommerce ? `Antes ${formatCurrency(raw.referenceValue)}` : `Base ${formatYield(raw.referenceValue)}`,
        metricLabel: isEcommerce ? "Preço monitorado" : "Yield observado",
        reason: isEcommerce
          ? `Queda monitorada de ${Math.abs(deltaPercent).toFixed(1).replace('.', ',')}% sobre a referência.`
          : `Pico monitorado de ${deltaPercent.toFixed(1).replace('.', ',')}% acima da base.` ,
        history: buildHistory(raw.referenceValue, raw.currentValue),
        url: buildAffiliateUrl(raw)
      };
    }

    function getItems() {
      return MONITOR_SOURCE.map(computeItem).sort((a, b) => b.score - a.score);
    }

    function sparkline(history, tone) {
      const width = 320;
      const height = 72;
      const min = Math.min(...history);
      const max = Math.max(...history);
      const range = Math.max(max - min, 1);
      const stroke = tone === "ecommerce" ? "#18d1b5" : "#ffba57";
      const fill = tone === "ecommerce" ? "rgba(24,209,181,0.14)" : "rgba(255,186,87,0.14)";
      const points = history.map((value, index) => {
        const x = (index / Math.max(history.length - 1, 1)) * width;
        const y = height - (((value - min) / range) * (height - 10)) - 5;
        return `${x},${y}`;
      }).join(" ");
      return `<svg viewBox="0 0 ${width} ${height}" class="sparkline" aria-hidden="true"><polygon points="0,${height} ${points} ${width},${height}" fill="${fill}"></polygon><polyline points="${points}" fill="none" stroke="${stroke}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></polyline></svg>`;
    }

    function buildSeo(item) {
      const title = `${item.title} em radar de oportunidade | TechFinds Portal`;
      const description = `${item.headline} ${item.reason} Clique para abrir a URL com o seu identificador ${state.affiliateId}.`;
      const canonical = `${location.origin}${location.pathname}?highlight=${encodeURIComponent(item.slug)}`;
      return { title, description, canonical };
    }

    function applySeo(item) {
      const seo = buildSeo(item);
      document.title = seo.title;
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute("content", seo.description);

      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", seo.canonical);

      seoOutputEl.textContent = `title: ${seo.title}\n\ndescription: ${seo.description}\n\ncanonical: ${seo.canonical}`;
    }

    function renderLead(item) {
      leadTagEl.textContent = `${item.category === "ecommerce" ? "Radar de compra" : "Radar de FIIs"} • ${item.source}`;
      leadTitleEl.textContent = item.headline;
      leadCopyEl.textContent = item.summary;
      leadPriceEl.textContent = item.currentLabel;
      leadReferenceEl.textContent = item.referenceLabel;
      leadScoreEl.textContent = `Score ${item.score}`;
      leadReasonEl.textContent = item.reason;
      leadSourceEl.textContent = `${item.metricLabel} • ${item.source}`;
      leadButtonEl.textContent = item.category === "ecommerce" ? item.ctaLabel : "Abrir análise";
      leadButtonEl.href = item.url;
      bannerCtaEl.href = item.url;
      stickyTitleEl.textContent = item.title;
      stickyCopyEl.textContent = item.reason;
      stickyButtonEl.href = item.url;
      stickyButtonEl.textContent = item.category === "ecommerce" ? "Comprar" : "Analisar";
      applySeo(item);
    }

    function renderCards() {
      const filtered = state.filter === "all"
        ? state.items
        : state.items.filter((item) => item.category === state.filter);

      cardsEl.innerHTML = filtered.map((item) => {
        const deltaColor = item.category === "ecommerce" ? "var(--teal)" : "var(--gold)";
        return `
          <article class="card">
            <div class="card-top">
              <div>
                <div class="label-row">
                  <span class="label">${item.category === "ecommerce" ? "Comprar" : "FII"}</span>
                  <span class="store">${item.source}</span>
                </div>
                <h4>${item.title}</h4>
              </div>
              <span class="score">Score ${item.score}</span>
            </div>
            <p class="card-headline">${item.headline}</p>
            <p class="card-copy">${item.summary}</p>
            <div class="stats-grid">
              <div class="stat-box">
                <span>${item.metricLabel}</span>
                <strong>${item.currentLabel}</strong>
                <em>${item.referenceLabel}</em>
              </div>
              <div class="stat-box">
                <span>Delta capturado</span>
                <strong style="color:${deltaColor}">${item.deltaPercent > 0 ? "+" : ""}${item.deltaPercent.toFixed(1).replace('.', ',')}%</strong>
                <em>${item.reason}</em>
              </div>
            </div>
            ${sparkline(item.history, item.category)}
            <div class="tags">${item.tags.map((tag) => `<span class="tag">#${tag}</span>`).join("")}</div>
            <div class="card-actions">
              <a class="cta" href="${item.url}" target="_blank" rel="noopener noreferrer">${item.category === "ecommerce" ? item.ctaLabel : "Analisar agora"}</a>
              <button class="mini-copy" data-copy-url="${item.url.replace(/"/g, '&quot;')}">Copiar link</button>
            </div>
          </article>
        `;
      }).join("");

      cardsEl.querySelectorAll("[data-copy-url]").forEach((button) => {
        button.addEventListener("click", async () => {
          await copyText(button.getAttribute("data-copy-url"));
        });
      });
    }

    async function copyText(text) {
      try {
        await navigator.clipboard.writeText(text || "");
        noticeEl.textContent = "Link copiado com o seu ID de afiliado.";
      } catch (error) {
        noticeEl.textContent = "Não foi possível copiar automaticamente neste dispositivo.";
      }
    }

    function syncAffiliateUi() {
      affiliateInputEl.value = state.affiliateId;
      affiliatePreviewEl.textContent = state.affiliateId;
      metricAffiliateEl.textContent = state.affiliateId;
    }

    function updateAffiliateId(nextId) {
      state.affiliateId = (nextId || "techfinds0d70-20").trim() || "techfinds0d70-20";
      window.AFFILIATE_ID = state.affiliateId;
      localStorage.setItem("techfinds_affiliate_id", state.affiliateId);
      state.items = getItems();
      syncAffiliateUi();
      render();
      noticeEl.textContent = `ID global atualizado para ${state.affiliateId}. Todos os botões já usam este valor.`;
    }

    function render() {
      const lead = state.items[0];
      renderLead(lead);
      renderCards();
    }

    document.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        document.querySelectorAll(".chip").forEach((node) => node.classList.remove("active"));
        chip.classList.add("active");
        state.filter = chip.dataset.filter;
        renderCards();
      });
    });

    document.getElementById("saveAffiliateBtn").addEventListener("click", () => updateAffiliateId(affiliateInputEl.value));
    document.getElementById("copyAffiliateBtn").addEventListener("click", () => copyText(state.affiliateId));
    copyLeadLinkEl.addEventListener("click", () => copyText(state.items[0].url));
    affiliateInputEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        updateAffiliateId(affiliateInputEl.value);
      }
    });

    state.items = getItems();
    syncAffiliateUi();
    render();
  </script>
</body>
</html>

```
