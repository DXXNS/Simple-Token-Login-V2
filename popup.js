document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("tokenInput");
    const button = document.getElementById("loginButton");

    button.addEventListener("click", () => {
        const token = input.value.trim();
        if (!token) return;

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) return;

            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: login,
                args: [token]
            });
        });
    });
});

function login(token) {
    setInterval(() => {
        document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage.token = `"${token}"`;
    }, 50);
    setTimeout(() => { location.reload(); }, 2500);
}
