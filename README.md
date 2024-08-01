# Marketplace Backend Test

## Installasi

1. Clone repository ini.
2. Jalankan `npm install` untuk menginstall dependencies.
3. Konfigurasikan database di `config/config.json`.
4. Jalankan migrasi dan server dengan `npm start`.

## Endpoint

### Merchant

- Register: `POST /merchant/register`
- Login: `POST /merchant/login`
- Create Product: `POST /merchant/products`
- List Products: `GET /merchant/products`
- List Orders : `GET /merchant/orders`

### Customer

- Register: `POST /customer/register`
- Login: `POST /customer/login`
- List Products: `GET /customer/products`
- Buy Product: `POST /customer/buy`
