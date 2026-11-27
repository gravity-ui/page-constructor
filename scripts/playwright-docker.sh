#!/usr/bin/env bash

set -euo pipefail

IMAGE_NAME="mcr.microsoft.com/playwright"
IMAGE_TAG="v1.45.3-jammy" # This version have to be synchronized with playwright version from package.json

NODE_MODULES_CACHE_DIR="$HOME/.cache/page-constructor-playwright-docker-node-modules"

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

run_command() {
    "$CONTAINER_TOOL" run --rm --network host -it -w /work \
        -v "$PWD:/work" \
        -v "$NODE_MODULES_CACHE_DIR:/work/node_modules" \
        -e IS_DOCKER=1 \
        "$IMAGE_NAME:$IMAGE_TAG" \
        flock /work/node_modules /bin/bash -euc '
            stamp=node_modules/.page-constructor-lock.sha256
            if [[ ! -x node_modules/.bin/playwright || ! -f "$stamp" ]] ||
                ! sha256sum --check --status "$stamp"; then
                rm -f "$stamp"
                npm ci --include=dev
                test -x node_modules/.bin/playwright
                sha256sum package-lock.json > "$stamp"
            fi
            exec /bin/bash -c "$1"
        ' -- "$1"
}

if command_exists docker; then
  CONTAINER_TOOL="docker"
elif command_exists podman; then
  CONTAINER_TOOL="podman"
else
  echo "Neither Docker nor Podman is installed on the system."
  exit 1
fi

if [[ "$1" = "clear-cache" ]]; then
    rm -rf "$NODE_MODULES_CACHE_DIR"
    rm -rf "./playwright/.cache-docker"
    exit 0
fi

mkdir -p "$NODE_MODULES_CACHE_DIR"
run_command "$1"
