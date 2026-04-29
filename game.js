class Game {
    constructor() {
        this.player = {
            money: 1000,
            level: 1,
            exp: 0,
            expNeeded: 100,
            hacking: 1,
            strength: 1,
            defense: 1,
            dexterity: 1,
            agility: 1,
            charisma: 1,
            intelligence: 1,
            currentServer: 'home'
        };

        this.gameTime = 0;

        this.servers = {
            home: {
                name: 'home',
                displayName: 'Home Server',
                difficulty: 0,
                requiredLevel: 0,
                requiredPrograms: [],
                money: 0,
                maxMoney: 10000,
                securityLevel: 5,
                moneyPerHack: 100,
                expPerHack: 10,
                accessible: true
            },
            test: {
                name: 'test',
                displayName: 'Test Server',
                difficulty: 1,
                requiredLevel: 5,
                requiredPrograms: ['nmap'],
                money: 5000,
                maxMoney: 50000,
                securityLevel: 15,
                moneyPerHack: 500,
                expPerHack: 25,
                accessible: false
            },
            web01: {
                name: 'web01',
                displayName: 'Web Server 01',
                difficulty: 2,
                requiredLevel: 15,
                requiredPrograms: ['nmap', 'BruteSSH.exe'],
                money: 10000,
                maxMoney: 100000,
                securityLevel: 25,
                moneyPerHack: 1500,
                expPerHack: 50,
                accessible: false
            },
            web02: {
                name: 'web02',
                displayName: 'Web Server 02',
                difficulty: 3,
                requiredLevel: 30,
                requiredPrograms: ['nmap', 'BruteSSH.exe', 'FTPCrack.exe'],
                money: 25000,
                maxMoney: 250000,
                securityLevel: 40,
                moneyPerHack: 3000,
                expPerHack: 100,
                accessible: false
            },
            bank: {
                name: 'bank',
                displayName: 'Bank Server',
                difficulty: 4,
                requiredLevel: 50,
                requiredPrograms: ['nmap', 'BruteSSH.exe', 'FTPCrack.exe', 'relaySMTP.exe', 'HTTPWorm.exe'],
                money: 100000,
                maxMoney: 1000000,
                securityLevel: 60,
                moneyPerHack: 10000,
                expPerHack: 250,
                accessible: false
            }
        };

        this.programs = {
            nmap: {
                name: 'nmap',
                displayName: 'nmap',
                cost: 500,
                owned: false,
                description: 'Basic network scanner for port enumeration'
            },
            'BruteSSH.exe': {
                name: 'BruteSSH.exe',
                displayName: 'BruteSSH.exe',
                cost: 1500,
                owned: false,
                description: 'SSH brute force tool'
            },
            'FTPCrack.exe': {
                name: 'FTPCrack.exe',
                displayName: 'FTPCrack.exe',
                cost: 2000,
                owned: false,
                description: 'FTP password cracking utility'
            },
            'relaySMTP.exe': {
                name: 'relaySMTP.exe',
                displayName: 'relaySMTP.exe',
                cost: 5000,
                owned: false,
                description: 'SMTP relay for mail spoofing'
            },
            'HTTPWorm.exe': {
                name: 'HTTPWorm.exe',
                displayName: 'HTTPWorm.exe',
                cost: 10000,
                owned: false,
                description: 'HTTP vulnerability exploiter'
            }
        };

        this.upgrades = {
            ram: {
                name: 'RAM Upgrade',
                cost: 100000,
                owned: 0,
                maxLevel: 5,
                bonus: 50,
                description: 'Increases hacking speed by 50 per level'
            },
            cpu: {
                name: 'CPU Upgrade',
                cost: 150000,
                owned: 0,
                maxLevel: 5,
                bonus: 40,
                description: 'Increases hack success rate by 40 per level'
            },
            firewall: {
                name: 'Firewall Upgrade',
                cost: 50000,
                owned: 0,
                maxLevel: 3,
                bonus: 100,
                description: 'Reduces detected risk by 100 per level'
            },
            vpn: {
                name: 'VPN Upgrade',
                cost: 200000,
                owned: 0,
                maxLevel: 2,
                bonus: 200,
                description: 'Anonymity bonus of 200 per level'
            }
        };

        this.factions = {
            netburners: {
                name: 'NetBurners',
                reputation: 0,
                joined: false,
                bonus: 1.1,
                description: 'A faction focused on pure hacking excellence'
            },
            silhouette: {
                name: 'Silhouette',
                reputation: 0,
                joined: false,
                bonus: 1.15,
                description: 'Corporate espionage specialists'
            },
            daedalus: {
                name: 'Daedalus',
                reputation: 0,
                joined: false,
                bonus: 1.2,
                description: 'The most elite hacker organization'
            }
        };

        this.commandHistory = [];
        this.historyIndex = -1;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateUI();
        this.gameLoop();
        this.log('CyberNova v1.0 initialized', 'success');
        this.log('Type "help" for commands', 'info');
    }

    setupEventListeners() {
        const terminalInput = document.getElementById('terminalInput');
        
        terminalInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim();
                if (command) {
                    this.executeCommand(command);
                    this.commandHistory.push(command);
                    this.historyIndex = this.commandHistory.length;
                    terminalInput.value = '';
                }
            }
        });

        terminalInput.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowUp') {
                this.historyIndex = Math.max(0, this.historyIndex - 1);
                terminalInput.value = this.commandHistory[this.historyIndex] || '';
            } else if (e.key === 'ArrowDown') {
                this.historyIndex = Math.min(this.commandHistory.length, this.historyIndex + 1);
                terminalInput.value = this.commandHistory[this.historyIndex] || '';
            }
        });

        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
                
                btn.classList.add('active');
                const sectionId = btn.getAttribute('data-section') + '-section';
                document.getElementById(sectionId).classList.add('active');
                
                if (btn.getAttribute('data-section') === 'servers') this.renderServers();
                if (btn.getAttribute('data-section') === 'programs') this.renderPrograms();
                if (btn.getAttribute('data-section') === 'upgrades') this.renderUpgrades();
                if (btn.getAttribute('data-section') === 'factions') this.renderFactions();
                if (btn.getAttribute('data-section') === 'stats') this.renderStats();
            });
        });

        document.getElementById('terminalInput').focus();
    }

    executeCommand(input) {
        const [command, ...args] = input.toLowerCase().split(' ');
        
        this.log(`▶ ${input}`, 'info');

        switch (command) {
            case 'help':
                this.cmdHelp();
                break;
            case 'scan':
                this.cmdScan();
                break;
            case 'connect':
                this.cmdConnect(args[0]);
                break;
            case 'hack':
                this.cmdHack();
                break;
            case 'status':
                this.cmdStatus();
                break;
            case 'stats':
                this.cmdStats();
                break;
            case 'exe':
                this.cmdExe(args[0]);
                break;
            case 'grow':
                this.cmdGrow();
                break;
            case 'clear':
                this.cmdClear();
                break;
            default:
                this.log(`Unknown command: ${command}. Type 'help' for available commands.`, 'error');
        }
    }

    cmdHelp() {
        const commands = [
            { cmd: 'help', desc: 'Display this help message' },
            { cmd: 'scan', desc: 'Scan for accessible servers' },
            { cmd: 'connect <server>', desc: 'Connect to a server' },
            { cmd: 'hack', desc: 'Hack the current server' },
            { cmd: 'grow', desc: 'Grow money on current server' },
            { cmd: 'status', desc: 'Show current server status' },
            { cmd: 'stats', desc: 'Display player statistics' },
            { cmd: 'exe <program>', desc: 'Execute a hacking program' },
            { cmd: 'clear', desc: 'Clear terminal output' }
        ];

        this.log('=== AVAILABLE COMMANDS ===', 'success');
        commands.forEach(c => {
            this.log(`${c.cmd.padEnd(20)} - ${c.desc}`, 'info');
        });
    }

    cmdScan() {
        this.log('=== NETWORK SCAN ===', 'success');
        let found = 0;
        Object.values(this.servers).forEach(server => {
            const accessible = this.isServerAccessible(server);
            const status = accessible ? '✓ ACCESSIBLE' : '✗ RESTRICTED';
            const color = accessible ? 'success' : 'error';
            this.log(`${server.displayName.padEnd(20)} [${status}]`, color);
            if (accessible) found++;
        });
        this.log(`Found ${found} accessible server(s)`, 'success');
    }

    cmdConnect(serverName) {
        if (!serverName) {
            this.log('Usage: connect <server>', 'error');
            return;
        }

        const server = this.servers[serverName];
        if (!server) {
            this.log(`Server not found: ${serverName}`, 'error');
            return;
        }

        if (!this.isServerAccessible(server)) {
            this.log(`Access denied to ${server.displayName}`, 'error');
            return;
        }

        this.player.currentServer = serverName;
        this.log(`Connected to ${server.displayName}`, 'success');
        this.cmdStatus();
    }

    cmdHack() {
        const server = this.servers[this.player.currentServer];
        if (!server) {
            this.log('Not connected to any server', 'error');
            return;
        }

        const hackingBonus = 1 + (this.player.hacking * 0.05);
        const upgradeBonus = 1 + (this.upgrades.cpu.owned * 0.1);
        const hackPower = hackingBonus * upgradeBonus;
        
        const successChance = Math.min(0.95, (this.player.hacking / (server.securityLevel * 2)) * hackPower);
        const random = Math.random();

        if (random < successChance) {
            const money = Math.floor(server.moneyPerHack * (1 + this.upgrades.ram.owned * 0.1));
            const exp = Math.floor(server.expPerHack * 1.2);
            
            this.player.money += money;
            this.player.exp += exp;
            
            this.log(`Successfully hacked ${server.displayName}! Gained $${money} and ${exp} exp`, 'success');
            
            if (this.player.exp >= this.player.expNeeded) {
                this.levelUp();
            }

            Object.keys(this.factions).forEach(faction => {
                if (this.factions[faction].joined) {
                    this.factions[faction].reputation += 5;
                }
            });
        } else {
            this.log('Hack failed! System security detected intrusion.', 'error');
            this.player.exp += 2;
        }

        this.updateUI();
    }

    cmdGrow() {
        const server = this.servers[this.player.currentServer];
        if (!server) {
            this.log('Not connected to any server', 'error');
            return;
        }

        const growthAmount = Math.floor(server.maxMoney * 0.05);
        server.money = Math.min(server.money + growthAmount, server.maxMoney);
        
        this.log(`Server money grown by $${growthAmount}`, 'success');
        this.cmdStatus();
    }

    cmdStatus() {
        const server = this.servers[this.player.currentServer];
        if (!server) {
            this.log('Not connected to any server', 'error');
            return;
        }

        this.log(`=== ${server.displayName} ===`, 'success');
        this.log(`Difficulty: ${server.difficulty}/4`, 'info');
        this.log(`Security Level: ${server.securityLevel}`, 'info');
        this.log(`Available Money: $${server.money}/${server.maxMoney}`, 'info');
        this.log(`Reward per Hack: $${server.moneyPerHack}`, 'info');
    }

    cmdStats() {
        this.log('=== PLAYER STATS ===', 'success');
        this.log(`Level: ${this.player.level}`, 'info');
        this.log(`Experience: ${this.player.exp}/${this.player.expNeeded}`, 'info');
        this.log(`Money: $${this.player.money}`, 'success');
        this.log(`Hacking: ${this.player.hacking}`, 'info');
        this.log(`Strength: ${this.player.strength}`, 'info');
        this.log(`Defense: ${this.player.defense}`, 'info');
        this.log(`Dexterity: ${this.player.dexterity}`, 'info');
    }

    cmdExe(program) {
        if (!program) {
            this.log('Usage: exe <program>', 'error');
            return;
        }

        const prog = this.programs[program];
        if (!prog) {
            this.log(`Program not found: ${program}`, 'error');
            return;
        }

        if (!prog.owned) {
            this.log(`You do not own ${program}`, 'error');
            return;
        }

        this.log(`Executing ${program}...`, 'info');
        this.log(`Program executed successfully`, 'success');
    }

    cmdClear() {
        document.getElementById('terminalOutput').innerHTML = '';
    }

    log(message, type = 'info') {
        const output = document.getElementById('terminalOutput');
        const line = document.createElement('div');
        line.className = 'output-line';
        
        const timeStamp = document.createElement('span');
        timeStamp.className = 'time-stamp';
        timeStamp.textContent = `[${this.getTimeString()}]`;
        
        const text = document.createElement('span');
        text.className = `output-${type}`;
        text.textContent = message;
        
        line.appendChild(timeStamp);
        line.appendChild(text);
        output.appendChild(line);
        
        output.scrollTop = output.scrollHeight;
    }

    isServerAccessible(server) {
        if (server.name === 'home') return true;
        
        if (this.player.level < server.requiredLevel) return false;
        
        for (let prog of server.requiredPrograms) {
            if (!this.programs[prog].owned) return false;
        }
        
        return true;
    }

    levelUp() {
        this.player.level++;
        this.player.exp -= this.player.expNeeded;
        this.player.expNeeded = Math.floor(this.player.expNeeded * 1.1);
        this.player.hacking += 2;
        this.player.strength++;
        this.player.defense++;
        
        this.log(`LEVEL UP! You are now level ${this.player.level}!`, 'success');
        this.updateUI();
    }

    getTimeString() {
        const hours = Math.floor(this.gameTime / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((this.gameTime % 3600) / 60).toString().padStart(2, '0');
        const seconds = (this.gameTime % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    updateUI() {
        document.getElementById('moneyDisplay').textContent = `$${this.player.money.toLocaleString()}`;
        document.getElementById('levelDisplay').textContent = this.player.level;
        document.getElementById('hackingDisplay').textContent = this.player.hacking;
        
        let totalRep = 0;
        Object.values(this.factions).forEach(f => totalRep += f.reputation);
        document.getElementById('repDisplay').textContent = totalRep;
        
        document.getElementById('timeDisplay').textContent = this.getTimeString();
    }

    renderServers() {
        const grid = document.getElementById('serversGrid');
        grid.innerHTML = '';
        
        Object.values(this.servers).forEach(server => {
            const accessible = this.isServerAccessible(server);
            const card = document.createElement('div');
            card.className = 'card';
            
            let statusText = accessible ? 'ACCESSIBLE' : 'RESTRICTED';
            let statusColor = accessible ? '#00ff00' : '#ff3333';
            
            card.innerHTML = `
                <div class="card-title">${server.displayName}</div>
                <div class="card-info">Difficulty: ${server.difficulty}/4</div>
                <div class="card-info">Security: ${server.securityLevel}</div>
                <div class="card-info">Money: $${server.money}</div>
                <div class="card-info">Reward: $${server.moneyPerHack}</div>
                <div class="card-status" style="color: ${statusColor}">Status: ${statusText}</div>
                <button class="card-button" ${!accessible ? 'disabled' : ''} onclick="game.player.currentServer = '${server.name}'; game.log('Connected to ${server.displayName}', 'success');">CONNECT</button>
            `;
            
            grid.appendChild(card);
        });
    }

    renderPrograms() {
        const grid = document.getElementById('programsGrid');
        grid.innerHTML = '';
        
        Object.values(this.programs).forEach(prog => {
            const card = document.createElement('div');
            card.className = 'card';
            
            const statusText = prog.owned ? 'OWNED' : 'NOT OWNED';
            const statusColor = prog.owned ? '#00ff00' : '#ff3333';
            
            card.innerHTML = `
                <div class="card-title">${prog.displayName}</div>
                <div class="card-info">${prog.description}</div>
                <div class="card-info">Cost: $${prog.cost}</div>
                <div class="card-status" style="color: ${statusColor}">Status: ${statusText}</div>
                <button class="card-button" ${prog.owned || this.player.money < prog.cost ? 'disabled' : ''} onclick="game.buyProgram('${prog.name}');">BUY</button>
            `;
            
            grid.appendChild(card);
        });
    }

    renderUpgrades() {
        const grid = document.getElementById('upgradesGrid');
        grid.innerHTML = '';
        
        Object.entries(this.upgrades).forEach(([key, upgrade]) => {
            const card = document.createElement('div');
            card.className = 'card';
            
            const canBuy = upgrade.owned < upgrade.maxLevel && this.player.money >= upgrade.cost;
            
            card.innerHTML = `
                <div class="card-title">${upgrade.name}</div>
                <div class="card-info">${upgrade.description}</div>
                <div class="card-info">Level: ${upgrade.owned}/${upgrade.maxLevel}</div>
                <div class="card-info">Cost: $${upgrade.cost}</div>
                <button class="card-button" ${!canBuy ? 'disabled' : ''} onclick="game.buyUpgrade('${key}');">PURCHASE</button>
            `;
            
            grid.appendChild(card);
        });
    }

    renderFactions() {
        const grid = document.getElementById('factionsGrid');
        grid.innerHTML = '';
        
        Object.entries(this.factions).forEach(([key, faction]) => {
            const card = document.createElement('div');
            card.className = 'card';
            
            const joinText = faction.joined ? 'JOINED' : 'NOT JOINED';
            const joinColor = faction.joined ? '#00ff00' : '#ff3333';
            
            card.innerHTML = `
                <div class="card-title">${faction.name}</div>
                <div class="card-info">${faction.description}</div>
                <div class="card-info">Reputation: ${faction.reputation}</div>
                <div class="card-status" style="color: ${joinColor}">Status: ${joinText}</div>
                <button class="card-button" ${faction.joined ? 'disabled' : ''} onclick="game.joinFaction('${key}');">JOIN</button>
            `;
            
            grid.appendChild(card);
        });
    }

    renderStats() {
        const display = document.getElementById('statsDisplay');
        display.innerHTML = '';
        
        const stats = [
            { name: 'Level', value: this.player.level },
            { name: 'Money', value: `$${this.player.money.toLocaleString()}` },
            { name: 'Experience', value: `${this.player.exp}/${this.player.expNeeded}` },
            { name: 'Hacking', value: this.player.hacking },
            { name: 'Strength', value: this.player.strength },
            { name: 'Defense', value: this.player.defense },
            { name: 'Dexterity', value: this.player.dexterity },
            { name: 'Agility', value: this.player.agility }
        ];
        
        stats.forEach(stat => {
            const box = document.createElement('div');
            box.className = 'stat-box';
            box.innerHTML = `
                <div class="stat-box-title">${stat.name}</div>
                <div class="stat-box-value">${stat.value}</div>
            `;
            display.appendChild(box);
        });
    }

    buyProgram(programName) {
        const prog = this.programs[programName];
        if (this.player.money >= prog.cost) {
            this.player.money -= prog.cost;
            prog.owned = true;
            this.log(`Purchased ${prog.displayName}`, 'success');
            this.updateUI();
            this.renderPrograms();
        } else {
            this.log('Insufficient funds', 'error');
        }
    }

    buyUpgrade(upgradeKey) {
        const upgrade = this.upgrades[upgradeKey];
        if (upgrade.owned < upgrade.maxLevel && this.player.money >= upgrade.cost) {
            this.player.money -= upgrade.cost;
            upgrade.owned++;
            this.log(`Purchased ${upgrade.name}`, 'success');
            this.updateUI();
            this.renderUpgrades();
        }
    }

    joinFaction(factionKey) {
        const faction = this.factions[factionKey];
        if (!faction.joined) {
            faction.joined = true;
            this.log(`Joined ${faction.name}!`, 'success');
            this.renderFactions();
        }
    }

    gameLoop() {
        setInterval(() => {
            this.gameTime++;
            this.updateUI();
        }, 1000);
    }
}

const game = new Game();