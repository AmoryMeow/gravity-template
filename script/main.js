import {
  sliderPhoto
} from './data.js';

export class Slider {
  constructor({
    sliderSelector,
    sliderRight,
    sliderLeft,
    widthPhoto,
    gapPhoto
  }, sliderPhoto) {
    this.container = document.querySelector(sliderSelector);
    this._rightBtn = document.querySelector(sliderRight);
    this._leftBtn = document.querySelector(sliderLeft);

    this._sliderPhoto = sliderPhoto;
    this._widthPhoto = widthPhoto;
    this._shift = widthPhoto + gapPhoto; //855px
    this._widthSlider = this._shift * sliderPhoto.length;
    this.container.style.GridTemplateColumns = `repeat(${sliderPhoto.length}, ${this._widthPhoto})`;

    this._position = 0;
    this._maxPosition = - (this._shift * (sliderPhoto.length-1));

    this._setEventListener();
  }

  _setEventListener() {
    this._rightBtn.addEventListener('click', this._handleMoveRight.bind(this));
    this._leftBtn.addEventListener('click', this._handleMoveLeft.bind(this));
  }

  _handleMoveRight() {
    this._position -= this._shift;
    console.log('_handleMoveRight this._position: ', this._position);
    this._setPosition();
  }

  _handleMoveLeft() {
    this._position += this._shift;
    console.log('_handleMoveLeft this._position: ', this._position);
    this._setPosition();
  }

  _setPosition() {
    this.container.style.transform = `translateX(${this._position}px)`

    this._checkPosition()
  }

  _checkPosition() {
    this._leftBtn.disabled = this._position === 0;
    this._rightBtn.disabled = this._position <= this._maxPosition;
  }

  _createSliderItem(item) {
    const newItem = document.createElement('div');
    newItem.classList.add('slider__image');

    newItem.style.backgroundImage = `url('${item.img}')`;

    // if (disable) {
    //   newItem.style.opacity = '.3';
    // }

    if (item.video) {
      const playVideoTemplate = document.querySelector('#play-video-template').content;
      const playVideo = playVideoTemplate.cloneNode(true);

      newItem.append(playVideo);
    }

    return newItem;
  }

  initialSlider() {
    this._sliderPhoto.map((item) => {
      const newItem = this._createSliderItem(item);
      this.container.append(newItem);
    })
  }
}

const config = {
  sliderSelector: '.slider__items',
  sliderRight: '.slider-navigation__button_arrow_right',
  sliderLeft: '.slider-navigation__button_arrow_left',
  sliderContainer: '.slider__container',
  widthPhoto: 825,
  gapPhoto: 30,
}

const slider = new Slider(config, sliderPhoto);
slider.initialSlider();
