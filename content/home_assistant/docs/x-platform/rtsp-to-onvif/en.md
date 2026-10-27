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

The 0.8.4 source build and 13 synthetic tests pass, including a real curl HTTP Digest request. Browser checks covered loading failure, recovery and camera/settings dialogs on desktop and mobile. Axe found no WCAG A/AA violations in the tested dialog states.

This does not prove actual camera/NVR compatibility or automatically update an installed copy. The separate Home Assistant addon, Extaas Connect account linking, complete relay/bridge authorization and hardware acceptance remain unfinished. See the [source security review](https://github.com/Osauhing-X/home-assistant/blob/3fd10683d5615f07b461d8c474ecfd952df91c53/applications/rtsp_to_onvif/SECURITY-REVIEW.md) for implementation details and outstanding requirements.
