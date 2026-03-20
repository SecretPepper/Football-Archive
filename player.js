const params = new URLSearchParams(window.location.search);
const playerId = params.get("id");

const player = playerData[playerId] || {
  name: playerId,
  fotmobId: null,
  clubId: null,
  wallpapers: [],
  edits: [],
  videos: []
};

// Header (player image + name + club)
document.getElementById("player-name").innerHTML = `
  ${player.fotmobId ? `
    <img 
      src="https://images.fotmob.com/image_resources/playerimages/${player.fotmobId}.png"
      class="player-img-large"
      onerror="this.style.display='none'"
    >
  ` : ""}
  <span>${player.name}</span>
`;

// Function to generate clickable images
function makeImages(images) {
  return images.map(url => `
    <img src="${url}" loading="lazy" class="clickable-img" onclick="openLightbox('${url}')">
  `).join("");
}

// Lightbox open function (no download)
function openLightbox(url) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  lightboxImg.src = url;
  lightbox.style.display = "flex";
}

// Click-away to close lightbox (click outside image)
document.getElementById("lightbox").addEventListener("click", function(e){
  if(e.target.id === "lightbox") {
    this.style.display = "none";
  }
});

// Generate images in tabs
document.getElementById("wallpapers").innerHTML = makeImages(player.wallpapers);
document.getElementById("edits").innerHTML =
  player.edits.map(e => {
    if (e.endsWith(".mp4")) {
      return `
        <video controls class="edit-video">
          <source src="${e}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;
    } else {
      return `
        <img src="${e}" loading="lazy" class="clickable-img" onclick="openLightbox('${e}')">
      `;
    }
  }).join("");
document.getElementById("videos").innerHTML =
  player.videos.map(v => `<iframe src="${v}" loading="lazy" allowfullscreen></iframe>`).join("");

// Tabs function
function showTab(tab) {
  document.querySelectorAll(".tab-content").forEach(el => el.classList.add("hidden"));
  document.getElementById(tab).classList.remove("hidden");
}