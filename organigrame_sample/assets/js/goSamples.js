document.addEventListener("DOMContentLoaded", function () {
  var s = document.createElement("script");
  s.src = "https://www.googletagmanager.com/gtag/js?id=UA-1506307-5";
  document.body.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "UA-1506307-5");
  var getOutboundLink = function (url, label) {
    gtag("event", "click", {
      event_category: "outbound",
      event_label: label,
      transport_type: "beacon",
    });
  };

  _traverseDOM(document);
});

function _traverseDOM(node) {
  if (
    node.nodeType === 1 &&
    node.nodeName === "A" &&
    !node.getAttribute("href")
  ) {
    var inner = node.innerHTML;
    var text = [inner];
    var isStatic = false;
    if (inner.indexOf(",") > 0) {
      text = inner.split(",");
      isStatic = true;
      node.innerHTML = inner.replace(",", ".");
    } else {
      text = inner.split(".");
    }
    if (text.length === 1) {
      node.setAttribute("href", "../api/symbols/" + text[0] + ".html");
      node.setAttribute("target", "api");
    } else if (text.length === 2) {
      node.setAttribute(
        "href",
        "../api/symbols/" +
          text[0] +
          ".html" +
          "#" +
          (isStatic ? "static-" : "") +
          text[1]
      );
      node.setAttribute("target", "api");
    } else {
      alert("Unknown API reference: " + node.innerHTML);
    }
  }
  if (
    node.nodeType === 1 &&
    (node.nodeName === "H2" ||
      node.nodeName === "H3" ||
      node.nodeName === "H4") &&
    node.id
  ) {
    node.addEventListener("click", function (e) {
      window.location.hash = "#" + node.id;
    });
  }
  for (var i = 0; i < node.childNodes.length; i++) {
    _traverseDOM(node.childNodes[i]);
  }
}
