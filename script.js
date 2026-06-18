//store information about destinations used through website.
//each object contains location details and travel characteristics.

const travelData = [
    { id: 1, name: "Lisbon, Portugal", continent: "Europe", category: "Culture", season: "Spring", climate: "Mild", price: "Mid", description: "Historic streets, seaside views, and vibrant cafés." },
    { id: 2, name: "Kyoto, Japan", continent: "Asia", category: "Culture", season: "Autumn", climate: "Temperate", price: "High", description: "Ancient temples, gardens, and peaceful tea houses." },
    { id: 3, name: "Marrakech, Morocco", continent: "Africa", category: "Adventure", season: "Fall", climate: "Warm", price: "Mid", description: "Colorful markets, desert excursions, and rich traditions." },
    { id: 4, name: "Queenstown, New Zealand", continent: "Oceania", category: "Adventure", season: "Summer", climate: "Cool", price: "High", description: "Adventure sports, lakeside vistas, and fresh mountain air." },
    { id: 5, name: "Reykjavik, Iceland", continent: "Europe", category: "Nature", season: "Winter", climate: "Cold", price: "High", description: "Northern lights, geothermal pools, and dramatic landscapes." },
    { id: 6, name: "Puerto Vallarta, Mexico", continent: "North America", category: "Relaxation", season: "Winter", climate: "Warm", price: "Low", description: "Beachfront comfort, calm water activities, and coastal cuisine." },
    { id: 7, name: "Cape Town, South Africa", continent: "Africa", category: "Nature", season: "Spring", climate: "Mild", price: "Mid", description: "Ocean shoreline, scenic hikes, and cultural markets." },
    { id: 8, name: "Bali, Indonesia", continent: "Asia", category: "Relaxation", season: "Summer", climate: "Tropical", price: "Low", description: "Rice terraces, beach resorts, and sunset dinners." }
];

//contains predefined trip ideas that are matched with the users selected travel type and budget.
const tripSuggestions = [
    { id: "1", type: "Adventure", budget: "High", title: "Heli-Sightseeing in Queenstown", description: "Fly over fjords and mountains for the ultimate adrenaline-packed escape." },
    { id: "2", type: "Relaxation", budget: "Low", title: "Beachfront retreat in Goa", description: "Enjoy easy mornings, ocean views, and peaceful sunsets at a relaxed pace." },
    { id: "3", type: "Culture", budget: "Mid", title: "Historic Lisbon getaway", description: "Wander cobblestone alleys, museums, and waterfront cafés with comfort." },
    { id: "4", type: "Nature", budget: "High", title: "Iceland waterfall tour", description: "See glaciers, hot springs, and northern lights in a dramatic natural setting." },
    { id: "5", type: "Foodie", budget: "Mid", title: "Street food crawl in Bangkok", description: "Taste spicy street bowls, night markets, and local specialties all day." },
    { id: "6", type: "Adventure", budget: "Low", title: "Hiking the Atlas Mountains", description: "Trek scenic paths, connect with mountain villages, and enjoy simple comforts." },
    { id: "7", type: "Relaxation", budget: "Mid", title: "Spa week in Bali", description: "Unwind with wellness treatments, poolside rest, and healthy local cuisine." },
    { id: "8", type: "Culture", budget: "High", title: "Kyoto temple tour", description: "Visit ancient temples, night shrines, and traditional tea ceremonies." }
];

// Provides recommended destinations based on the user's mood.
const moodDestinations = [
    { id: "m1", name: "Santorini, Greece", note: "Whitewashed villages, sea views, and sunset dining." },
    { id: "m2", name: "Banff, Canada", note: "Turquoise lakes, alpine trails, and crisp fresh air." },
    { id: "m3", name: "Seoul, South Korea", note: "Trendy neighborhoods, street food, and creative culture." },
    { id: "m4", name: "Amalfi Coast, Italy", note: "Scenic drives, coastal towns, and seaside relaxation." }
];

// Stores the names used for saving and retrieving data from local storage.
const storageKeys = {
    newsletter: "travelwiseNewsletter",
    budget: "travelwiseBudget",
    wishlist: "travelwiseWishlist",
    mood: "travelwiseMoodState",
    feedback: "travelwiseFeedback"
};

// Connects each page with its corresponding initialization function.
const pageInits = {
    home: initHome,
    destination: initDestination,
    budget: initBudget,
    generator: initGenerator,
    mood: initMood,
    feedback: initFeedback
};

