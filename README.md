# High Priority To-Do List

## Project Setup

- [x] Initialize T3 app (Next.js, TypeScript, Tailwind CSS, shadcn UI)
- [ ] Set up Vercel Postgres database
- [ ] Configure Drizzle ORM
  - [ ] Install Drizzle dependencies
  - [ ] Set up Drizzle configuration file
  - [ ] Create database connection utility

## Authentication System (Lucia Auth)

- [ ] Install and configure Lucia Auth
- [ ] Implement user schema in Drizzle
  - [ ] Define user table structure
  - [ ] Create migration for user table
- [ ] Set up authentication API routes
  - [ ] Implement sign-up route
  - [ ] Implement login route
  - [ ] Implement logout route
- [ ] Create authentication hooks and context
- [ ] Develop sign-up page
  - [ ] Design sign-up form
  - [ ] Implement form validation
  - [ ] Connect form to sign-up API
- [ ] Develop login page
  - [ ] Design login form
  - [ ] Implement form validation
  - [ ] Connect form to login API
- [ ] Implement protected routes logic

## User Profile

- [ ] Define user profile schema in Drizzle
  - [ ] Add fields for bio, avatar URL, etc.
  - [ ] Create migration for profile table
- [ ] Implement API route for fetching user profile
- [ ] Implement API route for updating user profile
- [ ] Create user profile page
  - [ ] Design profile layout
  - [ ] Implement profile data fetching
  - [ ] Create edit profile functionality

## Post Functionality

- [ ] Define post schema in Drizzle
  - [ ] Include fields for content, image URLs, author, timestamp
  - [ ] Create migration for post table
- [ ] Set up file upload functionality
  - [ ] Choose and configure file storage solution (e.g., Vercel Blob Store)
  - [ ] Implement file upload API route
- [ ] Implement post creation API route
- [ ] Implement post retrieval API route
- [ ] Create post creation component
  - [ ] Design post creation form
  - [ ] Implement image upload in the form
  - [ ] Add form validation
  - [ ] Connect form to post creation API
- [ ] Develop post display component
  - [ ] Design individual post layout
  - [ ] Implement lazy loading for post images

## Main Feed

- [ ] Implement feed API route
  - [ ] Create query for fetching recent posts
  - [ ] Implement pagination or infinite scroll logic
- [ ] Develop main feed page
  - [ ] Design feed layout
  - [ ] Implement post loading and display
  - [ ] Add infinite scroll or pagination UI

## Post Interactions

- [ ] Define like schema in Drizzle
  - [ ] Create migration for likes table
- [ ] Implement like/unlike API route
- [ ] Add like functionality to post component
  - [ ] Design like button UI
  - [ ] Implement optimistic updates for likes

## Responsive Design

- [ ] Set up Tailwind CSS breakpoints
- [ ] Implement responsive navbar
- [ ] Ensure responsive layout for main feed
- [ ] Make post creation form responsive
- [ ] Ensure user profile page is mobile-friendly

## Error Handling and Validation

- [ ] Implement global error handling
- [ ] Add input validation to all forms
- [ ] Create error boundary components
- [ ] Implement proper error responses in API routes

## Initial Testing

- [ ] Set up testing environment (e.g., Jest, React Testing Library)
- [ ] Write unit tests for authentication functions
- [ ] Create integration tests for post creation and retrieval
- [ ] Perform manual testing of core user flows
