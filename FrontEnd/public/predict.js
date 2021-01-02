const Result = {
  0: "Acura Integra Type R 2001",
  1: "Acura RL Sedan 2012",
  2: "Acura TL Sedan 2012",
  3: "Acura TL Type-S 2008",
  4: "Acura TSX Sedan 2012",
  5: "Acura ZDX Hatchback 2012",
  6: "Audi 100 Sedan 1994",
  7: "Audi 100 Wagon 1994",
  8: "Audi A5 Coupe 2012",
  9: "Audi R8 Coupe 2012",
  10: "Audi RS 4 Convertible 2008",
  11: "Audi S4 Sedan 2007",
  12: "Audi S4 Sedan 2012",
  13: "Audi S5 Convertible 2012",
  14: "Audi S5 Coupe 2012",
  15: "Audi S6 Sedan 2011",
  16: "Audi TT Hatchback 2011",
  17: "Audi TT RS Coupe 2012",
  18: "Audi TTS Coupe 2012",
  19: "Audi V8 Sedan 1994",
  20: "BMW 1 Series Convertible 2012",
  21: "BMW 1 Series Coupe 2012",
  22: "BMW 3 Series Sedan 2012",
  23: "BMW 3 Series Wagon 2012",
  24: "BMW 6 Series Convertible 2007",
  25: "BMW ActiveHybrid 5 Sedan 2012",
  26: "BMW M3 Coupe 2012",
  27: "BMW M5 Sedan 2010",
  28: "BMW M6 Convertible 2010",
  29: "BMW X3 SUV 2012",
  30: "BMW X5 SUV 2007",
  31: "BMW X6 SUV 2012",
  32: "BMW Z4 Convertible 2012",
  33: "Ferrari 458 Italia Convertible 2012",
  34: "Ferrari 458 Italia Coupe 2012",
  35: "Ferrari California Convertible 2012",
  36: "Ferrari FF Coupe 2012",
  37: "Ford Edge SUV 2012",
  38: "Ford Expedition EL SUV 2009",
  39: "Ford F-150 Regular Cab 2007",
  40: "Ford F-150 Regular Cab 2012",
  41: "Ford F-450 Super Duty Crew Cab 2012",
  42: "Ford Ranger SuperCab 2011",
  43: "Honda Accord Coupe 2012",
  44: "Honda Accord Sedan 2012",
  45: "Honda Odyssey Minivan 2007",
  46: "Honda Odyssey Minivan 2012",
  47: "Hyundai Accent Sedan 2012",
  48: "Hyundai Azera Sedan 2012",
  49: "Hyundai Elantra Sedan 2007",
  50: "Hyundai Elantra Touring Hatchback 2012",
  51: "Hyundai Genesis Sedan 2012",
  52: "Hyundai Santa Fe SUV 2012",
  53: "Hyundai Sonata Hybrid Sedan 2012",
  54: "Hyundai Sonata Sedan 2012",
  55: "Hyundai Tucson SUV 2012",
  56: "Hyundai Veloster Hatchback 2012",
  57: "Hyundai Veracruz SUV 2012",
  58: "Lamborghini Aventador Coupe 2012",
  59: "Lamborghini Diablo Coupe 2001",
  60: "Lamborghini Gallardo LP 570-4 Superleggera 2012",
  61: "Lamborghini Reventon Coupe 2008",
  62: "Mazda Tribute SUV 2011",
  63: "Mercedes-Benz 300-Class Convertible 1993",
  64: "Mercedes-Benz C-Class Sedan 2012",
  65: "Mercedes-Benz E-Class Sedan 2012",
  66: "Mercedes-Benz S-Class Sedan 2012",
  67: "Mercedes-Benz SL-Class Coupe 2009",
  68: "Porsche Panamera Sedan 2012",
  69: "Suzuki Aerio Sedan 2007",
  70: "Suzuki Kizashi Sedan 2012",
  71: "Suzuki SX4 Hatchback 2012",
  72: "Suzuki SX4 Sedan 2012",
  73: "Toyota 4Runner SUV 2012",
  74: "Toyota Camry Sedan 2012",
  75: "Toyota Corolla Sedan 2012",
  76: "Toyota Sequoia SUV 2012",
};

let model;
$(document).ready(async function () {
  $(".progress-bar").show();
  model = await tf.loadGraphModel("model/model.json");
  $(".progress-bar").hide();
});

$("#image-selector").change(function () {
  let reader = new FileReader();
  reader.onload = function () {
    let dataURL = reader.result;
    $("#selected-image").attr("src", dataURL);
    $("#prediction-list").empty();
  };

  let file = $("#image-selector").prop("files")[0];
  reader.readAsDataURL(file);
});

$("#predictBtn").click(async function () {
  let image = $("#selected-image").get(0);

  let pre_image = tf.browser
    .fromPixels(image, 3)
    .resizeNearestNeighbor([224, 224])
    .expandDims()
    .toFloat()
    .reverse(-1);
  let predict_result = await model.predict(pre_image).data();
  console.log(predict_result);
  let order = Array.from(predict_result)
    .map(function (p, i) {
      return {
        probability: p,
        className: Result[i],
      };
    })
    .sort(function (a, b) {
      return b.probability - a.probability;
    })
    .slice(0, 2);

  $("#prediction-list").empty();
  order.forEach(function (p) {
    $("#prediction-list").append(`<li>${p.className}</li>`);
  });
});
