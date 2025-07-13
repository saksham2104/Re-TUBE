chrome.storage.local.get("retube_intent", (result) => {
  const intent = result.retube_intent || "learn_something_new";

  fetch(`http://localhost:5000/recommend?intent=${intent}`)
    .then((res) => res.json())
    .then((videos) => {
      const mainContainer = document.querySelector("ytd-app");
      if (!mainContainer) return;

      const feed = document.querySelector("ytd-browse");
      if (feed) feed.innerHTML = "";

      const container = document.createElement("div");
      container.style.padding = "20px";
      container.style.fontFamily = "Arial";

      const heading = document.createElement("h2");
      heading.innerText = `Curated videos for: ${intent}`;
      container.appendChild(heading);

      videos.forEach(([title, link]) => {
        const div = document.createElement("div");
        div.style.margin = "10px 0";

        const a = document.createElement("a");
        a.href = link;
        a.innerText = title;
        a.style.color = "#065fd4";
        a.style.textDecoration = "none";
        a.target = "_blank";

        div.appendChild(a);
        container.appendChild(div);
      });

      if (feed) feed.appendChild(container);
    })
    .catch((err) => {
      console.error("Failed to fetch curated videos:", err);
    });
});