// Handles opening and closing of the navigation menu.
function setupNavigation() {
    const toggle = document.querySelector(".menu-button");
    const nav = document.querySelector(".site-nav");

    // Stop execution if the required elements do not exist.
    if (!toggle || !nav) return;

    // Show or hide the menu when the button is clicked.
    toggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });

    // Close the menu when the user clicks outside of it.
    document.addEventListener("click", (event) => {
        if (!nav.contains(event.target) && !toggle.contains(event.target)) {
            nav.classList.remove("open");
        }
    });
}

// Initializes all interactive features on the home page.
function initHome() {
    const quoteText = document.getElementById("quoteText");
    const quoteAuthor = document.getElementById("quoteAuthor");
    const destinationDate = document.getElementById("destinationDate");
    const destinationName = document.getElementById("destinationName");
    const destinationDescription = document.getElementById("destinationDescription");
    const destinationContinent = document.getElementById("destinationContinent");
    const destinationSeason = document.getElementById("destinationSeason");
    const destinationWhy = document.getElementById("destinationWhy");
    const newsletterForm = document.getElementById("newsletterForm");
    const newsletterEmail = document.getElementById("newsletterEmail");
    const newsletterMessage = document.getElementById("newsletterMessage");

    // Collection of travel quotes displayed on the homepage.
    const quotes = [
        { text: "Travel makes one modest. You see what a tiny place you occupy in the world.", author: "Gustave Flaubert" },
        { text: "Better to see something once than hear about it a thousand times.", author: "Asian Proverb" },
        { text: "A journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
        { text: "The world is a book and those who do not travel read only one page.", author: "Saint Augustine" }
    ];

    let quoteIndex = 0;
    // Displays one quote at a time and cycles through the list.
    function showQuote() {
        const quote = quotes[quoteIndex];
        if (quoteText) quoteText.textContent = quote.text;
        if (quoteAuthor) quoteAuthor.textContent = `— ${quote.author}`;
        // Move to the next quote and restart from the beginning when needed.
        quoteIndex = (quoteIndex + 1) % quotes.length;
    }

    showQuote();
    // Change the quote every seven seconds.
    setInterval(showQuote, 7000);

    const today = new Date();
    const currentIndex = (today.getMonth() * 31 + today.getDate()) % travelData.length;
    const currentDestination = travelData[currentIndex];
    // Display today's date.
    if (destinationDate) destinationDate.textContent = today.toLocaleDateString();
    if (currentDestination) {
        destinationName.textContent = currentDestination.name;
        destinationDescription.textContent = currentDestination.description;
        destinationContinent.textContent = currentDestination.continent;
        destinationSeason.textContent = currentDestination.season;
        destinationWhy.textContent = `Perfect for ${currentDestination.category.toLowerCase()} travelers.`;
    }

    const savedEmail = localStorage.getItem(storageKeys.newsletter);
    if (savedEmail) {
        newsletterEmail.value = savedEmail;
        newsletterMessage.textContent = `You are subscribed with ${savedEmail}.`;
    }

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const email = (newsletterEmail.value || "").trim();
            if (!email || !email.includes("@")) {
                newsletterMessage.textContent = "Please enter a valid email address.";
                return;
            }
            localStorage.setItem(storageKeys.newsletter, email);
            newsletterMessage.textContent = `Subscribed successfully with ${email}.`;
        });
    }
}
// Initializes destination filtering and search features.
function initDestination() {
    const grid = document.getElementById("destinationGrid");
    const search = document.getElementById("destinationSearch");
    const filter = document.getElementById("continentFilter");
    const modal = document.getElementById("destinationModal");
    const closeModal = document.getElementById("closeDestinationModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalText = document.getElementById("modalText");
    const modalTable = document.getElementById("modalTable");

    if (!grid || !search || !filter || !modal || !closeModal || !modalTitle || !modalText || !modalTable) return;

    const continents = ["All", ...new Set(travelData.map((item) => item.continent))];
    filter.innerHTML = continents.map((continent) => `<option value="${continent.toLowerCase()}">${continent}</option>`).join("");

    function buildCard(item) {
        const card = document.createElement("article");
        card.className = "destination-card";
        card.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
            <div class="details-list">
                <div><strong>Region:</strong> ${item.continent}</div>
                <div><strong>Type:</strong> ${item.category}</div>
                <div><strong>Cost plan:</strong> ${item.price}</div>
            </div>
            <button data-id="${item.id}">View details</button>
        `;
        const button = card.querySelector("button");
        button.addEventListener("click", () => openModal(item));
        return card;
    }
    // Display destinations based on the selected filters.
    function renderCards() {
        const query = search.value.trim().toLowerCase();
        const selected = filter.value;
        const matches = travelData.filter((item) => {
            const matchesText = item.name.toLowerCase().includes(query);
            const matchesContinent = selected === "all" || item.continent.toLowerCase() === selected;
            return matchesText && matchesContinent;
        });
        grid.innerHTML = matches.length ? "" : "<p>No destinations matched your search.</p>";
        matches.forEach((item) => grid.appendChild(buildCard(item)));
    }

    function openModal(item) {
        if (!modalTitle || !modalText || !modalTable) return;
        modalTitle.textContent = item.name;
        modalText.textContent = item.description;
        modalTable.innerHTML = `
            <tr><td>Continent</td><td>${item.continent}</td></tr>
            <tr><td>Category</td><td>${item.category}</td></tr>
            <tr><td>Climate</td><td>${item.climate}</td></tr>
            <tr><td>Best season</td><td>${item.season}</td></tr>
            <tr><td>Cost range</td><td>${item.price}</td></tr>
        `;
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
    }

    function closeModalWindow() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
    }

    search.addEventListener("input", renderCards);
    filter.addEventListener("change", renderCards);
    closeModal.addEventListener("click", closeModalWindow);
    modal.addEventListener("click", (event) => {
        if (event.target === modal) closeModalWindow();
    });

    renderCards();
}
// Handles trip budget calculations and storage.
function initBudget() {
    const form = document.getElementById("budgetForm");
    const summary = document.getElementById("budgetSummary");
    const statusText = document.getElementById("budgetStatus");
    const progress = document.getElementById("budgetProgress");
    const notice = document.getElementById("budgetNotice");
    const savedSection = document.getElementById("savedBudgetSection");

    if (!form || !summary || !statusText || !progress || !savedSection) return;

    function renderSaved() {
        // Load previously saved budget information from local storage.
        const saved = JSON.parse(localStorage.getItem(storageKeys.budget) || "null");
        if (!saved) {
            savedSection.innerHTML = "";
            return;
        }
        savedSection.innerHTML = `
            <div class="summary-card">
                <h2>Saved budget</h2>
                <p><strong>${saved.tripName}</strong> — ${saved.tripTravelers} traveler(s), ${saved.tripNights} night(s)</p>
                <p>Total cost: $${saved.totalCost.toLocaleString()}</p>
                <p>Budget: $${saved.budgetLimit.toLocaleString()}</p>
                <p>Status: ${saved.status}</p>
            </div>
        `;
    }

    function updateProgress(value) {
        const width = Math.min(100, Math.round(value));
        progress.style.width = `${width}%`;
    }

    function showResult(data) {
        summary.textContent = `Your trip ${data.tripName} costs $${data.totalCost.toLocaleString()} for ${data.tripTravelers} traveler(s).`;
        statusText.textContent = data.statusMessage;
        notice.textContent = "Budget saved locally.";
        const progressPercent = (data.totalCost / data.budgetLimit) * 100;
        updateProgress(progressPercent);
        if (progressPercent > 100) {
            progress.style.background = "var(--danger)";
        } else {
            progress.style.background = "var(--primary)";
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const tripName = document.getElementById("tripName").value.trim();
        const tripNights = Number(document.getElementById("tripNights").value);
        const tripTravelers = Number(document.getElementById("tripTravelers").value);
        const costPerPerson = Number(document.getElementById("costPerPerson").value);
        const budgetLimit = Number(document.getElementById("budgetLimit").value);

        if (!tripName || tripNights <= 0 || tripTravelers <= 0 || costPerPerson < 0 || budgetLimit < 0) {
            notice.textContent = "Please complete the planner with valid values.";
            return;
        }
        // Calculate the total trip cost based on the number of travellers
        // and the cost assigned to each person.

        const totalCost = tripNights * tripTravelers * costPerPerson;
        const savings = budgetLimit - totalCost;
        const status = totalCost <= budgetLimit ? "Under budget" : "Over budget";
        const statusMessage = totalCost <= budgetLimit 
            ? `Great news! You are $${Math.abs(savings).toLocaleString()} under budget.`
            : `Warning: You are $${Math.abs(savings).toLocaleString()} over budget.`;

        const savedBudget = { tripName, tripNights, tripTravelers, costPerPerson, budgetLimit, totalCost, status, statusMessage, timestamp: Date.now() };
        localStorage.setItem(storageKeys.budget, JSON.stringify(savedBudget));
        showResult(savedBudget);
        renderSaved();
    }

    form.addEventListener("submit", handleSubmit);
    renderSaved();

    const existing = JSON.parse(localStorage.getItem(storageKeys.budget) || "null");
    if (existing) {
        showResult(existing);
    }
}
// Generates travel suggestions based on user preferences.
function initGenerator() {
    const travelType = document.getElementById("travelType");
    const budgetLevel = document.getElementById("budgetLevel");
    const generateButton = document.getElementById("generateTrip");
    const surpriseButton = document.getElementById("surpriseMe");
    const suggestionElement = document.getElementById("tripSuggestion");
    const wishlistElement = document.getElementById("wishlistItems");

    if (!travelType || !budgetLevel || !generateButton || !surpriseButton || !suggestionElement || !wishlistElement) return;

    function pickSuggestion(type, budget) {
        const choices = tripSuggestions.filter((suggestion) => suggestion.type === type && suggestion.budget === budget);
        if (choices.length) return choices[Math.floor(Math.random() * choices.length)];
        return tripSuggestions[Math.floor(Math.random() * tripSuggestions.length)];
    }

    function renderSuggestion(suggestion) {
        suggestionElement.innerHTML = `
            <h2>${suggestion.title}</h2>
            <p>${suggestion.description}</p>
            <p><strong>Type:</strong> ${suggestion.type} · <strong>Budget:</strong> ${suggestion.budget}</p>
            <button id="saveSuggestion">Save to wishlist</button>
        `;
        document.getElementById("saveSuggestion").addEventListener("click", () => saveToWishlist(suggestion));
    }

    function getWishlist() {
        return JSON.parse(localStorage.getItem(storageKeys.wishlist) || "[]");
    }

    function saveToWishlist(suggestion) {
        const wishlist = getWishlist();
        if (wishlist.some((item) => item.id === suggestion.id)) return;
        wishlist.push(suggestion);
        localStorage.setItem(storageKeys.wishlist, JSON.stringify(wishlist));
        renderWishlist();
    }

    function removeFromWishlist(id) {
        const wishlist = getWishlist().filter((item) => item.id !== id);
        localStorage.setItem(storageKeys.wishlist, JSON.stringify(wishlist));
        renderWishlist();
    }

    function renderWishlist() {
        const items = getWishlist();
        wishlistElement.innerHTML = items.length
            ? items.map((item) => `
                <li>
                    <span>${item.title}</span>
                    <button data-id="${item.id}">Remove</button>
                </li>
            `).join("")
            : `<p>You have not saved any wishlist items yet.</p>`;

        wishlistElement.querySelectorAll("button").forEach((button) => {
            button.addEventListener("click", () => removeFromWishlist(button.dataset.id));
        });
    }

    generateButton.addEventListener("click", () => {
        const suggestion = pickSuggestion(travelType.value, budgetLevel.value);
        renderSuggestion(suggestion);
    });

    surpriseButton.addEventListener("click", () => {
        const randomType = travelType.options[Math.floor(Math.random() * travelType.options.length)].value;
        const randomBudget = budgetLevel.options[Math.floor(Math.random() * budgetLevel.options.length)].value;
        travelType.value = randomType;
        budgetLevel.value = randomBudget;
        const suggestion = pickSuggestion(randomType, randomBudget);
        renderSuggestion(suggestion);
    });

    renderWishlist();
}
// Handles mood-based destination recommendations and ambient sounds.
function initMood() {
    // Select elements related to mood options and results.
    const soundButtons = document.querySelectorAll(".sound-button");
    const soundStatus = document.getElementById("soundStatus");
    const moodContainer = document.getElementById("moodDestinations");
    const visitedCount = document.getElementById("visitedCount");
    const plannedCount = document.getElementById("plannedCount");

    if (!soundButtons.length || !soundStatus || !moodContainer || !visitedCount || !plannedCount) return;

    let audio = null;
    let activeSound = null;

    const soundConfig = {
        beach: { frequency: 170, type: "triangle" },
        forest: { frequency: 180, type: "sine" },
        city: { frequency: 220, type: "square" }
    };

    function stopAudio() {
        if (audio) {
            audio.stop();
            audio.close();
            audio = null;
        }
        activeSound = null;
        soundStatus.textContent = "No sound playing";
    }

    function playSound(key) {
        if (activeSound === key) {
            stopAudio();
            return;
        }
        stopAudio();
        activeSound = key;
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = soundConfig[key].type;
        oscillator.frequency.value = soundConfig[key].frequency;
        gain.gain.value = 0.05;
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start();
        audio = oscillator;
        soundStatus.textContent = `Playing ${key} ambient sound`;
    }

    soundButtons.forEach((button) => {
        button.addEventListener("click", () => playSound(button.dataset.sound));
    });

    const savedState = JSON.parse(localStorage.getItem(storageKeys.mood) || "{}");

    function renderMood() {
        moodContainer.innerHTML = moodDestinations.map((destination) => {
            const state = savedState[destination.id] || { visited: false, planned: false };
            return `
                <article class="mood-card">
                    <div>
                        <h3>${destination.name}</h3>
                        <p>${destination.note}</p>
                    </div>
                    <div class="mood-actions">
                        <button data-id="${destination.id}" data-action="visited">${state.visited ? "Visited ✓" : "Mark visited"}</button>
                        <button data-id="${destination.id}" data-action="planned">${state.planned ? "Planned ✓" : "Mark planned"}</button>
                    </div>
                </article>
            `;
        }).join("");

        const visited = moodDestinations.filter((dest) => (savedState[dest.id] || {}).visited).length;
        const planned = moodDestinations.filter((dest) => (savedState[dest.id] || {}).planned).length;
        visitedCount.textContent = String(visited);
        plannedCount.textContent = String(planned);

        moodContainer.querySelectorAll("button").forEach((button) => {
            button.addEventListener("click", () => {
                const id = button.dataset.id;
                const action = button.dataset.action;
                const current = savedState[id] || { visited: false, planned: false };
                if (action === "visited") {
                    current.visited = !current.visited;
                    if (current.visited) current.planned = false;
                } else if (action === "planned") {
                    current.planned = !current.planned;
                    if (current.planned) current.visited = false;
                }
                savedState[id] = current;
                localStorage.setItem(storageKeys.mood, JSON.stringify(savedState));
                renderMood();
            });
        });
    }

    renderMood();
}
// Processes user feedback and stores it locally.
function initFeedback() {
    const form = document.getElementById("feedbackForm");
    const status = document.getElementById("feedbackStatus");
    const savedFeedback = document.getElementById("savedFeedback");

    if (!form || !status || !savedFeedback) return;

    function renderSavedFeedback() {
        const messages = JSON.parse(localStorage.getItem(storageKeys.feedback) || "[]");
        if (!messages.length) {
            savedFeedback.innerHTML = "<p>No previous feedback has been saved yet.</p>";
            return;
        }

        savedFeedback.innerHTML = `
            <h3>Saved feedback</h3>
            <ul>${messages.slice(-3).reverse().map((item) => `
                <li>
                    <strong>${item.subject}</strong> — ${item.name} (${new Date(item.timestamp).toLocaleDateString()})
                    <p>${item.message}</p>
                </li>
            `).join("")}</ul>
        `;
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("feedbackName").value.trim();
        const email = document.getElementById("feedbackEmail").value.trim();
        const subject = document.getElementById("feedbackSubject").value.trim();
        const message = document.getElementById("feedbackMessage").value.trim();

        if (!name || !email || !subject || !message) {
            status.textContent = "Please complete every field before sending feedback.";
            return;
        }

        if (!validateEmail(email)) {
            status.textContent = "Please enter a valid email address.";
            return;
        }

        const messages = JSON.parse(localStorage.getItem(storageKeys.feedback) || "[]");
        const entry = { name, email, subject, message, timestamp: Date.now() };
        messages.push(entry);
        localStorage.setItem(storageKeys.feedback, JSON.stringify(messages));
        form.reset();
        status.textContent = "Thanks! Your message was saved locally.";
        renderSavedFeedback();
    });

    renderSavedFeedback();
    setupAccordion();
}

function setupAccordion() {
    document.querySelectorAll(".accordion-item").forEach((item) => {
        const button = item.querySelector(".accordion-button");
        if (!button) return;
        button.addEventListener("click", () => {
            item.classList.toggle("active");
        });
    });
}

window.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    const init = pageInits[document.body.id];
    if (typeof init === "function") init();
});

// audio files

const buttons = document.querySelectorAll(".sound-button");
const statusText = document.getElementById("soundStatus");

let currentAudio = null;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const soundName = button.dataset.sound;

        // Stop previous audio
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        // Play selected audio
        currentAudio = new Audio("audio/" + soundName + ".mp3");
        currentAudio.loop = true;
        currentAudio.play();

        // Update text
        statusText.textContent = soundName + " sound playing";
    });
});