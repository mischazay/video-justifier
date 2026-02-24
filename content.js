const STYLE_ID = 'justify-video-ext-style';

function injectStyle(css) {
  let styleEl = document.getElementById(STYLE_ID);
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = STYLE_ID;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = css;
}

function removeStyle() {
  const styleEl = document.getElementById(STYLE_ID);
  if (styleEl) {
    styleEl.remove();
  }
}

function justifyVideo(direction) {
  if (direction === 'centre') {
    removeStyle();
    return;
  }
  
  // Config for different site layouts
  const justifyRules = [
    {
      // Absolute position (YouTube)
      // YouTube uses explicit left/top positioning on the element itself.
      selectors: ['video.html5-main-video'],
      left: 'left: 0px !important; right: auto !important;',
      right: 'left: auto !important; right: 0px !important;'
    },
    {
      // Full frame containment (Twitch)
      // Twitch sets the element to 100% width/height and centres
      // :not() prevents this rule from interfering with YouTube's player.
      selectors: ['video:not(.html5-main-video)'],
      left: 'object-position: left center !important;',
      right: 'object-position: right center !important;'
    },
    {
      // Flexbox centred wrapper (Kick)
      selectors: ['#injected-embedded-channel-player-video'],
      left: 'justify-content: flex-start !important;',
      right: 'justify-content: flex-end !important;'
    }
  ];
  
  let css = '';
  for (const rule of justifyRules) {
    const combinedSelectors = rule.selectors.join(', ');
    css += `
      ${combinedSelectors} {
        ${direction === 'left' ? rule.left : rule.right}
      }
    `;
  }

  injectStyle(css);
}

// Listen for messages from the popup
browser.runtime.onMessage.addListener((request) => {
  if (request.action === 'justifyVideo') {
    justifyVideo(request.direction);
    return Promise.resolve({ status: "success" }); // In browser.* namespace, return a promise
  }
});
