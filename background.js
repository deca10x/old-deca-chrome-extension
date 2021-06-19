chrome.action.onClicked.addListener(tab => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: reddenPage
  });
})

function reddenPage() {
  document.body.style.backgroundColor = 'red';
  console.log(location.href)
}