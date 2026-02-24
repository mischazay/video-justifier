browser.commands.onCommand.addListener(async (command) => {
  let direction;
  if (command === "justify-left") direction = "left";
  else if (command === "justify-centre") direction = "centre";
  else if (command === "justify-right") direction = "right";

  if (direction) {
    try {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      const activeTab = tabs[0];
      if (activeTab && activeTab.url) {
        // Rely on manifest.json to inject content.js on supported sites, if content.js is not present, this safely catches the error
        await browser.tabs.sendMessage(activeTab.id, { action: "justifyVideo", direction: direction });
      }
    } catch (error) {
      console.error("Error sending message from background:", error);
    }
  }
});
