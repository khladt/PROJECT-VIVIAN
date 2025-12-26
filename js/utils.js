
export let smootherInstance = null; 


export function setSmootherInstance(instance) {
    smootherInstance = instance;
}

export function lockScroll() {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.setProperty('overflow', 'hidden', 'important');}


export function unlockScroll() {
    document.documentElement.style.overflow = 'auto';}


export function hideLoader() {
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        gsap.to(loader, { 
            opacity: 0, 
            duration: 0.5, 
            ease: "power2.inOut",
            onComplete: () => {
                loader.style.visibility = 'hidden';
                loader.style.pointerEvents = 'none';
                unlockScroll();
            }
        });
    } else {
        unlockScroll();
    }
    document.getElementById("s0-bg").play()
    document.getElementById("s1-bg").play()
    document.getElementById("s2-bg").play()
    document.getElementById("ash-0").play()
    document.getElementById("ash-1").play()
}


export function showStartButton() {
    const startBtn = document.getElementById('start-btn');

    const tl = gsap.timeline();

    tl
    .to("#loading-bar",{ backgroundColor:"#00ffff", repeat: -1, yoyo: true, duration: 1 })
    .to("#start-btn", { visibility: 'visible', opacity: 1, duration: 2,},"<")
    .to("#loading-text",{text:"Everything is ready. Press Start to Commence" , duration: 2},"<")
    .to("#loading-title",{text:"./PROJECT VIVIAN" , duration: 2},"<")


    startBtn.addEventListener('click', hideLoader);
}


export function killGSAP() {
    ScrollTrigger.killAll();

    if (smootherInstance) {
        smootherInstance.kill();
        smootherInstance = null;
        console.log("ScrollSmoother killed.");
    }
    console.log("Old GSAP instance destroyed.");
}

export function updateButtonText(fullscreenToggle) {
    if (document.fullscreenElement) {
        fullscreenToggle.textContent = "Exit Fullscreen (F11)";
    } else {
        fullscreenToggle.textContent = "Go Fullscreen (F11)";
    }
}



const footstepSounds = ['f0', 'f1', 'f2', 'f3'];

export function playRandomStep() {
    const randomId = footstepSounds[Math.floor(Math.random() * footstepSounds.length)];
    const sound = document.getElementById(randomId);
    
    if (sound) {
        sound.currentTime = 0;
        sound.volume = 1.0;
        sound.play();
    }
}



const volumeSlider = document.querySelector('#volume-slider');
const feedbackSound = document.getElementById('vslider'); // Add this ID to an <audio> tag
// Desktop Events
volumeSlider.addEventListener('mousedown', () => feedbackSound.play());
window.addEventListener('mouseup', () => feedbackSound.pause());

volumeSlider.addEventListener('touchstart', () => feedbackSound.play());
window.addEventListener('touchend', () => feedbackSound.pause());


const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const masterBus = audioCtx.createGain();
masterBus.gain.value = 0.0;
masterBus.connect(audioCtx.destination);

// 1. Identify all your audio elements
const audioElements = Array.from(document.querySelectorAll('audio'));

// 2. Loop through them and connect them to the Master Bus
audioElements.forEach(el => {
    // Create the source node for this specific element
    const source = audioCtx.createMediaElementSource(el);
    // Plug it into the master bus
    source.connect(masterBus);
});

// 3. Your slider remains exactly the same
const savedVolume = sessionStorage.getItem('userVolume');

if (savedVolume !== null) {
    volumeSlider.value = savedVolume;
    masterBus.gain.value = savedVolume;
}

document.querySelector('#volume-slider').addEventListener('input', (e) => {
    masterBus.gain.value = e.target.value;
    sessionStorage.setItem('userVolume', e.target.value);
});

const allButtons = document.querySelectorAll('button');
const pressSFX = document.getElementById('press');
allButtons.forEach(btn => {
btn.addEventListener('mousedown', () => pressSFX.play());
});
