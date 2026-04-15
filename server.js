import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const HTML_PATH = path.join(ROOT, 'portal-techfinds-single-file.html');
const MARKDOWN_PATH = path.join(ROOT, 'CODIGO_UNICO_PORTAL.md');
const DEFAULT_AFFILIATE_ID = 'techfinds0d70-20';
const OFFERS_API_URL = process.env.OFFERS_API_URL || '';
const USER_AGENT =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';

function extractBetween(content, start, end) {
  const startIndex = content.indexOf(start);
  if (startIndex === -1) {
    throw new Error(`Marcador inicial não encontrado: ${start}`);
  }

  const from = startIndex + start.length;
  const endIndex = content.indexOf(end, from);
  if (endIndex === -1) {
    throw new Error(`Marcador final não encontrado: ${end}`);
  }

  return {
    value: content.slice(from, endIndex),
    startIndex,
    endIndex,
  };
}

function parseMonitorSource(html) {
  const { value } = extractBetween(html, 'const MONITOR_SOURCE = ', '\n\n    const state =');
  const normalized = value.trim().replace(/;\s*$/, '');
  return Function(`"use strict"; return (${normalized});`)();
}

function extractAffiliateId(html) {
  const match = html.match(/window\.AFFILIATE_ID = localStorage\.getItem\("techfinds_affiliate_id"\) \|\| "([^"]+)";/);
  return process.env.AFFILIATE_ID || match?.[1] || DEFAULT_AFFILIATE_ID;
}

function normalizeNumber(raw) {
  if (raw === null || raw === undefined) return null;
  const value = String(raw).trim();
  if (!value) return null;

  const cleaned = value
    .replace(/R\$/gi, '')
    .replace(/%/g, '')
    .replace(/a\.a\./gi, '')
    .replace(/\s+/g, '')
    .replace(/\.(?=\d{3}(\D|$))/g, '')
    .replace(',', '.');

  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
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
      const repaired = payload.replace(/\u0000/g, '').replace(/\s+/g, ' ');
      blocks.push(JSON.parse(repaired));
    } catch {}
  }

  return blocks;
}

function firstValid(values, predicate) {
  for (const value of values) {
    if (predicate(value)) return value;
  }
  return null;
}

function findPriceFromJsonLd(blocks) {
  const candidates = [];

  blocks.forEach((block) => {
    walkJson(block, (node) => {
      const direct = normalizeNumber(node.price ?? node.lowPrice ?? node.highPrice);
      if (direct !== null) candidates.push(direct);

      if (node.offers) {
        const offerValue = normalizeNumber(node.offers.price ?? node.offers.lowPrice ?? node.offers.highPrice);
        if (offerValue !== null) candidates.push(offerValue);
      }

      if (node.aggregateOffer) {
        const aggregateValue = normalizeNumber(
          node.aggregateOffer.lowPrice ?? node.aggregateOffer.highPrice ?? node.aggregateOffer.price,
        );
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
      Object.entries(node).forEach(([key, value]) => {
        const normalizedKey = key.toLowerCase();
        if (!interestingKeys.some((item) => normalizedKey.includes(item))) return;
        const numeric = normalizeNumber(value);
        if (numeric !== null) candidates.push(numeric);
      });
    });
  });

  return firstValid(candidates, (value) => value > 0.1 && value <= 50);
}

function extractCandidatesByRegex(html, patterns) {
  const found = [];

  for (const regex of patterns) {
    const matches = html.matchAll(regex);
    for (const match of matches) {
      const numeric = normalizeNumber(match.groups?.value ?? match[1]);
      if (numeric !== null) found.push(numeric);
    }
  }

  return found;
}

function findPriceFromHtml(html) {
  const patterns = [
    /"price"\s*:\s*"?(?<value>[\d.,]+)"?/gi,
    /"priceAmount"\s*:\s*"?(?<value>[\d.,]+)"?/gi,
    /price\s*content=\s*"(?<value>[\d.,]+)"/gi,
    /R\$\s*(?<value>[\d.]+,\d{2})/gi,
  ];

  const values = extractCandidatesByRegex(html, patterns);
  return firstValid(values, (value) => value >= 10 && value <= 1000000);
}

function findYieldFromHtml(html) {
  const patterns = [
    /dividend\s*yield[^\d]{0,60}(?<value>\d{1,2}[.,]\d{2})/gi,
    /dy[^\d]{0,20}(?<value>\d{1,2}[.,]\d{2})/gi,
    /(?<value>\d{1,2}[.,]\d{2})\s*%\s*(?:a\.a\.|ao\s*ano)?/gi,
  ];

  const values = extractCandidatesByRegex(html, patterns);
  return firstValid(values, (value) => value > 0.1 && value <= 50);
}

async function fetchPage(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': USER_AGENT,
      'accept-language': 'pt-BR,pt;q=0.9,en;q=0.8',
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'cache-control': 'no-cache',
    },
    signal: AbortSignal.timeout(20000),
  });

  if (!response.ok) {
    throw new Error(`Falha ao obter ${url}: HTTP ${response.status}`);
  }

  return response.text();
}

