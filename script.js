// Countdown: November 21, 2026 at 6:00 PM.
const targetDate = new Date(2026, 10, 21, 18, 0, 0);

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const readyMessage = document.getElementById("readyMessage");

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const difference = targetDate.getTime() - Date.now();

  if (difference <= 0) {
    daysEl.textContent = hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = "00";
    readyMessage.textContent = "The celebration has begun ✦";
    return;
  }

  const totalSeconds = Math.floor(difference / 1000);
  daysEl.textContent = pad(Math.floor(totalSeconds / 86400));
  hoursEl.textContent = pad(Math.floor((totalSeconds % 86400) / 3600));
  minutesEl.textContent = pad(Math.floor((totalSeconds % 3600) / 60));
  secondsEl.textContent = pad(totalSeconds % 60);
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* Manual background music controls — no autoplay. */
const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const cdPlayIcon = musicButton.querySelector(".cd-play");
backgroundMusic.volume = 0.5;

function setMusicButtonPlaying(isPlaying) {
  musicButton.classList.toggle("is-playing", isPlaying);
  musicButton.setAttribute("aria-pressed", String(isPlaying));
  musicButton.setAttribute("aria-label", isPlaying ? "Pause background music" : "Play background music");
  cdPlayIcon.textContent = isPlaying ? "Ⅱ" : "▶";
}
musicButton.addEventListener("click", async () => {
  if (backgroundMusic.paused) {
    try {
      await backgroundMusic.play();
      setMusicButtonPlaying(true);
    } catch (error) {
      console.error("Music could not be played:", error);
    }
  } else {
    backgroundMusic.pause();
    setMusicButtonPlaying(false);
  }
});
backgroundMusic.addEventListener("ended", () => setMusicButtonPlaying(false));
backgroundMusic.addEventListener("pause", () => setMusicButtonPlaying(false));
backgroundMusic.addEventListener("play", () => setMusicButtonPlaying(true));


