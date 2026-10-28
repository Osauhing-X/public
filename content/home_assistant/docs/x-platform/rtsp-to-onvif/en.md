# RTSP to ONVIF

The application relays RTSP through MediaMTX without transcoding and exposes ONVIF Device and Media services. It connects RTSP-only cameras to an NVR, Home Assistant or another ONVIF discovery system. Camera configuration persists under `/data/application-data/rtsp-to-onvif`.

## Setup

1. Configure the management UI's `PASSWORD` in the X application environment.
2. Add the camera name and HQ RTSP URL. An LQ URL is optional.
3. Set a separate, nonempty ONVIF username and password for the camera. These are the recorder's credentials, not the management password.
4. Check that the recorder can reach the application host and the host can reach the source camera.
5. Test discovery, video and reconnection in the recorder before permanent use.

| Default port | Protocol | Purpose |
| --- | --- | --- |
| 3702 | UDP | WS-Discovery |
| 8091 | HTTP | ONVIF Device and Media services |
| 8554 | RTSP/TCP | MediaMTX relay |

The stream URI returned to the recorder uses the relay host: `rtsp://<server>:8554/<camera-id>`. An H.264 source improves compatibility with many recorders. The recorder stream is not converted to another codec. The browser MP4 preview is separate FFmpeg processing and may transcode video; its settings do not change the NVR stream.

## Snapshots and retained configuration

Version 0.8.4 source requires the camera's ONVIF HTTP Digest credentials or a valid management session for JPEG snapshots. The image URI stays stable; anonymous requests return 401. Verify that the recorder also supplies its configured ONVIF credentials when fetching images.

Corrupt or unreadable configuration is not replaced with an empty camera list. The UI reports the error and blocks adding a camera until storage is readable again. Concurrent camera, DHCP and discovery-setting changes are serialized. Configuration still contains source connection secrets; keep its directory and backups private.

## Management login

The source update limits repeated incorrect management passwords: eight failed attempts from one resolved client address trigger a 60-second wait. A shared cap also limits failures to 100 per minute. Existing authenticated sessions remain usable, and the older login endpoint shares the same restriction. Protection is process-local; proxy deployments must configure the trusted client-address boundary correctly.

The login form works without JavaScript. The enhanced browser form displays failure/wait feedback in place and preserves a safe return path. Its normal, incorrect-password and blocked states passed automated WCAG A/AA checks at both 1280- and 390-pixel widths, without horizontal overflow. This does not establish accessibility of the entire camera-management UI. See the [exact login limits and acceptance scope](https://github.com/Osauhing-X/home-assistant/blob/54ef113c052917288eb1287622cfd7a38cd96e55/applications/rtsp_to_onvif/GUI-LOGIN.md).

## ONVIF authentication

The source update checks SOAP Header UsernameToken digests with Nonce and Created. Requests may be at most five minutes old or one minute ahead of the relay clock. The recorder must generate a fresh nonce for every authenticated request; reuse on a protected operation receives 401. Synchronize recorder and server clocks. Clock and some device-discovery information remain public; those responses do not establish successful authentication. Cameras with an empty username or password cannot authenticate.

Replay state is held in process memory and does not survive restart. Nonempty PasswordText remains supported for older clients, but does not encrypt the password or provide nonce replay protection. SOAP POST bodies are capped at 64 KiB. These checks do not replace network/transport protection or constitute ONVIF certification. See the [exact authentication behavior and limits](https://github.com/Osauhing-X/home-assistant/blob/f9ed0f70550621f2503186fd4fdade9790a0b368/applications/rtsp_to_onvif/ONVIF-AUTH.md).

## Acceptance scope — 27 October 2026

The 0.8.4 source build and 35 tests pass, including a real curl HTTP Digest request and local MediaMTX 1.19.3 authorization acceptance. HTTP tests on all four ONVIF Device/Media endpoints accept fresh digest requests, reject replayed/stale tokens with 401 and reject oversized SOAP with 413. Anonymous, incorrect-password and cross-camera stream requests receive 401. Signed management sessions expire after seven days on the server; password changes invalidate existing sessions. A missing multicast interface no longer terminates management; discovery is reported as unavailable instead.

The Extaas Connect linking client and dedicated account page are implemented in source and disabled by default. `RTSP_CONNECT_ENABLED=true` enables the flow: start linking, compare the code and approve it in Iseteenindus. A synthetic test against the built issuer application passed approval, account overview and revocation, without production accounts or Stripe requests. Connection credentials are encrypted in the local private data directory. Linking alone does not confirm paid access. See the [account linking guide](https://github.com/Osauhing-X/home-assistant/blob/44aaee8a0ebffe10593310c40c09e1acbacae0eb/applications/rtsp_to_onvif/CONNECT.md).

The separate addon's development package passed amd64 and emulated ARM64 container acceptance: normal startup and clean shutdown, login, protected API, account page, and rejection of missing options or incomplete migration. Tests had no external network access or real cameras. The package has not been published as a Home Assistant addon. Its offline configuration-copy tool preserves the source and existing account connection, refuses existing targets and passes seven tests. Different Home Assistant addons have separate `/data` volumes: using the same file path does not transfer the old configuration. See the [exact packaging and migration scope](https://github.com/Osauhing-X/home-assistant/blob/7c51c0f849dc76061ab5ff67b85b0c48a648352a/packaging/rtsp_to_onvif/README.md).

Browser checks covered loading failure, recovery, camera/settings dialogs and the new account page's disconnected, awaiting-confirmation and connected states on desktop and mobile. Axe found no WCAG A/AA violations in those states. This does not establish accessibility of the entire application, actual camera/NVR compatibility or automatically update an installed copy. Addon publication and actual Home Assistant installation, paid access enforcement, production account-linking acceptance, bridge authorization and hardware acceptance remain unfinished. See the [source security review](https://github.com/Osauhing-X/home-assistant/blob/54ef113c052917288eb1287622cfd7a38cd96e55/applications/rtsp_to_onvif/SECURITY-REVIEW.md) for implementation details and outstanding requirements.


## Preview resource limits — source update, 28 October 2026

Version 0.8.5 limits FFmpeg previews and ffprobe work to two concurrent processes per pool. Leaving a camera card or closing/removing its preview detaches the video source; pausing alone is no longer used to retain the request. Preview tokens are one-use, expire after 60 seconds and have a 256-entry limit. A preview has a 10-second startup timeout and a five-minute maximum duration, with bounded response buffering.

Identical in-flight probes share a worker. Probe output is limited to 64 KiB, the timeout is eight seconds and successful results have a five-minute, 256-entry cache. A killed child continues to occupy its slot until it actually closes. Shutdown stops both pools. Local verification: build passed, 42 tests passed and the real MediaMTX test was skipped locally because its binary was not configured; the source revision’s GitHub security workflow passed. The empty dashboard also passed scoped desktop/mobile automated WCAG A/AA checks.

The separate development addon is pinned to this source. Its new container acceptance run was still in progress when this text was updated. This is not a published or verified real Home Assistant installation, and does not complete paid access or the legacy update-bridge authorization work.
