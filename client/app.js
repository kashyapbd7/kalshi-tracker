const API = "https://YOUR-RENDER-URL/api/markets";

async function fetchData() {
  const res = await fetch(API);
  const data = await res.json();

  const app = document.getElementById("app");
  app.innerHTML = "";

  data.forEach((item) => {
    const div = document.createElement("div");
    div.className = "card";

    const color = item.percent >= 0 ? "green" : "red";

    div.innerHTML = `
      <div>
        <b>${item.coin}</b><br/>
        ${item.current} / ${item.target}
      </div>
      <div style="color:${color}; font-weight:bold;">
        ${item.percent}%
      </div>
    `;

    app.appendChild(div);
  });
}

setInterval(fetchData, 1000);
fetchData();
