document.addEventListener("DOMContentLoaded", function () {
  // შემოგვაქვს ცვლადები
  const billInput = document.querySelector(".bill-input");
  const tipButtons = document.querySelectorAll(".tip-button");
  const customTipInput = document.querySelector(".custom-tip-input");
  const peopleInput = document.querySelector(".people-input");
  const tipNum = document.querySelector(".tipNum");
  const personNum = document.querySelector(".personNum");
  const resetButton = document.querySelector(".reset-button");
  const errorMessage = document.querySelector(".error-message");

  // ამ ფუნქციით ვითვლით თიფს და მთლიან გადასახადს
  function updateAmounts() {
    // ვიღებთ გადასახადის ოდენობას. თუ არაა ვალიდური რიცხვი, იწერება 0
    const billAmount = parseFloat(billInput.value);
    // ვიღებთ ხალხის რაოდენობას. თუ ვალიდური რიცხვი არაა, იწერება 0
    const numberOfPeople = parseInt(peopleInput.value);
    let selectedTipPercentage = 0;

    // თიფის ყველა ღილაკს აქვს საწყისი სტილი
    tipButtons.forEach((button) => {
      button.style.backgroundColor = "";
    });

    // თუ ხალხის რაოდენობა არის 0, უნდა ამოვარდეს ერორ მესიჯი
    if (numberOfPeople === 0) {
      peopleInput.style.borderColor = "#E17052";
      peopleInput.style.borderStyle = "solid";
      peopleInput.style.borderWidth = "2px";
      errorMessage.style.display = "block";
      errorMessage.style.color = "#E17052"; 
      return;
    } else {
      peopleInput.style.borderColor = "";
      errorMessage.style.display = "none";
      errorMessage.style.color = "";
    }
    

    // აქ ვამოწმებთ თიფის რა პროცენტი შეირჩა ან თუ არის custom
    tipButtons.forEach((button) => {
      if (button.classList.contains("active")) {
        selectedTipPercentage = parseFloat(button.textContent);
        button.style.backgroundColor = "#0D686D"; // Set the active button color
      }
    });

    // თუ custom % შეირჩა, შესაბამისად ვანახლებთ თიფის %-ს
    if (customTipInput.value) {
      selectedTipPercentage = parseFloat(customTipInput.value);
      // თუ custom % შეირჩა, sxva Rilakebs movacilebT aqtiur klass
      tipButtons.forEach((button) => {
        button.classList.remove("active");
      });
    }

    // აქ ვითვლით თიფს და გადასახადს ერთ ადამიანზე
    const tipPerPerson = (billAmount * (selectedTipPercentage / 100)) / numberOfPeople;
    const totalPerPerson = (billAmount / numberOfPeople) + tipPerPerson;


    if (Number.isNaN(tipPerPerson)) {
      tipNum.textContent = '$00.00';
      personNum.textContent='$00.00';
    } else {
      tipNum.textContent = `${tipPerPerson.toFixed(2)}`;
      personNum.textContent = `$${totalPerPerson.toFixed(2)}`;
    }



  function handleTipButtonClick(event) {
    // ყველა ღილაკს ვაცილებთ აქტიურ კლასს
    tipButtons.forEach((button) => {
      button.classList.remove("active");
      button.style.backgroundColor = ""; // აქტიური ღილაკის ფერი სცილდება
    });

    //დაკლიკებულ ღილაკს ემატება აქტიური კლასი
    event.target.classList.add("active");

    // ემატება აქტიურის ფერი
    event.target.style.backgroundColor = "#0D686D";

    // ვიძახებთ ფუნქციას
    updateAmounts();
  }


  billInput.addEventListener("input", updateAmounts);
  peopleInput.addEventListener("input", updateAmounts);
  tipButtons.forEach((button) => {
    button.addEventListener("click", handleTipButtonClick);
  });

  // Event listener for the custom tip input
  customTipInput.addEventListener("input", () => {
    updateAmounts();
  });

  // რreset-ის ღილაკი
  resetButton.addEventListener("click", () => {
    // დავარესეტოთ ყველა ველიუ
    billInput.value = "";
    peopleInput.value = "";
    customTipInput.value = "";
    updateAmounts();
  });

  updateAmounts();
});
