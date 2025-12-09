

// Function to handle scroll locking/unlocking
function lockScroll() {document.body.style.overflow = 'hidden';}
function unlockScroll() {document.body.style.overflow = '';}



// Function to handle the loader fade-out and scroll unlock
function hideLoader() {
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        // Use GSAP to ensure a smooth fade-out effect on the loader
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
    } else {unlockScroll();}
}


function initGSAP() {
    lockScroll(); 
    
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    
    const parallaxImages = document.querySelectorAll('#story-parallax img');
    
    // Filter out images that are already complete
    const imagesToLoad = Array.from(parallaxImages).filter(img => !img.complete);

    // --- REPLACED PLACEHOLDER WITH YOUR ACTUAL IMAGE LOADING PROMISE ---
    const assetLoadPromise = Promise.all(
        imagesToLoad.map(img => {
            return new Promise(resolve => {
                // Attach load/error handlers to resolve the promise when image is ready
                img.addEventListener('load', resolve);
                img.addEventListener('error', resolve); 
            });
        })
    );
    
    assetLoadPromise.then(() => {
        
        ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.0,
            effects: true,
        });

        startGSAP();
        hideLoader(); 
    });
}

// --- INITIAL CALL ---
window.addEventListener("DOMContentLoaded", initGSAP);


function startGSAP() {
    if (window.matchMedia("(min-width: 769px)").matches) {
        // Desktop/Tablet Version
        startDesktopGSAP(); // Renamed your original function to reflect its purpose
    } else {
        // Mobile (Portrait) Version
        startMobileGSAP(); // Run the new, optimized mobile function
    }
}

function startDesktopGSAP() {

    let runAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: "#story-parallax",
            start: "top top",
            end: "+=15000vh", 
            scrub: 1, 
            pin: true,
            anticipatePin: 1,
            pinType: 'transform' // Forces GPU-accelerated pinning
        }
    });

    runAnimation

    //SCENE 1 ANIMATION SECTION
    .to('#chara-quinn',{opacity:0},"<")
    .to('#chara-seven',{opacity:1},"<")

    .fromTo('.site-header', { opacity: 1}, {opacity: 0, duration: 1 },0)
    

    .fromTo('#S1-BG', { y: "-550%"}, {y:"0%", duration: 11 }, 0)
    .fromTo('#S1-TOWER', { y: "-550%"}, {y:"0%", duration: 11 }, 0)
    .fromTo('#S1-FOG-2', { y: "-550%"}, {y:"15%", duration: 11.3 }, 0) 
    .fromTo('#S1-L2', { y: "-550%"}, {y:"-10%", duration: 11 }, 0) 

    .fromTo('#S1-L1', { y: "-550%"}, {y:"1%", duration: 11 }, 0)
    .fromTo('#S1-FOG-1', { y: "-550%"}, {y:"25%", duration: 11.5 }, 0) 
    .fromTo('#S1-L0', { y: "-550%"}, {y:"0%", duration: 10.5 }, 0)
    .fromTo('#S1-FOG-0', { y: "-550%"}, {y:"25%", duration: 10.8 }, 0) 

    .fromTo('#S1-FG', { y: "-550%"}, {y: "20%", duration: 10 }, 0)


    .fromTo('.Seven', 
        {x: "400%" ,y: "1000%"}, {y: "50%", duration: 4, duration: 10 }, "<")    

    .fromTo('.Seven', 
        {filter: "brightness(0%) hue-rotate(40deg)"}, 
        {filter: "brightness(90%) hue-rotate(340deg) saturate(70%) grayscale(30%)", duration: 6 }, 5) 


    .fromTo('.dialogue-box',{x:"300vh", y:"-100vh" ,scale: 0.0}, {x:"55vw",y:"-40vh" ,scale: 1, duration: 2 })
    .to('.character-name', {text: "SEVEN", duration: 2 })
    .to('#chara-quinn',{opacity:0,duration:1},"<")
    .to('#chara-seven',{opacity:1,duration:1},"<")

    .call(changeSequence, ['is-front'])
    .call(changeSequence, ['is-front-wave'])
    .fromTo('.dialogue-text',{text: "", duration: 1},{text: "All clear QUIINNNN!", duration: 2 },"<")

    .to('.dialogue-box',{x:"25vw",y:"-30vh" ,scale: 1, duration: 2 },"+=5")
    .to('.character-name', {text: "QUINN", duration: 3 },"<")
    .to('#chara-quinn',{opacity:1,duration:1},"<")
    .to('#chara-seven',{opacity:0,duration:1},"<")

    .fromTo('.dialogue-text',{text: "", duration: 1}, {text: "Then Let's keep moving.", duration: 4 },"<")
    .fromTo('#S1-QUINN-0', { opacity: 1}, {opacity: 0, duration: 1 })
    .fromTo('#S1-QUINN-1', { opacity: 0}, {opacity: 1, duration: 1 },"<")

    //Scene 1 Ending

    .to('.dialogue-box',{scale: 0, duration: 7 },"+=5")
    .to('#chara-quinn',{opacity:0,duration:1},"<")
    .to('#chara-seven',{opacity:0,duration:1},"<")
    .to('.dialogue-text', {text: "", duration: 0.5},"<")

    .to('#S1-FG', {y: "-5%", duration: 7 },"<") 
    .to('.Seven',{y: "-50%", duration: 4 }, "<")
    .to('#S1-FOG-0', {y:"-15%", duration: 6.5 }, "<")
    .to('#S1-L0', {y:"-50%", duration: 6 }, "<")

    .to('#S1-L1', {y:"-35%", duration: 5 }, "<")
    .to('#S1-FOG-1', {y:"-28%", duration: 4.5 }, "<")

    .to('#S1-L2', {y:"-60%", duration: 4 }, "<")
    .to('#S1-FOG-2', {y:"-30%", duration: 3.5 }, "<")
    .to('#S1-TOWER', {y:"-40%", duration: 3 }, "<")
    .to('#S1-BG', {y:"-35%", duration: 3 }, "<")



    //All scene Ending
    .to('.site-header',{opacity: 1, duration: 4 })


    //SCENE 2 ANIMATION SECTION
};




