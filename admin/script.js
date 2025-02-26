document.querySelectorAll(".video-card").forEach(card => {
    const videoNum = card.getAttribute("data-video");
    const videoId = videoList[videoNum];

    if (videoId) {
        document.getElementById(`thumb-${videoNum}`).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        card.addEventListener("click", function (event) {
            if (!event.target.classList.contains("share-btn")) {
                openVideo(videoId);
            }
        });

        const shareBtn = card.querySelector(".share-btn");
        const shareOptions = card.querySelector(".share-options");

        shareOptions.innerHTML = `
            <button onclick="shareVideo('facebook', '${videoId}')">Facebook</button>
            <button onclick="shareVideo('messenger', '${videoId}')">Messenger</button>
            <button onclick="shareVideo('whatsapp', '${videoId}')">WhatsApp</button>
            <button onclick="copyLink('${videoId}')">Copy Link</button>
        `;

        shareBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            shareOptions.style.display = (shareOptions.style.display === "block") ? "none" : "block";
        });

        document.addEventListener("click", function (e) {
            if (!shareBtn.contains(e.target) && !shareOptions.contains(e.target)) {
                shareOptions.style.display = "none";
            }
        });
    }
});

function openVideo(videoId) {
    document.getElementById("videoModal").classList.add("active");
    document.getElementById("videoFrame").src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}

function closeModal() {
    document.getElementById("videoModal").classList.remove("active");
    document.getElementById("videoFrame").src = "";
}

function shareVideo(platform, videoId) {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    let shareUrl = "";

    switch (platform) {
        case "facebook": shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`; break;
        case "messenger": shareUrl = `https://www.messenger.com/t/?link=${url}`; break;
        case "whatsapp": shareUrl = `https://wa.me/?text=${url}`; break;
    }

    window.open(shareUrl, "_blank");
    showNotification();
}

function copyLink(videoId) {
    navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${videoId}`);
    showNotification();
}

function showNotification() {
    document.getElementById("notification").style.display = "block";
    setTimeout(() => { document.getElementById("notification").style.display = "none"; }, 2000);
}
