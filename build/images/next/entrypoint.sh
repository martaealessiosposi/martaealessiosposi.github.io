#!/bin/bash
set -xeo pipefail
shopt -s nullglob
BASE=${PWD}

if [[ "${1}" == 'yarn' || "${1}" == "npm" ]]; then
  echo "Installing npm libraries....."
  yarn install --frozen-lockfile
  echo "...done\n"
fi

cd "${BASE}"
exec "${@}"