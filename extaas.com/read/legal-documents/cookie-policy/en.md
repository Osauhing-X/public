# COOKIE AND BROWSER STORAGE POLICY

Last updated: 03 August 2026

***

This document explains how Osaühing X uses cookies and other browser storage on Extaas.com. It supplements the [Privacy Policy](/en/legal-documents/privacy-policy).

<div class="css _radius _padding grid gap _2" style="margin-block: 1.5rem;">
  <span class="css _color">SHORT SUMMARY</span>
  <h3>Extaas.com does not use advertising or marketing cookies.</h3>
  <p>Browser storage supports preferences, temporary UI state, an agreed device identifier and authentication for signed-in users. If usage changes, this document will be updated and consent requested where required.</p>
</div>

## 1. Controller details

Service provider and controller: **Osaühing X**  
Registry code: **17396663**  
Email: **mail@extaas.com**  
Phone: **+372 5107862**

## 2. What are cookies and browser storage?

A cookie is a small piece of information stored on a user's device through the browser. The browser may return it to the same website with subsequent requests.

`localStorage` and `sessionStorage` are local browser storage areas. They are not automatically sent to the server with every HTTP request. `localStorage` generally remains until the user or application removes it; `sessionStorage` normally lasts until the particular browser-tab session ends.

## 3. Technologies currently used

The table describes current Extaas.com application use. A browser may also show technical entries from hosting, security or authentication providers. The most accurate current view is available in the browser developer tools under Application/Storage.

| Name or storage | Type | Purpose | Typical duration |
| --- | --- | --- | --- |
| `fingerprint` | first-party cookie | an agreed technical device identifier used in a security/bot-control context | up to 30 days |
| `customer` | first-party authentication cookie | stores a signed-in user's access token and identifies server-side user context | up to 3 days or until logout |
| Supabase authentication browser entries | first/provider technical storage | technical operation of OAuth, Magic Link and user sessions | according to session or provider configuration |
| `save:config` | `localStorage` | stores language, light/dark theme, colour and rainbow preference on the device | until the user clears browser data or changes the setting |
| information-message dismissal state | `sessionStorage` | remembers within one browser-tab session that an information panel was dismissed | until the tab session ends |
| console/UI local state | `localStorage` | limited device-specific UI messages or preferences | until removed by the application or user |

A cookie or key name may change during a technical update. Its purpose and boundary must remain consistent with this policy.

## 4. Device identifier (`fingerprint`)

The device identifier is created after the user confirms the displayed consent step. The application combines technical values available through the browser, such as timezone, platform, processor concurrency and device-memory class, and stores an encoded value derived from them in the `fingerprint` cookie.

The identifier is not the same as a name, email or official personal identification code. However, combined with other information it may help distinguish a user or device and is therefore treated as a privacy-relevant technical identifier.

Under this policy it is not used to create an advertising profile, cross-site tracking or marketing behavioural analysis.

## 5. Authentication cookies

On sign-in, the application may store an access token in a cookie so the server can identify the user for restricted Workspace or account requests. Authentication uses Supabase and may include Magic Link and configured OAuth providers.

Authentication storage is needed only for signed-in service. Public content can generally be read without signing in. Logout and clearing browser data terminate or remove the local session, while a server-side session may also end through expiry or a security action.

## 6. Preferences in `localStorage`

Language and visual preferences are stored on the user's device so the site need not ask on every visit. These settings belong to the device and browser and are not automatically synchronised to another device.

Preference storage is not intended for analysing user activity. A user can inspect and remove local entries through browser developer tools.

## 7. `sessionStorage` and temporary UI state

`sessionStorage` remembers a temporary interface choice within one tab, such as dismissing an information panel. This reduces repeated interruption and is not intended to create a persistent profile.

The browser normally removes this data when the tab closes. Private browsing and browser-specific settings may behave differently.

## 8. Advertising, analytics and third-party content

As of the date of this policy, Extaas.com does not use Google Analytics, advertising-network cookies or cross-site marketing tracking.

When a user opens a link to an external website, that provider's cookie and privacy terms apply. If Extaas later adds consent-requiring analytics, advertising pixels or other optional technology, it must not load before an appropriate choice, and this policy must be updated before or with deployment.

## 9. Legal basis and choice

Storage strictly required to provide a service explicitly requested by the user may support functions such as authentication or language preference. For additional non-essential storage, consent is requested where required by applicable law.

Consent must be freely given, specific, informed and unambiguous. Refusing consent should not prevent access to core public content where the storage is not necessary to deliver it.

## 10. How to manage or remove storage

Users can manage cookies and site data in browser settings. A browser normally allows them to:

- inspect cookies and local storage for a specific domain;
- delete all Extaas.com site data;
- block all or selected cookies;
- use private browsing;
- sign out to end authentication.

Deleting all site data may remove language, visual preferences and signed-in state. Some restricted functionality may not work without required storage.

## 11. Security

During its validity, an authentication token can grant access to user context. Never share cookie values, browser-storage contents or authentication links. On a shared device, sign out after use and do not leave the browser open.

If account or session misuse is suspected, contact **mail@extaas.com** immediately.

## 12. Changes

This policy is updated when storage technology, purpose, provider or retention principles change. Material changes will be communicated appropriately and renewed consent requested where necessary.

## 13. More information and sources

Questions may be sent to **mail@extaas.com**.

Official general guidance:

- [Estonian Data Protection Inspectorate: Cookies](https://www.aki.ee/kupsised)
- [Estonian Data Protection Inspectorate: security measures for e-commerce cookies and tracking pixels](https://www.aki.ee/2-konkreetsed-turvameetmed-e-poe-platvormile)
- [Article 5(3) of the EU ePrivacy Directive](https://eur-lex.europa.eu/eli/dir/2002/58/art_5/par_3/oj/eng)
- [Privacy Policy](/en/legal-documents/privacy-policy)

