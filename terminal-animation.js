export class TerminalAnimation {
  constructor(targetId, words, colors) {
    this.historyTarget = document.getElementById('terminal-history');
    this.inputTarget = document.getElementById('terminal-input');
    this.words = words || [];
    this.colors = colors || ["#fff"];
    this.commands = [];
    this.maxCommands = 10;
    this.currentCommand = "";
    this.letterCount = 0;
    this.waiting = false;
    this.username = "gdf-user";
    this.commandPrefix = "$ ";
    this.isProcessing = false;
    
    this.init();
  }

  init() {
    this.historyTarget.innerHTML = "";
    this.inputTarget.innerHTML = "";
    this.startCommandInterval();
  }

  getPrompt() {
    return `<span class="terminal-username">${this.username}</span><span class="terminal-prompt">${this.commandPrefix}</span>`;
  }

  simulateCommandProcessing(command) {
    const processingTime = Math.random() * 1000 + 500; // Random time between 500ms and 1500ms
    const output = this.generateCommandOutput(command);
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(output);
      }, processingTime);
    });
  }

  generateCommandOutput(command) {
    const commandText = command.replace(this.commandPrefix, "").trim();
    
    // Simulate different types of command outputs
    if (commandText.includes("error") || commandText.includes("fail")) {
      return `<div class="terminal-error">Error: Command '${commandText}' failed</div>`;
    }
    
    if (commandText.includes("list") || commandText.includes("ls")) {
      return `<div class="terminal-output">file1.txt<br>file2.txt<br>directory1/</div>`;
    }
    
    if (commandText.includes("status") || commandText.includes("info")) {
      return `<div class="terminal-output">System status: OK<br>Memory usage: 45%<br>CPU load: 23%</div>`;
    }
    
    // Default output
    return `<div class="terminal-output">Command '${commandText}' executed successfully</div>`;
  }

  async startCommandInterval() {
    while (true) {
      if (this.letterCount === 0 && !this.waiting) {
        this.waiting = true;
        this.currentCommand = this.getPrompt() + this.words[0].substring(0, this.letterCount);
        this.updateTerminal();

        await new Promise(resolve => setTimeout(resolve, 1000));
        const usedWord = this.words.shift();
        this.words.push(usedWord);
        this.letterCount = 1;
        this.waiting = false;
      } else if (this.letterCount === this.words[0].length + 1 && !this.waiting) {
        this.waiting = true;
        const fullCommand = this.currentCommand;
        
        // Simulate command processing
        this.isProcessing = true;
        this.updateTerminal();
        
        // Wait for processing to complete
        const output = await this.simulateCommandProcessing(fullCommand);
        
        // Add both command and its output to history
        this.commands.push(fullCommand);
        this.commands.push(output);
        
        // Remove oldest commands if we exceed the limit
        while (this.commands.length > this.maxCommands) {
          this.commands.shift();
        }
        
        // Reset for next command
        this.currentCommand = this.getPrompt();
        this.letterCount = 0;
        this.waiting = false;
        this.isProcessing = false;
        this.updateTerminal();
        
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else if (!this.waiting) {
        this.currentCommand = this.getPrompt() + this.words[0].substring(0, this.letterCount);
        this.letterCount++;
        this.updateTerminal();
        await new Promise(resolve => setTimeout(resolve, 120));
      }
    }
  }

  updateTerminal() {
    // Update history
    let historyContent = "";
    this.commands.forEach(cmd => {
      historyContent += `<div class="terminal-line">${cmd}</div>`;
    });
    this.historyTarget.innerHTML = historyContent;
    
    // Update input line
    this.inputTarget.innerHTML = `<div class="terminal-line typing">${this.currentCommand}<span class="cursor">_</span></div>`;
    
    // Auto-scroll history to bottom
    this.historyTarget.scrollTop = this.historyTarget.scrollHeight;
  }
} 