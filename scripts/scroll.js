window.onload = UpdateHomeItems;

window.addEventListener("scroll", UpdateHomeItems);

function scaleNumber(number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function UpdateHomeItems() {
  let scroll = this.scrollY;
  var page_height = document.body.clientHeight;
  let screen_height = innerHeight;

  var start_fade_threshold = .7;
  var full_opacity_threshold = .3;
  
  var scroll_ratio = scroll / (page_height-screen_height);

  var home_items = document.getElementsByClassName("home-item");

  var tmp_scroll_ratio = (home_items.length-1) * scroll_ratio;

  for (let i = 0; i < home_items.length; i++) {
    if (tmp_scroll_ratio >= i - full_opacity_threshold && tmp_scroll_ratio <= i + full_opacity_threshold) {
      home_items[i].style.opacity = 1;
    } else if (tmp_scroll_ratio >= i - start_fade_threshold && tmp_scroll_ratio <= i + start_fade_threshold) {
      var distance = Math.abs(tmp_scroll_ratio - i);
      var opacity = 1 - scaleNumber(distance, full_opacity_threshold, start_fade_threshold, 0, 1);
      home_items[i].style.opacity = opacity;
    } else {
      home_items[i].style.opacity = 0;
    }
  }

  if (scroll_ratio > .90) {
    footer_opacity = scaleNumber(scroll_ratio, .95, 1, 0, 1);
    document.getElementById("footer").style.opacity = footer_opacity;
  }
}