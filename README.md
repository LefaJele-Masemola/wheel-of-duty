# 🎡 Wheel of Duty

A React-based **team duty rotation app** that uses a spinning wheel to fairly distribute shift assignments or tasks among team members. Perfect for on-call rotations, morning watch duty, or any team task assignment.

## Features

✨ **Interactive Spinning Wheel** - Animated wheel with smooth spinning animation and winner announcement
🎯 **Weighted Selection** - Team members picked less frequently get better odds of being selected
⏸️ **Skip Option** - Temporarily pause a team member from the current rotation
📊 **Rotation History** - View the last 6 picks with dates
💾 **Persistent Data** - All data saved to browser localStorage
🎨 **Modern UI** - Dark theme with colorful wheel segments and smooth animations
🎉 **Confetti Celebration** - Fun confetti animation when a winner is announced

## How It Works

1. **Add Your Team** - Enter team member names and click Add
2. **Spin the Wheel** - Click "🎉 Spin it!" to randomly select someone
3. **Weighted Odds** - People picked least have 4x better odds than those freshly picked
4. **Skip if Needed** - Use the ⏸ button to pause someone from today's rotation
5. **Track History** - See recent picks in the history section

## Project Structure

```
src/
├── App.jsx                 # Main component with state management
├── App.css                 # Global styles and animations
├── main.jsx                # React entry point
├── index.css               # Base styles
└── components/
    ├── Wheel.jsx          # SVG wheel rendering and animation
    └── RosterChips.jsx    # Team member display with controls
```

## Installation & Setup

### Requirements
- Node.js 16+
- npm or yarn

### Install Dependencies
```bash
cd team-duty-picker
npm install
```

### Development Server
```bash
npm run dev
```
The app will run at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## Technical Stack

- **React 18** - UI framework
- **Vite** - Fast build tool and dev server
- **localStorage** - Data persistence
- **SVG** - Wheel rendering
- **CSS3** - Animations and styling

## How the Weighted Selection Works

The app uses a weighted random selection algorithm:

```javascript
const weights = (pool) => {
  const minCount = Math.min(...pool.map(p => p.count));
  // People picked the least get 4x weight (3 + 1)
  return pool.map(p => 1 + (p.count - minCount === 0 ? 3 : 0));
};
```

**Example:**
- Alex picked 3 times → weight: 1
- Roli picked 2 times → weight: 1  
- Asanda picked 0 times → weight: 4 (4x better odds!)
- Nthabiseng picked 0 times → weight: 4 (4x better odds!)

## Component Details

### App.jsx
Main application component managing:
- Roster state (team members, pick counts)
- Spin logic with weighted selection
- Rotation history
- localStorage persistence

### Wheel.jsx
Renders the interactive wheel:
- SVG path generation for segments
- Polar coordinate calculations
- 3.6s spin animation on selection
- Dynamic sizing based on team size

### RosterChips.jsx
Displays team members as interactive chips:
- Color-coded with palette indicator
- Toggle active/skip status
- Remove team member
- XSS protection with HTML escaping

## Data Storage

All data is automatically saved to browser localStorage:
- `roster` - Team members with pick counts
- `history` - Recent spin results
- `nextId` - Counter for generating unique IDs

Clear browser localStorage to reset the app to defaults.

## Customization

### Change Default Team Names
Edit the default roster in `App.jsx` line 34-39:
```javascript
const [roster, setRoster] = useState(() => {
  return [
    { id: 1, name: "Your Name", count: 0, active: true },
    // Add more...
  ];
});
```

### Adjust Colors
Edit the `PALETTE` array in `App.jsx` to customize wheel colors:
```javascript
const PALETTE = ["#FF6B81", "#FFD166", ...];
```

### Change Animation Speed
Modify the spin duration (3.6s) in `App.jsx` spin function line 168

## Browser Support

Works on all modern browsers supporting:
- ES6+ JavaScript
- CSS3 transforms and animations  
- localStorage API
- SVG rendering

## Performance

- Lightweight (~30KB gzipped)
- Instant startup
- Smooth 60fps animations
- No external APIs required

## Future Enhancements

- Export/import roster data
- Team preferences and constraints
- Notification on selection
- Mobile app version
- Backup to cloud

## License

This project is open source and available for personal and commercial use.

---

**Tip:** Use the ⏸ button before spinning to skip someone who's already on watch duty or unavailable!
