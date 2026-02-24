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
  
  const videoSelector = 'video.html5-main-video'; // Main video element in YouTube
  
  let css = '';
  if (direction === 'left') {
    css = `
      ${videoSelector} {
        left: 0px !important;
        right: auto !important;
      }
    `;
  } else if (direction === 'right') {
    css = `
      ${videoSelector} {
        left: auto !important;
        right: 0px !important;
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
