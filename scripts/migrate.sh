#!/usr/bin/env bash
set -e

prisma migrate up --experimental