async function fetchApiPayload() {
  if (!OFFERS_API_URL) return null;

  const response = await fetch(OFFERS_API_URL, {
    headers: {
      'user-agent': USER_AGENT,
      accept: 'application/json,text/plain;q=0.9,*/*;q=0.8',
    },
    signal: AbortSignal.timeout(20000),
  });

  if (!response.ok) {
    throw new Error(`Falha ao consultar OFFERS_API_URL: HTTP ${response.status}`);
  }

  const payload = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error('OFFERS_API_URL deve devolver um array de objetos.');
  }

  return payload;
}

function mergeApiValues(items, apiPayload) {
  const apiMap = new Map(apiPayload.map((entry) => [entry.slug, entry]));
  return items.map((item) => {
    const apiEntry = apiMap.get(item.slug);
    if (!apiEntry) return { ...item, updatedFrom: 'unchanged' };

    const currentValue = normalizeNumber(apiEntry.currentValue);
    if (currentValue === null) return { ...item, updatedFrom: 'unchanged' };

    return {
      ...item,
      currentValue,
      sourceUrl: apiEntry.sourceUrl || item.sourceUrl,
      headline: apiEntry.headline || item.headline,
      summary: apiEntry.summary || item.summary,
      updatedFrom: 'api',
    };
  });
}

async function scrapeValues(items) {
  const updated = [];

  for (const item of items) {
    try {
      const html = await fetchPage(item.sourceUrl);
      const blocks = extractJsonLdBlocks(html);
      const extracted =
        item.category === 'ecommerce'
          ? findPriceFromJsonLd(blocks) ?? findPriceFromHtml(html)
          : findYieldFromJsonLd(blocks) ?? findYieldFromHtml(html);

      if (extracted === null) {
        console.warn(`Sem extração válida para ${item.slug}; a manter valor atual.`);
        updated.push({ ...item, updatedFrom: 'fallback' });
        continue;
      }

      updated.push({ ...item, currentValue: extracted, updatedFrom: 'scrape' });
      console.log(`${item.slug}: ${item.currentValue} -> ${extracted}`);
    } catch (error) {
      console.warn(`Erro ao atualizar ${item.slug}: ${error.message}`);
      updated.push({ ...item, updatedFrom: 'fallback' });
    }
  }

  return updated;
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
  const wrapped = `\`\`\`html\n${html}\n\`\`\`\n`;
  await writeFile(MARKDOWN_PATH, wrapped, 'utf8');
}

async function main() {
  const originalHtml = await readFile(HTML_PATH, 'utf8');
  const affiliateId = extractAffiliateId(originalHtml);
  const currentItems = parseMonitorSource(originalHtml);

  const apiPayload = await fetchApiPayload().catch((error) => {
    console.warn(`OFFERS_API_URL indisponível: ${error.message}`);
    return null;
  });

  const nextItems = apiPayload ? mergeApiValues(currentItems, apiPayload) : await scrapeValues(currentItems);
  const withAffiliate = replaceAffiliateDefault(originalHtml, affiliateId);
  const withNewData = replaceMonitorSource(withAffiliate, nextItems);

  await writeFile(HTML_PATH, withNewData, 'utf8');
  await writeMarkdownWrapper(withNewData);

  console.log(`Atualização concluída com afiliado padrão: ${affiliateId}`);
  console.log(`Fonte de atualização: ${apiPayload ? 'api' : 'scraping/fallback'}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
