'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const BOTPRESS_WEBCHAT_SRC = 'https://cdn.botpress.cloud/webchat/v3.6/inject.js';
const BOTPRESS_INIT_CONFIG = {
  botId: '73f8c0af-5d6a-4a01-9dd0-bc11ab1602f8',
  clientId: '56c2cabd-5fb7-42ed-9e60-362faf1a9b0c',
  configuration: {
    version: 'v2',
    botName: 'Dr. SK Live',
    botAvatar:
      'https://files.bpcontent.cloud/2026/04/05/14/20260405145612-VVJ0GA0K.jpeg',
    website: {},
    email: {},
    phone: {},
    termsOfService: {},
    privacyPolicy: {},
    color: '#3276EA',
    variant: 'solid',
    headerVariant: 'solid',
    themeMode: 'light',
    fontFamily: 'inter',
    radius: 4,
    feedbackEnabled: false,
    footer: '[⚡ by Botpress](https://botpress.com/?from=webchat)',
    soundEnabled: false,
    proactiveMessageEnabled: false,
    proactiveBubbleMessage: 'Hi! 👋 Need help?',
    proactiveBubbleTriggerType: 'afterDelay',
    proactiveBubbleDelayTime: 10,
    conversationHistory: false,
  },
};

declare global {
  interface Window {
    botpress?: {
      init?: (config: unknown) => void;
    };
    __bpWebchatInitialized?: boolean;
  }
}

function shouldSkipBotpress(pathname: string) {
  return pathname.startsWith('/login') || pathname.startsWith('/auth');
}

export default function BotpressWebchat() {
  const pathname = usePathname();

  useEffect(() => {
    if (shouldSkipBotpress(pathname)) return;

    let cancelled = false;
    let attempts = 0;

    const tryInit = () => {
      if (cancelled || window.__bpWebchatInitialized) return;

      const botpress = window.botpress;
      if (!botpress || typeof botpress.init !== 'function') {
        if (attempts < 40) {
          attempts += 1;
          window.setTimeout(tryInit, 150);
        }
        return;
      }

      try {
        botpress.init(BOTPRESS_INIT_CONFIG);
        window.__bpWebchatInitialized = true;
      } catch (error) {
        console.warn('[botpress] init failed', error);
      }
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-botpress-webchat="true"]'
    );

    if (existingScript) {
      tryInit();
      return () => {
        cancelled = true;
      };
    }

    const script = document.createElement('script');
    script.src = BOTPRESS_WEBCHAT_SRC;
    script.async = true;
    script.dataset.botpressWebchat = 'true';
    script.onload = tryInit;
    script.onerror = () => {
      console.warn('[botpress] failed to load webchat script');
    };
    document.body.appendChild(script);

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
