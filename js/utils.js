// --- utils.js ---

// smootherInstance must be initialized and exported so other files can import and check its value.
export let smootherInstance = null; 

// This function allows external files (like gsap-desktop.js) to set the value 
// of the exported smootherInstance variable.
export function setSmootherInstance(instance) {
    smootherInstance = instance;
    // Optional: If you want to refresh the instance right after setting it
    if (smootherInstance && smootherInstance.refresh) {
        smootherInstance.refresh();
    }
}

export function lockScroll() {
    document.body.style.overflow = 'hidden';
}

export function unlockScroll() {
    document.body.style.overflow = '';
}

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
        fullscreenToggle.textContent = "Go Fullscreen (F11)";
    } else {
        fullscreenToggle.textContent = "Exit Fullscreen (F11)";
    }
}