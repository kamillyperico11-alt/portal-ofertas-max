import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const HTML_PATH = path.join(ROOT, 'index.html');
const MARKDOWN_PATH = path.join(ROOT, 'CODIGO_UNICO_PORTAL.md');
const DEFAULT_AFFILIATE_ID = 'techfinds0d70-20';
const OFFERS_API_URL = process.env.OFFERS_API_URL || '';
const USER_AGENT =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';
const CATEGORY_LIMITS = {
  ecommerce: 3,
  fii: 2,
};

const DEFAULT_CATALOG = [
  {
    slug: 'galaxy-a15-256gb',
    title: 'Galaxy A15 256 GB',
    category: 'ecommerce',
    source: 'Magazine Luiza',
    sourceUrl: 'https://www.magazineluiza.com.br/busca/galaxy-a15/',
    headline: 'Galaxy A15 em compressão de preço com procura forte no mobile.',
    summary: 'Modelo de giro rápido, muito pesquisado e com alta intenção de compra imediata.',
    referenceValue: 1429,
    currentValue: 1429,
    tags: ['galaxy', 'android', 'mobile', 'desconto'],
  },
  {
    slug: 'poco-x6-pro-512gb',
    title: 'POCO X6 Pro 512 GB',
    category: 'ecommerce',
    source: 'Mercado Livre',
    sourceUrl: 'https://lista.mercadolivre.com.br/poco-x6-pro-512gb',
    headline: 'POCO em stress promocional com perfil ideal para tráfego de comparação.',
    summary: 'Produto técnico com conversão forte em conteúdos de ficha, benchmark e urgência.',
    referenceValue: 2369,
    currentValue: 2369,
    tags: ['poco', 'performance', 'smartphone', 'oferta'],
  },
  {
    slug: 'notebook-rtx4050',
    title: 'Notebook RTX 4050',
    category: 'ecommerce',
    source: 'Amazon Brasil',
    sourceUrl: 'https://www.amazon.com.br/s?k=notebook+rtx+4050',
    headline: 'Notebook gamer entra em janela de decisão com ticket elevado e margem real.',
    summary: 'Ticket alto com espaço para copy técnica, prova de urgência e comparativo direto.',
    referenceValue: 5899,
    currentValue: 5899,
    tags: ['notebook', 'rtx4050', 'gamer', 'performance'],
  },
  {
    slug: 'iphone-15-128gb',
    title: 'iPhone 15 128 GB',
    category: 'ecommerce',
    source: 'Mercado Livre',
    sourceUrl: 'https://lista.mercadolivre.com.br/iphone-15-128gb',
    headline: 'iPhone 15 entra em radar quando há desalinhamento relevante face ao preço médio.',
    summary: 'Busca muito forte e propensão a clique alto quando o preço cai de forma visível.',
    referenceValue: 4699,
    currentValue: 4699,
    tags: ['iphone', 'apple', 'premium', 'mobile'],
  },
  {
    slug: 'smart-tv-55-qled',
    title: 'Smart TV 55 QLED',
    category: 'ecommerce',
    source: 'Magazine Luiza',
    sourceUrl: 'https://www.magazineluiza.com.br/busca/smart+tv+55+qled/',
    headline: 'Televisores premium geram decisão rápida quando o desconto atravessa a média recente.',
    summary: 'Bom item de conversão para tráfego orientado a upgrade de sala e eventos promocionais.',
    referenceValue: 3299,
    currentValue: 3299,
    tags: ['tv', 'qled', 'sala', 'eletronicos'],
  },
  {
    slug: 'mxrf11-rendimento',
    title: 'MXRF11',
    category: 'fii',
    source: 'Funds Explorer',
    sourceUrl: 'https://www.fundsexplorer.com.br/funds/mxrf11',
    headline: 'MXRF11 volta a ganhar atenção por rendimento relativo acima da base recente.',
    summary: 'Ativo líquido e recorrente em conteúdos de renda mensal e comparação entre FIIs.',
    referenceValue: 10.15,
    currentValue: 10.15,
    tags: ['mxrf11', 'fii', 'dividendos', 'rendimento'],
  },
  {
    slug: 'hglg11-radar',
    title: 'HGLG11',
    category: 'fii',
    source: 'Funds Explorer',
    sourceUrl: 'https://www.fundsexplorer.com.br/funds/hglg11',
    headline: 'HGLG11 sinaliza entrada defensiva com narrativa clara para o investidor racional.',
    summary: 'Fundo conhecido, tese objetiva e bom encaixe em páginas de análise curta.',
    referenceValue: 8.74,
    currentValue: 8.74,
    tags: ['hglg11', 'logistica', 'fii', 'yield'],
  },
  {
    slug: 'xplg11-radar',
    title: 'XPLG11',
    category: 'fii',
    source: 'Funds Explorer',
    sourceUrl: 'https://www.fundsexplorer.com.br/funds/xplg11',
    headline: 'XPLG11 reage bem quando o dividend yield acelera acima da normalidade recente.',
    summary: 'Bom ativo para atrair cliques de perfil conservador com foco em logística.',
    referenceValue: 8.6,
    currentValue: 8.6,
    tags: ['xplg11', 'logistica', 'proventos', 'fii'],
  },
  {
    slug: 'kncr11-radar',
    title: 'KNCR11',
    category: 'fii',
    source: 'Funds Explorer',
    sourceUrl: 'https://www.fundsexplorer.com.br/funds/kncr11',
    headline: 'KNCR11 entra no radar quando o retorno defensivo sobe em relação à base histórica curta.',
    summary: 'Ativo útil para páginas orientadas a estabilidade, fluxo e proteção em renda imobiliária.',
    referenceValue: 11.1,
    currentValue: 11.1,
    tags: ['kncr11', 'papel', 'fii', 'renda'],
  },
];

