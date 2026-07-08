/**
 * Osaühing X / Extaas™ Embed
 *
 * Kasutamine:
 *
 * <script
 *   src="https://cdn.jsdelivr.net/gh/Osauhing-X/public@www/osauhing-x-ad.js"
 *   data-size="auto"
 *   data-reason="ad"
 *   data-position="fixed-bottom-right"
 *   data-lang="en">
 * </script>
 *
 * Seaded:
 * data-size     : auto | big | middle | small        (vaikimisi: auto)
 * data-reason   : ad | web_development               (vaikimisi: ad)
 * data-position : inline | fixed-bottom-right        (vaikimisi: fixed-bottom-right)
 * data-lang     : en | et                            (vaikimisi: en)
 *
 * Kui data-size="auto", valitakse sobiv suurus automaatselt
 * vastavalt saadaolevale ruumile.
 */

(() => {
  const script = document.currentScript;

  const config = {
    size: script?.dataset.size || "auto",
    reason: script?.dataset.reason || "ad",
    position: script?.dataset.positsion || script?.dataset.position || "fixed-bottom-right",
    lang: script?.dataset.lang || "en",
  };

  const allowedSizes = ["auto", "big", "middle", "small"];
  const allowedReasons = ["web_development", "ad"];
  const allowedPositions = ["inline", "fixed-bottom-right"];
  const allowedLangs = ["en", "et"];

  config.size = allowedSizes.includes(config.size) ? config.size : "auto";
  config.reason = allowedReasons.includes(config.reason) ? config.reason : "ad";
  config.position = allowedPositions.includes(config.position) ? config.position : "fixed-bottom-right";
  config.lang = allowedLangs.includes(config.lang) ? config.lang : "en";

  const i18n = {
    et: {
      web_development: {
        title: "Veebiarendus, mis töötab",
        subtitle: "Kiired, kaasaegsed ja skaleeruvad veebilahendused.",
        cta: "Vaata lähemalt",
        small: "Arendas Osaühing X",
      },
      ad: {
        title: "Kasvata nähtavust Extaas™ abil",
        subtitle: "Lihtne ja kaasaegne reklaamilahendus sinu ettevõttele.",
        cta: "Ava Extaas",
        small: "Osaühing X - Extaas™",
      },
    },
    en: {
      web_development: {
        title: "Web development that works",
        subtitle: "Fast, modern and scalable web solutions.",
        cta: "Learn more",
        small: "Developed by Osaühing X",
      },
      ad: {
        title: "Grow your visibility with Extaas™",
        subtitle: "A simple and modern advertising solution for your business.",
        cta: "Open Extaas",
        small: "Osaühing X - Extaas™",
      },
    },
  };

  const text = i18n[config.lang][config.reason];

  const source = encodeURIComponent(window.location.hostname || window.location.href);
  const href = `https://extaas.com/@?www=${source}`;

  const logo = "https://extaas.com/corporate_visual_identity/logo.png";
  const name = "https://extaas.com/corporate_visual_identity/name.png";

  if (!document.querySelector('link[data-ox-cvi]')) {
    const cvi = document.createElement("link");
    cvi.rel = "stylesheet";
    cvi.href = "https://extaas.com/corporate_visual_identity/style.css";
    cvi.dataset.oxCvi = "true";
    document.head.appendChild(cvi);
  }

  if (!document.querySelector("style[data-ox-ad-style]")) {
    const style = document.createElement("style");
    style.dataset.oxAdStyle = "true";

    style.textContent = `
      .ox-ad {
        --current: light-dark(#fff, #000);
        --current_40: color-mix(in oklab, var(--current), #0000 40%);

        --reverse: light-dark(#000, #fff);
        --reverse_80: color-mix(in oklab, var(--reverse), #0000 80%);
        --reverse_40: color-mix(in oklab, var(--reverse), #0000 40%);
        --reverse_20: color-mix(in oklab, var(--reverse), #0000 20%);

        --x_brand: #da3;
        --x_color: var(--color_override, var(--x_brand));
        --x_color_transparent: color-mix(in oklab, var(--x_color), #0000 80%);

        --x_outer_background: var(--current_40);
        --x_inner_background: var(--current);
        --x_border_color: light-dark(#eee, #222);
        --x_heading_color: var(--reverse);
        --x_text_color: var(--reverse_40);
        --x_muted_color: var(--reverse_80);

        box-sizing: border-box;
        container-type: inline-size;
        width: 100%;
        max-width: 860px;
        color-scheme: light dark;
        font-family: modern_sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      .ox-ad *,
      .ox-ad *::before,
      .ox-ad *::after {
        box-sizing: border-box;
      }

      .ox-ad--fixed {
        position: fixed;
        right: 18px;
        bottom: 18px;
        z-index: 2147483000;
        width: min(420px, calc(100vw - 36px));
      }

      .ox-ad__link {
        display: block;
        color: inherit;
        text-decoration: none;
      }

      .ox-ad__card {
        position: relative;
        overflow: hidden;
        min-height: 210px;
        padding: 30px;
        border: 1px solid var(--x_border_color);
        border-radius: 24px;
        background:
          radial-gradient(circle at top right, var(--x_color_transparent), transparent 36%),
          linear-gradient(135deg, var(--x_inner_background), var(--x_outer_background));
        color: var(--x_heading_color);
        box-shadow: 0 18px 46px light-dark(rgba(0,0,0,.14), rgba(0,0,0,.42));
        transition:
          transform .18s ease,
          box-shadow .18s ease,
          border-color .18s ease,
          filter .18s ease;
      }

      .ox-ad__link:hover .ox-ad__card {
        transform: translateY(-2px);
        border-color: var(--x_color);
        filter: brightness(1.03);
        box-shadow: 0 22px 58px light-dark(rgba(0,0,0,.20), rgba(0,0,0,.58));
      }

      .ox-ad__brand {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 22px;
      }

      .ox-ad__logo {
        width: 34px;
        height: 34px;
        object-fit: contain;
        flex: 0 0 auto;
      }

      .ox-ad__name {
        height: 24px;
        max-width: 160px;
        object-fit: contain;
      }

      .ox-ad__title {
        max-width: 620px;
        margin: 0 0 10px;
        color: var(--x_heading_color);
        font-family: modern_sans, system-ui, sans-serif;
        font-size: clamp(27px, 5cqi, 46px);
        line-height: 1.02;
        letter-spacing: -0.045em;
        font-weight: 850;
      }

      .ox-ad__subtitle {
        max-width: 520px;
        margin: 0 0 24px;
        color: var(--x_text_color);
        font-size: clamp(15px, 2.2cqi, 18px);
        line-height: 1.45;
      }

      .ox-ad__cta {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        min-height: 42px;
        padding: 0 17px;
        border-radius: 4px;
        background: var(--x_color);
        color: #000;
        font-size: 14px;
        font-weight: 800;
      }

      .ox-ad__cta::after {
        content: "→";
        transition: transform .18s ease;
      }

      .ox-ad__link:hover .ox-ad__cta::after {
        transform: translateX(3px);
      }

      .ox-ad__small-text {
        display: none;
        color: var(--x_heading_color);
        font-size: 13px;
        font-weight: 800;
        white-space: nowrap;
      }

      .ox-ad[data-size="big"] .ox-ad__card {
        min-height: 260px;
        padding: 38px;
      }

      .ox-ad[data-size="big"] .ox-ad__title {
        font-size: clamp(34px, 6cqi, 58px);
      }

      .ox-ad[data-size="middle"] .ox-ad__card {
        min-height: 160px;
        padding: 24px;
      }

      .ox-ad[data-size="middle"] .ox-ad__title {
        font-size: 28px;
      }

      .ox-ad[data-size="middle"] .ox-ad__subtitle {
        font-size: 15px;
      }

      .ox-ad[data-size="small"] .ox-ad__card {
        min-height: auto;
        padding: 12px 14px;
        border-radius: 999px;
        box-shadow: 0 8px 24px light-dark(rgba(0,0,0,.10), rgba(0,0,0,.32));
      }

      .ox-ad[data-size="small"] .ox-ad__brand {
        margin: 0;
      }

      .ox-ad[data-size="small"] .ox-ad__logo {
        width: 22px;
        height: 22px;
      }

      .ox-ad[data-size="small"] .ox-ad__name,
      .ox-ad[data-size="small"] .ox-ad__title,
      .ox-ad[data-size="small"] .ox-ad__subtitle,
      .ox-ad[data-size="small"] .ox-ad__cta {
        display: none;
      }

      .ox-ad[data-size="small"] .ox-ad__small-text {
        display: inline;
      }

      @container (max-width: 620px) {
        .ox-ad[data-size="auto"] .ox-ad__card {
          min-height: 160px;
          padding: 24px;
        }

        .ox-ad[data-size="auto"] .ox-ad__title {
          font-size: 28px;
        }

        .ox-ad[data-size="auto"] .ox-ad__subtitle {
          font-size: 15px;
        }
      }

      @container (max-width: 420px) {
        .ox-ad[data-size="auto"] .ox-ad__card {
          min-height: auto;
          padding: 12px 14px;
          border-radius: 999px;
        }

        .ox-ad[data-size="auto"] .ox-ad__brand {
          margin: 0;
        }

        .ox-ad[data-size="auto"] .ox-ad__logo {
          width: 22px;
          height: 22px;
        }

        .ox-ad[data-size="auto"] .ox-ad__name,
        .ox-ad[data-size="auto"] .ox-ad__title,
        .ox-ad[data-size="auto"] .ox-ad__subtitle,
        .ox-ad[data-size="auto"] .ox-ad__cta {
          display: none;
        }

        .ox-ad[data-size="auto"] .ox-ad__small-text {
          display: inline;
        }
      }

      @media (max-width: 520px) {
        .ox-ad--fixed {
          right: 12px;
          bottom: 12px;
          width: calc(100vw - 24px);
        }
      }
    `;

    document.head.appendChild(style);
  }

  const ad = document.createElement("aside");
  ad.className = `ox-ad ${config.position === "fixed-bottom-right" ? "ox-ad--fixed" : ""}`;
  ad.dataset.size = config.size;
  ad.dataset.reason = config.reason;

  ad.innerHTML = `
    <a class="ox-ad__link" href="${href}" target="_blank" rel="noopener sponsored">
      <section class="ox-ad__card" aria-label="${text.title}">
        <div class="ox-ad__brand">
          <img class="ox-ad__logo" src="${logo}" alt="" loading="lazy">
          <img class="ox-ad__name" src="${name}" alt="Extaas" loading="lazy">
          <span class="ox-ad__small-text">${text.small}</span>
        </div>

        <h2 class="ox-ad__title">${text.title}</h2>
        <p class="ox-ad__subtitle">${text.subtitle}</p>
        <span class="ox-ad__cta">${text.cta}</span>
      </section>
    </a>
  `;

  script.after(ad);
})();