const copy = document.querySelector(".color-info");
const tost = document.querySelector(".toast");
const colorFormat = document.getElementById("color-format");
const loader = document.querySelector(".loader");

setTimeout(() => {
  try {
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
            id: "hue-slider",
            sliderType: "hue",
          },
        },
      ],
    });

    document.body.style.backgroundColor = boxPicker.color.hexString;
    colorFormat.innerHTML = boxPicker.color.hexString;
    colorChangeText(colorFormat, boxPicker.color.hexString)
    loader.style.display = "none";
    copy.style.display = "flex";

    boxPicker.on("color:change", colorChangeBackground);

  } catch (e) {
    console.log(e);
  }
}, 1500);

copy.addEventListener("click", () => {
  navigator.clipboard
    .writeText(colorFormat.innerHTML)
    .then(() => {
      tost.classList.add("show");
      tost.innerHTML = "Successfully copied!!!"
      setTimeout(() => {
        tost.classList.remove("show");
      }, 1000);
    })
    .catch((err) => {
      console.log(err);
    });
});

function colorChangeBackground(color) {
  document.body.style.backgroundColor = color.hexString;
  colorFormat.innerHTML = color.hexString;
  colorChangeText(colorFormat ,color.hexString)
}

function colorChangeText(text, color) {
  let icon = copy.querySelector("svg")
  let luminance = chroma(color).luminance()
  if (luminance > 0.5) {
    text.style.color = "black"
    icon.style.fill = "black"
    tost.style.color = "black"
  } else {
    text.style.color = "white"
    icon.style.fill = "white"
    tost.style.color = "white"
  }
}