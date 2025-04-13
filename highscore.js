/**
 * Highscore management for Adventures in DevOOPS
 * Handles storing, retrieving, importing and exporting highscores
 */
class HighscoreManager {
    constructor(maxScores = 10) {
        this.MAX_SCORES = maxScores;
        this.STORAGE_KEY = 'devOOPSHighscores';
        this.highscores = this.loadHighscores();
    }

    /**
     * Load highscores from localStorage
     * @returns {Array} Array of highscore objects
     */
    loadHighscores() {
        const storedHighscores = localStorage.getItem(this.STORAGE_KEY);
        if (storedHighscores) {
            return JSON.parse(storedHighscores);
        }
        return [];
    }

    /**
     * Save highscores to localStorage
     */
    saveHighscores() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.highscores));
    }

    /**
     * Check if a score qualifies as a highscore
     * @param {Number} score - The score to check
     * @returns {Boolean} True if the score qualifies as a highscore
     */
    isHighscore(score) {
        // If we don't have enough scores yet, any score qualifies
        if (this.highscores.length < this.MAX_SCORES) {
            return true;
        }
        
        // Otherwise, check if score is higher than the lowest score
        const lowestScore = this.highscores.reduce((min, entry) => 
            entry.score < min ? entry.score : min, 
            this.highscores[0].score);
        
        return score > lowestScore;
    }

    /**
     * Add a new highscore
     * @param {String} name - Player name
     * @param {Number} score - Player score
     * @returns {Boolean} True if the score was added
     */
    addHighscore(name, score) {
        // Don't add invalid scores
        if (score <= 0 || !this.isHighscore(score)) {
            return false;
        }

        const now = new Date();
        const dateStr = now.toLocaleDateString();
        
        // Add new entry
        this.highscores.push({
            name: name || 'Anonymous',
            score: score,
            date: dateStr
        });
        
        // Sort highscores (highest to lowest)
        this.highscores.sort((a, b) => b.score - a.score);
        
        // Trim to max allowed
        if (this.highscores.length > this.MAX_SCORES) {
            this.highscores = this.highscores.slice(0, this.MAX_SCORES);
        }
        
        // Save to localStorage
        this.saveHighscores();
        return true;
    }

    /**
     * Get all highscores
     * @returns {Array} Array of highscore objects
     */
    getHighscores() {
        return [...this.highscores];
    }

    /**
     * Convert highscores to CSV format
     * @returns {String} CSV string
     */
    toCSV() {
        let csvContent = 'name,score,date\n';
        
        this.highscores.forEach(entry => {
            csvContent += `${entry.name},${entry.score},${entry.date}\n`;
        });
        
        return csvContent;
    }

    /**
     * Import highscores from CSV content
     * @param {String} csvContent - CSV content to import
     * @returns {Number} Number of imported highscores
     */
    importFromCSV(csvContent) {
        const lines = csvContent.split('\n');
        const newHighscores = [];
        
        // Skip header line (line 0)
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
                const parts = line.split(',');
                if (parts.length >= 3) {
                    newHighscores.push({
                        name: parts[0],
                        score: parseInt(parts[1], 10),
                        date: parts[2]
                    });
                }
            }
        }
        
        if (newHighscores.length > 0) {
            // Merge with existing highscores
            this.highscores = [...this.highscores, ...newHighscores];
            this.highscores.sort((a, b) => b.score - a.score);
            
            // Trim to max allowed
            if (this.highscores.length > this.MAX_SCORES) {
                this.highscores = this.highscores.slice(0, this.MAX_SCORES);
            }
            
            this.saveHighscores();
        }
        
        return newHighscores.length;
    }

    /**
     * Clear all highscores
     */
    clearHighscores() {
        this.highscores = [];
        this.saveHighscores();
    }
}

// Utility functions for file operations

/**
 * Export highscores to a CSV file and download it
 * @param {HighscoreManager} manager - The highscore manager instance
 * @param {String} filename - Name of the file to download
 */
function exportHighscoresToFile(manager, filename = 'highscore.csv') {
    const csvContent = manager.toCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Read a file and import it as highscores
 * @param {File} file - The file to read
 * @param {HighscoreManager} manager - The highscore manager instance
 * @param {Function} callback - Callback function to call after import
 */
function importHighscoresFromFile(file, manager, callback) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const content = e.target.result;
        const importedCount = manager.importFromCSV(content);
        if (callback) {
            callback(importedCount);
        }
    };
    
    reader.readAsText(file);
} 