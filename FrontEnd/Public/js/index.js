function renderWelcomeCard(welcomeContent, userName, payload) {
  welcomeContent.innerHTML = "";

  const box = document.createElement("div");
  box.className = "welcome-box";

  const title = document.createElement("h2");
  title.className = "welcome-title";
  title.textContent = `Benvenuto, ${userName}`;

  const img = document.createElement("img");
  img.src = "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Y3VrNmhnbzcxdng1aDUwNXhnZHUxY2dpZHYwcXV2YTcweXVobXJjOSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/ijAp0dXztP6axdYDsQ/giphy.gif";
  img.alt = "Welcome Gif";
  img.className = "welcome-gif";
  img.loading = "eager";
  img.decoding = "async";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "show-json-button";
  button.textContent = "Mostra JSON";

  const jsonPanel = document.createElement("pre");
  jsonPanel.id = "json-panel";
  jsonPanel.className = "json-panel";
  jsonPanel.hidden = true;
  jsonPanel.setAttribute("aria-live", "polite");

  button.addEventListener("click", () => {
    jsonPanel.textContent = JSON.stringify(payload, null, 2);
    jsonPanel.hidden = false;
    button.textContent = "JSON mostrato";
    button.disabled = true;
  });

  box.appendChild(title);
  box.appendChild(img);
  box.appendChild(button);
  box.appendChild(jsonPanel);
  welcomeContent.appendChild(box);
}

async function loadWelcomeGif() {
  const welcomeContent = document.getElementById("welcome-content");

  if (!welcomeContent) {
    return;
  }

  const hideWelcome = () => {
    welcomeContent.innerHTML = "";
  };

  try {
    const response = await fetch("/api/v1/auth/me");

    if (!response.ok) {
      hideWelcome();
      return;
    }

    const user = await response.json();

    if (user && user.authenticated) {
      renderWelcomeCard(
        welcomeContent,
        user.firstName || user.displayName || "utente",
        {
          status: "ok",
          message: "Login completato con successo",
          user: {
            name: user.firstName || user.displayName || "utente",
            authenticated: true
          }
        }
      );
      return;
    }

    hideWelcome();
  } catch (err) {
    console.error("Auth check failed, hiding welcome panel:", err);
    hideWelcome();
  }
}

window.addEventListener("auth-state-change", (event) => {
  const user = event.detail;
  const welcomeContent = document.getElementById("welcome-content");

  if (!welcomeContent) {
    return;
  }

  if (user && user.authenticated) {
    const name = user.firstName || user.displayName || "utente";
    renderWelcomeCard(welcomeContent, name, {
      status: "ok",
      message: "Login completato con successo",
      user: {
        name,
        authenticated: true
      }
    });
    return;
  }

  welcomeContent.innerHTML = "";
});

document.addEventListener("DOMContentLoaded", loadWelcomeGif);