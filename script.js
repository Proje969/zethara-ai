// Chat menu functionality
const chatHeader = document.querySelector('.chat-header');
const chatMenu = document.getElementById('chatMenu');
const chatBubble = document.getElementById('chatBubble');
const chatWindow = document.getElementById('chatWindow');
const closeChat = document.getElementById('closeChat');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');
const chatMessages = document.querySelector('.chat-messages');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const currentLocation = window.location.pathname;
const menuLinks = document.querySelectorAll('.nav-link');

// Chat menu toggle
chatHeader.addEventListener('click', (e) => {
    if (e.target.closest('.close-chat')) return;
    chatMenu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.chat-header') && !e.target.closest('.chat-menu')) {
        chatMenu.classList.remove('active');
    }
});

// Chat window toggle
chatBubble.addEventListener('click', () => {
    chatWindow.classList.add('active');
    chatBubble.style.display = 'none';
});

closeChat.addEventListener('click', () => {
    chatWindow.classList.remove('active');
    chatBubble.style.display = 'flex';
    chatMenu.classList.remove('active');
});

// Send message function
function sendUserMessage() {
    const message = chatInput.value.trim();
    if (message) {
        // Add user message
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'message user-message';
        userMessageDiv.textContent = message;
        chatMessages.appendChild(userMessageDiv);

        // Clear input
        chatInput.value = '';

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message bot-message typing';
        typingIndicator.innerHTML = '<span>.</span><span>.</span><span>.</span>';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate AI response after a delay
        setTimeout(() => {
            // Remove typing indicator
            typingIndicator.remove();

            // Add bot response
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'message bot-message';
            botMessageDiv.textContent = getAIResponse(message);
            chatMessages.appendChild(botMessageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1500);
    }
}

// Send message on button click
sendMessage.addEventListener('click', sendUserMessage);

// Send message on Enter key
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendUserMessage();
    }
});

// Simple AI response function
function getAIResponse(message) {
    const responses = [
        "Hello! I'm your AI assistant. How can I help you today?",
        "That's an interesting question. Let me help you with that.",
        "I understand what you're asking. Here's what I can tell you...",
        "Thank you for your question. I'd be happy to assist you.",
        "I'm processing your request. Here's what I found...",
        "Let me provide you with the most relevant information about that."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// Menu toggle and active menu item
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Update menu links
menuLinks.forEach(link => {
    if (link.getAttribute('href') === currentLocation.split('/').pop()) {
        link.classList.add('active');
    }
});

// Parallax effect for cards
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.guardian-card, .service-card, .achievement-card');
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

    cards.forEach(card => {
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
});

// Page load animations
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    const serviceCards = document.querySelectorAll('.service-card');

    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';

    setTimeout(() => {
        heroContent.style.transition = 'all 1s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 500);

    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 1000 + (index * 200));
    });
});

// Create stars background
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.classList.add('stars-container');
    document.body.appendChild(starsContainer);

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        starsContainer.appendChild(star);
    }
}

createStars();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Logo yükleme kontrolü
const logoImg = document.getElementById('logo');
logoImg.onerror = function() {
    this.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2NGZmZGEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI5Ii8+PHBhdGggZD0iTTggMTJoOE04IDE1aDhNOCA5aDgiLz48L3N2Zz4=';
};

document.addEventListener('DOMContentLoaded', function() {
    const chatBubble = document.getElementById('chatBubble');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.querySelector('.chat-messages');

    // Chat window toggle
    chatBubble.addEventListener('click', () => {
        chatWindow.classList.add('active');
    });

    closeChat.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    // Send message function
    function sendUserMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            const userMessageDiv = document.createElement('div');
            userMessageDiv.className = 'message user-message';
            userMessageDiv.textContent = message;
            chatMessages.appendChild(userMessageDiv);

            // Clear input
            chatInput.value = '';

            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'message bot-message typing';
            typingIndicator.innerHTML = '<span>.</span><span>.</span><span>.</span>';
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Simulate AI response after a delay
            setTimeout(() => {
                // Remove typing indicator
                typingIndicator.remove();

                // Add bot response
                const botMessageDiv = document.createElement('div');
                botMessageDiv.className = 'message bot-message';
                botMessageDiv.textContent = getAIResponse(message);
                chatMessages.appendChild(botMessageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1500);
        }
    }

    // Send message on button click
    sendMessage.addEventListener('click', sendUserMessage);

    // Send message on Enter key
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });

    // Simple AI response function
    function getAIResponse(message) {
        const responses = [
            "Hello! I'm your AI assistant. How can I help you today?",
            "That's an interesting question. Let me help you with that.",
            "I understand what you're asking. Here's what I can tell you...",
            "Thank you for your question. I'd be happy to assist you.",
            "I'm processing your request. Here's what I found...",
            "Let me provide you with the most relevant information about that."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
});

// Parallax effect for cards
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.service-card, .team-card, .achievement-card');
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

    cards.forEach(card => {
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
}); 