function extractBetween(content, start, end) {
  const startIndex = content.indexOf(start);
  if (startIndex === -1) throw new Error(`Marcador inicial não encontrado: ${start}`);
  const from = startIndex + start.length;
  const endIndex = content.indexOf(end, from);
  if (endIndex === -1) throw new Error(`Marcador final não encontrado: ${end}`);
  return content.slice(from, endIndex);
}

function parseMonitorSource(html) {
  const raw = extractBetween(html, 'const MONITOR_SOURCE = ', '\n\n    const state =');
  const normalized = raw.trim().replace(/;\s*$/, '');
  return Function(`"use strict"; return (${normalized});`)();
}

function extractAffiliateId(html) {
  const match = html.match(/window\.AFFILIATE_ID = localStorage\.getItem\("techfinds_affiliate_id"\) \|\| "([^"]+)";/);
  return process.env.AFFILIATE_ID || match?.[1] || DEFAULT_AFFILIATE_ID;
}

function normalizeNumber(raw) {
  if (raw === null || raw === undefined) return null;
  const cleaned = String(raw)
    .trim()
    .replace(/R\$/gi, '')
    .replace(/%/g, '')
    .replace(/a\.a\./gi, '')
    .replace(/\s+/g, '')
    .replace(/\.(?=\d{3}(\D|$))/g, '')
    .replace(',', '.');
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}

function walkJson(node, visitor) {
  if (Array.isArray(node)) {
    node.forEach((item) => walkJson(item, visitor));
    return;
  }
  if (node && typeof node === 'object') {
    visitor(node);
    Object.values(node).forEach((value) => walkJson(value, visitor));
  }
}

function extractJsonLdBlocks(html) {
  const blocks = [];
  const regex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const payload = match[1].trim();
    if (!payload) continue;
    try {
      blocks.push(JSON.parse(payload));
      continue;
    } catch {}
    try {
      blocks.push(JSON.parse(payload.replace(/\u0000/g, '').replace(/\s+/g, ' ')));
    } catch {}
  }
  return blocks;
}

function firstValid(values, predicate) {
  for (const value of values) if (predicate(value)) return value;
  return null;
}

