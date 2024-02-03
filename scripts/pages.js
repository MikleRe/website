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
            var styleSheet = document.createElement("style")
            styleSheet.innerText = cssContent
            document.head.appendChild(styleSheet)
        })
        .catch(
            error => console.error('Error fetching CSS:', error)
        );
}

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
            current_page = page_name
            content_container.classList.add("go-left")
            content_container.classList.add("blur")
            sliding = true
        } else {
            current_page = page_name
            await loadHTMLFile("pages/".concat(page_name, ".html"));
            switch(page_name) {
                case "home":
                    home()
                    break;
            }
        }
      })();
}

function finish_transition() {
    console.log(sliding)
    if (sliding) {
        loadHTMLFile("pages/".concat(current_page, ".html")).then(function() {
            content_container.classList.add("no-animation")
            content_container.classList.remove("go-left")
            content_container.classList.add("go-right")
            content_container.classList.remove("no-animation")
            content_container.classList.remove("go-right")
            sliding = false
            switch(current_page) {
                case "home":
                    home()
                    break;
            }
        })
    } else {
        content_container.classList.remove("blur")
    }
}

function home() {
    var stylizeElements = document.querySelectorAll('.stylize')

    stylizeElements.forEach(function (element) {
        var indexes = [5, 7, 9]

        var zero = ["0", "o"]
        var one = ["1", "i"]

        setInterval(function () {
            var start_array = element.innerHTML.split(''); // Convert the string to an array

            var char_idx = indexes[Math.floor(Math.random() * indexes.length)];
            var new_char_idx = Math.floor(Math.random() * zero.length);

            if (zero.includes(start_array[char_idx])) {
                start_array[char_idx] = zero[new_char_idx]
            } else {
                start_array[char_idx] = one[new_char_idx]
            }

            element.innerHTML = start_array.join(''); // Convert the array back to a string
        }, 50);
      });
}