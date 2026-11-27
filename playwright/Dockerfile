FROM node:24-bookworm AS node

# Keep the browsers aligned with @playwright/test and the existing snapshots.
FROM mcr.microsoft.com/playwright:v1.45.3-jammy
COPY --from=node /usr/local/ /usr/local/
