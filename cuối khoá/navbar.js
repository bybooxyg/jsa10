document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  const userName = document.getElementById("userName");
  const avatarBox = document.getElementById("userAvatar");
  const userBox = document.getElementById("userBox");

  if (!userName || !avatarBox || !userBox) return;

  userName.innerText = currentUser.username;

  if (currentUser.avatar && currentUser.avatar.trim() !== "") {
    avatarBox.innerHTML = `<img src="${currentUser.avatar}" alt="avatar">`;
  } else {
    avatarBox.innerText = currentUser.username.charAt(0).toUpperCase();
  }

  userBox.addEventListener("click", () => {
    window.location.href = "profile.html";
  });
});

function initUser() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  const userName = document.getElementById("userName");
  const avatarBox = document.getElementById("userAvatar");
  const userBox = document.getElementById("userBox");

  if (!userName || !avatarBox || !userBox) return;

  userName.innerText = currentUser.username;

  if (currentUser.avatar && currentUser.avatar.trim() !== "") {
    avatarBox.innerHTML = `<img src="${currentUser.avatar}">`;
  } else {
    avatarBox.innerText = currentUser.username.charAt(0).toUpperCase();
  }

  userBox.addEventListener("click", () => {
    window.location.href = "profile.html";
  });
}
