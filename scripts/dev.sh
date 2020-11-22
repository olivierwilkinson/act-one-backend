#!/usr/bin/env bash
set -e

source 'scripts/helpers.sh'

trap stop_services SIGINT EXIT
start_services

NODE_ENV=development nodemon