/* Interactive 18s lists */
const eighteenData = {
  roses: {
    icon: "🌹",
    title: "18 CARNATIONS",
    subtitle: "The special people sharing this beautiful moment with me.",
    names: ["NEIL WESTON", "MARK FLORES GLORIA", "RICARDO TONGOL JR.", "RICO TONGOL", "DEXTER MENDOZA", "MICHEAL JOHN MARTINEZ", "SHILOH YUAN GLORIA", "CYMON RENZ GLORIA", "SHANNEL SANCHEZ", "MATTHEW CONNERS MARTINEZ", "MAURICE JUSTIN MARTINEZ", "KRAEGER XEDE MENDOZA", "CHRISTOPHER BALANA", "LANCE COLYN TONGOL", "PRINCE AKHIRO DUCAYAG", "DAWSON LEERY DIEL OCAMPO", "MARCUS LEONARD MARQUEZ","RICARDO TONGOL"]
  },
  candles: {
    icon: "🕯️",
    title: "18 LANTERNS",
    subtitle: "18 lights for the people who make my world brighter.",
    names: ["AGATHA GLORIA", "NORAIDA GLORIA" , "CHLOE TONGOL", "RIZA VIEN TONGOL","CHERMEE KHALE PINGOL" , "CARLEESHA BAUTISTA", "JOVITA MANALO", "MARIA LUISABEL GUINTO", "ZHECKHAINAH FAE JUICO", "AXELLE ADRIANO", "JAN DERRECK SANTOS", "REINGELO YUAN ESTRAVO", "GHISALYN SANDIG", "PRYLX AXEL PAGSUGUIRON", "TYRONE JAMES TORRES", "RHENALIZA ASPARIN", "GINNY MIELA CORTEZ", "RONER QUIATCHON"]
  },
  treasures: {
    icon: "💎",
    title: "18 TREASURES",
    subtitle: "18 treasured people who make this chapter extra special.",
    names: ["IYA GLORIA","MYISHA DENISSE MARTINEZ",'KYRIE XEDEN MENDOZA',"DENISSE ANN MARTIN","IRISH DANIELLE DELA PENA", "PRINCESS SALVADOR PUNO", "MA. SOPHIA GERTRUD TASICO", "MARY JANE MIRANDA","SAMANTHA LOUIZE SAMPANG","JAMES MATTHEW MARTIN", "BARBARA MILLICENT PELAYO", "AUBREY MASONG CALMA", "IMA MARY PEREZ ", "GLAIGHIERYL LAXAMANA","AIANAH JHAYCHELLE MENDOZA","LOUIS STEPHANIE MARTIN","HILARIE SHANE GUIAO","CHLOE ERICA RAMOS"]
  },
  bluebills: {
    icon: "💙",
    title: "18 BLUE BILLS",
    subtitle: "A special list of 18 people for this memorable celebration.",
    names: ["MARICEL MANUNTAG","GRACE CORDERO","MALOU MERCADO","RIA ESTRAVO","VAL MAGLALANG","CHELOU PINGOL","MICHELLE DE DIOS","JUNE PUNO","DIANE DUCAYAG","RIA RAYMUNDO","CLARK LINGAT","JAIVIE RAMOS","JANNEL TONGOL","RODA ADRIANO","CHESTER CHAVEZ","CONNIE RAYMUNDO", "JAQUELINE MENDOZA","CHRISTINA MARTINEZ"]
  },
  shots: {
    icon: "🥂",
    title: "18 TOASTS",
    subtitle: "A little toast to every chapter that made me who I am.",
    names: ["KYLE BAGANG", "PRINCE DAAG","TIMOTHY CELSO","SHAN BARIN","JHARELSON VALIAO","JABEZ LAXAMANA","GABRIELLE LAXAMANA","KENT CHALVEZ","JAYMOND MARIANO","CLYDE SANTIAGO","EARL ABUDA","GABRYLE CERVANTES","NATHALIE MALLARI","AVERY SADSAD","LORENZ TAPANG","KYLE ROQUID","KYRAN BACANI","CLYDE HILARIO"]
  }
};

const eighteenViewer = document.getElementById("eighteenViewer");
const backButton = document.getElementById("backButton");
const viewerIcon = document.getElementById("viewerIcon");
const viewerTitle = document.getElementById("viewerTitle");
const viewerSubtitle = document.getElementById("viewerSubtitle");
const nameList = document.getElementById("nameList");
const eighteenCards = document.querySelectorAll(".eighteen-card");

function openEighteen(type) {
  const data = eighteenData[type];
  if (!data) return;

  viewerIcon.textContent = data.icon;
  viewerTitle.textContent = data.title;
  viewerSubtitle.textContent = data.subtitle;
  nameList.innerHTML = data.names.map((name, index) => `
    <div class="name-item">
      <span class="name-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="name-person">${name.toLocaleUpperCase()}</span>
    </div>
  `).join("");

  eighteenViewer.classList.add("is-open");
  eighteenViewer.setAttribute("aria-hidden", "false");
  document.body.classList.add("eighteen-open");
  document.documentElement.classList.add("eighteen-open");
  eighteenViewer.scrollTop = 0;
  history.replaceState(null, "", `#${type}`);
  setTimeout(() => backButton.focus(), 50);
}

function closeEighteen() {
  eighteenViewer.classList.remove("is-open");
  eighteenViewer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("eighteen-open");
  document.documentElement.classList.remove("eighteen-open");
  if (location.hash) history.replaceState(null, "", location.pathname + location.search);
}

eighteenCards.forEach(card => {
  card.addEventListener("click", () => openEighteen(card.dataset.eighteen));
});

backButton.addEventListener("click", closeEighteen);

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && eighteenViewer.classList.contains("is-open")) closeEighteen();
});

const initialType = location.hash.replace("#", "");
if (eighteenData[initialType]) openEighteen(initialType);


