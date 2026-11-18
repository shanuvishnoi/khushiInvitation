# Pratha & Abhinav — Wedding Invitation

A React + Vite wedding invitation with a schedule, Roka photo gallery, venue details, wishes, countdown, music, and flower petals.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Use `npm run build` to build for deployment.

## Add your Roka pictures

**Option 1: Add photos on the website.** Go to **Roka Photos** and click **Add Roka Photos**. Choose multiple image files. These are saved privately in the current browser's IndexedDB, survive page refreshes, and can be removed in the fullscreen viewer. They do **not** automatically appear on other devices or for wedding guests. Clearing browser storage can delete them.

**Option 2: Include photos for everyone (recommended for your published invitation).** Copy your image files into `public/roka/` (e.g. `roka-1.jpg`, `roka-2.jpg`). Then update `public/roka/photos.json` to list their filenames:

```json
["roka-1.jpg", "roka-2.jpg"]
```

Restart or rebuild the website, then deploy it. Photos listed here are shown to every visitor. Keep original photo filenames, including case, exactly as they are in the folder. You can replace or add more photos any time.

## Changes

- Removed the RSVP form, RSVP buttons, and host dashboard.
- Removed the Journey / Love Story section.
- Removed the Captured Memories / old photo gallery.
- Added a dedicated Roka gallery with photo upload, fullscreen viewing, arrow navigation, and removal of locally added images.

## Add your own song (replaces Shehnai ambience)

Create the folder `public/music/` and copy your song to **`public/music/our-song.mp3`**.
The floating **Play Our Song** button plays and pauses your MP3, loops the track, and has a mute toggle.
If your file has another name or location, edit `SONG_URL` in `src/components/MusicPlayer.tsx`.
Browsers usually block unprompted audio, so guests press Play to hear it.
No song was included with this project, so add your own MP3 before sharing the site.

## Scratch the Date

The interactive gold scratch card appears **between the main portrait and the itinerary**. Visitors can scratch with a mouse or finger, select **Reveal Date**, and reset with **Scratch Again**. The card reads the date from `WEDDING_DETAILS.dates.display` in `src/data/weddingData.ts`.

## New: Grand Diya Entrance (welcome animation)

The new full-screen **royal entrance** appears **before** the existing invitation. It contains an ornamental arch, hanging marigold garlands, brass lamps and a central clickable diya.

1. Guests land on a dramatic, dimly lit grand entrance, with a prompt to **tap the diya**.
2. Tapping the diya makes the flame grow, lights up the entrance, starts golden sparkles, reveals **“Welcome to the wedding of Pratha & Abhinav”**, and calls the existing song player's play function.
3. Guests **scroll down** or click **Scroll to enter our celebration** to see the **original invitation, scratch date, itinerary, Roka pictures, venue and footer**, preserved below.
4. The normal floating music controls remain available to pause, play and mute the song after the diya is lit.

**Important:** There is **no MP3 included in this ZIP**. To enable music when guests tap the diya, copy your MP3 to `public/music/our-song.mp3`. The welcoming light animation works even without a song. The player displays a reminder if the MP3 is missing.

**Customize:** Edit the visual and wording in `src/components/GrandEntrance.tsx` and the matching `.grand-entrance` styles in `src/index.css`. Names and wedding date are read from `src/data/weddingData.ts`.

The entrance is responsive to mobile and desktop. People who prefer reduced motion get a simplified animation. The intro intentionally stays in view until the diya is tapped; after that, normal scrolling is enabled.
