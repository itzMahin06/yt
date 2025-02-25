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

// Load Videos & Fetch Viewer Count
document.querySelectorAll(".video-card").forEach(card => {
    const videoNum = card.getAttribute("data-video");
    const videoId = videoList[videoNum];

    if (videoId) {
        document.getElementById(`video-${videoNum}`).src = `https://www.youtube.com/embed/${videoId}`;

        // Fetch View Count from Firebase
        db.ref(`video_views/${videoNum}`).on("value", snapshot => {
            document.getElementById(`view-count-${videoNum}`).innerText = snapshot.val() || 0;
        });

        // Track View Count when Clicked
        card.addEventListener("click", function (event) {
            if (!event.target.classList.contains("share-btn")) {
                incrementViewCount(videoNum);
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
