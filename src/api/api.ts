const BASE_URL = import.meta.env.VITE_BASE_URL as string;
const HISTORY_API_URL = import.meta.env.VITE_HISTORY_API_URL as string;


export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) =>
    response.json()
  );
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  return fetch(`${HISTORY_API_URL}?coinId=${coinId}`).then((response) => {
    return response.json();
  });
}