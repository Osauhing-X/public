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

## Acceptance scope — 27 October 2026

The 0.8.4 source build and 24 tests pass, including a real curl HTTP Digest request and local MediaMTX 1.19.3 authorization acceptance. Anonymous, incorrect-password and cross-camera stream requests receive 401. Signed management sessions expire after seven days on the server; password changes invalidate existing sessions. A missing multicast interface no longer terminates management; discovery is reported as unavailable instead.

The Extaas Connect linking client and dedicated account page are implemented in source and disabled by default. `RTSP_CONNECT_ENABLED=true` enables the flow: start linking, compare the code and approve it in Iseteenindus. A synthetic test against the built issuer application passed approval, account overview and revocation, without production accounts or Stripe requests. Connection credentials are encrypted in the local private data directory. Linking alone does not confirm paid access. See the [account linking guide](https://github.com/Osauhing-X/home-assistant/blob/44aaee8a0ebffe10593310c40c09e1acbacae0eb/applications/rtsp_to_onvif/CONNECT.md).

The separate addon's development package passed amd64 and emulated ARM64 container acceptance: normal startup, login, protected API, account page, and rejection of missing options or incomplete migration. Tests had no external network access or real cameras. The package has not been published as a Home Assistant addon. Its offline configuration-copy tool preserves the source and existing account connection, refuses existing targets and passes seven tests. Different Home Assistant addons have separate `/data` volumes: using the same file path does not transfer the old configuration. See the [exact packaging and migration scope](https://github.com/Osauhing-X/home-assistant/blob/d6186c7ae97e69cff4581165d7d6d7aea6d619f5/packaging/rtsp_to_onvif/README.md).

Browser checks covered loading failure, recovery, camera/settings dialogs and the new account page's disconnected, awaiting-confirmation and connected states on desktop and mobile. Axe found no WCAG A/AA violations in those states. This does not establish accessibility of the entire application, actual camera/NVR compatibility or automatically update an installed copy. Addon publication and actual Home Assistant installation, paid access enforcement, production account-linking acceptance, bridge authorization and hardware acceptance remain unfinished. See the [source security review](https://github.com/Osauhing-X/home-assistant/blob/143542ab7cc34833f6ae1c4fa2daa8bf28b8836e/applications/rtsp_to_onvif/SECURITY-REVIEW.md) for implementation details and outstanding requirements.
