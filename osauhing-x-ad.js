/**
 * Osaühing X reklaamiskript
 *
 * Kasutamine kliendi lehel:
 *
 * <script
 *   src="https://raw.githubusercontent.com/Osauhing-X/public/www/osauhing-x-ad.js"
 *   data-size="auto"
 *   data-lang="et"
 *   data-position="inline">
 * </script>
 *
 * Valikud:
 * data-size="auto | large | medium | small | badge"
 * data-lang="et | en"
 * data-position="inline | fixed-bottom-right"
 */

(() => {
  const SCRIPT = document.currentScript;

  const CONFIG = {
    size: SCRIPT?.dataset.size || "auto",
    lang: SCRIPT?.dataset.lang || document.documentElement.lang || "et",
    position: SCRIPT?.dataset.position || "inline",
    targetBaseUrl: "https://extaas.com/@",
    brand: "Osaühing X",
  };

  const i18n = {
    et: {
      title: "Kaasaegne veebiarendus sinu ettevõttele",
      subtitle: "Kiired, ilusad ja töökindlad veebilahendused.",
      cta: "Vaata lähemalt",
      small: "Arenduse tegija Osaühing X",
      badge: "Veebiarendus: Osaühing X",
    },
    en: {
      title: "Modern web development for your business",
      subtitle: "Fast, elegant and reliable web solutions.",
      cta: "Learn more",
      small: "Developed by Osaühing X",
      badge: "Web development: Osaühing X",
    },
  };

  const lang = i18n[CONFIG.lang] ? CONFIG.lang : "et";
  const text = i18n[lang];

  const sourceDomain = window.location.hostname;
  const targetUrl = `${CONFIG.targetBaseUrl}?www=${encodeURIComponent(sourceDomain)}`;

  const style = document.createElement("style");
  style.textContent = `
    .ox-ad {
      box-sizing: border-box;
      container-type: inline-size;
      width: 100%;
      max-width: 920px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    .ox-ad *,
    .ox-ad *::before,
    .ox-ad *::after {
      box-sizing: border-box;
    }

    .ox-ad-link {
      display: block;
      text-decoration: none;
      color: inherit;
    }

    .ox-ad-card {
      position: relative;
      overflow: hidden;
      border-radius: 22px;
      padding: 32px;
      min-height: 220px;
      border: 1px solid light-dark(rgba(0,0,0,.12), rgba(255,255,255,.16));
      background:
        radial-gradient(circle at top right, light-dark(rgba(60,110,255,.22), rgba(120,160,255,.28)), transparent 34%),
        linear-gradient(135deg, light-dark(#ffffff, #15171d), light-dark(#f3f5f9, #222633));
      color: light-dark(#12141a, #f6f7fb);
      box-shadow: 0 18px 42px light-dark(rgba(20,30,50,.14), rgba(0,0,0,.36));
      transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
    }

    .ox-ad-link:hover .ox-ad-card {
      transform: translateY(-2px);
      box-shadow: 0 22px 54px light-dark(rgba(20,30,50,.2), rgba(0,0,0,.5));
      border-color: light-dark(rgba(60,110,255,.32), rgba(150,180,255,.4));
    }

    .ox-ad-brand {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: .04em;
      text-transform: uppercase;
      opacity: .78;
    }

    .ox-ad-logo {
      width: 28px;
      height: 28px;
      border-radius: 9px;
      display: inline-grid;
      place-items: center;
      background: light-dark(#12141a, #f6f7fb);
      color: light-dark(#ffffff, #12141a);
      font-size: 13px;
      font-weight: 800;
    }

    .ox-ad-title {
      max-width: 620px;
      margin: 0 0 10px;
      font-size: clamp(26px, 5cqi, 48px);
      line-height: 1.02;
      letter-spacing: -0.04em;
      font-weight: 850;
    }

    .ox-ad-subtitle {
      max-width: 520px;
      margin: 0 0 24px;
      font-size: clamp(15px, 2.2cqi, 19px);
      line-height: 1.45;
      opacity: .76;
    }

    .ox-ad-cta {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 42px;
      padding: 0 16px;
      border-radius: 999px;
      background: light-dark(#12141a, #f6f7fb);
      color: light-dark(#ffffff, #12141a);
      font-size: 14px;
      font-weight: 750;
    }

    .ox-ad-cta::after {
      content: "→";
      transition: transform .18s ease;
    }

    .ox-ad-link:hover .ox-ad-cta::after {
      transform: translateX(3px);
    }

    .ox-ad-decoration {
      position: absolute;
      right: 28px;
      bottom: 24px;
      width: 120px;
      height: 120px;
      border-radius: 32px;
      border: 1px solid light-dark(rgba(0,0,0,.08), rgba(255,255,255,.12));
      background:
        linear-gradient(135deg, light-dark(rgba(255,255,255,.7), rgba(255,255,255,.1)), transparent),
        light-dark(rgba(60,110,255,.14), rgba(120,160,255,.12));
      transform: rotate(-8deg);
    }

    .ox-ad[data-size="medium"] .ox-ad-card,
    @container (max-width: 620px) {
      .ox-ad-card {
        min-height: 160px;
        padding: 24px;
      }

      .ox-ad-decoration {
        display: none;
      }

      .ox-ad-title {
        font-size: 28px;
      }
    }

    .ox-ad[data-size="small"] .ox-ad-card,
    @container (max-width: 420px) {
      .ox-ad-card {
        min-height: auto;
        padding: 16px;
        border-radius: 16px;
      }

      .ox-ad-brand {
        margin-bottom: 0;
        font-size: 13px;
        text-transform: none;
        letter-spacing: 0;
      }

      .ox-ad-title,
      .ox-ad-subtitle,
      .ox-ad-cta,
      .ox-ad-decoration {
        display: none;
      }
    }

    .ox-ad[data-size="badge"] .ox-ad-card {
      min-height: auto;
      padding: 10px 12px;
      border-radius: 999px;
      box-shadow: none;
    }

    .ox-ad[data-size="badge"] .ox-ad-brand {
      margin: 0;
      font-size: 12px;
      text-transform: none;
      letter-spacing: 0;
    }

    .ox-ad[data-size="badge"] .ox-ad-logo,
    .ox-ad[data-size="badge"] .ox-ad-title,
    .ox-ad[data-size="badge"] .ox-ad-subtitle,
    .ox-ad[data-size="badge"] .ox-ad-cta,
    .ox-ad[data-size="badge"] .ox-ad-decoration {
      display: none;
    }

    .ox-ad--fixed {
      position: fixed;
      right: 18px;
      bottom: 18px;
      z-index: 2147483000;
      width: min(420px, calc(100vw - 36px));
    }

    @media (prefers-color-scheme: dark) {
      :root {
        color-scheme: dark;
      }
    }

    @media (prefers-color-scheme: light) {
      :root {
        color-scheme: light;
      }
    }
  `;

  document.head.appendChild(style);

  const ad = document.createElement("aside");
  ad.className = `ox-ad ${CONFIG.position === "fixed-bottom-right" ? "ox-ad--fixed" : ""}`;
  ad.dataset.size = CONFIG.size;

  ad.innerHTML = `
    <a class="ox-ad-link" href="${targetUrl}" target="_blank" rel="noopener sponsored">
      <div class="ox-ad-card" role="img" aria-label="${text.title}">
        <div class="ox-ad-brand">
          <span class="ox-ad-logo">X</span>
          <span class="ox-ad-brand-text">
            ${CONFIG.size === "badge" ? text.badge : CONFIG.size === "small" ? text.small : CONFIG.brand}
          </span>
        </div>

        <h2 class="ox-ad-title">${text.title}</h2>
        <p class="ox-ad-subtitle">${text.subtitle}</p>
        <span class="ox-ad-cta">${text.cta}</span>
        <span class="ox-ad-decoration" aria-hidden="true"></span>
      </div>
    </a>
  `;

  SCRIPT?.after(ad);
})();