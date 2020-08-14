#!/usr/bin/env bash
set -e

source 'scripts/helpers.sh'
trap stop_services SIGINT EXIT

start_services
prisma migrate save --experimental
prisma migrate up --experimental
stop_services
