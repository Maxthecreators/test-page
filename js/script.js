const slider = document.querySelector('.slider');
const slides = slider.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-button');
const nextBtn = document.querySelector('.next-button');
const modal = document.querySelector('.modal');
const modalContent = modal.querySelector('.modal-content');
const closeBtn = modal.querySelector('.close-button');
let currentSlide = 0;
let currentIndex = 0;
let prevIndex = 0;

showSlides(currentSlide);

function setSlideCount() {
    let slideCount = 4;
    const width = window.innerWidth;
    if (width <= 1200) {
        slideCount = 3;
    }
    if (width <= 768) {
        slideCount = 2;
    }
    if (width <= 480) {
        slideCount = 1;
    }
    if (width <= 375) {
        slideCount = 1;
    }
    return slideCount;
}

// function showSlides(index) {
//     // скрываем все слайды
//     slides.forEach((slide) => {
//         slide.style.display = 'none';
//     });
function showSlides(index) {
    const slideCount = setSlideCount();
    let endIndex = index + slideCount;

    if (endIndex >= slides.length) {
        endIndex = slides.length;
    }

    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.display = 'none';
    });
    // показываем текущие 4 слайда
    // for (let i = index; i < index + 4; i++) {
    //     if (slides[i]) {
    //         slides[i].style.display = 'block';
    //     }
    // }
    for (let i = index; i < endIndex; i++) {
        slides[i].style.display = 'block';
    }
    // устанавливаем индекс текущего слайда
    // currentSlide = index;
    slides[index].classList.add('active');
    currentSlide = index;
}

function slideLeft() {
    if (currentSlide > 0) {
        currentSlide--;
        showSlides(currentSlide);
    }
}

// function slideRight() {
//     if (currentSlide < slides.length - 4) {
//         currentSlide++;
//         showSlides(currentSlide);
//     }
// }
function slideRight() {
    const slideCount = setSlideCount();
    if (currentSlide + slideCount < slides.length) {
        currentSlide++;
        showSlides(currentSlide);
    }
}

prevBtn.addEventListener('click', () => {
    slideLeft();
});

nextBtn.addEventListener('click', () => {
    slideRight();
});

// Раскрытие выбранного элемента в модальном окне
const slideCaptions = slider.querySelectorAll('.slide .slide_img');

slideCaptions.forEach((caption, index) => {
    caption.addEventListener('click', () => {
        prevIndex = currentIndex;
        currentIndex = index;
        updateSlide(prevIndex, currentIndex);
        showModal();
    });
});

const updateSlide = (prevIndex, currentIndex) => {
    slides[prevIndex].classList.remove('active');
    slides[currentIndex].classList.add('active');
    slider.scrollTo({
        left: slides[currentIndex].offsetLeft,
        behavior: 'smooth'
    });
};

const showModal = () => {
    modal.style.display = 'block';
    const modalImage = modal.querySelector('img');
    const modalCaption = modal.querySelector('.title_slide');
    const modalPrice = modal.querySelector('.price');
    const modalPrItem = modal.querySelector('.pr_item');
    const modalAddCart = modal.querySelector('.add_cart');
    modalImage.src = slides[currentIndex].querySelector('img').src;
    modalCaption.textContent = slides[currentIndex].querySelector('.title_slide').textContent;
    modalPrice.textContent = slides[currentIndex].querySelector('.price').textContent;
    modalPrItem.textContent = slides[currentIndex].querySelector('.pr_item').textContent;
    modalAddCart.textContent = slides[currentIndex].querySelector('.add_cart').textContent;
};

const closeModal = () => {
    modal.style.display = 'none';
};

closeBtn.addEventListener('click', () => {
    closeModal();
});

modal.addEventListener('click', event => {
    if (event.target === modal) {
        closeModal();
    }
});

window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Скрипт для рейтинга звезд
const ratings = document.querySelectorAll('.rating');
    if (ratings.length > 0) {
        initRatings();
    }
function initRatings() {
    let ratingActive, ratingValue;
    for (let index = 0; index < ratings.length; index++) {
        const rating = ratings[index];
        initRating(rating);
    }
    function initRating(rating) {
        initRatingVars(rating);

        setRatingActiveWidth();

        if (rating.classList.contains('rating_set')) {
            setRating(rating);
        }
    }
    function initRatingVars(rating) {
        ratingActive = rating.querySelector('.rating__active');
        ratingValue = rating.querySelector('.rating__value');
    }
    function setRatingActiveWidth(index = ratingValue.innerHTML) {
        const ratingActiveWidth = index / 0.05;
        ratingActive.style.width = `${ratingActiveWidth}%`;
    }
    function setRating(rating) {
        const ratingItems = rating.querySelectorAll('.rating__item');
        for (let index = 0; index < ratingItems.length; index++) {
            const ratingItem = ratingItems[index];
            ratingItem.addEventListener("mouseenter", function (e) {
                initRatingVars(rating);
                setRatingActiveWidth(ratingItem.value);
            });
            ratingItem.addEventListener("mouseleave", function (e) {
                setRatingActiveWidth();
            });
            ratingItem.addEventListener("click", function (e) {
                initRatingVars(rating);
                if (rating.dataset.ajax) {
                    setRatingValue(ratingItem.value, rating);
                } else {
                    ratingValue.innerHTML = index + 1;
                    setRatingActiveWidth();
                }
            });
        }
    }
};
