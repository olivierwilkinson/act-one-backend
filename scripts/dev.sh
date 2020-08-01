#!/usr/bin/env bash
set -e

cleanup() {
  docker-compose down
  trap '' EXIT INT TERM
  exit $err
}

trap cleanup SIGINT EXIT

docker-compose up -d --force-recreate

NODE_ENV=development nodemon
