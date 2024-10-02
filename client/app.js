function getBathValue() {
  const uiBathrooms = document.getElementsByName("uiBathrooms");
  for (let i = 0; i < uiBathrooms.length; i++) {
    if (uiBathrooms[i].checked) {
      return i + 1; // BHK values start from 1
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  const uiBHK = document.getElementsByName("uiBHK");
  for (let i = 0; i < uiBHK.length; i++) {
    if (uiBHK[i].checked) {
      return i + 1; // BHK values start from 1
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");

  const sqft = parseFloat(document.getElementById("uiSqft").value);
  const bhk = getBHKValue();
  const bathrooms = getBathValue();
  const location = document.getElementById("uiLocations").value;
  const estPrice = document.getElementById("uiEstimatedPrice");

  // var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
  var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards

  $.post(url, {
    total_sqft: sqft,
    bhk: bhk,
    bath: bathrooms,
    location: location,
  })
    .done(function (data) {
      console.log(data.estimated_price);
      estPrice.innerHTML = `<h2>${data.estimated_price} Lakh</h2>`;
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Error estimating price:", textStatus, errorThrown);
      estPrice.innerHTML = "<h2>Error estimating price</h2>";
    });
}

function onPageLoad() {
  console.log("Document loaded");

  // var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
  var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.get(url)
    .done(function (data) {
      console.log("Got response for get_location_names request");
      if (data) {
        const locations = data.locations;
        const uiLocations = document.getElementById("uiLocations");
        $(uiLocations).empty(); // Clear existing options
        locations.forEach((location) => {
          const opt = new Option(location);
          $(uiLocations).append(opt);
        });
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Error fetching locations:", textStatus, errorThrown);
    });
}

window.onload = onPageLoad;
