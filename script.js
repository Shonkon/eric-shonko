// Image slider for about section
document.addEventListener("DOMContentLoaded", function() {
    let images = ["images/image1.jpg", "images/image2.jpg", "images/image3.jpg", "images/image4.jpg"];
    let index = 0;
    let sliderImg = document.querySelector(".slider-img");
    setInterval(() => {
        index = (index + 1) % images.length;
        sliderImg.src = images[index];
    }, 3000);
    
    // Auto-scroll project boxes
    const projectBoxes = document.querySelector('.project-boxes');
    let scrollAmount = 0;
    const scrollSpeed = 0.2;
    
    function autoScroll() {
        scrollAmount += scrollSpeed;
        if (scrollAmount >= projectBoxes.scrollWidth - projectBoxes.clientWidth) {
            scrollAmount = 0;
        }
        projectBoxes.scrollLeft = scrollAmount;
        requestAnimationFrame(autoScroll);
    }
    
    // Start auto-scrolling
    autoScroll();
});

function showProjects(category) {
    const projectDetails = document.getElementById(`${category}-projects`);
    if (projectDetails.style.display === 'block') {
        projectDetails.style.display = 'none';
    } else {
        // Hide all other project details first
        document.querySelectorAll('.project-details').forEach(detail => {
            detail.style.display = 'none';
        });
        projectDetails.style.display = 'block';
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    
    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        // Change icon between bars and times
        const icon = this.querySelector('i');
        if (navList.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('#nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            document.querySelector('#mobile-menu i').classList.remove('fa-times');
            document.querySelector('#mobile-menu i').classList.add('fa-bars');
        });
    });
});