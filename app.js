const boxPicker = new iro.ColorPicker("#boxPicker", {
  width: 320,
  color: "rgb(255, 0, 0)",
  borderWidth: 1,
  boxHeight: 200,
  layoutDirection: "vertical",
  borderColor: "#fff",
  layout: [
    {
      component: iro.ui.Box,
    },
    {
      component: iro.ui.Slider,
      options: {
        id: 'hue-slider',
        sliderType: 'hue'
      }
    }
  ]
});

const colorFormat = document.getElementById("color-format")

document.body.style.backgroundColor = boxPicker.color.hexString
colorFormat.innerHTML = boxPicker.color.hexString

function colorChangeCallback(color) {
  document.body.style.backgroundColor = color.hexString
  colorFormat.innerHTML = color.hexString
}

boxPicker.on("color:change", colorChangeCallback);

const copy = document.querySelector(".color-info ")
const tost = document.querySelector(".toast")

copy.addEventListener("click", (e) => {
  navigator.clipboard.writeText(e.target.firstElementChild.innerHTML)
  .then(() => {
    tost.classList.add("show")
    setTimeout(() => {
      tost.classList.remove("show")
    }, 2000)
  })
  .catch(err => {
    console.log('Something went wrong', err);
  });
})