function extractCandidatesByRegex(html, patterns) {
  const values = [];
  for (const regex of patterns) {
    for (const match of html.matchAll(regex)) {
      const numeric = normalizeNumber(match.groups?.value ?? match[1]);
      if (numeric !== null) values.push(numeric);
    }
  }
  return values;
}

function findPriceFromJsonLd(blocks) {
  const candidates = [];
  blocks.forEach((block) => {
    walkJson(block, (node) => {
      const direct = normalizeNumber(node.price ?? node.lowPrice ?? node.highPrice);
      if (direct !== null) candidates.push(direct);
      const offers = node.offers;
      if (offers) {
        const offerValue = normalizeNumber(offers.price ?? offers.lowPrice ?? offers.highPrice);
        if (offerValue !== null) candidates.push(offerValue);
      }
      const aggregate = node.aggregateOffer;
      if (aggregate) {
        const aggregateValue = normalizeNumber(aggregate.lowPrice ?? aggregate.highPrice ?? aggregate.price);
        if (aggregateValue !== null) candidates.push(aggregateValue);
      }
    });
  });
  return firstValid(candidates, (value) => value >= 10 && value <= 1000000);
}

function findYieldFromJsonLd(blocks) {
  const candidates = [];
  const interestingKeys = ['yield', 'dividendyield', 'dy', 'rentabilidade'];
  blocks.forEach((block) => {
    walkJson(block, (node) => {
      for (const [key, value] of Object.entries(node)) {
        const normalizedKey = key.toLowerCase();
        if (!interestingKeys.some((item) => normalizedKey.includes(item))) continue;
        const numeric = normalizeNumber(value);
        if (numeric !== null) candidates.push(numeric);
      }
    });
  });
  return firstValid(candidates, (value) => value > 0.1 && value <= 50);
}

function findPriceFromHtml(html) {
  const patterns = [
    /"price"\s*:\s*"?(?<value>[\d.,]+)"?/gi,
    /"priceAmount"\s*:\s*"?(?<value>[\d.,]+)"?/gi,
    /price\s*content=\s*"(?<value>[\d.,]+)"/gi,
    /R\$\s*(?<value>[\d.]+,\d{2})/gi,
  ];
  return firstValid(extractCandidatesByRegex(html, patterns), (value) => value >= 10 && value <= 1000000);
}

function findYieldFromHtml(html) {
  const patterns = [
    /dividend\s*yield[^\d]{0,80}(?<value>\d{1,2}[.,]\d{2})/gi,
    /dy[^\d]{0,30}(?<value>\d{1,2}[.,]\d{2})/gi,
    /(?<value>\d{1,2}[.,]\d{2})\s*%\s*(?:a\.a\.|ao\s*ano)?/gi,
  ];
  return firstValid(extractCandidatesByRegex(html, patterns), (value) => value > 0.1 && value <= 50);
}

async function fetchPage(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': USER_AGENT,
      'accept-language': 'pt-BR,pt;q=0.9,en;q=0.8',
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'cache-control': 'no-cache',
    },
    signal: AbortSignal.timeout(25000),
  });

  if (!response.ok) throw new Error(`Falha ao obter ${url}: HTTP ${response.status}`);
  return response.text();
}

async function fetchApiPayload() {
  if (!OFFERS_API_URL) return [];
  const response = await fetch(OFFERS_API_URL, {
    headers: {
      'user-agent': USER_AGENT,
      accept: 'application/json,text/plain;q=0.9,*/*;q=0.8',
    },
    signal: AbortSignal.timeout(25000),
  });
  if (!response.ok) throw new Error(`Falha ao consultar OFFERS_API_URL: HTTP ${response.status}`);
  const payload = await response.json();
  if (!Array.isArray(payload)) throw new Error('OFFERS_API_URL deve devolver um array JSON.');
  return payload;
}

