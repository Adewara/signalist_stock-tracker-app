# Signalist: Personalized Stock Watchlist & News Summaries

## 🚀 Project Overview

Signalist is a modern web application designed to empower users with personalized stock market insights. It features a robust watchlist system, real-time stock data visualization through TradingView widgets, a powerful stock search, and an innovative daily news summary service powered by AI. Users receive tailored market news directly to their inbox, helping them stay informed and make smarter investment decisions.

This project showcases a full-stack architecture built with Next.js, leveraging server actions, background jobs with Inngest, and integration with various third-party APIs for financial data and AI capabilities.

## ✨ Key Features

*   **User Authentication:** Secure sign-up and sign-in functionality with personalized welcome emails.
*   **Personalized Watchlist:** Users can add and manage their favorite stocks to a dedicated watchlist.
*   **Dynamic Stock Details Pages:** Interactive stock pages display comprehensive data, including:
    *   Symbol Info
    *   Candlestick Charts
    *   Baseline Charts
    *   Technical Analysis
    *   Company Profile
    *   Company Financials
*   **Real-time Stock Search:** A fast and responsive search interface to find stocks by symbol or company name.
*   **AI-Powered Daily News Summaries:**
    *   Automated daily emails triggered by a cron schedule.
    *   Fetches news articles relevant to a user's watchlist.
    *   If no watchlist is present, provides general market news.
    *   Utilizes the Google Gemini AI model to summarize news articles into concise, personalized digests for each user.
*   **Responsive UI:** Built with Tailwind CSS and ShadCN UI for a modern and adaptive user experience across devices.

## 🛠️ Tech Stack

