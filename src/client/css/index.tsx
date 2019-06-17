// import './main.scss'

const backdrop = document.querySelector(".backdrop")!;
const modal = document.querySelector(".modal")!;
const modalNoButton = document.querySelector(".modal__action--negative")!
const selectPlanButtons = document.querySelectorAll(".plan button")!;
const toggleButton = document.querySelector(".toggle-button")!;
const mobileNav = document.querySelector(".mobile-nav")!;

// console.dir(backdrop.style['background-image']);

// console.dir(backdrop);
for (let i = 0; i < selectPlanButtons.length; i++) {
  selectPlanButtons[i].addEventListener("click", function() {
    // modal.style.display = "block";
    // backdrop.style.display = "block";
    // modal.className = 'open'; // This will actually overwrite the complete class list
    modal.classList.add("open");
    backdrop.classList.add("open");
  });
}

backdrop.addEventListener("click", function() {
  // mobileNav.style.display = 'none';
  mobileNav.classList.remove("open");
  closeModal();
});

if (modalNoButton) {
  modalNoButton.addEventListener("click", closeModal);
}

function closeModal() {
  //   backdrop.style.display = "none";
  //   modal.style.display = "none";
  if (modal) {
    modal.classList.remove("open");
  }
  backdrop.classList.remove("open");
}

toggleButton.addEventListener("click", function() {
  // mobileNav.style.display = 'block';
  // backdrop.style.display = 'block';
  mobileNav.classList.add("open");
  backdrop.classList.add("open");
});
