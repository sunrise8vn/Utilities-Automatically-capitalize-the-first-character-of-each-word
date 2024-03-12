chrome.runtime.onInstalled.addListener(function () {
  console.log('chrome.runtime.onInstalled');

  const isActiveInit =
    localStorage.getItem('isActive') == 'true' ? true : false;

  const iconPath = isActiveInit
    ? 'icons/activated-icon-32.png'
    : 'icons/deactivated-icon-32.png';

  chrome.browserAction.setIcon({
    path: iconPath,
  });

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
      // Kích hoạt extension tại đây
      console.log('Page reloaded! Extension activated.');

      let isActiveInit =
        localStorage.getItem('isActive') == 'true' ? true : false;

      const action = isActiveInit ? 'activated' : 'deactivated';

      const iconPath = isActiveInit
        ? 'icons/activated-icon-32.png'
        : 'icons/deactivated-icon-32.png';

      chrome.browserAction.setIcon({
        path: iconPath,
      });

      chrome.tabs.query({}, function (tabs) {
        tabs.forEach(function (tab) {
          chrome.tabs.sendMessage(tab.id, {
            action: action,
          });
        });
      });
    }
  });
});
