# CyberNova - Hacking Game

A browser-based incremental hacking game inspired by BitBurner. Hack servers, write programs, gain reputation, and take on faction work to climb the ranks of the underground hacking scene.

## Features

### Core Gameplay
- **Terminal Interface**: Type commands to interact with the game world
- **Server Hacking**: Progressively hack servers to steal money and gain experience
- **Program Development**: Purchase and execute hacking tools to gain access to new servers
- **Stat Progression**: Level up hacking and other stats through gameplay

### Systems
- **Multiple Servers**: Each with different difficulty levels and rewards
  - Home Server (Always accessible)
  - Test Server (Level 5 required)
  - Web Server 01 (Level 15 required)
  - Web Server 02 (Level 30 required)
  - Bank Server (Level 50 required)

- **Hacking Programs**: Unlock new tools to access protected servers
  - `nmap` - Network scanning ($500)
  - `BruteSSH.exe` - SSH exploitation ($1,500)
  - `FTPCrack.exe` - FTP password cracking ($2,000)
  - `relaySMTP.exe` - SMTP relay attacks ($5,000)
  - `HTTPWorm.exe` - HTTP vulnerabilities ($10,000)

- **Upgrades**: Purchase upgrades to improve your hacking capabilities
  - RAM Upgrade - Increases hacking speed
  - CPU Upgrade - Increases hack success rate
  - Firewall Upgrade - Reduces detected risk
  - VPN Upgrade - Anonymity bonus

- **Faction System**: Join different hacker factions to gain reputation
  - NetBurners
  - Silhouette
  - Daedalus

- **Statistics**: Track your progress with detailed player stats

## How to Play

### Starting Out
1. Start with $1000 and basic hacking skills
2. Type `help` in the terminal to see available commands
3. Use `scan` to see what servers are accessible

### Terminal Commands
- `help` - Show all available commands
- `scan` - Scan for accessible servers
- `connect <server>` - Connect to a server
- `hack` - Attempt to hack the current server
- `exe <program>` - Execute a hacking program
- `grow` - Grow money on the current server
- `status` - Show current server status
- `stats` - Display player statistics
- `clear` - Clear terminal output

### Progression Strategy
1. **Early Game**: Earn money by hacking basic servers
2. **Mid Game**: Purchase hacking tools to access harder servers
3. **Late Game**: Join factions and work on major hacking operations
4. **End Game**: Achieve maximum level and faction reputation

### Tips for Success
- Programs unlock access to progressively harder servers
- Each server hack grants experience and money
- Upgrades significantly improve hacking speed
- Balance between earning money and gaining experience
- Join multiple factions for varied benefits

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup for game interface
- **CSS3**: Advanced styling with grid/flexbox, animations, and terminal aesthetic
- **JavaScript (ES6+)**: Object-oriented game engine with event handling

### Game Architecture
```
Game (Main Controller)
├── Player (Stats and progression)
├── Servers (Hackable targets)
├── Programs (Tools to unlock servers)
├── Upgrades (Stat boosters)
├── Factions (Reputation groups)
└── UI (Display and input handling)
```

### Key Classes/Objects
- `Game`: Main game controller
  - `player`: Player stats and progress
  - `servers`: Available servers to hack
  - `programs`: Hacking tools to purchase
  - `upgrades`: Stat improvements
  - `factions`: Reputation organizations

### Game Loop
- Updates every 1 second
- Handles server money growth
- Updates time display
- Calculates passive income

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ALPHA-JR1890/bitburner.git
cd bitburner
```

2. Open `index.html` in your web browser
3. Start playing!

## Browser Compatibility
- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with ES6+ support

## Game Balance
- Money generation scales with progression
- Hacking difficulty increases with server tier
- Upgrades provide meaningful improvements
- Programs create clear progression gates

## File Structure
```
bitburner/
├── index.html      # Game interface HTML
├── styles.css      # Terminal aesthetic styling
├── game.js         # Game engine and logic
└── README.md       # This file
```

## Future Enhancements
- Augmentations system
- Company work options
- Crime mechanics
- Bladeburner division
- Coding contracts
- More detailed faction work
- Save/Load system
- Achievements
- Dark/Light theme toggle

## Tips for Optimal Play
1. **Early**: Focus on earning money for your first program
2. **Mid**: Buy programs strategically to unlock harder servers
3. **Late**: Join factions for bonus rewards
4. **Endgame**: Max out all stats and achieve 100% completion

## Contributing
Feel free to fork this project and submit pull requests for improvements!

## License
MIT License - Feel free to use and modify as you wish.

---

**Enjoy hacking!** 🔓
