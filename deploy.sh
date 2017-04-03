#!/bin/bash
set -e

npm install \
&& ionic state restore \
&& ionic build android -- prod \
