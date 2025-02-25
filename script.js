// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_-Utk2tXtvsFaSv1tFa-6YZi0d8nRWvA",
    authDomain: "mahin-class.firebaseapp.com",
    projectId: "mahin-class",
    storageBucket: "mahin-class.firebasestorage.app",
    messagingSenderId: "1044302797960",
    appId: "1:1044302797960:web:3a39774ca5e890f827133d"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// YouTube Video List (Unique Numbers)
const videoList = {
    1: "uawquI4pOXw",
    2: "jdQl9bjYw0w"
};

// Load Thumbnails & Fetch Viewer Count
document.querySelectorAll(".video-card").forEach(card => {
    const videoNum = card.getAttribute("data-video");
    const videoId = videoList[videoNum];

    if (videoId) {
        document.getElementById(`thumb-${videoNum}`).src = `https://img.youtube.com/vi/${videoId}/0.jpg`;

        // Fetch View Count from Firebase
        db.ref(`video_views/${videoNum}`).on("value", snapshot => {
            document.getElementById(`view-count-${videoNum}`).innerText = snapshot.val() || 0;
        });

        // Open Popup & Track View Count
        card.querySelector(".video-thumbnail").addEventListener("click", function () {
            openPopup(videoId);
            incrementViewCount(videoNum);
        });

        // Share Button
        card.querySelector(".share-btn").addEventListener("click", function (event) {
            event.stopPropagation();
            copyLink(videoId);
        });
    }
});

// Open Popup Video
function openPopup(videoId) {
    const popup = document.getElementById("video-popup");
    const iframe = document.getElementById("popup-video");
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    popup.style.display = "flex";
}

// Close Popup Video
document.getElementById("close-popup").addEventListener("click", function () {
    const popup = document.getElementById("video-popup");
    const iframe = document.getElementById("popup-video");
    iframe.src = "";
    popup.style.display = "none";
});

// Increment View Count in Firebase
function incrementViewCount(videoNum) {
    const ref = db.ref(`video_views/${videoNum}`);
    ref.transaction(currentViews => (currentViews || 0) + 1);
}

// Copy Video Link
function copyLink(videoId) {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    navigator.clipboard.writeText(url).then(() => {
        alert("Link copied successfully!");
    });
}
