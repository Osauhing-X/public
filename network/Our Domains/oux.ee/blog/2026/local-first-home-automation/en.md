# Local-first automation: why keep control at home?

![A local Home Assistant control layer connects home devices](https://raw.githubusercontent.com/Osauhing-X/public/www/oux.ee/read/blog/2026/local-first-home-automation/cover.png)

Local-first does not mean banning the internet. It means decisions and operational state for core home functions live as close to devices as practical, while cloud service is an added capability rather than the only route to a switch.

<div class="css _radius _padding grid gap" style="margin-block: 1.5rem;">
  <span class="css _color _dark">LOCAL-FIRST</span>
  <h3>If the internet disappears, the home should not lose its basic logic.</h3>
  <p>Lighting, measurement and local automations may continue while remote services and external APIs are temporarily limited.</p>
</div>

## Latency is only one part

A local command is often faster because it need not cross an external data centre. More important is the failure boundary. If a provider, internet connection or vendor account fails, a local protocol and Home Assistant may continue.

This does not make the system automatically reliable. If every local service runs on one device and its disk or power fails, there is still one failure point. Local-first creates the architectural opportunity, but it requires backup, monitoring and recovery.

## Home Assistant as coordination layer

Home Assistant brings device state, events, automations and UI together. Its advantage is a common model: sensors, switches and buttons behave similarly in automation regardless of manufacturer.

Custom Node.js services fill gaps where no ready integration exists or data needs processing before Home Assistant. A Node service may read a local API, calculate an aggregate and expose it as a dynamic sensor.

## Why dynamic entities?

A classic custom integration describes supported entities in code. That is excellent for a stable product, while a changing prototype or custom controller may need a more flexible model.

The Extaas dynamic integration lets Node describe sensors, switches and buttons as data. Home Assistant discovers the service through Zeroconf, creates entities and sends user commands to Node's `/update` endpoint.

This reduces glue code but creates contract responsibility. Entity keys must remain stable, value types correct, and `device_class`, unit and `state_class` compatible. Dynamic does not mean unversioned.

## Node.js add-on or separate device?

A Home Assistant add-on is convenient when the service belongs in the same backup and management environment. Node Server can clone a private repository and run a background application; the UI variant renders through sidebar Ingress.

A separate device is better when the service controls physical hardware, needs a different network location, consumes significant resources or must survive a Home Assistant host failure. Choose the boundary by failure behaviour, not installation convenience alone.

## Zeroconf simplifies discovery, not security

mDNS/Zeroconf helps Home Assistant find a service on the network. It does not prove trust or protect an endpoint from an unauthorised command.

Practical boundaries:

- separate guests and untrusted IoT devices appropriately;
- validate `/update` payload and permitted entity keys;
- limit request size and rate;
- never put secrets in Zeroconf TXT or entity values;
- add authentication where the network is not fully trusted;
- never expose a local service port directly through the router;
- give GitHub tokens minimum repository read access.

## The hard part of state synchronisation

When a user turns on a switch in HA, a command goes to Node. Node should execute and report actual state. If it assumes success, UI may show a device on when the physical action failed.

A good model distinguishes desired and confirmed state. It may show temporary unavailable/error and log the failure. A repeated command must be safe, especially for restart, door, relay or other consequential actions.

## A backup is not yet recovery

A backup proves useful only in a restore test. Document:

- Home Assistant and add-on versions;
- known-good integration and Node repository commit;
- environment-variable names and secret recovery source;
- stable network addresses or DHCP reservations;
- entity IDs used by automations;
- safe-mode behaviour.

Never store API keys as plain text in documentation. Keep them in an appropriate password manager or secret system.

## When is cloud still right?

Cloud service may provide secure remote access, large compute, managed notifications, backup or the only supported vendor API. A local-first design can use these deliberately when local and external responsibilities are clear.

The useful question is not “cloud or local?” but “what happens when each dependency fails?”. If the answer is known and acceptable, the architecture is controlled.

## Safety-critical systems

Home-lab automation is not a substitute for certified fire, security, medical or life-safety control. Critical functions need independent fail-safe behaviour, manual control and an appropriate certified solution.

Automation may improve convenience, but safety must not depend on one hobby server, Wi‑Fi network or JavaScript process.

## Final thought

Local-first gives more control, predictable latency and a chance to preserve basic automation during external outages. In return, the owner assumes greater responsibility for upgrades, security, backup and recovery.

A successful system is not only one that works on a perfect day. It behaves understandably when the internet, one service or the host itself fails.

## Continue reading

- [Extaas and Home Assistant](/en/docs/home-assistant)
- [Dynamic Entities integration article](/en/blog/2026/home-assistant-dynamic-entities-integration)
- [Node.js Server add-on article](/en/blog/2026/home-assistant-nodejs-ui-addon)
