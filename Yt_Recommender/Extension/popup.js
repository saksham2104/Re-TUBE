document.getElementById("saveBtn").addEventListener("click", () => {
  const selectedIntent = document.getElementById("intentSelect").value;
  chrome.storage.local.set({ retube_intent: selectedIntent }, () => {
    alert("Intent saved: " + selectedIntent);
  });
});
