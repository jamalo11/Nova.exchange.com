const totalBalanceEl = document.getElementById("total-balance");
const usdtPriceEl = document.getElementById("usdt-price");
const tonPriceEl = document.getElementById("ton-price");
const btcPriceEl = document.getElementById("btc-price");

// Функция для получения рыночной стоимости валют
async function fetchMarketPrices() {
  try {
    // Получение данных с CoinGecko API
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=tether,toncoin,bitcoin&vs_currencies=usd"
    );
    const data = await response.json();

    // Обновление цен на основе данных API
    const usdtPrice = data.tether.usd.toFixed(2);
    const tonPrice = data.toncoin.usd.toFixed(2);
    const btcPrice = data.bitcoin.usd.toFixed(2);

    usdtPriceEl.textContent = `$${usdtPrice}`;
    tonPriceEl.textContent = `$${tonPrice}`;
    btcPriceEl.textContent = `$${btcPrice}`;

    // Общий баланс (примерно, суммируем эти значения)
    const totalBalance = (
      parseFloat(usdtPrice) +
      parseFloat(tonPrice) +
      parseFloat(btcPrice)
    ).toFixed(2);

    totalBalanceEl.textContent = `$${totalBalance}`;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

// Запускаем функцию каждые 5 секунд
setInterval(fetchMarketPrices, 5000);

// Первая загрузка данных
fetchMarketPrices();