#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { UrlShortenerStack } = require('../lib/url-shortener-stack');

const app = new cdk.App();
new UrlShortenerStack(app, 'UrlShortenerStack');
