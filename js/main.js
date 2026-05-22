document.addEventListener("DOMContentLoaded", () => {
  // --- NATIVE PHOTO SLIDER ---
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider();
    });

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlider();
    });
  }

  // Otomatik Slider Geçişi (Opsiyonel - 5 saniyede bir)
  setInterval(() => {
    if (slider) {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider();
    }
  }, 5000);

  // --- ARTISTIC LEAFLET MAP ---
  // Konyaaltı, Antalya koordinatları (~36.8615, 30.6378)
  const lat = 36.97492237166594;
  const lng = 30.78167281671004;

  const map = L.map("artisticMap", {
    center: [lat, lng],
    zoom: 14,
    scrollWheelZoom: false, // Sayfa kaydırılırken haritanın kazara büyümesini engeller
  });

  // "Artistic" ve minimalist görünüm sağlayan CartoDB Positron Açık Ton Harita Katmanı
  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    },
  ).addTo(map);

  // Özel Pin Tasarımı (Sitenin yeşil rengine uyumlu)
  const customIcon = L.divIcon({
    className: "custom-map-pin-wrapper",
    html: `
      <div class="pin-drop">
        <div class="pin-logo-inside">
          <img src="assets/images/logo.png" alt="Roastery Club Logo" onerror="this.style.display='none';" />
        </div>
      </div>
    `,
    iconSize: [50, 60] /* Pin boyutu */,
    iconAnchor: [
      25, 60,
    ] /* Pinin tam sivri ucunun haritaya basacağı merkez nokta */,
  });

  // Haritaya işareti ekleme
  L.marker([lat, lng], { icon: customIcon })
    .addTo(map)
    .on("click", () => {
      window.open("https://maps.google.com/?q=36.8615,30.6378", "_blank");
    });

  // --- FORM SUBMIT (Simülasyon) ---
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert(
        "Mesajınız başarıyla alındı! En kısa sürede sizinle iletişime geçeceğiz.",
      );
      form.reset();
    });
  }
});
