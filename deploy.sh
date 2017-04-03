#!/bin/bash
set -e

cd client \
&& npm install \
&& ionic state restore \
&& ionic build android -- prod \
