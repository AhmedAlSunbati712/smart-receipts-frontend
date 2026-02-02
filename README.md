# Smart Receipts Frontend

React-based web application for managing receipts with OCR-powered data extraction and spending analytics visualization.

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Data Fetching**: TanStack Query (React Query)
- **Charts**: Recharts
- **UI Components**: Radix UI primitives
- **HTTP Client**: Axios
- **Date Handling**: date-fns
- **Notifications**: react-toastify

## Project Structure

```
src/
├── api/             # API client functions for backend communication
├── assets/          # Static assets
├── components/      # Reusable React components
│   ├── AuthForm/    # Login and registration forms
│   ├── common/      # Shared components (pickers, charts, inputs)
│   ├── Dashboard/   # Dashboard-specific components
│   ├── NavBar/      # Navigation bar
│   ├── NewReceiptModal/  # Receipt upload and editing modal
│   ├── ui/          # Base UI components (shadcn/ui style)
│   └── UploadReceipt/    # Image upload component
├── lib/             # Utility libraries
├── screens/         # Page-level components
│   ├── CategoryAnal/    # Category analytics view
│   ├── Dashboard/       # Main dashboard view
│   ├── Main/            # Root screen with auth routing
│   └── VendorAnal/      # Vendor analytics view
├── types/           # TypeScript type definitions
└── utils/           # Helper functions
```

## Features

### Authentication
- User registration and login
- JWT-based session management
- Protected routes

### Receipt Management
- Upload receipt images (supports common image formats)
- Automatic OCR text extraction
- AI-powered parsing of vendor, items, totals, and dates
- Manual editing and category assignment
- Save receipts with line items

### Analytics Dashboard
- Total spending overview
- Receipt count
- Top spending category
- Spending over time line chart
- Category breakdown pie chart
- Vendor breakdown pie chart
- Configurable time range (7 days, 30 days, 90 days, 1 year)

### Category Analytics
- Detailed breakdown by expense category
- Spending trends per category
- Vendor distribution within categories

### Vendor Analytics
- Spending breakdown by vendor
- Category distribution per vendor
- Historical spending trends

## Prerequisites

- Node.js 18+
- Backend server running (see backend README)

## Environment Variables

Create a `.env` file in the frontend root directory:

```
VITE_API_URL=http://localhost:5000
```

## Installation

Install dependencies:

```bash
npm install
```

## Running the Application

Development mode with hot reload:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

Production build:

```bash
npm run build
npm run preview
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Component Overview

### Screens

- **Main**: Root component handling authentication state and screen routing
- **Dashboard**: Main analytics view with charts and summary stats
- **CategoryAnal**: Detailed category spending analysis
- **VendorAnal**: Detailed vendor spending analysis

### Key Components

- **AuthForm**: Handles user login and registration flows
- **NavBar**: Navigation with screen switching and add receipt button
- **NewReceiptModal**: Multi-step receipt upload flow
  1. Image selection and upload to S3
  2. OCR processing with loading state
  3. Review and edit extracted data
  4. Save receipt
- **UploadReceipt**: Drag and drop or click to upload image
- **PieChartWithLabels**: Reusable pie chart for category/vendor breakdowns
- **SpendingLineChart**: Time series spending visualization
- **CategoryPicker**: Dropdown for selecting expense categories
- **DatePicker**: Calendar component for date selection

## API Integration

All API calls are defined in `src/api/` and use Axios with TanStack Query for caching and state management:

- `user.ts`: Authentication endpoints
- `receipt.ts`: Receipt CRUD operations
- `image.ts`: S3 presigned URL and upload
- `ocr.ts`: OCR job submission and polling
- `gpt.ts`: Text extraction via GPT
- `analytics.ts`: Spending analytics queries

## Styling

The application uses TailwindCSS with a custom color scheme:

- Primary: Teal (`teal`, `darkteal`)
- Clean white backgrounds with subtle borders
- Consistent shadow and border-radius patterns
- Responsive layout with flexbox

## License

ISC
