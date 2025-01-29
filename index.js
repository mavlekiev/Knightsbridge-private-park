//Метки для карты
const categoriesData = {
  home: [
    {
      image: "./assets/svg/map__home.svg",
      coords: [55.74661902472892, 37.53594260952401],
      name: "home",
      category: "home"
    }
  ],
  beauty: [
    {
      image: "./assets/svg/map__pharmacy.svg",
      coords: [55.747216344386686, 37.53706732408914],
      name: "pharmacy",
      category: "beauty"
    },
    {
      image: "./assets/svg/map__pharmacy.svg",
      coords: [55.743396255001215, 37.5387834188417],
      name: "pharmacy",
      category: "beauty"
    },
    {
      image: "./assets/svg/map__lipstick.svg",
      coords: [55.745911515032155, 37.53091721072207],
      name: "beauty-salon",
      category: "beauty"
    }
  ],
  shops: [
    {
      image: "./assets/svg/map__shop.svg",
      coords: [55.74808697785892, 37.53431820434069],
      name: "shop",
      category: "shops"
    },
    {
      image: "./assets/svg/map__shop.svg",
      coords: [55.749030841047315, 37.53775755744576],
      name: "shop",
      category: "shops"
    },
    {
      image: "./assets/svg/map__shop.svg",
      coords: [55.74471936393437, 37.545304393732984],
      name: "shop",
      category: "shops"
    },
    {
      image: "./assets/svg/map__shop.svg",
      coords: [55.747319081528914, 37.52759329222179],
      name: "shop",
      category: "shops"
    }
  ],
  education: [
    {
      image: "./assets/svg/map__education.svg",
      coords: [55.745342710235455, 37.548190450632994],
      name: "education",
      category: "education"
    },
    {
      image: "./assets/svg/map__education.svg",
      coords: [55.74624438912939, 37.52747340457087],
      name: "education",
      category: "education"
    }
  ],
  kinder_gartens: [
    {
      image: "./assets/svg/map__kindergarten.svg",
      coords: [55.746803905151445, 37.53887335639596],
      name: "kinder garten",
      category: "kinder_gartens"
    },
    {
      image: "./assets/svg/map__kindergarten.svg",
      coords: [55.748449913555355, 37.539817493969196],
      name: "kinder garten",
      category: "kinder_gartens"
    },
    {
      image: "./assets/svg/map__kindergarten.svg",
      coords: [55.74901038235102, 37.54349033724476],
      name: "kinder garten",
      category: "kinder_gartens"
    }
  ],
  entertaiment: [
    {
      image: "./assets/svg/map__cup.svg",
      coords: [55.74714279493567, 37.54157702308297],
      name: "coffeeshop",
      category: "entertaiment"
    },
    {
      image: "./assets/svg/map__cup.svg",
      coords: [55.74391146158705, 37.542364097530296],
      name: "coffeeshop",
      category: "entertaiment"
    },
    {
      image: "./assets/svg/map__cinema.svg",
      coords: [55.74668613370202, 37.52930788531314],
      name: "cinema",
      category: "entertaiment"
    },
    {
      image: "./assets/svg/map__cup.svg",
      coords: [55.748494796613, 37.5290355528769],
      name: "coffeeshop",
      category: "entertaiment"
    }
  ]
};

//Функция подсчета количества меток в каждой категории
const categoryCounter = () => {
  const spanElementCategoryBeauty = document.getElementById("beauty");
  const spanElementCategoryShop = document.getElementById("shops");
  const spanElementCategoryEducation = document.getElementById("education");
  const spanElementCategoryKinderGarten =
    document.getElementById("kinder_gartens");
  const spanElementCategoryEntertaiment =
    document.getElementById("entertaiment");
  spanElementCategoryBeauty.textContent = categoriesData.beauty.length;
  spanElementCategoryShop.textContent = categoriesData.shops.length;
  spanElementCategoryEducation.textContent = categoriesData.education.length;
  spanElementCategoryKinderGarten.textContent =
    categoriesData.kinder_gartens.length;
  spanElementCategoryEntertaiment.textContent =
    categoriesData.entertaiment.length;
};

