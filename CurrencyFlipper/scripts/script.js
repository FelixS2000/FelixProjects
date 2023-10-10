async function getCurrencyOptions() {
    const apiKey = '4991dffc0ccbf32dff71f879';
    const response = await fetch(`https://v6.exchangeratesapi.io/latest?base=USD&apikey=${apiKey}`);
    const data = await response.json();
    const currencyOptions = Object.keys(data.rates);

    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');

    currencyOptions.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency;
        option.text = currency;
        fromCurrencySelect.appendChild(option);

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.text = currency;
        toCurrencySelect.appendChild(option2);
    });
}

async function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    const apiKey = 'YOUR_API_KEY';
    const response = await fetch(`https://v6.exchangeratesapi.io/latest?base=${fromCurrency}&apikey=${apiKey}`);
    const data = await response.json();

    if (data.error) {
        document.getElementById("result").innerHTML = "Error: " + data.error.info;
    } else {
        const exchangeRate = data.rates[toCurrency];
        const convertedAmount = (amount * exchangeRate).toFixed(2);
        document.getElementById("result").innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    }
}

getCurrencyOptions(); // Populate currency options on page load
