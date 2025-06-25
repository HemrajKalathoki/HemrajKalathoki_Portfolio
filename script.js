const sideMenu = document.querySelector('#sideMenu');
const navbar = document.querySelector('nav');
const navLinks = document.querySelector('nav ul');

const openMenu = () => {
      sideMenu.style.transform = 'translateX(-16rem)';
};

const closeMenu = () => {
      sideMenu.style.transform = 'translateX(16rem)';
}

window.addEventListener('scroll', () => {
      if (scrollY > 50) {
            navbar.classList.add('bg-white/50', 'backdrop-blur-lg', 'shadow-sm', 'dark:bg-darkTheme', 'dark:shadow-black/20');

            navLinks.classList.remove('bg-white/50', 'shadow-lg', 'dark:border', 'dark:border-white/50', 'dark:bg-transparent');
      } else {
            navbar.classList.remove('bg-white/50', 'backdrop-blur-lg', 'shadow-sm', 'dark:bg-darkTheme', 'dark:shadow-black/20');
            navLinks.classList.add('bg-white/50', 'shadow-lg', 'dark:border', 'dark:border-white/50', 'dark:bg-transparent');
      }
})


// --------------------- light mode and dark mode toggle -------------


if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

const toggleTheme = () => {
      document.documentElement.classList.toggle('dark');
  if (document.documentElement.classList.contains('dark')) {
//     document.documentElement.classList.remove('dark')
    localStorage.theme = 'dark'
  } else {
//     document.documentElement.classList.add('dark')
    localStorage.theme = 'light'
  }
}


// For modal in service card 

const serviceDescriptions = {
  "Web Design": "I design modern, responsive websites that align with your brand identity and engage your target audience. I use tools like Figma and Adobe XD for UI mockups, and translate them into clean, accessible HTML/CSS layouts using Tailwind CSS or Bootstrap. The focus is on intuitive navigation, mobile-first design, and fast load times.",

  "Mobile App": "I build cross-platform mobile apps using frameworks like React Native and Flutter. Whether it’s an e-commerce app, utility tool, or content-based application, I ensure smooth performance, native look-and-feel, and integration with real-time APIs or Firebase. The apps are tested for both Android and iOS compatibility.",

  "UI / UX Design": "I follow a user-centered design process involving user research, wireframing, and usability testing. I use tools like Figma for creating high-fidelity prototypes and ensure that the designs are not just visually appealing, but also accessible, functional, and easy to use. I also focus on micro-interactions and consistent design systems.",

  "Web Application": "I build scalable web applications using technologies like React for the frontend and Node.js or Spring Boot for the backend. From dynamic dashboards to real-time features like chat and notifications, I implement authentication (JWT, OAuth), database management (MySQL, MongoDB), and REST APIs to deliver a seamless and secure user experience.",

  "Web Site Development": "I develop static and dynamic websites tailored for personal brands, small businesses, and startups. This includes setting up hosting, domain integration, responsive design, and SEO optimization. I use JAMstack (Next.js, Netlify) or traditional stacks (HTML/CSS/JS + backend) depending on project needs, ensuring performance and maintainability."
};


document.querySelectorAll(".open-modal-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const serviceName = btn.getAttribute("data-service");
    document.getElementById("modal-title").innerText = serviceName;
    document.getElementById("modal-description").innerText = serviceDescriptions[serviceName] || "Detailed info coming soon...";
    document.getElementById("service-modal").classList.remove("hidden");
  });
});

document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("service-modal").classList.add("hidden");
});

// Close modal when clicking outside modal content
const modal = document.getElementById("service-modal");
const modalContent = document.getElementById("modal-box");
  modal.addEventListener("click", (e) => {
    if (!modalContent.contains(e.target)) {
      modal.classList.add("hidden");
    }
  });


  // for show more in work section show more

const toggleBtn = document.getElementById("showMore");
const moreProjects = document.getElementById("more-projects");
const toggleText = document.getElementById("showMore-text");
const arrowDark = document.getElementById("arrow-dark");
const arrowWhite = document.getElementById("arrow-white");

let isExpanded = false;

toggleBtn.addEventListener("click", () => {
  isExpanded = !isExpanded;

  if (isExpanded) {
    moreProjects.classList.remove("max-h-0", "opacity-0");
    moreProjects.classList.add("max-h-[5000px]", "opacity-100");

    toggleText.innerText = "Show less";
    arrowDark.src = "./images/left-arrow-dark.png";
    arrowWhite.src = "./images/left-arrow-white.png";
  } else {
    moreProjects.classList.remove("max-h-[5000px]", "opacity-100");
    moreProjects.classList.add("max-h-0", "opacity-0");

    toggleText.innerText = "Show more";
    arrowDark.src = "./images/right-arrow-dark.png";
    arrowWhite.src = "./images/right-arrow-white.png";
  }
});

// For modal for my work section

  // Toggle "Show more" projects
  function toggleProjects() {
    const more = document.getElementById("more-projects");
    const text = document.getElementById("showMore-text");

    if (more.classList.contains("opacity-0")) {
      more.classList.remove("max-h-0", "opacity-0");
      text.innerText = "Show less";
    } else {
      more.classList.add("max-h-0", "opacity-0");
      text.innerText = "Show more";
    }
  }

  // Open modal with project info
  function openModal(title, imagePath) {
    const overlay = document.getElementById('projectModal');
    const content = document.getElementById('modalContent');

    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalImage').src = imagePath;

    overlay.classList.remove('opacity-0', 'pointer-events-none');
    setTimeout(() => content.classList.remove('opacity-0', 'scale-95'), 10);
  }

  // Close modal
  function closeModal() {
    const overlay = document.getElementById('projectModal');
    const content = document.getElementById('modalContent');

    content.classList.add('opacity-0', 'scale-95');
    setTimeout(() => {
      overlay.classList.add('opacity-0', 'pointer-events-none');
    }, 300);
  }

  // Close modal on background click
  document.getElementById('projectModal').addEventListener('click', (e) => {
    if (e.target.id === 'projectModal') {
      closeModal();
    }
  });




// For contact form submission and reset the form 
const form = document.getElementById("contact-form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        form.reset(); // Reset form
        document.getElementById("successModal").classList.remove("hidden"); // Show modal
      } else {
        alert("Something went wrong. Please reach out to me via email.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please reach out to me via email.");
    }
  });