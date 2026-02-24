document.addEventListener('DOMContentLoaded', () => {
  const leftBtn = document.getElementById('justify-left');
  const centreBtn = document.getElementById('justify-centre');
  const rightBtn = document.getElementById('justify-right');

  async function sendJustificationCommand(direction) {
    try {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      const activeTab = tabs[0];
      if (activeTab && activeTab.url) {
        // Send message blindly, if site is supported, manifest.json will have injected content.js, which will receive and handle the message
        await browser.tabs.sendMessage(activeTab.id, { action: "justifyVideo", direction: direction });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  leftBtn.addEventListener('click', () => sendJustificationCommand('left'));
  centreBtn.addEventListener('click', () => sendJustificationCommand('centre'));
  rightBtn.addEventListener('click', () => sendJustificationCommand('right'));
});
