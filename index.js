/* ============================================================
✏️  CUSTOMIZE YOUR STORY HERE
============================================================ */

// ── Landing screen text ──────────────────────────────────────
const LANDING_TITLE = "Once Upon<br />a Time";   // main headline
const LANDING_SUB = "Two hearts. One beautiful journey."; // sub-line
const BEGIN_BTN_LABEL = "Begin Our Story";          // button label

// ── Music ────────────────────────────────────────────────────
// Drop your MP3 in the same folder and set its filename here:
const MUSIC_SRC = "kalapastangan2.MP3";

// ── Floating background images ───────────────────────────────
// Add as many image paths as you like.
// These appear as soft floating photos on the landing page.
const FLOAT_IMAGES = [
    "img1.jpg",
    "img2.jpg",
    "img3.jpg",
    "img4.jpg",
];

// ── Timeline ──────────────────────────────────────────────────
// Each entry = one memory card shown in sequence.
// Replace title, text, and image for each entry.
const TIMELINE = [
    {
        title: "The First Time We Met",
        text: "It was just an ordinary church date, nothing special. No flirting—just a pure and genuine first step in getting to know each other. That was the day I told myself I would take care of you, forever.",
        image: "img1.jpg"
    },
    {
        title: "Random Date",
        text: "I remember this random date of our's. Like, it's unexpectedI still remember our unexpected date—the way we just hung out outside the museum. Then out of nowhere, the Tamaraw lit up, WHAHAHAHAHA. I’ll never forget how startled I was, and even more, how happy you looked watching me react. It was such a simple moment, but it felt so real—like that’s when I truly realized how beautiful it is to love in a way that’s simple, yet genuine.",
        image: "img2.jpg"
    },
    {
        title: "The Moment I Knew",
        text: "This day, I already knew that we are the one for each other. Like, I realized it on how we try our best to be better for each other. You're trying to learn how to communicate your feelings properly, and I'm learning how to be more patient and understanding for you. Like from this moment, when you opened up about felling out of love and still not giving up on our relationship. This is the very day I've said myself, that you're already the one.",
        image: "img3.jpg"
    },
    {
        title: "One Year With You",
        text: "And here we are. A whole year of choosing each other, again and again. I would choose you a thousand times more. This is only the beginning.",
        image: "img4.jpg"
    },
];

// ── Love letter ───────────────────────────────────────────────
const LETTER_SALUTATION = "My Love,";
const LETTER_BODY = `Happy 1 Year.

    Hello, baby koooo! Happy 1 year!!! 💛 One year na tayo—grabe, parang ang bilis pero ang dami na nating napagdaanan. From random kwentuhan to chaotic kulit moments, every day with you feels special. I love you so, so much—more than words can handle. Thank you for being my comfort, my peace, and my safe place. For all your patience, your effort, and the way you choose me even on days I’m not at my best—I see it, and I appreciate you deeply. I’m not perfect, but I promise I’m always trying to be better for you.

    Ang dami nating memories na simple pero sobrang saya—like those random days na wala namang plano pero nauuwi sa tawa at saya. Dun ko nare-realize na hindi kailangan ng grand moments para maging masaya, basta ikaw kasama ko. And I want more of that—more laughter, more memories, more years with you. Ikaw ang pipiliin ko, araw-araw, walang sawa. I’ll always be here for you, to understand you, to listen, and to take care of your heart. One year down, forever to go. 

    I love you so so so muchhh 😘💛
`;
const LETTER_CLOSING = "Forever yours,";
const LETTER_NAME = "Vince";  // ← change to your name

/* ============================================================
   END CUSTOMIZATION SECTION
   ============================================================ */


// ── State ─────────────────────────────────────────────────────
let currentIndex = 0;
let typewriterTimer = null;
let hearts = [];
let audioFade = null;

// ── Elements ──────────────────────────────────────────────────
const bgm = document.getElementById('bgm');
const landingEl = document.getElementById('landing');
const storyEl = document.getElementById('story');
const letterEl = document.getElementById('letter');
const floatLayer = document.getElementById('float-layer');
const heartLayer = document.getElementById('heart-layer');
const progressBar = document.getElementById('progress-bar');
const memCard = document.getElementById('memory-card');
const memImg = document.getElementById('mem-img');
const memChapter = document.getElementById('mem-chapter');
const memTitle = document.getElementById('mem-title');
const memText = document.getElementById('mem-text');

// Apply customizations to DOM
document.getElementById('landing-title').innerHTML = LANDING_TITLE;
document.getElementById('landing-sub').textContent = LANDING_SUB;
document.getElementById('begin-btn-label').textContent = BEGIN_BTN_LABEL;
bgm.src = MUSIC_SRC;

/* ============================================================
   FLOATING IMAGES
   ============================================================ */
function spawnFloatImg() {
    if (!FLOAT_IMAGES.length) return;

    const img = document.createElement('img');
    img.classList.add('float-img');
    img.src = FLOAT_IMAGES[Math.floor(Math.random() * FLOAT_IMAGES.length)];

    const size = 120 + Math.random() * 180;
    const rot = (Math.random() * 18 - 9).toFixed(1) + 'deg';
    const x = Math.random() * 90;
    const y = Math.random() * 90;
    const delay = Math.random() * 3;
    const dur = 12 + Math.random() * 10;

    img.style.cssText = `
    width: ${size}px;
    height: ${size * 1.25}px;
    left: ${x}%;
    top:  ${y}%;
    --rot: ${rot};
    border-radius: ${10 + Math.random() * 12}px;
    animation-duration: ${dur}s;
    animation-delay: ${delay}s;
    `;

    floatLayer.appendChild(img);

    // fade in
    requestAnimationFrame(() => {
        requestAnimationFrame(() => { img.style.opacity = (0.06 + Math.random() * 0.1).toFixed(2); });
    });

    // fade out and remove
    const life = (4 + Math.random() * 6) * 1000;
    setTimeout(() => {
        img.style.opacity = '0';
        setTimeout(() => img.remove(), 2000);
    }, life);
}

