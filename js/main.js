// Make sure SW are supported

if ("serviceWorker" in navigator) {

  console.log("SW Supported");

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("../sw_cached_site.js")
      .then((reg) => console.log(`SW Registered: ${reg}`))
      .catch((err) => console.log(`SW Error: ${err}`));
  });

}
