# Currency Converter Backend

This backend service is part of the SoftTeco interview project, designed to handle currency conversion logic, rate fetching, and caching.

## Features

- **Real-time Currency Rate Fetching**: Retrieves current exchange rates from a third-party API.
- **Smart Caching System**: Caches exchange rates to reduce API calls and improve performance.
- **Currency Conversion**: Converts amounts between different currencies based on real-time rates.
- **Error Handling**: Comprehensive error handling for API requests and server operations.

## Tech Stack

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for handling HTTP requests.
- **Axios**: HTTP client for making API requests.
- **Exchange Rate API**: Third-party service for fetching currency rates.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
   git clone https://github.com/Hristo-Spasov/currency_converter_be.git
   cd currency-converter-backend
2. Install dependencies:
   npm install

### Configuration

1. Create a `.env` file in the root directory.
2. Add the following environment variables:
   ```
   API_KEY=your_api_key_here
   PORT=the_port_number_you_want_to_use
   ```
3. Start the development server:
   npm run dev

### API Endpoints

GET /api/currency/rates: Fetches current exchange rates.
GET /api/currency/codes: Retrieves supported currency codes.
POST /api/currency/convert: Converts an amount from one currency to another.

### Development

The is deployed on Railway, which provides automatic deployments and environment variable management.
