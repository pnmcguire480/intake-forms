# CodeGlass — Pattern Library

Named patterns that recur in the React / TypeScript / Supabase / Tailwind / Vite stack.
Use these names consistently in every walkthrough so the user builds a vocabulary.

When you encounter one of these patterns in code you're writing or explaining,
call it out by its bold name. Over time, the user will recognize them on sight.

---

## Table of Contents

1. [Data Patterns](#data-patterns)
2. [Component Patterns](#component-patterns)
3. [State Patterns](#state-patterns)
4. [Supabase Patterns](#supabase-patterns)
5. [TypeScript Patterns](#typescript-patterns)
6. [Routing Patterns](#routing-patterns)
7. [Styling Patterns](#styling-patterns)

---

## Data Patterns

### **Fetch-on-Mount**
Load data once when a component first appears.
```tsx
useEffect(() => {
  fetchData()
}, [])  // empty array = run once on mount
```
Analogy: "Do this chore once when you walk in the door. Don't do it again unless you
leave and come back."
Where you'll see it: any page or component that shows data from Supabase on load.

### **Fetch-on-Change**
Reload data whenever a specific value changes.
```tsx
useEffect(() => {
  fetchData(hiveId)
}, [hiveId])  // runs again whenever hiveId changes
```
Analogy: "Every time the channel changes, tune the radio."
Where you'll see it: detail pages where the URL parameter changes, filtered lists.

### **Optimistic Update**
Update the UI immediately, then send the change to the database. Roll back if it fails.
Analogy: "Move the piece on the chessboard now, then check if the server agrees.
If it doesn't, put the piece back."
Where you'll see it: toggling status, liking items, drag-and-drop reordering.

### **Callback Prop**
A parent passes a function to a child. The child calls it when something happens.
The child doesn't know what the function does — it just signals "I'm done."
```tsx
// Parent
<InspectionForm onSuccess={() => refetchList()} />
// Child calls props.onSuccess() after saving
```
Analogy: "The child rings a bell. The parent decides what to do when they hear it."
Where you'll see it: forms, modals, any child that triggers parent updates.

### **Data Journey**
Not a code pattern but a tracing technique. Follow data from user action → function →
API/database → response → screen update. Every CodeGlass walkthrough has one.

---

## Component Patterns

### **Controlled Input**
Form fields whose value lives in React state. Every keystroke updates state,
and the field displays whatever state holds.
```tsx
const [name, setName] = useState('')
<input value={name} onChange={e => setName(e.target.value)} />
```
Analogy: "The input is a puppet — state pulls the strings."
Where you'll see it: every form.

### **Conditional Render**
Show different things based on state. Three common shapes:
```tsx
// Ternary — show one of two things
{isLoading ? <Spinner /> : <DataList />}

// Short-circuit — show or hide
{error && <ErrorMessage text={error} />}

// Early return — bail out of the whole component
if (!user) return <LoginPrompt />
```
Analogy: "If/then/else, but for what shows up on screen."

### **List Render (Map Pattern)**
Turn an array of data into an array of components.
```tsx
{hives.map(hive => <HiveCard key={hive.id} hive={hive} />)}
```
The `key` prop is required — it's how React tracks which item is which when the
list changes. Always use a unique ID, never the array index.
Analogy: "Each row in your spreadsheet becomes a card on screen."

### **Container/Presenter Split**
One component fetches data and manages state (container). Another component just
renders the UI (presenter). The presenter is reusable because it doesn't know
where the data comes from.
Analogy: "The chef (container) decides what to cook. The plate (presenter) just
displays it nicely."

### **Layout Wrapper**
A component that provides shared structure (nav, sidebar, footer) and renders
child pages inside it using `children` or `<Outlet />`.
```tsx
<Layout>
  <PageContent />  {/* this is the children */}
</Layout>
```
Where you'll see it: root layouts in React Router, dashboard shells.

---

## State Patterns

### **Local State (useState)**
State that belongs to one component and nobody else needs.
```tsx
const [isOpen, setIsOpen] = useState(false)
```
Use for: form fields, toggles, UI visibility, component-scoped data.

### **Lifted State**
When two sibling components need the same data, move the state up to their
shared parent. The parent passes it down as props.
Analogy: "Two kids both need the remote. Give it to the parent, who passes it
to whoever needs it."

### **Loading/Error/Data Triad**
Three pieces of state that almost always travel together:
```tsx
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
```
Where you'll see it: every component that fetches data. This triad drives the
conditional rendering: loading → show spinner, error → show message, data → show content.

---

## Supabase Patterns

### **Single-Client**
One Supabase client for the whole app, created in `lib/supabase.ts` and imported
everywhere. Never call `createClient()` inside a component.
Why: auth state, realtime subscriptions, and connection pooling all depend on
sharing one client instance.

### **RLS-Aware Insert**
When inserting with RLS (Row Level Security) active, the response can return
success with `data: null` if the policy blocks it — no error thrown.
Always check both:
```tsx
const { data, error } = await supabase.from('table').insert(row).select()
if (error) { /* handle */ }
if (!data) { /* RLS blocked it — handle this too */ }
```

### **Type-Generated Schema**
Run `supabase gen types typescript` to create types from your database schema.
Import them for insert/select operations so TypeScript catches mismatches at
compile time, not runtime.
Where the types live: usually `types/database.ts` or `types/supabase.ts`.

### **Auth Guard**
Check for a session before rendering protected content. Usually done in a
route wrapper component.
```tsx
const { data: { user } } = await supabase.auth.getUser()
if (!user) redirect('/login')
```

### **Realtime Subscription**
Listen for database changes and update the UI live:
```tsx
useEffect(() => {
  const channel = supabase.channel('inspections')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'inspections' },
      payload => setInspections(prev => [...prev, payload.new])
    )
    .subscribe()
  return () => { supabase.removeChannel(channel) }  // cleanup on unmount
}, [])
```
The `return () => cleanup` part is critical — without it, you get duplicate
listeners every time the component re-renders.

---

## TypeScript Patterns

### **Interface for Props**
Define the shape of what a component receives:
```tsx
interface HiveCardProps {
  hive: Hive       // what type of data
  onSelect: (id: string) => void  // what callback signature
}
```
Analogy: "A contract — the component says 'I need these things to work.'"

### **Type Narrowing**
Check what type something is before using it:
```tsx
if (typeof value === 'string') { /* now TS knows it's a string */ }
if ('email' in user) { /* now TS knows user has an email field */ }
```
Analogy: "Check the label before opening the box."

### **Generic Types**
A type that takes a parameter — lets you reuse the same shape for different data:
```tsx
type ApiResponse<T> = { data: T | null; error: string | null }
// ApiResponse<Hive> means data is a Hive
// ApiResponse<User> means data is a User
```
Analogy: "A shipping box template — same box, different contents."

---

## Routing Patterns

### **File-Based Mental Model**
React Router maps URLs to components. Think of each route as a page:
`/dashboard` → renders `DashboardPage`, `/hives/:id` → renders `HiveDetailPage`.
The `:id` part is a parameter — it changes per URL but the same component handles all of them.

### **Protected Route Wrapper**
A component that checks auth before rendering its children:
```tsx
function ProtectedRoute({ children }) {
  const user = useAuth()
  if (!user) return <Navigate to="/login" />
  return children
}
```
Where you'll see it: wrapping any route that requires login.

### **Nested Routes / Outlet**
A parent route renders a layout, and child routes render inside `<Outlet />`:
```
/dashboard          → Dashboard layout with sidebar
/dashboard/hives    → Hive list inside that layout
/dashboard/settings → Settings inside that layout
```

---

## Styling Patterns

### **Utility-First (Tailwind)**
Style with class names directly on elements instead of writing separate CSS:
```tsx
<button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
```
The classes read left to right: blue background, white text, padding, rounded corners,
darker blue on hover.

### **Conditional Classes**
Toggle classes based on state:
```tsx
className={`px-4 py-2 ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
```
For complex conditionals, use `clsx` or `cn` (if you see either in the codebase,
that's what they're for).

### **Responsive Prefixes**
Tailwind uses breakpoint prefixes: `sm:`, `md:`, `lg:`, `xl:`.
```tsx
className="w-full md:w-1/2 lg:w-1/3"
```
Reads as: full width on mobile, half width on medium screens, one-third on large.
Mobile-first: unprefixed classes apply to all sizes, prefixed classes override upward.
