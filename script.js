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
        document.getElementById(`thumb-${videoNum}`).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        // Fetch View Count from Firebase
        db.ref(`video_views/${videoNum}`).on("value", snapshot => {
            document.getElementById(`view-count-${videoNum}`).innerText = snapshot.val() || 0;
        });

        // Open Video Player
        card.addEventListener("click", function (event) {
            if (!event.target.classList.contains("share-btn")) {
                incrementViewCount(videoNum);
                openVideo(videoId);
            }
        });

        // Share Button
        const shareBtn = card.querySelector(".share-btn");
        shareBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            copyLink(videoId);
        });
    }
});

// Function to Open Video in Plyr
function openVideo(videoId) {
    const modal = document.getElementById("videoModal");
    modal.classList.add("active");

    const iframe = document.querySelector("#player iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    new Plyr("#player", { controls: ["play", "progress", "mute", "volume", "fullscreen"] });
}

// Close Modal & Stop Video
function closeModal() {
    const modal = document.getElementById("videoModal");
    modal.classList.remove("active");

    const iframe = document.querySelector("#player iframe");
    iframe.src = ""; // Stop the video
}

// Function to Increment View Count in Firebase
function incrementViewCount(videoNum) {
    const ref = db.ref(`video_views/${videoNum}`);
    ref.transaction(currentViews => (currentViews || 0) + 1);
}

// Function to Copy Video Link
function copyLink(videoId) {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    navigator.clipboard.writeText(url).then(() => {
        alert("Link copied successfully!");
    });
}
