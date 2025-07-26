const swiper = new Swiper(".headSwiper", {
    loop: true,//يغير الصور لوحده
    pagination: {
        el: ".swiper-pagination",//النقاط اللي تحت يحطهم دتخل الكلاس
        clickable: true,//للضغط على النقاط
    },
    navigation: {
        nextEl: ".swiper-button-next",
        // الزر اللي ينقل للصورة التالية.
        prevEl: ".swiper-button-prev"
        // ,الزر اللي يرجع للصورة السابقة.


    },
    autoplay: {
        delay: 3000,
        // كل ٣ ثواني تتغير الصورة
        disableOnInteraction: false,
        //  لو المستخدم لمس أو حرك السلايدر، ما توقفش التشغيل التلقائي.
    },
});


window.onscroll = function () { //كل ما المستخدم يعمل Scroll (ينزل بالصفحة)، نفذ اللي جوا الـ function دي
    let btn = document.getElementById("scrollTopBtn");
    if (document.documentElement.scrollTop > 300) { // إذا كان المستخدم نزل أكتر من 300 بكسل في الصفحة
        btn.style.display = "block"; //لو المستخدم نزل أكتر من 300px، اظهر الزر.
    } else {
        btn.style.display = "none"; //لو المستخدم مش نزل تحت كفاية، خبي الزر
    }
};

// لما أضغط الزر، أرجع لأعلى الصفحة
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}






  //=================== Swiper ===================
  new Swiper(".mySwiper", {
    loop: true, // يغير الصور لوحده
    pagination: {
      el: ".swiper-pagination", // النقاط اللي تحت
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next", 
      prevEl: ".swiper-button-prev", 
    },
    autoplay: {
      delay: 3000, // كل 3 ثواني
      disableOnInteraction: false, 
    },
  });

  //=================== Scroll To Top ===================
  window.onscroll = function () {
    let btn = document.getElementById("scrollTopBtn");
    if (document.documentElement.scrollTop > 300) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

let doctors = []; 

async function getDoctors() {
  try {
    const res = await fetch("https://edu-me01.github.io/Json-Data/Hospital.json");

    if (!res.ok) {
      console.error("Can't access API:", res.status);
      return;
    }

    const data = await res.json();
    doctors = data.users || [];

    const topDoctors = doctors.slice(0, 10);

    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "";

    topDoctors.forEach(doctor => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.innerHTML = `
        <div class="card">
          <img src="${doctor.profileImageUrl}" class="card-img-top" alt="${doctor.name}">
          <div class="card-body">
            <h5 class="card-title">${doctor.name}</h5>
           
            <p class="card-email"><i class="fa-solid fa-envelope"></i> ${doctor.email}</p>
            <p class="card-phone"><i class="fa-solid fa-phone"></i> ${doctor.phone}</p>
            <button class="btn btn-primary" onclick="viewDoctor('${doctor.id}')">More Details</button>
          </div>
        </div>
      `;
      cardsContainer.appendChild(slide);
    });

    // بعد ما نخلص تحميلهم، نبدأ السلايدر
    initDoctorsSwiper();

  } catch (error) {
    console.error("Error fetching doctors:", error);
  }
}


  //=================== تهيئة سلايدر الدكاترة ===================
  function initDoctorsSwiper() {
    new Swiper(".doctorsSwiper", {
      slidesPerView: 3,
      spaceBetween: 10,
      loop: true,
      pagination: {
        el: ".doctors-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".doctors-next",
        prevEl: ".doctors-prev",
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 10 },
        576: { slidesPerView: 2, spaceBetween: 20 },
        992: { slidesPerView: 3, spaceBetween: 30 },
      }
    });
  }

  //=================== فتح صفحة تفاصيل الدكتور ===================
  function viewDoctor(id) {
    const doc = doctors.find(d => String(d.id) === String(id));
    if (!doc) {
      Swal.fire({
        title: "Doctor not found!",
        icon: "error",
        timer: 1500,
        showConfirmButton: false
      });
      return;
    }
    localStorage.setItem("doctorId", id);
    localStorage.setItem("doctor", JSON.stringify(doc));
    window.location.href = "details.html"; // عدل الاسم لو عندك صفحة مختلفة
  }

  //=================== Counter Animation ===================
  document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".statu strong");
    let started = false;

    const startCount = () => {
      counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const speed = 50;
        const updateCounter = () => {
          if (count < target) {
            count += Math.ceil(target / 100);
            if (count > target) count = target;
            counter.textContent = count;
            setTimeout(updateCounter, speed);
          }
        };
        updateCounter();
      });
    };

    window.addEventListener("scroll", () => {
      const statusSection = document.querySelector(".status");
      if (!statusSection) return;
      const sectionTop = statusSection.getBoundingClientRect().top;
      const screenHeight = window.innerHeight;

      if (sectionTop < screenHeight && !started) {
        startCount();
        started = true;
      }
    });
  });

  getDoctors();
  const modal = document.getElementById("detailsModal");
const modalContent = document.getElementById("modalDetailsContent");

function showDetails(item) {
  modalContent.innerHTML = `
    <div class="card p-4 shadow-lg border-0 details-card" data-aos="fade-up" data-aos-duration="800">
      <div class="details-content">
        <div class="details-img">
          <img src="${item.profileImageUrl}" class="img-fluid rounded" alt="${item.serviceName}">
        </div>
        <div class="card-body text-center">
          <h3 class="card-title">${item.name}</h3>
          <p class="text-success fs-4 fw-bold">${item.role}</p>
          <p class="fw-semibold">${item.bio}</p>
          
           <p><strong>Country:</strong> ${item.address.country}</p>
          <p><strong>Address:</strong> ${item.address.street}</p>
          <p>city :${item.address.city}</p>
          <p class="code" text-grey>zipCode :${item.address.zipCode}</p>
           <p class="card-text contact-info2" data-aos="fade-up">${item.email}</p>
           <p class="card-text contact-info2" data-aos="fade-up">${item.phone}</p>
          <div class="d-flex justify-content-center gap-2 mt-3 flex-wrap">
            
            <button class="btn btn-secondary" onclick="closeModal()">
              <i class="fa-solid fa-arrow-left"></i> Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  modal.style.display = "flex";  // افتح المودال
}

function closeModal() {
  modal.style.display = "none";  // اقفل المودال
}

// إغلاق عند الضغط على ×
document.querySelector(".close-modal").addEventListener("click", closeModal);

// إغلاق عند الضغط خارج محتوى المودال
window.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});
function viewDoctor(id) {
  const doc = doctors.find(d => String(d.id) === String(id));
  if (!doc) {
    Swal.fire({
      title: "Doctor not found!",
      icon: "error",
      timer: 1500,
      showConfirmButton: false
    });
    return;
  }
  showDetails(doc);  // عرض التفاصيل في مودال بدل الانتقال
}

  

