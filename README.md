# MyChatApp

MyChatApp is a full-stack, real-time chat application inspired by Discord, built with Next.js. It supports messaging, file sharing, audio/video calls, server and channel management, and user roles. The project was created to deepen my understanding of real-time communication, WebRTC, authentication flows, and fullstack app architecture.

---

## Tech Stack

- **Frontend:** Next.js + TypeScript + Tailwind CSS + shadcn/ui  
- **Backend:** Next.js API Routes + Socket.io  
- **Database:** Supabase (PostgreSQL) + Prisma ORM  
- **Authentication:** Clerk  
- **Audio/Video:** LiveKit  
- **File Uploads:** UploadThing  
- **Deployment:** Render

---

## Run Locally

```bash
# Clone the repository
git clone https://github.com/rhuynh06/MyChatApp.git
cd MyChatApp

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Fill in Clerk, Supabase, LiveKit, UploadThing, and database values

# Push database schema (if using Prisma locally)
npx prisma db push

# Start the development server
npm run dev
# App runs at http://localhost:3000

# In your .env:
DATABASE_URL=your_planetscale_db_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id

LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
LIVEKIT_URL=wss://your-livekit-url
```
---

## Tutorial Credit
This project began as a guided build using an [11-hour fullstack Discord Clone tutorial](https://www.youtube.com/watch?v=ZLr3dnLG3wQ), which I used to understand fullstack architecture, real-time communication, and WebRTC. I expanded on it by refining the UI, improving functionality, and deploying the app to production with my own configuration and customizations.
