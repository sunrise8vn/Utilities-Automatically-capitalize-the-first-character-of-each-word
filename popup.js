document.addEventListener('DOMContentLoaded', function () {
  const activateButton = document.getElementById('activateButton');

  let isActiveInit = localStorage.getItem('isActive') == 'true' ? true : false;

  console.log('DOMContentLoaded');

  if (isActiveInit) {
    activateButton.textContent = 'Activate';
  } else {
    activateButton.textContent = 'Deactivate';
  }

  activateButton.addEventListener('click', function () {
    let isActive = localStorage.getItem('isActive') == 'true' ? false : true;
    let activeText = isActive ? 'Activate' : 'Deactivate';

    activateButton.textContent = activeText;
    localStorage.setItem('isActive', isActive);

    const action = isActive ? 'activated' : 'deactivated';

    const iconPath = isActive
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
  });
});
