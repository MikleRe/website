var content_container = ""
var content_container_next = ""

var current_page = "none"
var sliding = false

var direction = 1;

var pages = ["home", "cv", "projects", "contact"]

const sleep = ms => new Promise(r => setTimeout(r, ms));

window.onload = function () {
    content_container = document.querySelector(".content-container:not(.next)");
    content_container.addEventListener("transitionend", finish_transition);
    content_container_next = document.querySelector(".content-container.next");

    updatePages("home");
};

async function loadHTMLFile(filePath) {
    try {
        const response = await fetch(filePath);
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const htmlContent = await response.text();
        content_container.innerHTML = htmlContent;
      } catch (error) {
        console.error('Error fetching HTML:', error);
    }
}

function loadCSSFile(filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(cssContent => {
            // Inject the HTML content into the container
            var styleSheet = document.createElement("style");
            styleSheet.innerText = cssContent;
            document.head.appendChild(styleSheet);
        })
        .catch(
            error => console.error('Error fetching CSS:', error)
        );
}

/*
 * Load Page content
 */
function updatePages(page_name) {
    // If we want to travel to the same page or we are already travelling
    if (current_page == page_name || sliding) return;

    /* Update menu */
    var menu_items = document.getElementsByClassName("menu-item");
    
    for (let i = 0; i < menu_items.length; i++) {
        menu_items[i].classList.remove("active");
    }

    document.getElementById(page_name).classList.add("active");

    // Compute sliding direction
    direction = Math.sign(pages.indexOf(current_page) - pages.indexOf(page_name));
    // Put next div into the right position TODO: FIX
    content_container_next.style.transform = "translateX(" + -direction*100 + "%)";

    /* Update Style */
    loadCSSFile("styles/".concat(page_name, ".css"));

    (async () => {
        if (current_page != "none") {
            // Switching from page to another
            current_page = page_name;
            content_container.style.transform = "translateX(" + direction*100 + "%)";
            sliding = true;
        } else {
            // Loading first page
            current_page = page_name;
            await loadHTMLFile("pages/".concat(page_name, ".html"));
            page_event();
        }
      })();
}

/*
 * Triggered by the finished transition of actual grid once it is out of sight
 */ 
function finish_transition() {
    if (sliding) {
        // Switch the content_container with the next one
        var tmp = content_container;
        content_container = content_container_next;
        content_container_next = tmp;

        content_container_next.removeEventListener("transitionend", finish_transition);
        content_container.addEventListener("transitionend", finish_transition);

        content_container.classList.remove("next");
        content_container_next.classList.add("next");

        content_container_next.innerHTML = "";

        loadHTMLFile("pages/".concat(current_page, ".html")).then(function() {
            var header_px = document.getElementById('header').offsetHeight + "px";
            content_container.style.paddingTop = header_px;
            content_container_next.style.paddingTop = "0px";
            // Finish animation
            content_container.style.transform = "";
            sliding = false;
            page_event();
        })
    }
}

function page_event() {
    switch(current_page) {
        case "home":
            home();
            break;
    }
}

function home() {

}