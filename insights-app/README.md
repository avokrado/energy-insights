# Energy Insights

A simple app to view energy consumption insights.

## How to run

1. Clone the repository

```bash
git clone https://github.com/your-repo/energy-insights.git
```

2. Go into the /server folder and install the dependencies

```bash
cd server
npm i json-server
```

Start the server

```bash
npx json-server --watch <energy-data>.json --port 3000
```

3. Go into the /insights-app folder and install the dependencies

```bash
cd insights-app
npm i
```

Run the app

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Project Structure

```bash
insights-app/
├── app/
├── actions/
│   ├── device.ts # Actions used in the devices route
├── components/
│   ├── ui/ # Shared UI components
│   ├── consumption-bar-graph.tsx # Consumption bar graph component
│   ├── consumption-line-graph.tsx # Consumption line graph component
│   ├── navbar.tsx # Navbar component
│   └── table.tsx # Table component
├── helpers/
│   ├── api.ts # API helper
├── hooks/
│   ├── use-disclosure.ts # Disclosure hook
│   ├── use-query-params.ts # Query params hook
├── routes/
│   ├── dashboard.tsx # Dashboard route
│   ├── devices.tsx # Devices route
│   └── not-found.tsx # Not found route
├── services/
│   ├── api.ts # API service
├── types/
│   ├── device.ts # Device type
│   ├── reading.ts # Reading type
├── utils/
│   ├── cn.ts # Tailwind CSS helper
│   ├── format.ts # Formatting helper
└── routes.ts
```
