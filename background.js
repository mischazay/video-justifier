browser.commands.onCommand.addListener(async (command) => {
  let direction;
  if (command === "justify-left") direction = "left";
  else if (command === "justify-centre") direction = "centre";
  else if (command === "justify-right") direction = "right";

  if (direction) {
    try {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      const activeTab = tabs[0];
      if (activeTab && activeTab.url.includes("youtube.com/watch")) {
        await browser.tabs.sendMessage(activeTab.id, { action: "justifyVideo", direction: direction });
      }
    } catch (error) {
      console.error("Error sending message from background:", error);
    }
  }
});
