var content_container = ""
var current_page = "none"
var sliding = false

window.onload = function () {
    content_container = document.getElementById("content-container");
    content_container.addEventListener("transitionend", finish_transition)
    updatePages("home");
};

async function loadHTMLFile(filePath) {
    try {
        const response = await fetch(filePath);
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const htmlContent = await response.text();
        document.getElementById('content-container').innerHTML = htmlContent;
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
    if (current_page == page_name || sliding) return;

    /* Update menu */
    var menu_items = document.getElementsByClassName("menu-item");
    
    for (let i = 0; i < menu_items.length; i++) {
        menu_items[i].classList.remove("active");
    }

    document.getElementById(page_name).classList.add("active");

    /* Update content */
    loadCSSFile("styles/".concat(page_name, ".css"));

    (async () => {
        if (current_page != "none") {
            current_page = page_name;
            content_container.classList.add("go-left");
            content_container.classList.add("blur");
            sliding = true;
        } else {
            current_page = page_name;
            await loadHTMLFile("pages/".concat(page_name, ".html"));
            page_event();
        }
      })();
}

function finish_transition() {
    if (sliding) {
        loadHTMLFile("pages/".concat(current_page, ".html")).then(function() {
            content_container.classList.add("no-animation");
            content_container.classList.remove("go-left");
            content_container.classList.add("go-right");
            content_container.classList.remove("no-animation");
            content_container.classList.remove("go-right");
            sliding = false;
            page_event();
        })
    } else {
        content_container.classList.remove("blur");
    }
}

function page_event() {
    switch(current_page) {
        case "home":
            loadcv();
            break;
    }
}

function loadcv() {

}