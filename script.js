// ========== Global Variables ==========
let currentPage = 1;
const totalPages = 4;

// ========== Initialize on DOM Load ==========
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createFloatingHearts();
    setupEnvelope();
    setupResponseButtons();
});

// ========== Create Falling Particles (Stars & Hearts) ==========
function createParticles() {
    const container = document.getElementById('particles');
    const particles = ['✨', '⭐', '💕', '🌸', '💗', '✿', '❀', '💖', '🩷', '⭑', '✦', '♡', '❤️'];

    function addParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particle.style.animationDelay = Math.random() * 1 + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.5;
        container.appendChild(particle);

        setTimeout(() => particle.remove(), 10000);
    }

    // Initial burst of particles
    for (let i = 0; i < 30; i++) {
        setTimeout(() => addParticle(), i * 100);
    }

    // Continuous particles - faster spawn rate
    setInterval(addParticle, 300);

    // Add side-to-side floating particles
    createSideParticles();

    // Add snow/star particles
    createSnowParticles();
}

// ========== Create Snow/Star Particles ==========
function createSnowParticles() {
    const container = document.getElementById('particles');
    const snowflakes = ['❄', '❅', '❆', '✧', '✩', '✪', '✫', '✬', '·', '•'];

    function addSnowflake() {
        const snow = document.createElement('div');
        snow.className = 'snowflake';
        snow.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        snow.style.left = Math.random() * 100 + '%';
        snow.style.fontSize = (Math.random() * 0.8 + 0.5) + 'rem';
        snow.style.animationDuration = (Math.random() * 8 + 8) + 's';
        snow.style.animationDelay = Math.random() * 3 + 's';
        snow.style.opacity = Math.random() * 0.3 + 0.1; // Very transparent
        snow.style.color = '#fff';
        snow.style.textShadow = '0 0 5px rgba(255,182,193,0.5)';
        container.appendChild(snow);

        setTimeout(() => snow.remove(), 20000);
    }

    // Initial snow burst
    for (let i = 0; i < 50; i++) {
        setTimeout(() => addSnowflake(), i * 150);
    }

    // Continuous snow
    setInterval(addSnowflake, 200);
}

// ========== Create Side Floating Particles ==========
function createSideParticles() {
    const container = document.getElementById('particles');
    const hearts = ['💕', '💗', '💖', '❤️', '🩷', '♡'];

    function addSideParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle side-particle';
        particle.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = '-50px';
        particle.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';
        particle.style.animation = `floatAcross ${Math.random() * 10 + 15}s linear forwards`;
        particle.style.opacity = Math.random() * 0.4 + 0.3;
        container.appendChild(particle);

        setTimeout(() => particle.remove(), 25000);
    }

    // Continuous side particles
    setInterval(addSideParticle, 2000);
}

// ========== Create Floating Background Hearts ==========
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const hearts = ['💕', '💗', '💖', '❤️', '🩷', '♡', '💓', '💞'];

    // Create more floating hearts
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.animationDuration = (Math.random() * 8 + 8) + 's';
        heart.style.opacity = Math.random() * 0.3 + 0.2;
        container.appendChild(heart);
    }

    // Add bouncing hearts
    createBouncingHearts();
}

// ========== Create Bouncing Hearts ==========
function createBouncingHearts() {
    const container = document.getElementById('floatingHearts');
    const hearts = ['💕', '💗', '💖'];

    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.className = 'bouncing-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = (10 + Math.random() * 80) + '%';
        heart.style.bottom = '0';
        heart.style.position = 'absolute';
        heart.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
        heart.style.animation = `bounceHeart ${Math.random() * 2 + 3}s ease-in-out infinite`;
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.opacity = Math.random() * 0.4 + 0.3;
        heart.style.pointerEvents = 'none';
        container.appendChild(heart);
    }
}

// ========== Envelope Interaction ==========
let envelopeIsOpen = false; // Global variable to track envelope state

function setupEnvelope() {
    const envelope = document.getElementById('envelope');
    const clickHint = document.querySelector('.click-hint');

    envelope.addEventListener('click', () => {
        if (!envelopeIsOpen) {
            envelope.classList.add('open');
            envelopeIsOpen = true;
            clickHint.style.opacity = '0';

            // Navigate to next page after animation
            setTimeout(() => {
                nextPage();
            }, 1500);
        }
    });
}

