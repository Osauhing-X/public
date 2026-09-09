# Node.js apps in Home Assistant: now managed by X Platform

The former standalone Node.js Server add-on is no longer maintained as a separate product. Its role is now part of **X Platform**, which discovers GitHub repositories, installs dependencies, builds apps, and manages processes, ports, environment variables and logs from one place.

## Why it changed

A single management layer removes duplicated setup and provides one understandable lifecycle for installation, updates, runtime and troubleshooting. Application data remains in the add-on's persistent data directory.

## Use it safely

Install only source code you trust and have reviewed. Managed apps may inherit the Home Assistant runtime token, so permissions, environment variables and exposed ports must be treated as production secrets.

Read the current guide: [X Platform](/docs/x-platform).
