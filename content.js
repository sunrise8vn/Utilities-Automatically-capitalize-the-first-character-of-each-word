let upperCase = false;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const allElements = document.querySelectorAll('input[type="text"], textarea');

  const filteredElements = Array.from(allElements).filter(function (el) {
    return !(el.tagName.toLowerCase() === 'textarea' && el.name === 'Field11');
  });

  if (request.action === 'activated') {
    filteredElements.forEach(function (input) {
      input.addEventListener('input', capitalizeInputValue);
    });

    filteredElements.forEach(function (input) {
      input.addEventListener('change', handleonChangeInputValue);
    });
  }

  if (request.action === 'deactivated') {
    filteredElements.forEach(function (input) {
      input.removeEventListener('input', capitalizeInputValue);
    });

    filteredElements.forEach(function (input) {
      input.removeEventListener('change', handleonChangeInputValue);
    });
  }
});

function handleonChangeInputValue(event) {
  let inputValue = event.target.value;

  inputValue = cleanString(inputValue);

  inputValue = inputValue.replace('Thị Trấn', 'Thị trấn');
  inputValue = inputValue.replace(', Ấp', ', ấp');
  inputValue = inputValue.replace(', Xã', ', xã');
  inputValue = inputValue.replace(', Huyện', ', huyện');
  inputValue = inputValue.replace(', Tỉnh', ', tỉnh');
  inputValue = inputValue.replace('Thành Phố', 'Thành phố');
  inputValue = inputValue.replace('Bệnh Viện', 'Bệnh viện');

  inputValue = inputValue.replace('Phó Chủ Tịch ', 'Phó chủ tịch ');
  inputValue = inputValue.replace('Chủ Tịch ', 'Chủ tịch ');

  event.target.value = inputValue;
}

function cleanString(inputString) {
  // Tách chuỗi thành mảng các phần tử
  let stringArray = inputString.split(',');

  // Loại bỏ khoảng trắng thừa trong mỗi phần tử
  stringArray = stringArray.map((element) => element.trim());

  // Loại bỏ các phần tử trống trong mảng
  stringArray = stringArray.filter((element) => element !== '');

  // Ghép lại chuỗi từ mảng các phần tử
  let cleanedString = stringArray.join(', ');

  return cleanedString;
}

function capitalizeInputValue(event) {
  const inputValue = event.target.value;
  const words = inputValue.split('');
  const wordsLength = inputValue.length;
  event.target.value = capitalizeFirstLetter(event, words, wordsLength);
}

function capitalizeFirstLetter(event, words, wordsLength) {
  if (wordsLength) {
    if (wordsLength == 1) {
      words[0] = words[0].toUpperCase();
    } else {
      if (upperCase) {
        words[wordsLength - 1] = words[wordsLength - 1].toUpperCase();
        upperCase = false;
      } else {
        if (words[wordsLength - 2] == ' ') {
          words[wordsLength - 1] = words[wordsLength - 1].toUpperCase();
        }
      }

      if (event.data == ' ') {
        upperCase = true;
      }
    }
  }

  return words.join('');
}
