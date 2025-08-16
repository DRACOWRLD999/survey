### Prerequisites

- Node.js
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/DRACOWRLD999/survey.git
cd survey

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

The application will be available at `http://localhost:4173/`

## Architecture Overview

### Folder Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   └── layout/          # Layout components
├── hooks/               # Custom React hooks
├── pages/               # Step components
├── store/               # Zustand state management
├── types/               # TypeScript type definitions
├── utils/               # Utility functions and validation schemas
└── App.tsx              # Main application component
```

### State Management

**Technology Choice: Zustand with Persistence**

I chose Zustand over Redux or Context API for several reasons:

- **Simplicity**: Less boilerplate than Redux
- **Performance**: No unnecessary re-renders like Context API
- **TypeScript Support**: Excellent type inference
- **Persistence**: Built-in persistence middleware for localStorage

The store manages:

- Form data across all steps
- Step completion tracking
- Navigation guards
- Data persistence across browser sessions

### Routing Strategy

**React Router v7** with:

- Protected routes using step guards
- URL-based navigation (`/step/1`, `/step/2`, `/step/3`)
- Automatic redirection for invalid access attempts
- Back/forward browser navigation support

### Form Validation

**React Hook Form + Zod** for:

- Real-time validation
- TypeScript-first schema validation
- Conditional field requirements
- Custom validation rules

## Implementation Details

### Key Features Implemented

#### 1. Multi-Step Flow

- ✅ Three distinct steps with clear purposes
- ✅ Route-based navigation
- ✅ Progressive data collection

#### 2. State Management & Persistence

- ✅ Zustand store with localStorage persistence
- ✅ Cross-step data sharing
- ✅ Conditional logic (tech stack only for developers)
- ✅ Browser refresh protection

#### 3. Navigation & Edge Cases

- ✅ Step guards preventing unauthorized access
- ✅ Automatic redirection to appropriate step
- ✅ Back/forward navigation handling
- ✅ Direct URL access protection

#### 4. UI/UX Details

- ✅ Form validation with real-time feedback
- ✅ Conditional field rendering
- ✅ Progress indicator
- ✅ Consistent styling with shadcn/ui
- ✅ Disabled states

### Design Decisions & Trade-offs

**State Persistence Choice**: localStorage vs Memory

- **Chosen**: localStorage with Zustand persist
- **Rationale**: Better UX - users don't lose data on refresh
- **Trade-off**: Slightly more complex setup

**Validation Strategy**: Client-side Validation with Zod Schemas

- **Chosen**: Client-side with Zod schemas
- **Rationale**: Immediate feedback, type safety

**UI Library**: Custom CSS vs Component Library

- **Chosen**: shadcn/ui components
- **Rationale**: Professional appearance, accessibility built-in, consistent design system
- **Trade-off**: Larger bundle size, but significantly faster development

## User Experience Features

### Progress Indication

- Visual progress bar showing completion status

### Error Handling

- Field-level validation messages
- Form-level submission validation
- Graceful handling of edge cases

## Future Enhancements

### Implemented Features

- [x] Multi-step form with routing
- [x] Complex state management
- [x] Form validation and UX
- [x] Edge case handling

### Potential Additions

- [ ] API integration for data submission
- [ ] Dark/light theme toggle
- [ ] Comprehensive test suite

## Development Notes

### Time Investment

- **Core Features**: ~3 hours
- **Polish & UX**: ~1 hours
- **Total**: ~4 hours
