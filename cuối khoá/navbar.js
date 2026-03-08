// navbar.js: expose a helper that initializes the user info
// and performs a login check. This function can be called after the
// navbar HTML has been injected into the page.

function initUser(shouldRedirect = false) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  
  if (isLoggedIn !== "true") {
    if (shouldRedirect) {
      window.location.href = "login.html";
    }
    return;
  }

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    if (shouldRedirect) {
      window.location.href = "login.html";
    }
    return;
  }

  const userName = document.getElementById("userName");
  const avatarBox = document.getElementById("userAvatar");
  const userBox = document.getElementById("userBox");
  if (!userName || !avatarBox || !userBox) return;

  // Dùng fullname thay vì username (vì register.html lưu fullname)
  const displayName = currentUser.fullname || currentUser.username || "User";
  userName.innerText = displayName;
  
  if (currentUser.avatar && currentUser.avatar.trim() !== "") {
    avatarBox.innerHTML = `<img src="${currentUser.avatar}" alt="avatar">`;
  } else {
    avatarBox.textContent = displayName.charAt(0).toUpperCase();
  }

  // Gắn event listener sau khi HTML được load
  if (userBox && !userBox.hasAttribute("data-listener-attached")) {
    userBox.addEventListener("click", () => {
      window.location.href = "profile.html";
    });
    userBox.setAttribute("data-listener-attached", "true");
  }
}

// make available globally so pages can call it after loading navbar
window.initUser = initUser;
 
// loadNavbar: fetches `navbar.html`, injects it into the page, and initializes user info
function loadNavbar(containerId = "navbar-container") {
  const container = document.getElementById(containerId);
  if (!container) return Promise.resolve();

  return fetch("navbar.html")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load navbar.html");
      return res.text();
    })
    .then((html) => {
      container.innerHTML = html;
      // 🔥 Auto-initialize user after navbar is injected
      try {
        initUser();
      } catch (e) {
        console.warn("initUser failed or not available:", e);
      }
      return container;
    })
    .catch((err) => {
      console.error("Failed to load navbar:", err);
      return Promise.resolve();
    });
}

window.loadNavbar = loadNavbar;