*   **Frontend:**
    *   [Next.js 14 (App Router)](https://nextjs.org/)
    *   [React](https://react.dev/)
    *   [TypeScript](https://www.typescriptlang.org/)
    *   [Tailwind CSS](https://tailwindcss.com/)
    *   [ShadCN UI](https://ui.shadcn.com/)
    *   [Lucide React](https://lucide.dev/icons/) (for icons)
    *   [better-auth](https://www.npmjs.com/package/better-auth) (User Authentication)
    *   [CMDK](https://cmdk.vercel.app/) (Command Menu)
    *   [Next-Themes](https://github.com/pacocoursey/next-themes) (Theming)
    *   [React Hook Form](https://react-hook-form.com/) (Form Validation)
    *   [Sonner](https://sonner.emilkowalski.no/) (Toasts/Notifications)
*   **Backend:**
    *   [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
    *   [Mongoose](https://mongoosejs.com/) (ODM for MongoDB)
    *   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud Database)
    *   [Nodemailer](https://nodemailer.com/about/) (Email sending)
*   **External Services & APIs:**
    *   [Finnhub API](https://finnhub.io/) (Stock search, company news, market news)
    *   [TradingView Widgets](https://www.tradingview.com/widget/) (Interactive charts and financial data visualization)
    *   [Inngest](https://www.inngest.com/) (Reliable Background Jobs & Event-Driven Workflows)
    *   [Google Gemini API](https://ai.google.dev/models/gemini) (AI for content generation/summarization)

## 🚀 Getting Started

Follow these steps to set up and run the Signalist project locally.

### Prerequisites

*   Node.js (v18.x or higher)
*   npm or Yarn
*   Git

### 1. Clone the repository

```bash
git clone <your-repo-link>
cd stocks_app
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env` file in the root of your project and add the following environment variables. Obtain these from the respective service providers.

```env
# MongoDB Atlas Connection String
MONGODB_URI="mongodb+srv://<your-username>:<your-password>@cluster0.rdbykvo.mongodb.net/<your-database-name>?retryWrites=true&w=majority"

# Finnhub API Key (for stock data)
NEXT_PUBLIC_FINNHUB_API_KEY="YOUR_FINNHUB_API_KEY"

# Nodemailer for sending emails
NODEMAILER_EMAIL="your-email@gmail.com"
NODEMAILER_PASSWORD="your-email-app-password" # Use an app-specific password for Gmail

# Inngest configuration (check Inngest dashboard for keys)
INNGEST_SIGNING_KEY="YOUR_INNGEST_SIGNING_KEY"
INNGEST_EVENT_KEY="YOUR_INNGEST_EVENT_KEY"

# Google Gemini API Key (for AI features via Inngest)
GEMINI_API_KEY="YOUR_GEMINI_API_KEY" 
```

**Important Notes for `MONGODB_URI`:**

*   **IP Whitelisting:** If you encounter `MongooseServerSelectionError` or `querySrv ETIMEOUT` errors, you **must** whitelist your current public IP address in your MongoDB Atlas cluster's Network Access settings. Your IP address can change, especially after restarting your computer or router.
    *   **Development Tip:** For local development, you can temporarily add `0.0.0.0/0` (allow access from anywhere) to your Atlas IP whitelist. **Remove this for production!**
*   **Connection String Accuracy:** Ensure the `MONGODB_URI` exactly matches the connection string provided by MongoDB Atlas, including your correct database username and password.

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📂 Project Structure (Key Areas)

*   **`app/(root)`:** Contains the main application routes, including dynamic stock detail pages.
*   **`app/(auth)`:** Handles authentication-related routes.
*   **`lib/actions`:** Next.js Server Actions for handling server-side logic and API calls (e.g., `user.actions.ts`, `watchlist.actions.ts`, `finnhub.actions.ts`, `stock.actions.ts`).
*   **`lib/inngest`:** Inngest functions defining background jobs and event handlers (e.g., `functions.ts` for news summaries, welcome emails).
*   **`lib/nodemailer`:** Email sending utilities using Nodemailer.
*   **`lib/constants.ts`:** Centralized constants, including TradingView widget configurations.
*   **`lib/utils.ts`:** General utility functions (e.g., date formatting, news article validation).
*   **`database`:** Mongoose setup (`mongoose.ts`) and MongoDB schemas/models (`models/watchlist.model.ts`).
*   **`components`:** Reusable React components (e.g., `SearchCommand.tsx`, `TradingViewWidget.tsx`, `WatchlistButton.tsx`, ShadCN UI components in `ui/`).
*   **`hooks`:** Custom React hooks (e.g., `useDebounce.tsx`, `useTradingViewWidget.tsx`).
*   **`types`:** Global TypeScript type definitions (`global.d.ts`).

## ⚙️ API Integrations & Background Processes

### Finnhub API

*   **Purpose:** Powers the stock search functionality and fetches real-time news data (company-specific and general market news).
*   **Integration:** Handled in `lib/actions/finnhub.actions.ts` via server actions.

### TradingView Widgets

*   **Purpose:** Provides interactive and rich visualizations for stock data (charts, company profiles, financials).
*   **Integration:** The `components/TradingViewWidget.tsx` component dynamically embeds TradingView scripts, configured via constants in `lib/constants.ts` and managed by the `hooks/useTradingViewWidget.tsx` custom hook.

### Inngest (Background Jobs)

Inngest is used to orchestrate reliable, asynchronous tasks in the background, ensuring critical processes like email sending and AI summarization are not interrupted by frontend activity or serverless function timeouts.

*   **`sendSignUpEmail` (Event: `app/user.created`)**
    *   Triggered when a new user signs up.
    *   Uses Google Gemini AI (`gemini-2.5-flash-lite`) to generate a personalized welcome message based on user profile data.
    *   Sends a welcome email to the new user via Nodemailer.
*   **`sendDailyNewsSummary` (Event: `app/send.daily.news` or Cron: `57 0 * * *` UTC daily)**
    *   Runs daily at 00:57 AM UTC (or manually triggered by event).
    *   **Step 1:** Fetches all registered users who are opted in for news emails.
    *   **Step 2:** For each user, it retrieves their personalized watchlist symbols. If a watchlist exists, it fetches company-specific news. Otherwise, it fetches general market news. News articles are capped at a maximum of 6 per user.
    *   **Step 3:** Uses Google Gemini AI (`gemini-2.5-flash-lite`) to summarize the collected news articles into a concise digest tailored for the user.
    *   **Step 4:** Sends the AI-generated news summary email to each user via Nodemailer.

### Google Gemini API (AI)

*   **Purpose:** Integrated via Inngest to provide intelligent content generation.
*   **Usage:**
    *   Personalizing welcome emails for new users.
    *   Summarizing multiple news articles into a coherent daily digest for each user.

### MongoDB Atlas

*   **Purpose:** The primary database for storing user data, watchlists, and other application-related information.
*   **Integration:** Connected via Mongoose, with a connection utility in `database/mongoose.ts` that handles caching for Next.js hot-reloads.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

---
**Feel free to replace placeholders like `<your-repo-link>` and API keys with your actual project details.**
