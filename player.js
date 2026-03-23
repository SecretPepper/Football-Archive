const params = new URLSearchParams(window.location.search);
const playerId = params.get("id");

const player = playerData[playerId] || {
  name: playerId,
  fotmobId: null,
  clubId: null,
  wallpapers: [],
  edits: [],
  gifs: [],
  videos: []
};

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

function makeImages(images = []) {
  return images.map(url => `
    <div class="media-item">
      <img 
        src="${url}" 
        loading="lazy" 
        class="clickable-img" 
        onclick="openLightbox(&quot;${url}&quot;)"
      >

      <a href="${url}" download class="download-btn">⬇</a>
    </div>
  `).join("");
}

function openLightbox(url) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const downloadBtn = document.getElementById("lightbox-download");

  lightboxImg.src = url;
  downloadBtn.href = url;

  lightbox.style.display = "flex";
}

document.getElementById("lightbox").addEventListener("click", function(e){
  if(e.target.id === "lightbox") {
    this.style.display = "none";
  }
});

document.getElementById("wallpapers").innerHTML =
  makeImages(player.wallpapers || []);

document.getElementById("edits").innerHTML =
  (player.edits || []).map(e => {
    if (e.endsWith(".mp4")) {
      return `
        <div class="media-item">
          <video controls class="edit-video">
            <source src="${e}" type="video/mp4">
          </video>

          <a href="${e}" download class="download-btn">⬇</a>
        </div>
      `;
    } else {
      return `
        <div class="media-item">
          <img 
            src="${e}" 
            loading="lazy" 
            class="clickable-img" 
            onclick="openLightbox(&quot;${e}&quot;)"
          >

          <a href="${e}" download class="download-btn">⬇</a>
        </div>
      `;
    }
  }).join("");

document.getElementById("gifs").innerHTML =
  makeImages(player.gifs || []);

function showTab(tab) {
  document.querySelectorAll(".tab-content").forEach(el => el.classList.add("hidden"));
  document.getElementById(tab).classList.remove("hidden");
}