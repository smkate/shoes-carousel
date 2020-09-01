const prev = document.getElementById('btn-prev'),
      next = document.getElementById('btn-next'),
      loudindRange = document.getElementById('louding__range'),
      controlRange = document.getElementById('control__range'),
      slides = document.querySelectorAll('.slide');

let index = 2,
    currentSlideInd = document.getElementById('current-slide-index'),
    sliderBox = document.querySelector('.slides__box'),
    width = 425, // ширина картинки
    count = 1, // видимое количество изображений
    position = 0; // положение ленты прокрутки

// 


const nextSlide = () => {
  if (index < slides.length) {
    // сдвиг вправо
    position -= width * count;
    // последнее передвижение вправо может быть не на 3, а на 2 или 1 элемент
    position = Math.max(position, -width * (slides.length - count));
    sliderBox.style.marginLeft = position + 'px';
    index++;
    loudindRange.style.width = ((controlRange.offsetWidth / slides.length) * index) + 'px';
    currentSlideInd.innerHTML = `0${index}`+`/0${slides.length}`;
  }
};

const prevSlide = () =>  {
  if (index > 1) {
      // сдвиг влево
      position += width * count;
      // последнее передвижение влево может быть не на 3, а на 2 или 1 элемент
      position = Math.min(position, 425)
      sliderBox.style.marginLeft = position + 'px';
      index--;
      loudindRange.style.width = ((controlRange.offsetWidth / slides.length) * index) + 'px';
      currentSlideInd.innerHTML = `0${index}`+`/0${slides.length}`;
  }
};


next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);




// OLD code for refactoring!!!!!

/* этот код помечает картинки, для удобства разработки */
// for(slide of slides) {
//     slide.insertAdjacentHTML('beforeend', `<span style="display:none;">${index}</span>`);
//     index++;
// }



// dropping slides Right To Left
// let slides = slider.querySelector('.slides');

sliderBox.onmousedown = function(event) {
  event.preventDefault(); // предотвратить запуск выделения (действие браузера)

  let shiftX = event.clientX - sliderBox.getBoundingClientRect().left;
  // shiftY здесь не нужен, слайдер двигается только по горизонтали

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  function onMouseMove(event) {
  let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

  // курсор вышел из слайдера => оставить бегунок в его границах.
  if (newLeft < 0) {
    newLeft = 0;
  }
  let rightEdge = slider.offsetWidth - sliderBox.offsetWidth;
  if (newLeft > rightEdge) {
    newLeft = rightEdge;
}

  sliderBox.style.left = newLeft + 'px';
}

function onMouseUp() {
document.removeEventListener('mouseup', onMouseUp);
document.removeEventListener('mousemove', onMouseMove);
}

};

sliderBox.ondragstart = function() {
return false;
};