// ========== Page Navigation ==========
function nextPage() {
    if (currentPage < totalPages) {
        document.getElementById(`page${currentPage}`).classList.remove('active');
        currentPage++;
        document.getElementById(`page${currentPage}`).classList.add('active');

        // Trigger animations for new page
        triggerPageAnimations(currentPage);
    }
}

function prevPage() {
    if (currentPage > 1) {
        document.getElementById(`page${currentPage}`).classList.remove('active');
        currentPage--;
        document.getElementById(`page${currentPage}`).classList.add('active');

        // Reset envelope if going back to page 1
        if (currentPage === 1) {
            const envelope = document.getElementById('envelope');
            envelope.classList.remove('open');
            document.querySelector('.click-hint').style.opacity = '1';
            envelopeIsOpen = false; // Reset the flag so envelope can be clicked again
        }
    }
}

// ========== Page Animations Trigger ==========
function triggerPageAnimations(page) {
    if (page === 3) {
        // Re-trigger razon cards animation
        const cards = document.querySelectorAll('.razon-card');
        cards.forEach((card, index) => {
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            card.style.animation = `cardFadeIn 0.6s ease forwards ${0.1 + index * 0.1}s`;
        });
    }

    if (page === 4) {
        // Re-trigger final page animations
        const lines = document.querySelectorAll('.message-line');
        lines.forEach((line, index) => {
            line.style.animation = 'none';
            line.offsetHeight;
            line.style.animation = `lineReveal 0.5s ease forwards ${0.2 + index * 0.2}s`;
        });
    }
}

// ========== Response Buttons ==========
function setupResponseButtons() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const celebration = document.getElementById('celebration');

    yesBtn.addEventListener('click', () => {
        // Show celebration
        celebration.classList.add('active');
        createConfetti();

        // Play celebration sound if available
        playSound('celebration');
    });

    noBtn.addEventListener('click', (e) => {
        // Make button run away
        const btn = e.target;
        const moveX = (Math.random() - 0.5) * 300;
        const moveY = (Math.random() - 0.5) * 200;
        btn.style.transform = `translate(${moveX}px, ${moveY}px)`;

        setTimeout(() => {
            btn.style.transform = 'translate(0, 0)';
        }, 500);
    });
}

// ========== Confetti Effect ==========
function createConfetti() {
    const container = document.getElementById('confetti');
    const colors = ['#ff69b4', '#ff1493', '#ffd700', '#ff6b6b', '#ffb6c1', '#e63946'];
    const shapes = ['❤️', '💕', '💗', '🌸', '✨', '💖'];

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';

            // Random between shape and colored div
            if (Math.random() > 0.5) {
                confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
                confetti.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            } else {
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = (Math.random() * 10 + 5) + 'px';
                confetti.style.height = (Math.random() * 10 + 5) + 'px';
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            }

            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';

            container.appendChild(confetti);

            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }

    // Continue confetti for celebration
    const confettiInterval = setInterval(() => {
        for (let i = 0; i < 5; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
            confetti.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }
    }, 500);

    // Stop extra confetti after 10 seconds
    setTimeout(() => clearInterval(confettiInterval), 10000);
}

// ========== Sound Effect (Optional) ==========
function playSound(type) {
    // This function can be expanded to play actual sounds
    // For now, it's a placeholder for future enhancement
    console.log(`Playing ${type} sound effect`);
}

// ========== Easter Egg: Konami Code ==========
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg: Extra love explosion
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'particle';
                heart.textContent = '💕';
                heart.style.left = '50%';
                heart.style.top = '50%';
                heart.style.fontSize = '3rem';
                heart.style.animation = `explode ${Math.random() + 1}s ease-out forwards`;
                document.getElementById('particles').appendChild(heart);
                setTimeout(() => heart.remove(), 2000);
            }, i * 50);
        }
    }
});

// Add explosion keyframe dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes explode {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(-50% + ${Math.random() * 400 - 200}px),
                calc(-50% + ${Math.random() * 400 - 200}px)
            ) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========== Touch Support Removed as per user request ==========
// Navigation is restricted to buttons only.

console.log('💕 Página de San Valentín para Belen cargada con amor 💕');
