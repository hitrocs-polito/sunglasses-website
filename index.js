import { sunglassesOptions, sunglasses } from '/data.js';

const productDetailsEl = document.getElementById("productDetails");
const productImage = document.getElementById("productImage");
const productFrames = document.getElementsByClassName("product-image_frame")[0];
const productLenses = document.getElementsByClassName("product-image_lenses")[0];

let sunglassesNew = null;

function setSunglasses(sunglassesNew = sunglasses) {
  return sunglassesNew;
}

function render(sunglassesNew) {
  const {
    model: { name, price, thumbImg, cssClass: modelCssClass },
    lenses: { color: lensesColor, price: lensesPrice, cssClass: lensesCssClass },
    frame: { color: frameColor, price: framePrice, cssClass: frameCssClass },
  } = sunglassesNew;

  const totalPrice = price + lensesPrice + framePrice;
  const formattedPrice = `$${totalPrice.toFixed(2)}`;

  productDetailsEl.innerHTML = `
    <h1>${name}</h1>
    <p>Custom: ${lensesColor} lenses, ${frameColor} frames</p>
    <p>${formattedPrice}</p>
  `;

  const currClass = productImage.classList[1];
  productImage.classList.replace(currClass, modelCssClass);

  const currFramesClass = productFrames.classList[1];
  productFrames.classList.replace(currFramesClass, frameCssClass);

  const currLensesClass = productLenses.classList[1];
  productLenses.classList.replace(currLensesClass, lensesCssClass);
}

function addHighlight(clickedItem) {
  const selectedClass = "selected";

  if (clickedItem.classList.contains("product-thumb")) {
    Array.from(document.getElementsByClassName("product-thumb")).forEach(thumb => {
      thumb.classList.remove(selectedClass);
    });
  } else if (clickedItem.classList.contains("product-color-swatch")) {
    const siblings = clickedItem.closest("ul").querySelectorAll("button");
    Array.from(siblings).forEach(swatch => {
      swatch.classList.remove(selectedClass);
    });
  }

  clickedItem.classList.toggle(selectedClass);
}

document.body.addEventListener("click", function(event) {
  const clickedItem = event.target;
  const { model, lenses, frame } = sunglassesNew || sunglasses;

  if (clickedItem.classList.contains("product-thumb")) {
    const currName = clickedItem.dataset.name;
    const modelOptions = sunglassesOptions.models.find(item => item.name === currName);

    const newModel = {
      name: modelOptions.name,
      price: modelOptions.price,
      thumbImg: model.thumbImg,
      cssClass: modelOptions.cssClass,
    };

    sunglassesNew = { model: newModel, lenses, frame };

    addHighlight(clickedItem);
    setSunglasses(sunglassesNew);
    render(sunglassesNew);
  }

  if (clickedItem.classList.contains("product-color-swatch")) {
    const currColor = clickedItem.dataset.color;

    if (clickedItem.closest("div").classList[0] === "product-lenses") {
      const colorOptions = sunglassesOptions.lenses.find(item => item.color === currColor);

      const newLenses = {
        color: colorOptions.color,
        price: colorOptions.price,
        cssClass: colorOptions.cssClass,
      };

      sunglassesNew = { model, lenses: newLenses, frame };
    } else {
      const colorOptions = sunglassesOptions.frames.find(item => item.color === currColor);

      const newFrame = {
        color: colorOptions.color,
        price: colorOptions.price,
        cssClass: colorOptions.cssClass,
      };

      sunglassesNew = { model, lenses, frame: newFrame };
    }

    addHighlight(clickedItem);
    setSunglasses(sunglassesNew);
    render(sunglassesNew);
  }
});

render(sunglasses);