function startMobileGSAP() {
    let runAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: "#story-parallax",
            start: "top top",
            end: "+=15000vh", 
            scrub: 1, 
            pin: true,
            anticipatePin: 1,
            pinType: 'transform' // Forces GPU-accelerated pinning
        }
    });

    runAnimation

    //SCENE 1 ANIMATION SECTION
    .to('#chara-quinn',{opacity:0},"<")
    .to('#chara-seven',{opacity:0},"<")

    .fromTo('.site-header', { opacity: 1}, {opacity: 0, duration: 1 },0)
    

    .fromTo('#S1-BG', {scale:2,x:"-0.5%" ,y: "-550%"}, {y:"50%", duration: 11 }, 0)
    .fromTo('#S1-TOWER', {scale:2, y: "-550%"}, {y:"47%", duration: 11 }, 0)
    .fromTo('#S1-FOG-2', {scaleY:2, y: "-550%"}, {y:"65%", duration: 11.3 }, 0) 
    .fromTo('#S1-L2', {scale:1.5,x:"23%" ,y: "-550%"}, {y:"10%", duration: 11 }, 0) 

    .fromTo('#S1-L1', {scale:1.8, y: "-500%"}, {y:"50%", duration: 11 }, 0)
    .fromTo('#S1-FOG-1', {scale:3 ,y: "-550%"}, {y:"120%", duration: 11.5 }, 0) 
    .fromTo('#S1-L0', {scaleY:3 ,y: "-550%"}, {y:"95%", duration: 11 }, 0)
    .fromTo('#S1-FOG-0', {scale:3, y: "-550%"}, {y:"135%", duration: 10.5 }, 0) 


    .fromTo('#S1-QUINN-0', {y: "-550%"},{y: "5.5%"}, 0)
    .fromTo('#S1-QUINN-1', {y: "-550%"},{y: "5.5%"}, 0)
    .fromTo('#S1-FG', {scale:1.7 ,x:"30%",y: "-550%"}, {y: "80%", duration: 10 }, 0)


    .fromTo('.Seven', 
        {scale:1.8 ,x: "400%" ,y: "1000%"}, {y: "250%", duration: 4, duration: 10 }, "<")    

    .fromTo('.Seven', 
        {filter: "brightness(0%) hue-rotate(40deg)"}, 
        {filter: "brightness(90%) hue-rotate(340deg) saturate(70%) grayscale(30%)", duration: 6 }, 5) 


    .fromTo('.dialogue-box',{x:"200vw", y:"-85vh" ,scale: 0.0}, {x:"30vw",y:"-60vh" ,scale: 1, duration: 2 })
    .to('.character-name', {text: "SEVEN", duration: 2 })
    .to('#chara-quinn',{opacity:0,duration:1},"<")
    .to('#chara-seven',{opacity:1,duration:1},"<")

    .call(changeSequence, ['is-front'])
    .call(changeSequence, ['is-front-wave'])
    .fromTo('.dialogue-text',{text: "", duration: 1},{text: "All clear QUIINNNN!", duration: 2 },"<")

    .to('.dialogue-box',{x:"2vw",y:"-30vh" ,scale: 1, duration: 2 },"+=5")
    .to('.character-name', {text: "QUINN", duration: 3 },"<")
    .to('#chara-quinn',{opacity:1,duration:1},"<")
    .to('#chara-seven',{opacity:0,duration:1},"<")

    .fromTo('.dialogue-text',{text: "", duration: 1}, {text: "Then Let's keep moving.", duration: 4 },"<")
    .fromTo('#S1-QUINN-0', { opacity: 1}, {opacity: 0, duration: 1 })
    .fromTo('#S1-QUINN-1', { opacity: 0}, {opacity: 1, duration: 1 },"<")

    //Scene 1 Ending

    .to('.dialogue-box',{scale: 0, duration: 7 },"+=5")
    .to('#chara-quinn',{opacity:0,duration:1},"<")
    .to('#chara-seven',{opacity:0,duration:1},"<")
    .to('.dialogue-text', {text: "", duration: 0.5},"<")

    //Scene 1 Ending

    .to('.dialogue-box',{scale: 0, duration: 7 },"+=5")

    .to('#S1-FG', {y: "-30%", duration: 7 },"<") 
    .to('.Seven',{y: "-50%", duration: 4 }, "<")
    .to('#S1-FOG-0', {y:"-15%", duration: 5.5 }, "<")
    .to('#S1-L0', {y:"-50%", duration: 5 }, "<")

    .to('#S1-L1', {y:"-75%", duration: 4.5 }, "<")
    .to('#S1-FOG-1', {y:"-48%", duration: 4 }, "<")

    .to('#S1-L2', {y:"-80%", duration: 3.5 }, "<")
    .to('#S1-FOG-2', {y:"-30%", duration: 3.5 }, "<")
    .to('#S1-TOWER', {y:"-40%", duration: 3 }, "<")
    .to('#S1-BG', {y:"-35%", duration: 3 }, "<")



    //All scene Ending
    .to('.site-header',{opacity: 1, duration: 4 })

};



//Seven Animations Functions ------------------------------------------------------
const sevenElement = document.querySelector('.Seven');
changeSequence('is-front') //Initiate Seven Default Animation
function changeSequence(newClass) {
    sevenElement.className = sevenElement.className.replace(/\bis-\w*\b/g, ''); 
    sevenElement.classList.add(newClass);
}
//---------------------------------------------------------------------------------



//Fullscreen Functions ------------------------------------------------------
const fullscreenToggle = document.getElementById('fullscreenToggle');
fullscreenToggle.addEventListener('click', () =>{
    if (!document.fullscreenElement){document.documentElement.requestFullscreen()}
    else{document.exitFullscreen()}
    updateButtonText();
});

function updateButtonText() {
    // document.fullscreenElement is the standard property to check the current state
    if (document.fullscreenElement){fullscreenToggle.textContent = "Go Fullscreen (F11)";}
    else {fullscreenToggle.textContent = "Exit Fullscreen (F11)";}
}

//------------------------------------------------------------------------------
