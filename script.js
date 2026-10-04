// ================================================================
// PERSONAL INFORMATION
// The main personal information is in index.html.
// This file handles the buttons, popups, background movement,
// copying, calling, email, and saving your contact.
// ================================================================

const info = personalInfo;

// Put the information on the page
document.getElementById("introName").textContent = info.name;
document.getElementById("mainName").textContent = info.name;
document.getElementById("footerName").textContent = info.name;

document.getElementById("phoneText").textContent = info.phone;
document.getElementById("personalMailText").textContent = info.personalGmail;
document.getElementById("businessMailText").textContent = info.businessGmail;


// ================================================================
// OPEN / CLOSE THE SMALL ACTION MENU
// Example: "Call Number" and "Save Number"
// ================================================================

function toggleMenu(menuId, button) {
    const menu = document.getElementById(menuId);

    // Close all other menus first
    document.querySelectorAll(".action-menu").forEach(function(item) {
        if (item !== menu) {
            item.classList.remove("active");
        }
    });

    menu.classList.toggle("active");
}


// ================================================================
// PHONE
// ================================================================

function callNumber() {
    window.location.href = "tel:" + info.phone;
}

function saveContact() {
    const vcard =
`BEGIN:VCARD
VERSION:3.0
FN:${info.name}
TEL:${info.phone}
EMAIL:${info.personalGmail}
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = info.name.replace(/\s+/g, "_") + "_Contact.vcf";
    link.click();

    URL.revokeObjectURL(url);
    showToast("Contact file created!");
}


// ================================================================
// INSTAGRAM
// ================================================================

function openInstagram() {
    window.open(info.instagram, "_blank");
}

function copyInstagram() {
    copyText(info.instagram, "Instagram link copied!");
}


// ================================================================
// TIKTOK
// ================================================================

function openTikTok() {
    window.open(info.tiktok, "_blank");
}

function copyTikTok() {
    copyText(info.tiktok, "TikTok link copied!");
}

// ================================================================
// FACEBOOK
// ================================================================

function openFacebook() {
    window.open(info.facebook, "_blank");
}

function copyFacebook() {
    copyText(info.facebook, "Facebook link copied!");
}

// ================================================================
// PERSONAL GMAIL
// ================================================================

function emailPersonal() {
    window.location.href = "mailto:" + info.personalGmail;
}

function copyPersonalEmail() {
    copyText(info.personalGmail, "Personal Gmail copied!");
}


// ================================================================
// BUSINESS GMAIL
// ================================================================

function emailBusiness() {
    window.location.href = "mailto:" + info.businessGmail;
}

function copyBusinessEmail() {
    copyText(info.businessGmail, "Business Gmail copied!");
}


// ================================================================
// COPY FUNCTION
// ================================================================

function copyText(text, message) {
    navigator.clipboard.writeText(text)
        .then(function() {
            showToast(message);
        })
        .catch(function() {
            showToast("Copy failed. Please copy it manually.");
        });
}


// ================================================================
// SMALL TOAST MESSAGE
// ================================================================

function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function() {
        toast.classList.remove("show");
    }, 2200);
}


// ================================================================
// MOVING BLURRED BACKGROUND
// JavaScript gently moves the blurred circles based on the mouse.
// On phones, the circles still move using the automatic animation.
// ================================================================

const glowOne = document.querySelector(".glow-one");
const glowTwo = document.querySelector(".glow-two");
const glowThree = document.querySelector(".glow-three");

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", function(event) {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
});

function moveBackground() {
    currentX += (mouseX - currentX) * 0.025;
    currentY += (mouseY - currentY) * 0.025;

    glowOne.style.transform =
        `translate(${currentX * 35}px, ${currentY * 35}px)`;

    glowTwo.style.transform =
        `translate(${currentX * -45}px, ${currentY * -30}px)`;

    glowThree.style.transform =
        `translate(${currentX * 25}px, ${currentY * -40}px)`;

    requestAnimationFrame(moveBackground);
}

moveBackground();


// ================================================================
// CLOSE ACTION MENUS WHEN CLICKING OUTSIDE
// ================================================================

document.addEventListener("click", function(event) {
    if (!event.target.closest(".contact-item")) {
        document.querySelectorAll(".action-menu").forEach(function(menu) {
            menu.classList.remove("active");
        });
    }
});
