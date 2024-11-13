// Interactive anims for home ONLY
document.getElementById("joinButton").addEventListener("click", () => {
  alert("Join the Conversation feature coming soon!");
});
document.getElementById("learnMoreButton").addEventListener("click", () => {
  alert("Learn More about our community coming soon!");
});
let scrollAmount = 0;
const trendingCarousel = document.querySelector(".carousel");
setInterval(() => {
  scrollAmount += 200;
  if (scrollAmount >= trendingCarousel.scrollWidth) {
    scrollAmount = 0;
  }
  trendingCarousel.scrollLeft = scrollAmount;
}, 3000);
