document.addEventListener("DOMContentLoaded", () => {
  // Animated progress bars with percentage display
  const bars = document.querySelectorAll(".progress");
  
  bars.forEach(bar => {
    const target = bar.getAttribute("data-percent");
    const percentage = document.createElement("span");
    percentage.className = "percentage";
    percentage.textContent = `${target}%`;
    bar.parentNode.appendChild(percentage);
    
    setTimeout(() => {
      bar.style.width = target + "%";
    }, 100);
  });

  // Interactive timeline animation
  const timelineItems = document.querySelectorAll(".job, .degree");
  
  timelineItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = `all 0.5s ease ${index * 0.2}s`;
    
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, 500 + index * 200);
  });

  // Dynamic current position duration calculation
  const currentPositions = document.querySelectorAll(".date:contains('Present')");
  
  currentPositions.forEach(position => {
    const text = position.textContent;
    const startDateStr = text.match(/([A-Za-z]+) (\d{4})/);
    if (startDateStr) {
      const startDate = new Date(`${startDateStr[1]} 1, ${startDateStr[2]}`);
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const diffMonths = Math.floor(diffDays / 30);
      const diffYears = Math.floor(diffMonths / 12);
      
      let durationText = "";
      if (diffYears > 0) {
        durationText = `${diffYears} year${diffYears > 1 ? 's' : ''}`;
        if (diffMonths % 12 > 0) {
          durationText += ` ${diffMonths % 12} month${diffMonths % 12 > 1 ? 's' : ''}`;
        }
      } else {
        durationText = `${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
      }
      
      position.textContent = text.replace("Present", `Present (${durationText})`);
    }
  });

  // Skill chart visualization toggle
  const skillsSection = document.querySelector(".skills");
  const chartToggle = document.createElement("button");
  chartToggle.className = "chart-toggle";
  chartToggle.textContent = "View as Chart";
  skillsSection.insertBefore(chartToggle, skillsSection.firstChild.nextSibling);
  
  chartToggle.addEventListener("click", () => {
    skillsSection.classList.toggle("chart-view");
    chartToggle.textContent = skillsSection.classList.contains("chart-view") 
      ? "View as List" 
      : "View as Chart";
  });

  // Hover effects for contact information
  const contactItems = document.querySelectorAll(".contact-info li");
  
  contactItems.forEach(item => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "translateX(5px)";
      item.style.transition = "transform 0.2s ease";
    });
    
    item.addEventListener("mouseleave", () => {
      item.style.transform = "translateX(0)";
    });
  });

  // Profile image hover effect
  const profileImg = document.querySelector(".profile-img");
  
  profileImg.addEventListener("mouseenter", () => {
    profileImg.style.transform = "scale(1.05) rotate(5deg)";
    profileImg.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
  });
  
  profileImg.addEventListener("mouseleave", () => {
    profileImg.style.transform = "scale(1) rotate(0)";
    profileImg.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
  });
});

// Floating bubbles animation
for (let i = 0; i < 30; i++) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  document.body.appendChild(bubble);
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.animationDuration = `${5 + Math.random() * 10}s`;
  bubble.style.opacity = Math.random();
}
