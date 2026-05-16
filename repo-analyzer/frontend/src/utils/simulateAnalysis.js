export const TOTAL_DURATION = 5000; // 5 seconds total

/**
 * Simulates the analysis process with smooth progress updates
 * @param {Function} onProgress - Called with progress updates
 * @returns {Promise} Resolves when analysis is complete
 */
export function simulateAnalysis(onProgress) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const interval = 50; // Update every 50ms for smooth animation
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(Math.round((elapsed / TOTAL_DURATION) * 100), 100);
      
      onProgress({
        progress,
        message: progress < 100 ? 'Analyzing repositories...' : 'Analysis complete!'
      });
      
      if (progress < 100) {
        setTimeout(updateProgress, interval);
      } else {
        resolve();
      }
    };
    
    updateProgress();
  });
}

/**
 * Validates if a string is a valid GitHub repository URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid GitHub URL
 */
export function isValidGitHubUrl(url) {
  const githubPattern = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?$/;
  return githubPattern.test(url.trim());
}

/**
 * Extracts repository name from GitHub URL
 * @param {string} url - GitHub URL
 * @returns {string} Repository name (owner/repo)
 */
export function extractRepoName(url) {
  const match = url.match(/github\.com\/([\w-]+\/[\w.-]+)/);
  return match ? match[1].replace(/\/$/, '') : '';
}

// Made with Bob