/* Full-screen envelope: open first, then reveal the invitation from below. */
const envelopeScreen = document.getElementById("envelopeScreen");
const openInvitationButton = document.getElementById("openInvitation");
let invitationHasOpened = false;

openInvitationButton.addEventListener("click", () => {
  if (invitationHasOpened) return;
  invitationHasOpened = true;
  envelopeScreen.classList.add("is-opening");
  openInvitationButton.disabled = true;

  window.setTimeout(() => {
    envelopeScreen.classList.add("is-closing");
    document.body.classList.remove("invitation-locked");
    document.body.classList.add("invitation-revealed");
  }, 720);

  window.setTimeout(() => {
    envelopeScreen.remove();
  }, 1750);
});


/* Celestial portrait album: previous/next navigation and return to invitation. */
const portraitFiles = Array.from({length: 12}, (_, i) => `photos/portrait-${String(i + 1).padStart(2, "0")}.jpg`);
const portraitViewer = document.getElementById("portraitViewer");
const viewerPortrait = document.getElementById("viewerPortrait");
const viewerPhotoCount = document.getElementById("viewerPhotoCount");
const openPortraitAlbum = document.getElementById("openPortraitAlbum");
let currentPortraitIndex = 0;

function showPortrait(index) {
  currentPortraitIndex = (index + portraitFiles.length) % portraitFiles.length;
  viewerPortrait.src = portraitFiles[currentPortraitIndex];
  viewerPortrait.alt = `Debut portrait ${currentPortraitIndex + 1} of Cassidy`;
  viewerPhotoCount.textContent = `${String(currentPortraitIndex + 1).padStart(2, "0")} / ${portraitFiles.length}`;
}
function openPortraitViewer() {
  showPortrait(0);
  portraitViewer.classList.add("is-open");
  portraitViewer.setAttribute("aria-hidden", "false");
  document.body.classList.add("portrait-album-open");
  document.getElementById("portraitPrevious").focus();
}
function closePortraitViewer() {
  portraitViewer.classList.remove("is-open");
  portraitViewer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("portrait-album-open");
  document.getElementById("mainInvitation").scrollIntoView({behavior:"smooth", block:"start"});
  openPortraitAlbum.focus({preventScroll:true});
}
openPortraitAlbum.addEventListener("click", openPortraitViewer);
document.getElementById("portraitPrevious").addEventListener("click", () => showPortrait(currentPortraitIndex - 1));
document.getElementById("portraitNext").addEventListener("click", () => showPortrait(currentPortraitIndex + 1));
document.getElementById("closePortraitAlbum").addEventListener("click", closePortraitViewer);
document.addEventListener("keydown", event => {
  if (!portraitViewer.classList.contains("is-open")) return;
  if (event.key === "Escape") closePortraitViewer();
  if (event.key === "ArrowLeft") showPortrait(currentPortraitIndex - 1);
  if (event.key === "ArrowRight") showPortrait(currentPortraitIndex + 1);
});


/* Touch swipe support for the portrait album (iPhone and Android). */
const portraitSwipeSurface = document.querySelector(".viewer-photo-frame");
let portraitTouchStartX = 0;
let portraitTouchStartY = 0;
if (portraitSwipeSurface) {
  portraitSwipeSurface.addEventListener("touchstart", event => {
    if (!event.changedTouches.length) return;
    portraitTouchStartX = event.changedTouches[0].clientX;
    portraitTouchStartY = event.changedTouches[0].clientY;
  }, {passive:true});

  portraitSwipeSurface.addEventListener("touchend", event => {
    if (!event.changedTouches.length || !portraitViewer.classList.contains("is-open")) return;
    const dx = event.changedTouches[0].clientX - portraitTouchStartX;
    const dy = event.changedTouches[0].clientY - portraitTouchStartY;
    /* Ignore vertical page gestures and small accidental finger movements. */
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.25) return;
    if (dx < 0) showPortrait(currentPortraitIndex + 1);
    else showPortrait(currentPortraitIndex - 1);
  }, {passive:true});
}
