import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });
import { PLATFORM_SEO, GROUP_SEO, DEFAULT_GROUP_SEO, type PlatformSeo, type GroupSeo } from "../lib/storefront-content";

/**
 * Pousse le contenu SEO/marketing vyrlo.fr vers Shopify :
 * - body_html de chaque collection (par plateforme)
 * - body_html de chaque produit (par groupe × plateforme)
 * Idempotent — remplace le contenu à chaque exécution.
 */

const API_VERSION = "2025-10";
const SHOP = process.env.SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN!;
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function shopify<T>(method: string, path: string, body?: unknown): Promise<T> {
  await sleep(600);
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(`https://${SHOP}/admin/api/${API_VERSION}${path}`, {
      method,
      headers: { "X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 429) { await sleep(2000 * (attempt + 1)); continue; }
    const text = await res.text();
    if (!res.ok) throw new Error(`${method} ${path} ${res.status}: ${text.slice(0, 200)}`);
    return text ? JSON.parse(text) : (null as T);
  }
  throw new Error("max retries");
}

// ── Rendu HTML ────────────────────────────────────────────────────────────────

function renderBadges(badges: string[]): string {
  return `<p style="margin:16px 0;">` +
    badges.map(b => `<span style="display:inline-block;background:#f3f4f6;color:#374151;padding:6px 12px;border-radius:100px;font-size:14px;font-weight:600;margin:4px 6px 4px 0;">${b}</span>`).join("") +
    `</p>`;
}

function renderBenefits(benefits: Array<{ icon?: string; title: string; desc: string }>): string {
  return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:24px 0;">` +
    benefits.map(b => `
      <div style="padding:16px;border:1px solid #e5e7eb;border-radius:12px;">
        ${b.icon ? `<div style="font-size:24px;margin-bottom:8px;">${b.icon}</div>` : ""}
        <h3 style="margin:0 0 4px;font-size:16px;font-weight:700;">${b.title}</h3>
        <p style="margin:0;font-size:14px;color:#6b7280;">${b.desc}</p>
      </div>
    `).join("") +
    `</div>`;
}

function renderBenefitsList(items: string[]): string {
  return `<ul>` + items.map(i => `<li>${i}</li>`).join("") + `</ul>`;
}

function renderFaq(faq: Array<{ q: string; a: string }>): string {
  return faq.map(f => `
    <details style="margin:8px 0;padding:12px 16px;border:1px solid #e5e7eb;border-radius:8px;">
      <summary style="font-weight:600;cursor:pointer;">${f.q}</summary>
      <p style="margin:8px 0 0;color:#4b5563;">${f.a}</p>
    </details>
  `).join("");
}

function renderTrust(): string {
  return `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:24px 0;padding:20px;background:#fafafa;border-radius:12px;text-align:center;">
      <div><strong style="display:block;font-size:20px;">⚡</strong><span style="font-size:13px;color:#4b5563;">Démarrage sous 20 min</span></div>
      <div><strong style="display:block;font-size:20px;">🔒</strong><span style="font-size:13px;color:#4b5563;">Zéro mot de passe</span></div>
      <div><strong style="display:block;font-size:20px;">↻</strong><span style="font-size:13px;color:#4b5563;">Remboursement garanti</span></div>
      <div><strong style="display:block;font-size:20px;">💬</strong><span style="font-size:13px;color:#4b5563;">Support FR 7j/7</span></div>
    </div>
  `;
}

function renderExtendedIntro(text: string): string {
  return `<p style="margin:16px 0;line-height:1.7;color:#374151;">${text}</p>`;
}

function renderAlgorithm(block: NonNullable<PlatformSeo["algorithmExplained"]>): string {
  return `
<h3>${block.title}</h3>
${block.paragraphs.map(p => `<p style="line-height:1.7;color:#374151;">${p}</p>`).join("\n")}
`.trim();
}

function renderRealVsBots(block: NonNullable<PlatformSeo["realVsBots"]>): string {
  return `
<h3>${block.title}</h3>
<p style="color:#374151;">${block.subtitle}</p>
<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">
  <thead>
    <tr style="background:#f3f4f6;">
      <th style="text-align:left;padding:10px;border:1px solid #e5e7eb;">Critère</th>
      <th style="text-align:left;padding:10px;border:1px solid #e5e7eb;color:#059669;">Vyrlo ✓</th>
      <th style="text-align:left;padding:10px;border:1px solid #e5e7eb;color:#dc2626;">Services low-cost ✗</th>
    </tr>
  </thead>
  <tbody>
    ${block.rows.map(r => `
      <tr>
        <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;">${r.feature}</td>
        <td style="padding:10px;border:1px solid #e5e7eb;color:#065f46;">${r.real}</td>
        <td style="padding:10px;border:1px solid #e5e7eb;color:#7f1d1d;">${r.bot}</td>
      </tr>
    `).join("")}
  </tbody>
</table>
`.trim();
}

function renderUseCases(block: NonNullable<PlatformSeo["useCases"]>): string {
  return `
<h3>${block.title}</h3>
<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin:24px 0;">
  ${block.cases.map(c => `
    <div style="padding:16px;border:1px solid #e5e7eb;border-radius:12px;">
      <div style="font-size:24px;margin-bottom:8px;">${c.icon}</div>
      <h4 style="margin:0 0 4px;font-size:15px;font-weight:700;">${c.title}</h4>
      <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6;">${c.desc}</p>
    </div>
  `).join("")}
</div>
`.trim();
}

function renderHowItWorks(block: NonNullable<PlatformSeo["howItWorks"]>): string {
  return `
<h3>${block.title}</h3>
<ol style="padding-left:0;list-style:none;margin:16px 0;">
  ${block.steps.map(s => `
    <li style="display:flex;gap:16px;margin-bottom:16px;padding:16px;border:1px solid #e5e7eb;border-radius:12px;">
      <div style="flex-shrink:0;width:36px;height:36px;background:#111;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;">${s.n}</div>
      <div>
        <h4 style="margin:0 0 4px;font-size:15px;font-weight:700;">${s.title}</h4>
        <p style="margin:0;font-size:14px;color:#4b5563;line-height:1.6;">${s.desc}</p>
      </div>
    </li>
  `).join("")}
</ol>
`.trim();
}

function renderExtendedFaqHtml(faq: Array<{ q: string; a: string }>): string {
  return faq.map(f => `
    <details style="margin:8px 0;padding:12px 16px;border:1px solid #e5e7eb;border-radius:8px;">
      <summary style="font-weight:600;cursor:pointer;">${f.q}</summary>
      <p style="margin:8px 0 0;color:#4b5563;line-height:1.6;">${f.a}</p>
    </details>
  `).join("");
}

function renderStats(block: NonNullable<PlatformSeo["stats"]>): string {
  return `
<h3>${block.title}</h3>
<p style="color:#374151;line-height:1.7;">${block.intro}</p>
<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin:24px 0;">
  ${block.items.map(i => `
    <div style="padding:20px;background:#fafafa;border-radius:12px;border-left:3px solid #111;">
      <p style="font-size:28px;font-weight:800;margin:0 0 6px;color:#111;line-height:1;">${i.figure}</p>
      <p style="margin:0;font-size:13px;color:#4b5563;line-height:1.5;">${i.label}</p>
    </div>
  `).join("")}
</div>
`.trim();
}

function renderQuantityGuide(block: NonNullable<PlatformSeo["quantityGuide"]>): string {
  return `
<h3>${block.title}</h3>
<p style="color:#374151;line-height:1.7;">${block.intro}</p>
<div style="display:flex;flex-direction:column;gap:12px;margin:24px 0;">
  ${block.profiles.map(p => `
    <div style="padding:18px;border:1px solid #e5e7eb;border-radius:12px;">
      <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:8px;margin-bottom:6px;">
        <strong style="font-size:15px;">${p.profile}</strong>
        <span style="font-size:13px;padding:4px 10px;background:#111;color:#fff;border-radius:100px;">${p.range}</span>
      </div>
      <p style="margin:6px 0;font-size:14px;color:#374151;"><strong>Objectif :</strong> ${p.goal}</p>
      <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6;">${p.reco}</p>
    </div>
  `).join("")}
</div>
`.trim();
}

function renderTimingStrategy(block: NonNullable<PlatformSeo["timingStrategy"]>): string {
  return `
<h3>${block.title}</h3>
<p style="color:#374151;line-height:1.7;">${block.intro}</p>
<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin:24px 0;">
  ${block.moments.map(m => `
    <div style="padding:18px;border:1px solid #e5e7eb;border-radius:12px;">
      <div style="font-size:28px;margin-bottom:8px;">${m.icon}</div>
      <h4 style="margin:0 0 6px;font-size:15px;font-weight:700;">${m.title}</h4>
      <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6;">${m.desc}</p>
    </div>
  `).join("")}
</div>
`.trim();
}

function renderBestPractices(block: NonNullable<PlatformSeo["bestPractices"]>): string {
  return `
<h3>${block.title}</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:24px 0;">
  <div style="padding:18px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;">
    <p style="margin:0 0 12px;font-weight:700;color:#065f46;">✅ À faire</p>
    <ul style="margin:0;padding-left:20px;">
      ${block.doList.map(d => `<li style="margin-bottom:8px;font-size:14px;color:#065f46;line-height:1.6;">${d}</li>`).join("")}
    </ul>
  </div>
  <div style="padding:18px;background:#fef2f2;border:1px solid #fecaca;border-radius:12px;">
    <p style="margin:0 0 12px;font-weight:700;color:#7f1d1d;">❌ À éviter</p>
    <ul style="margin:0;padding-left:20px;">
      ${block.dontList.map(d => `<li style="margin-bottom:8px;font-size:14px;color:#7f1d1d;line-height:1.6;">${d}</li>`).join("")}
    </ul>
  </div>
</div>
`.trim();
}

function renderAlternativesComparison(block: NonNullable<PlatformSeo["alternativesComparison"]>): string {
  return `
<h3>${block.title}</h3>
<p style="color:#374151;line-height:1.7;">${block.intro}</p>
<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:13px;">
  <thead>
    <tr style="background:#f3f4f6;">
      <th style="text-align:left;padding:10px;border:1px solid #e5e7eb;">Critère</th>
      <th style="text-align:left;padding:10px;border:1px solid #e5e7eb;">Croissance organique</th>
      <th style="text-align:left;padding:10px;border:1px solid #e5e7eb;">Publicité Meta Ads</th>
      <th style="text-align:left;padding:10px;border:1px solid #e5e7eb;color:#065f46;">Vyrlo</th>
    </tr>
  </thead>
  <tbody>
    ${block.rows.map(r => `
      <tr>
        <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;">${r.criterion}</td>
        <td style="padding:10px;border:1px solid #e5e7eb;color:#4b5563;">${r.organic}</td>
        <td style="padding:10px;border:1px solid #e5e7eb;color:#4b5563;">${r.ads}</td>
        <td style="padding:10px;border:1px solid #e5e7eb;color:#065f46;font-weight:600;">${r.vyrlo}</td>
      </tr>
    `).join("")}
  </tbody>
</table>
`.trim();
}

function renderHistory(block: NonNullable<PlatformSeo["history"]>): string {
  return `
<h3>${block.title}</h3>
${block.paragraphs.map(p => `<p style="line-height:1.7;color:#374151;">${p}</p>`).join("\n")}
`.trim();
}

function renderMetricsToWatch(block: NonNullable<PlatformSeo["metricsToWatch"]>): string {
  return `
<h3>${block.title}</h3>
<p style="color:#374151;line-height:1.7;">${block.intro}</p>
<div style="display:flex;flex-direction:column;gap:12px;margin:24px 0;">
  ${block.metrics.map(m => `
    <div style="padding:16px;border-left:3px solid #111;background:#fafafa;border-radius:0 8px 8px 0;">
      <p style="margin:0 0 6px;font-weight:700;font-size:14px;color:#111;">${m.name}</p>
      <p style="margin:0;font-size:13px;color:#4b5563;line-height:1.6;">${m.desc}</p>
    </div>
  `).join("")}
</div>
`.trim();
}

function renderQualityChecklist(block: NonNullable<PlatformSeo["qualityChecklist"]>): string {
  return `
<h3>${block.title}</h3>
<p style="color:#374151;line-height:1.7;">${block.intro}</p>
<div style="display:flex;flex-direction:column;gap:12px;margin:24px 0;">
  ${block.checks.map((c, i) => `
    <div style="display:flex;gap:12px;padding:14px;border:1px solid #e5e7eb;border-radius:10px;">
      <div style="flex-shrink:0;width:28px;height:28px;background:#111;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;">${i + 1}</div>
      <div>
        <p style="margin:0 0 4px;font-weight:700;font-size:14px;">${c.q}</p>
        <p style="margin:0;font-size:13px;color:#4b5563;line-height:1.6;">${c.desc}</p>
      </div>
    </div>
  `).join("")}
</div>
`.trim();
}

function renderConclusion(block: NonNullable<PlatformSeo["conclusion"]>): string {
  return `
<h3>${block.title}</h3>
${block.paragraphs.map(p => `<p style="line-height:1.7;color:#374151;">${p}</p>`).join("\n")}
`.trim();
}

function renderFaqJsonLd(faq: Array<{ q: string; a: string }>): string {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function buildCollectionHtml(seo: PlatformSeo): string {
  return `
<h2>${seo.h1}</h2>
<p>${seo.intro}</p>
${renderTrust()}
<h3>Pourquoi Vyrlo pour ${seo.label} ?</h3>
${renderBenefitsList(seo.benefits)}
<h3>Questions fréquentes ${seo.label}</h3>
${renderFaq(seo.faq)}
`.trim();
}

function buildProductHtml(groupSlug: string, platformSlug: string): string {
  const groupSeo: GroupSeo = GROUP_SEO[groupSlug] ?? DEFAULT_GROUP_SEO;
  const platformSeo = PLATFORM_SEO[platformSlug];

  // Sections étendues (Sem 3+) — uniquement si le contenu existe sur la plateforme
  const extendedIntro = platformSeo?.extendedIntro ? renderExtendedIntro(platformSeo.extendedIntro) : "";
  const stats = platformSeo?.stats ? renderStats(platformSeo.stats) : "";
  const algorithm = platformSeo?.algorithmExplained ? renderAlgorithm(platformSeo.algorithmExplained) : "";
  const realVsBots = platformSeo?.realVsBots ? renderRealVsBots(platformSeo.realVsBots) : "";
  const alternativesComparison = platformSeo?.alternativesComparison ? renderAlternativesComparison(platformSeo.alternativesComparison) : "";
  const useCases = platformSeo?.useCases ? renderUseCases(platformSeo.useCases) : "";
  const quantityGuide = platformSeo?.quantityGuide ? renderQuantityGuide(platformSeo.quantityGuide) : "";
  const timingStrategy = platformSeo?.timingStrategy ? renderTimingStrategy(platformSeo.timingStrategy) : "";
  const howItWorks = platformSeo?.howItWorks ? renderHowItWorks(platformSeo.howItWorks) : "";
  const bestPractices = platformSeo?.bestPractices ? renderBestPractices(platformSeo.bestPractices) : "";
  const history = platformSeo?.history ? renderHistory(platformSeo.history) : "";
  const metricsToWatch = platformSeo?.metricsToWatch ? renderMetricsToWatch(platformSeo.metricsToWatch) : "";
  const qualityChecklist = platformSeo?.qualityChecklist ? renderQualityChecklist(platformSeo.qualityChecklist) : "";
  const conclusion = platformSeo?.conclusion ? renderConclusion(platformSeo.conclusion) : "";

  // FAQ fusionnée (group + extended platform-specific)
  const mergedFaq = [...groupSeo.faq, ...(platformSeo?.extendedFaq ?? [])];
  const faqJsonLd = mergedFaq.length ? renderFaqJsonLd(mergedFaq) : "";
  const faqHtml = platformSeo?.extendedFaq
    ? renderExtendedFaqHtml(mergedFaq)
    : renderFaq(groupSeo.faq);

  return `
<p><strong>${groupSeo.desc}</strong></p>
${renderBadges(groupSeo.badges)}
${extendedIntro}
${history}
${stats}
<h3>Pourquoi ça marche</h3>
<p>${groupSeo.why}</p>
${algorithm}
<h3>Ce qu'on vous garantit</h3>
${renderBenefits(groupSeo.benefits)}
${platformSeo ? `<h3>Spécificités ${platformSeo.label}</h3>\n${renderBenefitsList(platformSeo.benefits)}` : ""}
${realVsBots}
${qualityChecklist}
${alternativesComparison}
${useCases}
${quantityGuide}
${timingStrategy}
${howItWorks}
${bestPractices}
${metricsToWatch}
${renderTrust()}
<h3>Questions fréquentes</h3>
${faqHtml}
${conclusion}
<p style="margin-top:24px;padding:16px;background:#f9fafb;border-radius:8px;font-size:14px;color:#4b5563;">
  <strong>Comment ça marche :</strong> sélectionnez la quantité et le ciblage, collez le lien public de votre profil ou publication (champ « Lien » ci-dessous), puis validez. Vous recevez un email de confirmation et la livraison démarre automatiquement sous 20 minutes.
</p>
${faqJsonLd}
`.trim();
}

// ── Mapping produit → groupSlug ───────────────────────────────────────────────

const TITLE_TO_GROUP: Array<{ regex: RegExp; group: string }> = [
  { regex: /enregistrement/i, group: "enregistrements" },
  { regex: /partage/i, group: "partages" },
  { regex: /auditeur/i, group: "auditeurs" },
  { regex: /retweet/i, group: "retweets" },
  { regex: /membre/i, group: "membres" },
  { regex: /vue/i, group: "vues" },
  { regex: /like/i, group: "likes" },
  { regex: /abonn[éeè]|follower/i, group: "abonnes" },
];

function groupFromTitle(title: string): string | null {
  for (const rule of TITLE_TO_GROUP) if (rule.regex.test(title)) return rule.group;
  return null;
}

function platformFromTags(tagsCsv: string): string | null {
  const tags = tagsCsv.split(",").map(t => t.trim().toLowerCase());
  for (const p of ["instagram", "tiktok", "youtube", "facebook", "twitter", "spotify", "threads", "telegram"]) {
    if (tags.includes(p)) return p;
  }
  return null;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function updateCollections() {
  console.log("\n━━━ Collections ━━━");
  const data = await shopify<{ smart_collections: { id: number; handle: string; title: string }[] }>(
    "GET", "/smart_collections.json?limit=100"
  );
  for (const col of data.smart_collections) {
    const seo = PLATFORM_SEO[col.handle];
    if (!seo) { console.log(`  skip ${col.handle} (pas de contenu SEO)`); continue; }
    try {
      await shopify("PUT", `/smart_collections/${col.id}.json`, {
        smart_collection: { id: col.id, body_html: buildCollectionHtml(seo) },
      });
      console.log(`  ✓ ${col.handle} — body_html mis à jour`);
    } catch (e) {
      console.error(`  ✗ ${col.handle}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
}

async function updateProducts() {
  console.log("\n━━━ Produits ━━━");
  let sinceId = 0;
  const products: { id: number; title: string; tags: string }[] = [];
  for (;;) {
    const d = await shopify<{ products: { id: number; title: string; tags: string; vendor: string }[] }>(
      "GET", `/products.json?limit=250&vendor=Vyrlo&since_id=${sinceId}&fields=id,title,tags,vendor`
    );
    if (!d.products.length) break;
    for (const p of d.products) products.push(p);
    sinceId = d.products[d.products.length - 1].id;
  }
  console.log(`  ${products.length} produits Vyrlo`);

  for (const p of products) {
    const group = groupFromTitle(p.title);
    const platform = platformFromTags(p.tags);
    if (!group || !platform) {
      console.log(`  skip "${p.title}" (group=${group} platform=${platform})`);
      continue;
    }
    try {
      await shopify("PUT", `/products/${p.id}.json`, {
        product: { id: p.id, body_html: buildProductHtml(group, platform) },
      });
      console.log(`  ✓ "${p.title}" (${group}/${platform})`);
    } catch (e) {
      console.error(`  ✗ "${p.title}": ${e instanceof Error ? e.message : String(e)}`);
    }
  }
}

async function main() {
  await updateCollections();
  await updateProducts();
  console.log("\nTerminé.");
}
main().catch(e => { console.error(e); process.exit(1); });