function mergeCatalog(currentItems, apiPayload) {
  const map = new Map();
  for (const item of DEFAULT_CATALOG) map.set(item.slug, { ...item });
  for (const item of currentItems) map.set(item.slug, { ...map.get(item.slug), ...item });
  for (const item of apiPayload) {
    if (!item?.slug) continue;
    map.set(item.slug, {
      ...map.get(item.slug),
      ...item,
      referenceValue: normalizeNumber(item.referenceValue) ?? map.get(item.slug)?.referenceValue ?? normalizeNumber(item.currentValue) ?? 0,
      currentValue: normalizeNumber(item.currentValue) ?? map.get(item.slug)?.currentValue ?? normalizeNumber(item.referenceValue) ?? 0,
      tags: Array.isArray(item.tags) ? item.tags : map.get(item.slug)?.tags ?? [],
    });
  }
  return Array.from(map.values()).filter((item) => item.slug && item.category && item.sourceUrl);
}

function applyApiQuote(item, apiEntry) {
  const currentValue = normalizeNumber(apiEntry.currentValue ?? apiEntry.price ?? apiEntry.yield);
  if (currentValue === null) return null;
  return {
    ...item,
    ...apiEntry,
    currentValue,
    referenceValue: normalizeNumber(apiEntry.referenceValue) ?? item.referenceValue,
    tags: Array.isArray(apiEntry.tags) ? apiEntry.tags : item.tags,
    updatedFrom: 'api',
  };
}

async function scrapeQuote(item) {
  try {
    const html = await fetchPage(item.sourceUrl);
    const blocks = extractJsonLdBlocks(html);
    const currentValue =
      item.category === 'ecommerce'
        ? findPriceFromJsonLd(blocks) ?? findPriceFromHtml(html)
        : findYieldFromJsonLd(blocks) ?? findYieldFromHtml(html);

    if (currentValue === null) {
      return { ...item, updatedFrom: 'fallback' };
    }

    return {
      ...item,
      currentValue,
      updatedFrom: 'scrape',
    };
  } catch (error) {
    return {
      ...item,
      updatedFrom: 'fallback',
      scrapeError: error.message,
    };
  }
}

function betterThanReference(item) {
  if (!item.referenceValue || !item.currentValue) return false;
  return item.category === 'ecommerce'
    ? item.currentValue < item.referenceValue
    : item.currentValue > item.referenceValue;
}

function computeImprovement(item) {
  if (!item.referenceValue || !item.currentValue) return 0;
  const raw = item.category === 'ecommerce'
    ? ((item.referenceValue - item.currentValue) / item.referenceValue) * 100
    : ((item.currentValue - item.referenceValue) / item.referenceValue) * 100;
  return Number(raw.toFixed(2));
}

function computeScore(item) {
  const improvement = computeImprovement(item);
  const freshnessBonus = item.updatedFrom === 'api' ? 6 : item.updatedFrom === 'scrape' ? 4 : 1;
  const categoryBonus = item.category === 'ecommerce' ? 5.4 : 4.7;
  const momentum = Math.min(Math.max(improvement, -8), 28);
  return Number((52 + momentum * 1.45 + freshnessBonus + categoryBonus).toFixed(1));
}

function hydrateOffer(item) {
  const improvement = computeImprovement(item);
  const isEcommerce = item.category === 'ecommerce';
  const currentValue = Number(item.currentValue.toFixed(2));
  const referenceValue = Number(item.referenceValue.toFixed(2));
  const score = computeScore(item);
  const headline = item.headline || (isEcommerce
    ? `${item.title} entrou em radar com desvio real de preço.`
    : `${item.title} mostra rendimento acima da base monitorada.`);
  const summary = item.summary || (isEcommerce
    ? 'Oferta com potencial de clique rápido, bom encaixe em páginas de comparação e decisão imediata.'
    : 'Ativo com tese curta, leitura direta e bom apelo para investidor que procura objetividade.');

  return {
    slug: item.slug,
    title: item.title,
    category: item.category,
    source: item.source,
    sourceUrl: item.sourceUrl,
    headline,
    summary,
    referenceValue,
    currentValue,
    tags: Array.isArray(item.tags) ? item.tags.slice(0, 5) : [],
    score,
    improvement,
    updatedFrom: item.updatedFrom || 'catalog',
    lastCheckedAt: new Date().toISOString(),
  };
}

