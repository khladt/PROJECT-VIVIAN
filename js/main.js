import { startDesktopGSAP } from './gsap-desktop.js';
import { startMobileGSAP } from './gsap-mobile.js';
import { 
    lockScroll, 
    unlockScroll, 
    showStartButton, 
    hideLoader, 
    killGSAP, 
    setSmootherInstance,
    updateButtonText 
} from './utils.js';

const s = 'VIVI';
const q = 'Quinn';
const f = 'Falco';
let splashGateShown = false; 



function handleResizeOrRotate() {
    clearTimeout(window.resizeTimer); 
    window.resizeTimer = setTimeout(() => {
        killGSAP(); 
        initGSAP(); 
        unlockScroll();
        console.log("GSAP reloaded based on new dimensions.");
    }, 300);
}


function initGSAP() {
    lockScroll(); 
    
    gsap.registerPlugin(MotionPathPlugin ,Draggable,DrawSVGPlugin,ScrollTrigger,ScrollSmoother,TextPlugin,RoughEase,ExpoScaleEase,SlowMo,CustomEase,CustomBounce,CustomWiggle);

    const parallaxImages = document.querySelectorAll('#story-parallax img');
    const audioFiles = document.querySelectorAll('audio');

    // 1. Map images to promises
    const imagePromises = Array.from(parallaxImages).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
            img.addEventListener('load', resolve);
            img.addEventListener('error', resolve); // Resolve anyway to avoid hanging
        });
    });

    // 2. Map audio to promises
    const audioPromises = Array.from(audioFiles).map(audio => {
        // If it's already buffered enough to play through
        if (audio.readyState === 4) return Promise.resolve();
        return new Promise(resolve => {
            // 'canplaythrough' fires when the browser thinks it can play without stopping
            audio.addEventListener('canplaythrough', resolve, { once: true });
            audio.addEventListener('error', resolve);
        });
    });

    // 3. Wait for everything
    Promise.all([...imagePromises, ...audioPromises]).then(() => {
        startGSAP();
    });
}

function startGSAP() {
    const desktopRatioQuery = "(min-aspect-ratio: 4/3)";

    if (window.matchMedia(desktopRatioQuery).matches) {
        // Desktop/Wide Version
        showStartButton(); 
        setSmootherInstance(startDesktopGSAP(s, q, f)); 
    } else {
        // Mobile/Portrait/Tall Monitor Version
        hideLoader();
        setSmootherInstance(startMobileGSAP(s, q, f)); 
    }
}

// --- FULLSCREEN LOGIC ---
const fullscreenToggle = document.getElementById('fullscreenToggle');
if (fullscreenToggle) {
    fullscreenToggle.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        updateButtonText(fullscreenToggle);
    });
}
window.addEventListener('fullscreenchange', () => updateButtonText(fullscreenToggle));


// --- INITIALIZATION ---
window.addEventListener("DOMContentLoaded", () => {
    initGSAP();
    window.addEventListener('resize', handleResizeOrRotate); 
    window.addEventListener('orientationchange', handleResizeOrRotate); 
});