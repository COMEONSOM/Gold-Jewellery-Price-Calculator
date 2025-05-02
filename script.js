function handleCalculation() {
  const caratInput = parseFloat(document.getElementById("carat").value);
  const weightInput = parseFloat(document.getElementById("weight").value);
  const rateInput = parseFloat(document.getElementById("rate").value);
  const makingChargesInput = parseFloat(document.getElementById("making").value);
  const resultBox = document.getElementById("result");

  // Validate input values
  if (
    isNaN(caratInput) ||
    isNaN(weightInput) ||
    isNaN(rateInput) ||
    isNaN(makingChargesInput)
  ) {
    resultBox.innerHTML = "❌ Please fill in all fields correctly.";
    resultBox.style.color = "red";
    return;
  }

  // Ensure carat is within acceptable range
  if (![18, 22, 24].includes(caratInput)) {
    resultBox.innerHTML = "❌ Please enter a valid gold carat value (18, 22, or 24).";
    resultBox.style.color = "red";
    return;
  }

  // Calculate purity ratio
  const purityRatio = caratInput / 24;

  // Calculate values
  const pureGoldWeight = purityRatio * weightInput;
  const goldValue = pureGoldWeight * rateInput;
  const gstAmount = goldValue * 0.03;
  const totalPrice = goldValue + gstAmount + makingChargesInput;

  // Format and display result
  const totalFormatted = totalPrice.toLocaleString("en-IN");
  const totalInWords = convertNumberToWords(Math.round(totalPrice));

  resultBox.innerHTML = `
    ✅ <strong>Total Jewellery Price:</strong> ₹${totalFormatted}<br>
    <em>(${totalInWords} rupees only)</em>
  `;
  resultBox.style.color = "#333";
}

// Converts a number to words in Indian numbering system
function convertNumberToWords(num) {
  const ones = [
    "", "one", "two", "three", "four", "five", "six", "seven",
    "eight", "nine", "ten", "eleven", "twelve", "thirteen",
    "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
  ];
  const tens = [
    "", "", "twenty", "thirty", "forty", "fifty",
    "sixty", "seventy", "eighty", "ninety"
  ];

  function toWords(n) {
    if (n < 20) return ones[n];
    if (n < 100)
      return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    if (n < 1000)
      return ones[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + toWords(n % 100) : "");
    if (n < 100000)
      return toWords(Math.floor(n / 1000)) + " thousand" + (n % 1000 ? " " + toWords(n % 1000) : "");
    if (n < 10000000)
      return toWords(Math.floor(n / 100000)) + " lakh" + (n % 100000 ? " " + toWords(n % 100000) : "");
    return toWords(Math.floor(n / 10000000)) + " crore" + (n % 10000000 ? " " + toWords(n % 10000000) : "");
  }

  return toWords(num).replace(/\s+/g, " ").trim();
}
