'use client';

import { useEffect } from 'react';

const BOTPRESS_WEBCHAT_SRC = 'https://cdn.botpress.cloud/webchat/v3.6/inject.js';
const BOTPRESS_CONFIG_SRC =
  'https://files.bpcontent.cloud/2026/04/05/14/20260405144045-G1PSKHY7.js';

function shouldSkipBotpress() {
  return false;
}

export default function BotpressWebchat() {
  useEffect(() => {
    if (shouldSkipBotpress()) return;

    const existingInject = document.querySelector<HTMLScriptElement>(
      'script[data-botpress-inject="true"]'
    );
    const existingConfig = document.querySelector<HTMLScriptElement>(
      'script[data-botpress-config="true"]'
    );

    if (existingInject && existingConfig) return;

    const loadConfig = () => {
      if (document.querySelector('script[data-botpress-config="true"]')) return;

      const configScript = document.createElement('script');
      configScript.src = BOTPRESS_CONFIG_SRC;
      configScript.defer = true;
      configScript.dataset.botpressConfig = 'true';
      configScript.onerror = () => {
        console.warn('[botpress] failed to load config script');
      };
      document.body.appendChild(configScript);
    };

    if (existingInject) {
      loadConfig();
      return;
    }

    const injectScript = document.createElement('script');
    injectScript.src = BOTPRESS_WEBCHAT_SRC;
    injectScript.dataset.botpressInject = 'true';
    injectScript.onload = loadConfig;
    injectScript.onerror = () => {
      console.warn('[botpress] failed to load webchat script');
    };
    document.body.appendChild(injectScript);
  }, []);

  return null;
}
