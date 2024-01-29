const apiKey = '67i9HWKlwywfSmdVcFlAAwuXvdM1t73j';
const apiUrl = `https://api.apilayer.com/exchangerates_data/live?base=USD&symbols=EUR,GBP&apikey=${apiKey}`;

const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const convertButton = document.getElementById('convertButton');
const convertedAmountSpan = document.getElementById('convertedAmount');

// Set up headers
var myHeaders = new Headers();
myHeaders.append("apikey", apiKey);

// Set up fetch options
var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

// Fetch currency data using your API key
fetch(apiUrl, requestOptions)
    .then(response => response.json())
    .then(data => {
        const currencies = Object.keys(data.rates);

        // Populate the currency selects
        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.text = currency;
            fromCurrencySelect.appendChild(option);
            toCurrencySelect.appendChild(option.cloneNode(true));
        });

        // Set up conversion logic
        convertButton.addEventListener('click', () => {
            const fromCurrency = fromCurrencySelect.value;
            const toCurrency = toCurrencySelect.value;
            const amount = parseFloat(amountInput.value);

            // Use the fetched exchange rates for conversion (replace with your logic)
            const conversionRate = data.rates[toCurrency] / data.rates[fromCurrency];
            const convertedAmount = amount * conversionRate;

            convertedAmountSpan.textContent = convertedAmount.toFixed(2);
        });
    })
    .catch(error => console.log('error', error));