//Функция добавления карты на страницу
const addMap = () => {
  const categoryButtons = document.querySelectorAll(".map__button");
  const center = [55.74673185166017, 37.536819129277305];
  const init = () => {
    let map = new ymaps.Map("map", {
      center: center,
      zoom: 15
    });
    map.controls.remove("geolocationControl"); // удаляем геолокацию
    map.controls.remove("searchControl"); // удаляем поиск
    map.controls.remove("trafficControl"); // удаляем контроль трафика
    map.controls.remove("typeSelector"); // удаляем тип слоя
    map.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
    // map.controls.remove("zoomControl"); // удаляем контрол зуммирования
    map.controls.remove("rulerControl"); // удаляем контрол правил
    map.behaviors.disable(["scrollZoom"]); // отключаем скролл карты (опционально)

    const createPlacemark = (point) => {
      return new ymaps.Placemark(
        point.coords,
        {},
        {
          iconLayout: "default#image",
          iconImageHref: point.image,
          iconImageSize: [70, 70],
          iconImageOffset: [-35, -50]
        }
      );
    };
    const placemarkHome = createPlacemark(categoriesData.home[0]);
    map.geoObjects.add(placemarkHome);
    for (let category in categoriesData) {
      if (category !== "home") {
        categoriesData[category].forEach((point) => {
          map.geoObjects.add(createPlacemark(point));
        });
      }
    }
    const showPoints = (category) => {
      map.geoObjects.removeAll();
      map.geoObjects.add(placemarkHome);
      categoriesData[category].forEach((point) => {
        map.geoObjects.add(createPlacemark(point));
      });
    };
    categoryButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        categoryButtons.forEach((button) =>
          button.classList.remove("map__button_active")
        );
        const category = e.currentTarget.dataset.category;
        showPoints(category);
        e.currentTarget.classList.add("map__button_active");
      });
    });
  };
  if (typeof ymaps !== "undefined") {
    ymaps.ready(init);
  } else {
    console.error("Yandex Maps API is not loaded!");
  }
};

//Функция реализации слайдера
const slider = () => {
  const buttonLeft = document.querySelector(".footer__button_left");
  const buttonRight = document.querySelector(".footer__button_right");
  const slider = document.querySelector(".footer__slider");
  const wrapper = document.querySelector(".wrapper");
  let styles = window.getComputedStyle(wrapper);
  let paddingLeft = parseInt(styles.getPropertyValue("padding-left"));
  let paddingRight = parseInt(styles.getPropertyValue("padding-right"));
  let counter = 0;
  let position = 0;
  let totalWidth = slider.scrollWidth + paddingLeft + paddingRight;
  const maxNumberOfClicks = () => (window.innerWidth > 768 ? 1 : 3);
  const move = () => {
    paddingLeft = parseInt(styles.getPropertyValue("padding-left"));
    paddingRight = parseInt(styles.getPropertyValue("padding-right"));
    totalWidth = slider.scrollWidth + paddingLeft + paddingRight;
    return (totalWidth - wrapper.offsetWidth) / maxNumberOfClicks();
  };
  const checkButtons = () => {
    if (counter < maxNumberOfClicks())
      buttonRight.classList.remove("footer__button_noactive");
    if (counter === maxNumberOfClicks())
      buttonRight.classList.add("footer__button_noactive");
    if (counter > 0) buttonLeft.classList.remove("footer__button_noactive");
    if (counter === 0) buttonLeft.classList.add("footer__button_noactive");
  };
  const moveSlider = () => {
    slider.style.transform = `translateX(-${position}px)`;
  };
  let touchstartX = 0;
  let touchendX = 0;
  slider.addEventListener("touchstart", (event) => {
    touchstartX = event.touches[0].clientX;
  });
  slider.addEventListener("touchmove", (event) => {
    touchendX = event.touches[0].clientX;
  });
  slider.addEventListener("touchend", () => {
    if (touchendX < touchstartX && counter < maxNumberOfClicks()) {
      counter++;
      position += move();
      moveSlider();
    } else if (touchendX > touchstartX && counter > 0) {
      counter--;
      position -= move();
      moveSlider();
    }
  });
  buttonRight.addEventListener("click", () => {
    if (counter < maxNumberOfClicks()) {
      counter++;
      position += move();
      moveSlider();
      checkButtons();
    }
  });
  buttonLeft.addEventListener("click", () => {
    if (counter > 0) {
      counter--;
      position -= move();
      moveSlider();
      checkButtons();
    }
  });
  checkButtons();
  window.addEventListener("resize", () => {
    position = 0;
    counter = 0;
    move();
    moveSlider();
    checkButtons();
  });
};
window.addEventListener("load", () => {
  addMap();
  categoryCounter();
  slider();
});