// Continuous spawning
function startFloatImages() {
    spawnFloatImg();
    setInterval(spawnFloatImg, 1600);
}

startFloatImages();

/* ============================================================
   PROGRESS DOTS
   ============================================================ */
function buildDots() {
    progressBar.innerHTML = '';
    TIMELINE.forEach((_, i) => {
        const d = document.createElement('div');
        d.classList.add('prog-dot');
        if (i < currentIndex) d.classList.add('done');
        if (i === currentIndex) d.classList.add('active');
        progressBar.appendChild(d);
    });
}

/* ============================================================
   TYPEWRITER EFFECT
   ============================================================ */
function typeWrite(el, text, speed = 22) {
    clearTimeout(typewriterTimer);
    el.innerHTML = '';
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    el.appendChild(cursor);

    let i = 0;
    function tick() {
        if (i < text.length) {
            cursor.insertAdjacentText('beforebegin', text[i]);
            i++;
            typewriterTimer = setTimeout(tick, speed);
        } else {
            // remove cursor after done
            setTimeout(() => cursor.remove(), 1200);
        }
    }
    tick();
}

/* ============================================================
   BEGIN STORY
   ============================================================ */
function beginStory() {
    // Transition
    landingEl.classList.add('hidden');

    // Start music with fade-in
    bgm.volume = 0;
    bgm.play().catch(() => { }); // catch autoplay block
    let vol = 0;
    clearInterval(audioFade);
    audioFade = setInterval(() => {
        vol = Math.min(vol + 0.025, 0.75);
        bgm.volume = vol;
        if (vol >= 0.75) clearInterval(audioFade);
    }, 180);

    // Show story screen
    setTimeout(() => {
        storyEl.classList.remove('hidden');
        currentIndex = 0;
        buildDots();
        showMemory(currentIndex);
    }, 600);
}

/* ============================================================
   SHOW MEMORY
   ============================================================ */
function showMemory(index) {
    const entry = TIMELINE[index];

    // Reset card
    memCard.classList.remove('show');

    setTimeout(() => {
        memImg.src = entry.image;
        memChapter.textContent = `Chapter ${index + 1}`;
        memTitle.textContent = entry.title;
        memText.textContent = '';

        // Refresh dots
        buildDots();

        // Animate card in
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                memCard.classList.add('show');
                // Start typewriter after card animates in
                setTimeout(() => typeWrite(memText, entry.text, 24), 500);
            });
        });

        // Update next btn label
        const nextBtn = document.getElementById('next-btn');
        if (index === TIMELINE.length - 1) {
            nextBtn.textContent = 'Read Our Letter ✦';
        } else {
            nextBtn.textContent = 'Next Memory →';
        }
    }, 350);
}

/* ============================================================
   NEXT MEMORY
   ============================================================ */
function nextMemory() {
    clearTimeout(typewriterTimer);
    currentIndex++;

    if (currentIndex >= TIMELINE.length) {
        showLetterScene();
        return;
    }

    showMemory(currentIndex);
}

/* ============================================================
   LETTER SCENE
   ============================================================ */
function showLetterScene() {
    storyEl.classList.add('hidden');

    setTimeout(() => {
        letterEl.classList.remove('hidden');

        // Fill letter content
        document.getElementById('letter-salutation').textContent = LETTER_SALUTATION;
        document.getElementById('letter-body').textContent = LETTER_BODY;
        document.getElementById('letter-sign').innerHTML =
            `${LETTER_CLOSING}<strong>${LETTER_NAME}</strong>`;

        // Animate elements in
        const eyebrow = document.getElementById('letter-eyebrow');
        const card = document.getElementById('letter-card');
        const replayBtn = document.getElementById('replay-btn');

        setTimeout(() => { eyebrow.classList.add('show'); }, 200);
        setTimeout(() => { card.classList.add('show'); }, 400);
        setTimeout(() => { replayBtn.classList.add('show'); }, 800);

        // Start floating hearts
        startHearts();
    }, 600);
}

/* ============================================================
   FLOATING HEARTS
   ============================================================ */
const HEART_SYMBOLS = ['♥', '✦', '✿', '❋', '♡'];

function spawnHeart() {
    const h = document.createElement('span');
    h.classList.add('heart');
    h.textContent = HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)];
    h.style.cssText = `
    left: ${5 + Math.random() * 90}%;
    font-size: ${0.7 + Math.random() * 1.1}rem;
    color: ${Math.random() > 0.5 ? 'rgba(212,175,55,0.55)' : 'rgba(255,253,244,0.3)'};
    animation-duration: ${4 + Math.random() * 4}s;
    animation-delay: ${Math.random() * 1.5}s;
    `;
    heartLayer.appendChild(h);
    setTimeout(() => h.remove(), 9000);
}

let heartInterval = null;
function startHearts() {
    spawnHeart();
    heartInterval = setInterval(spawnHeart, 900);
}

function stopHearts() {
    clearInterval(heartInterval);
    heartLayer.innerHTML = '';
}

/* ============================================================
   REPLAY
   ============================================================ */
function replayStory() {
    stopHearts();

    // Reset letter elements
    document.getElementById('letter-eyebrow').classList.remove('show');
    document.getElementById('letter-card').classList.remove('show');
    document.getElementById('replay-btn').classList.remove('show');

    letterEl.classList.add('hidden');

    setTimeout(() => {
        storyEl.classList.remove('hidden');
        currentIndex = 0;
        buildDots();
        showMemory(currentIndex);
    }, 700);
}
