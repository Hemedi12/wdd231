document.addEventListener("DOMContentLoaded", () => {
    const images = [
        "images/load-imagen-02.webp",
        "images/contact-page-01.webp",
        "images/contact-page-02.webp",
        "images/contact-page-03.webp",
        "images/contact-page-04.webp",
        "images/contact-page-05.webp",
        "images/contact-page-06.webp",
        "images/contact-page-07.webp",
    ];

    const rotatingImage = document.getElementById("rotating-image");
    const recentImages = new Set();
    let currentIndex = 0;

    function changeImage() {
        do {
            currentIndex = Math.floor(Math.random() * images.length);
        } while (recentImages.has(currentIndex));

        recentImages.add(currentIndex);
        if (recentImages.size > 5) {
            recentImages.delete([...recentImages][0]);
        }

        rotatingImage.src = images[currentIndex];
        rotatingImage.classList.remove("fade");
        rotatingImage.classList.add("initial");

        void rotatingImage.offsetWidth;

        setTimeout(() => {
            rotatingImage.classList.remove("initial");
            rotatingImage.classList.add("fade");
        }, 30);
    }

    setInterval(changeImage, 3000);
});
