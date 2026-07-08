/**
 * Osaühing X / Extaas Embed
 *
 * <script
 * src="https://cdn.jsdelivr.net/gh/Osauhing-X/public@www/osauhing-x-ad.js"
 * data-size="auto"
 * data-reason="reklaam"
 * data-position="fixed-bottom-right"
 * data-lang="et">
 * </script>
 *
 * data-size     : auto | suur | keskmine | väike
 * data-reason   : reklaam | veebiarendus
 * data-position : inline | fixed-bottom-right
 * data-lang     : et | en
 */

(() => {
  const script = document.currentScript;

  const config = {
    size: script?.dataset.size || "auto",
    reason: script?.dataset.reason || "reklaam",
    position: script?.dataset.position || "fixed-bottom-right",
    lang: script?.dataset.lang || "en",
  };

  const allowedSizes = ["auto", "suur", "keskmine", "väike"];
  const allowedReasons = ["reklaam", "veebiarendus"];
  const allowedPositions = ["inline", "fixed-bottom-right"];
  const allowedLangs = ["et", "en"];

  if (!allowedSizes.includes(config.size)) config.size = "auto";
  if (!allowedReasons.includes(config.reason)) config.reason = "reklaam";
  if (!allowedPositions.includes(config.position)) config.position = "fixed-bottom-right";
  if (!allowedLangs.includes(config.lang)) config.lang = "en";

  const i18n = {
    et: {
      reklaam: {
        title: "Osaühing X",
        subtitle: "Ettevõte, mis toetab otsuseid ja kasvatab väärtust.",
        cta: "Vaata lähemalt",
        small: "IT-partner, kes kasvatab väärtust",
      },
      veebiarendus: {
        title: "Veebiarendus Osaühing X poolt",
        subtitle: "Selle veebilahenduse arendas Osaühing X.",
        cta: "Vaata tegijat",
        small: "Arendas Osaühing X",
      },
    },
    en: {
      reklaam: {
        title: "Osaühing X",
        subtitle: "A company that supports decisions and grows value.",
        cta: "Learn more",
        small: "IT partner that grows value",
      },
      veebiarendus: {
        title: "Web development by Osaühing X",
        subtitle: "This web solution was developed by Osaühing X.",
        cta: "View developer",
        small: "Developed by Osaühing X",
      },
    },
  };

  const text = i18n[config.lang][config.reason];

  const source = encodeURIComponent(window.location.hostname || window.location.href);
  const href = `https://extaas.com/@?www=${source}`;

  const logo = "https://extaas.com/corporate_visual_identity/logo.png";
  const name = "https://extaas.com/corporate_visual_identity/name.png";

  if (!document.querySelector("style[data-ox-ad-style]")) {
    const style = document.createElement("style");
    style.dataset.oxAdStyle = "true";

    style.textContent = `
      .ox-ad {
        --current: light-dark(#fff, #000);
        --current_40: color-mix(in oklab, var(--current), #0000 40%);
        --reverse: light-dark(#000, #fff);
        --reverse_40: color-mix(in oklab, var(--reverse), #0000 40%);
        --x_brand: #da3;
        --x_color: var(--color_override, var(--x_brand));
        --x_color_transparent: color-mix(in oklab, var(--x_color), #0000 80%);
        --x_outer_background: var(--current_40);
        --x_inner_background: var(--current);
        --x_border_color: light-dark(#eee, #222);
        --x_heading_color: var(--reverse);
        --x_text_color: var(--reverse_40);

        box-sizing: border-box;
        container-type: inline-size;
        width: 100%;
        max-width: 860px;
        color-scheme: light dark;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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
        overflow: hidden;
        border: 1px solid var(--x_border_color);
        border-radius: 18px;
        background: var(--x_inner_background);
        color: var(--x_heading_color);
        box-shadow: 0 18px 46px light-dark(rgba(0,0,0,.14), rgba(0,0,0,.42));
        transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease, filter .18s ease;
      }

      .ox-ad__link:hover .ox-ad__card {
        transform: translateY(-2px);
        border-color: var(--x_color);
        filter: brightness(1.03);
        box-shadow: 0 22px 58px light-dark(rgba(0,0,0,.20), rgba(0,0,0,.58));
      }

      .ox-ad__header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 18px;
        background: #000;
        color-scheme: dark;
      }

      .ox-ad__logo,
      .ox-ad__name {
        height: 28px;
        width: auto;
        max-width: 160px;
        object-fit: contain;
        flex: 0 0 auto;
      }

      .ox-ad__body {
        padding: 26px;
        background:
          radial-gradient(circle at top right, var(--x_color_transparent), transparent 36%),
          linear-gradient(135deg, var(--x_inner_background), var(--x_outer_background));
      }

      .ox-ad__title {
        max-width: 620px;
        margin: 0 0 10px;
        color: var(--x_heading_color);
        font-size: clamp(27px, 5cqi, 46px);
        line-height: 1.02;
        letter-spacing: -0.045em;
        font-weight: 850;
      }

      .ox-ad__subtitle {
        max-width: 520px;
        margin: 0;
        color: var(--x_text_color);
        font-size: clamp(15px, 2.2cqi, 18px);
        line-height: 1.45;
      }

      .ox-ad__footer {
        display: grid;
        border-top: 1px solid var(--x_border_color);
      }

      .ox-ad__cta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 44px;
        padding: 0 18px;
        background: var(--x_color);
        color: #000;
        font-size: 14px;
        font-weight: 800;
      }

      .ox-ad__cta::after {
        content: ">";
      }

      .ox-ad__small-text {
        display: none;
        color: var(--x_heading_color);
        font-size: 13px;
        font-weight: 800;
        white-space: nowrap;
      }

      /* Suur: premium kaart */
      .ox-ad[data-size="suur"] .ox-ad__card {
        border-radius: 22px;
      }

      .ox-ad[data-size="suur"] .ox-ad__body {
        min-height: 190px;
        padding: 34px;
      }

      .ox-ad[data-size="suur"] .ox-ad__title {
        font-size: clamp(34px, 6cqi, 58px);
      }

      /* Keskmine: vana lihtsam kaart, nupp sisu sees all */
      .ox-ad[data-size="keskmine"] .ox-ad__card {
        min-height: auto;
        padding: 22px;
        border-radius: 16px;
        background:
          radial-gradient(circle at top right, var(--x_color_transparent), transparent 36%),
          linear-gradient(135deg, var(--x_inner_background), var(--x_outer_background));
      }

      .ox-ad[data-size="keskmine"] .ox-ad__header,
      .ox-ad[data-size="keskmine"] .ox-ad__footer {
        display: none;
      }

      .ox-ad[data-size="keskmine"] .ox-ad__body {
        padding: 0;
        background: transparent;
      }

      .ox-ad[data-size="keskmine"] .ox-ad__body::before {
        content: "";
        display: block;
        width: 34px;
        height: 34px;
        margin-bottom: 16px;
        background: url("https://extaas.com/corporate_visual_identity/logo.png") center / contain no-repeat;
      }

      .ox-ad[data-size="keskmine"] .ox-ad__title {
        margin: 0 0 8px;
        font-size: 24px;
        line-height: 1.08;
        letter-spacing: -0.035em;
      }

      .ox-ad[data-size="keskmine"] .ox-ad__subtitle {
        margin: 0 0 18px;
        font-size: 14px;
        line-height: 1.4;
      }

      .ox-ad[data-size="keskmine"] .ox-ad__body::after {
        content: attr(data-cta) " →";
        display: inline-flex;
        align-items: center;
        min-height: 36px;
        padding: 0 13px;
        border-radius: 4px;
        background: var(--x_color);
        color: #000;
        font-size: 13px;
        font-weight: 800;
      }

      /* Väike: diskreetne badge (Uuendatud välimus) */
      .ox-ad[data-size="väike"] {
        display: inline-block;
        width: 100%;
        max-width: max-content;
      }

      .ox-ad[data-size="väike"] .ox-ad__card {
        border-radius: 5px;
        background: var(--x_inner_background);
        box-shadow: 0 8px 24px light-dark(rgba(0,0,0,.10), rgba(0,0,0,.32));
      }

      .ox-ad[data-size="väike"] .ox-ad__header,
      .ox-ad[data-size="väike"] .ox-ad__footer,
      .ox-ad[data-size="väike"] .ox-ad__title,
      .ox-ad[data-size="väike"] .ox-ad__subtitle {
        display: none;
      }

      .ox-ad[data-size="väike"] .ox-ad__body {
        display: grid;
        grid-template-columns: min-content 1fr min-content;
        align-items: center;
        gap: 5px;
        padding: 0;
        background:
          radial-gradient(circle at top right, var(--x_color_transparent), transparent 40%),
          linear-gradient(135deg, var(--x_inner_background), var(--x_outer_background));
      }

      /* Vasak: 1x1 must kast logoga, ilma paddinguta */
      .ox-ad[data-size="väike"] .ox-ad__body::before {
        content: "";
        display: block;
        width: 36px;
        height: 36px;
        background: #000 url("https://extaas.com/corporate_visual_identity/logo.png") center / 22px no-repeat;
      }

      /* Keskel: Tekst */
      .ox-ad[data-size="väike"] .ox-ad__small-text {
        display: inline;
        padding: 0 4px;
      }

      /* Paremalt: Nuputagune padding ja 1x1 nupp raadiusega 3px */
      .ox-ad[data-size="väike"] .ox-ad__body::after {
        content: ">";
        display: grid;
        place-items: center;
        width: 26px;
        height: 26px;
        margin-right: 5px;
        border-radius: 3px;
        background: var(--x_color);
        color: #000;
        font-weight: 900;
      }

      /* Auto: suur -> keskmine -> väike */
      @container (max-width: 620px) {
        .ox-ad[data-size="auto"] .ox-ad__card {
          min-height: auto;
          padding: 22px;
          border-radius: 16px;
          background:
            radial-gradient(circle at top right, var(--x_color_transparent), transparent 36%),
            linear-gradient(135deg, var(--x_inner_background), var(--x_outer_background));
        }

        .ox-ad[data-size="auto"] .ox-ad__header,
        .ox-ad[data-size="auto"] .ox-ad__footer {
          display: none;
        }

        .ox-ad[data-size="auto"] .ox-ad__body {
          padding: 0;
          background: transparent;
        }

        .ox-ad[data-size="auto"] .ox-ad__body::before {
          content: "";
          display: block;
          width: 34px;
          height: 34px;
          margin-bottom: 16px;
          background: url("https://extaas.com/corporate_visual_identity/logo.png") center / contain no-repeat;
        }

        .ox-ad[data-size="auto"] .ox-ad__title {
          margin: 0 0 8px;
          font-size: 24px;
          line-height: 1.08;
          letter-spacing: -0.035em;
        }

        .ox-ad[data-size="auto"] .ox-ad__subtitle {
          margin: 0 0 18px;
          font-size: 14px;
          line-height: 1.4;
        }

        .ox-ad[data-size="auto"] .ox-ad__body::after {
          content: attr(data-cta) " →";
          display: inline-flex;
          align-items: center;
          min-height: 36px;
          padding: 0 13px;
          border-radius: 4px;
          background: var(--x_color);
          color: #000;
          font-size: 13px;
          font-weight: 800;
        }
      }

      @container (max-width: 420px) {
        .ox-ad[data-size="auto"] {
          max-width: max-content;
        }

        .ox-ad[data-size="auto"] .ox-ad__card {
          border-radius: 5px;
          padding: 0;
          background: var(--x_inner_background);
        }

        .ox-ad[data-size="auto"] .ox-ad__header,
        .ox-ad[data-size="auto"] .ox-ad__footer,
        .ox-ad[data-size="auto"] .ox-ad__title,
        .ox-ad[data-size="auto"] .ox-ad__subtitle {
          display: none;
        }

        .ox-ad[data-size="auto"] .ox-ad__body {
          display: grid;
          grid-template-columns: min-content 1fr min-content;
          align-items: center;
          gap: 5px;
          padding: 0;
          background:
            radial-gradient(circle at top right, var(--x_color_transparent), transparent 40%),
            linear-gradient(135deg, var(--x_inner_background), var(--x_outer_background));
        }

        .ox-ad[data-size="auto"] .ox-ad__body::before {
          content: "";
          display: block;
          width: 36px;
          height: 36px;
          margin: 0;
          background: #000 url("https://extaas.com/corporate_visual_identity/logo.png") center / 22px no-repeat;
        }

        .ox-ad[data-size="auto"] .ox-ad__body::after {
          content: ">";
          display: grid;
          place-items: center;
          width: 26px;
          height: 26px;
          margin-right: 5px;
          border-radius: 3px;
          background: var(--x_color);
          color: #000;
          font-weight: 900;
        }

        .ox-ad[data-size="auto"] .ox-ad__small-text {
          display: inline;
          padding: 0 4px;
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
        <header class="ox-ad__header">
          <img class="ox-ad__logo" src="${logo}" alt="" loading="lazy">
          <img class="ox-ad__name" src="${name}" alt="Extaas" loading="lazy">
        </header>

        <main class="ox-ad__body" data-cta="${text.cta}">
          <span class="ox-ad__small-text">${text.small}</span>
          <h2 class="ox-ad__title">${text.title}</h2>
          <p class="ox-ad__subtitle">${text.subtitle}</p>
        </main>

        <footer class="ox-ad__footer">
          <span class="ox-ad__cta">${text.cta}</span>
        </footer>
      </section>
    </a>
  `;

  script.after(ad);
})();
