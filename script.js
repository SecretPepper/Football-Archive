const players = [
  { id: "ousmane-dembele", name: "Ousmane Dembélé", fotmobId: "692984", clubId: "9847" },
  { id: "joan-garcia", name: "Joan García", fotmobId: "1167220", clubId: "8634" },
  { id: "wojciech-szczesny", name: "Wojciech Szczesny", fotmobId: "169718", clubId: "8634" },
  { id: "pau-cubarsi", name: "Pau Cubarsí", fotmobId: "1532137", clubId: "8634" },
  { id: "lamine-yamal", name: "Lamine Yamal", fotmobId: "1467236", clubId: "8634" },
  { id: "xavi-espart", name: "Xavi Espart", fotmobId: "1815149", clubId: "8634" },
  { id: "raphinha", name: "Raphinha", fotmobId: "696679", clubId: "8634" },
  { id: "kenan-yildiz", name: "Kenan Yıldız", fotmobId: "1412132", clubId: "9885" },
  { id: "pedri", name: "Pedri", fotmobId: "1083323", clubId: "8634" },
  { id: "darwin-nunez", name: "Darwin Núñez", fotmobId: "950561", clubId: "2529" },
  { id: "gavi", name: "Gavi", fotmobId: "1279040", clubId: "8634" },
  { id: "robert-lewandowski", name: "Robert Lewandowski", fotmobId: "93447", clubId: "8634" },
  { id: "ferran-torres", name: "Ferran Torres", fotmobId: "881771", clubId: "8634" },
  { id: "gonzalo-garcia", name: "Gonzalo García", fotmobId: "1413847", clubId: "8633" },
  { id: "gerard-martin", name: "Gerard Martín", fotmobId: "1598982", clubId: "8634" }
];

const container = document.getElementById("players-container");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");

container.className = "players";

function renderPlayers() {
  const searchValue = searchInput.value.toLowerCase();
  const sortValue = sortSelect.value;

  let filtered = players.map(player => {
    const data = playerData[player.id] || {};
    return {
      ...player,
      lastUpdated: data.lastUpdated || "",
    };
  });

function normalizeString(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

filtered = filtered.filter(p =>
  normalizeString(p.name).includes(normalizeString(searchValue))
);

if (sortValue === "name") {
  filtered.sort((a, b) => a.name.localeCompare(b.name));
} else if (sortValue === "club") {
  filtered.sort((a, b) => a.clubId.localeCompare(b.clubId));
} else if (sortValue === "updated") {
  filtered.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
}

  container.innerHTML = filtered.map(player => `
    <a href="player.html?id=${player.id}" class="player-card">
      
      <img 
        src="https://images.fotmob.com/image_resources/playerimages/${player.fotmobId}.png"
        onerror="this.style.display='none'"
        class="player-img"
        loading="lazy"
      >

      <p>
        ${player.name}
        <img 
          src="https://images.fotmob.com/image_resources/logo/teamlogo/${player.clubId}.png"
          onerror="this.style.display='none'"
          class="club-img"
          loading="lazy"
        >
      </p>

      ${player.lastUpdated ? `
        <div class="card-date">
          Updated: ${player.lastUpdated}
        </div>
      ` : ""}

    </a>
  `).join("");
}

searchInput.addEventListener("input", renderPlayers);
sortSelect.addEventListener("change", renderPlayers);

renderPlayers();