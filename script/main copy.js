const slider = document.querySelector('.slider');
const sliderLeft = slider.querySelector('.slider-navigation__button_arrow_left');
const sliderRight = slider.querySelector('.slider-navigation__button_arrow_right');
const sliderItems = slider.querySelector('.slider__items');
let currentItem = 0;

function createSliderItem(item,disable) {
  const newItem = document.createElement('div');
  newItem.classList.add('slider__image');

  newItem.style.backgroundImage = `url('${item.img}')`;

  if (disable) {
    newItem.style.opacity = '.3';
  }

  if (item.video) {
    const playVideoTemplate = document.querySelector('#play-video-template').content;
    const playVideo = playVideoTemplate.cloneNode(true);

    newItem.append(playVideo);
  }

  return newItem;
}

function initialSlider() {
  let newItem = createSliderItem(sliderPhoto[0], false);
  sliderItems.append(newItem);
  newItem = createSliderItem(sliderPhoto[1], true);
  sliderItems.append(newItem);
  sliderItems.style.GridTemplateColumns = `repeat(${sliderPhoto.length-1}, 825px)`;
}

function moveRightItems(arrayItem) {
  arrayItem.map( (item,index) => {
    item.style.transform = `translateX(calc(${currentItem+1} * -855px))`;
    console.log("moveRightItems -> index", index)
    console.log("moveRightItems -> currentItem", currentItem)
    item.style.transition = '2s linear';
  })

}

function moveLeftItems(arrayItem) {
  arrayItem.forEach( item => {
    item.style.transform = `translateX(calc(${currentItem-1} * -855px))`;
    item.style.transition = '2s linear';
  })
}

function changeVisible(item, hide) {
  item.style.transition = '2s linear';
  if (hide) {
    item.style.opacity = '.3';
  } else {
    item.style.opacity = '1';
  }
}


function moveRight() {
  if (currentItem < sliderPhoto.length -2) {
    const newItem = createSliderItem(sliderPhoto[currentItem + 2],true);
    sliderItems.append(newItem);
  }

  let itemList = Array.from(slider.querySelectorAll('.slider__image'));
  moveRightItems(itemList);

  if (currentItem < sliderPhoto.length-1) {
    currentItem += 1;
    changeVisible(itemList[currentItem], false);
  }

}

function moveLeft() {

  let itemList = Array.from(slider.querySelectorAll('.slider__image'));
  if (currentItem != 0) {
    moveLeftItems(itemList);
    changeVisible(itemList[currentItem], false);
    currentItem -= 1;
  }
}

sliderLeft.addEventListener('click', function() {
  moveLeft();
})

sliderRight.addEventListener('click', function() {
  moveRight();
})

initialSlider();

