(function () {
    let deferredPrompt = null;

    function installApp() {
        deferredPrompt.prompt();
        document.querySelector("#install-btn").disabled = true;

        deferredPrompt.userChoice.then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
                console.log('PWA setup accepted');
                document.querySelector("#install-btn").style.display = 'none';
            } else {
                console.log('PWA setup rejected');
            }

            document.querySelector("#install-btn").disabled = false;
            deferredPrompt = null;
        });
    }

    window.addEventListener('beforeinstallprompt', event => {
        event.preventDefault();
        deferredPrompt = event;
        document.querySelector("#install-btn").classList.add('active');

        document.querySelector("#install-btn").addEventListener('click', function () {
            installApp();
        });
    });

    // Отображение эмодзи
    const emojisContainer = document.getElementById('emojis-container');

    // Запрос к GitHub API для получения эмодзи
    const githubApiUrl = 'https://api.github.com/emojis';

    fetch(githubApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            return response.json();
        })
        .then(emojis => {
            emojisContainer.innerHTML = "";
            for (const emoji in emojis) {
                const emojiItem = document.createElement('div');
                emojiItem.className = 'emoji-item';
                emojiItem.innerHTML = `<img src="${emojis[emoji]}" alt="${emoji}" title="${emoji}">`;
                emojisContainer.appendChild(emojiItem);
            }
        })
        .catch(error => {
            console.error(`Error fetching GitHub emojis: ${error.message}`);
        });

    var body = document.body,
        menuTrigger = body.getElementsByClassName("menu-trigger")[0];

    if (menuTrigger) {
        menuTrigger.addEventListener("click", function () {
            body.className = body.className === "menu-active" ? "" : "menu-active";
        });
    }
})();