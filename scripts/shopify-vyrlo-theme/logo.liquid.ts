// Snippet Liquid qui rend le logo SVG d'une plateforme — copié de app/boutique/_components/ShopHome.tsx
export const VYRLO_LOGO_SNIPPET = String.raw`{% comment %}
  Renders a platform logo SVG.
  Usage: {% render 'vyrlo-logo', slug: 'instagram', size: 32 %}
{% endcomment %}

{%- assign s = size | default: 24 -%}

{%- case slug -%}
  {%- when 'instagram' -%}
    <svg width="{{ s }}" height="{{ s }}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs><radialGradient id="ig-grad-{{ s }}" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stop-color="#fdf497"/><stop offset="10%" stop-color="#fdf497"/><stop offset="50%" stop-color="#fd5949"/><stop offset="68%" stop-color="#d6249f"/><stop offset="100%" stop-color="#285AEB"/>
      </radialGradient></defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-grad-{{ s }})"/>
      <circle cx="12" cy="12" r="4.5" stroke="white" stroke-width="1.8" fill="none"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="white" stroke-width="1.8" fill="none"/>
    </svg>
  {%- when 'tiktok' -%}
    <svg width="{{ s }}" height="{{ s }}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#010101"/>
      <path d="M16.6 5.82a4.02 4.02 0 0 1-.77-2.32h-2.62v10.4c-.05 1.06-.92 1.9-2 1.9a2 2 0 0 1-2-2 2 2 0 0 1 2-2c.2 0 .38.03.56.08V9.2a4.63 4.63 0 0 0-.56-.04 4.62 4.62 0 0 0-4.62 4.62 4.62 4.62 0 0 0 4.62 4.62 4.62 4.62 0 0 0 4.62-4.62V9.22A6.6 6.6 0 0 0 19.5 10V7.4a4.03 4.03 0 0 1-2.9-1.58z" fill="white"/>
    </svg>
  {%- when 'youtube' -%}
    <svg width="{{ s }}" height="{{ s }}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#FF0000"/>
      <path d="M21.8 8.04s-.2-1.4-.8-2c-.78-.82-1.65-.82-2.04-.87C16.4 5 12 5 12 5s-4.4 0-6.96.17c-.4.05-1.26.05-2.04.87-.6.6-.8 2-.8 2S2 9.6 2 11.16v1.5c0 1.57.2 3.13.2 3.13s.2 1.4.8 2c.78.82 1.8.8 2.26.88C6.8 18.86 12 18.9 12 18.9s4.4 0 6.96-.2c.4-.05 1.26-.06 2.04-.88.6-.6.8-2 .8-2S22 14.23 22 12.66v-1.5c0-1.57-.2-3.12-.2-3.12zM9.75 14.85V9.05l5.5 2.9-5.5 2.9z" fill="white"/>
    </svg>
  {%- when 'facebook' -%}
    <svg width="{{ s }}" height="{{ s }}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#1877F2"/>
      <path d="M16 3.5h-2.5A4.5 4.5 0 0 0 9 8v2.5H6.5V14H9v7h3.5v-7h2.5l.5-3.5H12.5V8a1 1 0 0 1 1-1H16V3.5z" fill="white"/>
    </svg>
  {%- when 'twitter' -%}
    <svg width="{{ s }}" height="{{ s }}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#000"/>
      <path d="M18.3 4h-2.1L12 9.3 7.8 4H3.7l6.1 8.1L3.6 20H5.7l4.5-5.7 4.5 5.7H18.3l-6.4-8.5L18.3 4zM14.6 18.4l-9.5-12.8H9.4l9.5 12.8h-4.3z" fill="white"/>
    </svg>
  {%- when 'spotify' -%}
    <svg width="{{ s }}" height="{{ s }}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#1DB954"/>
      <path d="M12 4a8 8 0 1 0 0 16A8 8 0 0 0 12 4zm3.67 11.57a.5.5 0 0 1-.69.16c-1.88-1.15-4.25-1.41-7.04-.77a.5.5 0 1 1-.22-.97c3.05-.7 5.67-.4 7.79.9a.5.5 0 0 1 .16.68zm.98-2.18a.62.62 0 0 1-.86.2c-2.15-1.32-5.43-1.7-7.97-.93a.63.63 0 0 1-.37-1.2c2.9-.88 6.5-.45 8.97 1.06a.63.63 0 0 1 .23.87zm.08-2.27C14.1 9.55 10.1 9.42 7.58 10.2a.75.75 0 0 1-.43-1.43c2.9-.87 7.3-.7 10.18 1.1a.75.75 0 1 1-.6 1.25z" fill="white"/>
    </svg>
  {%- when 'threads' -%}
    <svg width="{{ s }}" height="{{ s }}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#000"/>
      <path d="M16.27 11.43c-.1-.05-.21-.09-.32-.13-.19-2.52-1.51-3.96-3.82-3.97h-.04c-1.38 0-2.53.59-3.23 1.66l1.31.9c.53-.8 1.35-.97 1.92-.97h.03c.74 0 1.3.22 1.67.65.26.3.44.72.52 1.25a8.3 8.3 0 0 0-2.13-.1c-2.14.12-3.52 1.35-3.42 3.06.05.87.5 1.62 1.26 2.1.64.4 1.47.6 2.33.56 1.14-.06 2.03-.5 2.65-1.3.47-.62.77-1.43.9-2.45.54.32.94.74 1.17 1.25.38.84.4 2.21-.78 3.39-1.02 1.02-2.25 1.46-4.1 1.47-2.06-.01-3.62-.68-4.63-1.97-.95-1.22-1.44-2.98-1.46-5.23.02-2.25.51-4.01 1.46-5.23 1.01-1.3 2.57-1.96 4.63-1.97 2.07.01 3.64.67 4.67 1.98.5.64.88 1.43 1.12 2.35l1.54-.41c-.29-1.14-.77-2.12-1.43-2.93-1.32-1.68-3.28-2.55-5.9-2.56z" fill="white"/>
    </svg>
  {%- else -%}
    <span style="font-size:{{ s | times: 0.7 | round }}px;color:#fff;font-weight:800;">{{ slug | slice: 0 | upcase }}</span>
{%- endcase -%}
`;