function pickBestItems(updatedItems, previousItems) {
  const previousBySlug = new Map(previousItems.map((item) => [item.slug, item]));
  const hydrated = updatedItems.map(hydrateOffer);

  const buckets = {
    ecommerce: hydrated.filter((item) => item.category === 'ecommerce'),
    fii: hydrated.filter((item) => item.category === 'fii'),
  };

  for (const category of Object.keys(buckets)) {
    buckets[category].sort((a, b) => {
      const diff = b.score - a.score;
      if (diff !== 0) return diff;
      if (category === 'ecommerce') return a.currentValue - b.currentValue;
      return b.currentValue - a.currentValue;
    });
  }

  const selected = [];

  for (const [category, limit] of Object.entries(CATEGORY_LIMITS)) {
    const improved = buckets[category].filter((item) => betterThanReference(item));
    const ranked = improved.length ? improved : buckets[category];
    selected.push(...ranked.slice(0, limit));
  }

  selected.sort((a, b) => b.score - a.score);

  return selected.map((item) => {
    const previous = previousBySlug.get(item.slug);
    const currentValue = item.currentValue;
    const referenceValue = previous?.referenceValue ?? item.referenceValue;
    return {
      slug: item.slug,
      title: item.title,
      category: item.category,
      source: item.source,
      sourceUrl: item.sourceUrl,
      headline: item.headline,
      summary: item.summary,
      referenceValue,
      currentValue,
      tags: item.tags,
    };
  });
}

function replaceMonitorSource(html, items) {
  const nextSource = `const MONITOR_SOURCE = ${JSON.stringify(items, null, 6)}`;
  return html.replace(/const MONITOR_SOURCE = [\s\S]*?\n\n    const state =/, `${nextSource}\n\n    const state =`);
}

function replaceAffiliateDefault(html, affiliateId) {
  return html.replace(
    /window\.AFFILIATE_ID = localStorage\.getItem\("techfinds_affiliate_id"\) \|\| "[^"]+";/,
    `window.AFFILIATE_ID = localStorage.getItem("techfinds_affiliate_id") || "${affiliateId}";`,
  );
}

async function writeMarkdownWrapper(html) {
  await writeFile(MARKDOWN_PATH, `\`\`\`html\n${html}\n\`\`\`\n`, 'utf8');
}

async function resolveQuotes(catalog, apiPayload) {
  const apiMap = new Map(apiPayload.filter((item) => item?.slug).map((item) => [item.slug, item]));
  const resolved = [];

  for (const item of catalog) {
    const apiEntry = apiMap.get(item.slug);
    if (apiEntry) {
      const updated = applyApiQuote(item, apiEntry);
      if (updated) {
        resolved.push(updated);
        continue;
      }
    }
    resolved.push(await scrapeQuote(item));
  }

  return resolved;
}

async function main() {
  const originalHtml = await readFile(HTML_PATH, 'utf8');
  const affiliateId = extractAffiliateId(originalHtml);
  const currentItems = parseMonitorSource(originalHtml);

  let apiPayload = [];
  try {
    apiPayload = await fetchApiPayload();
  } catch (error) {
    console.warn(`OFFERS_API_URL indisponível: ${error.message}`);
  }

  const catalog = mergeCatalog(currentItems, apiPayload);
  const resolved = await resolveQuotes(catalog, apiPayload);
  const bestItems = pickBestItems(resolved, currentItems);
  const withAffiliate = replaceAffiliateDefault(originalHtml, affiliateId);
  const withNewData = replaceMonitorSource(withAffiliate, bestItems);

  await writeFile(HTML_PATH, withNewData, 'utf8');
  await writeMarkdownWrapper(withNewData);

  console.log(`Price Bot concluído com afiliado padrão: ${affiliateId}`);
  console.log(`Itens finais publicados: ${bestItems.map((item) => `${item.slug}:${item.currentValue}`).join(' | ')}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
