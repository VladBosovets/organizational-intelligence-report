// Simulated analysis steps for demo
export const ANALYSIS_STEPS = [
  { 
    id: 1, 
    label: 'Cloning repositories', 
    icon: '📦',
    duration: 3000,
    description: 'Fetching repository data from GitHub...'
  },
  { 
    id: 2, 
    label: 'Analyzing file structure', 
    icon: '📁',
    duration: 4000,
    description: 'Scanning files and directories...'
  },
  { 
    id: 3, 
    label: 'Mapping dependencies', 
    icon: '🔗',
    duration: 5000,
    description: 'Building dependency graph...'
  },
  { 
    id: 4, 
    label: 'Identifying critical developers', 
    icon: '👥',
    duration: 5000,
    description: 'Analyzing git history and contributions...'
  },
  { 
    id: 5, 
    label: 'Detecting code duplication', 
    icon: '🔍',
    duration: 4000,
    description: 'Scanning for duplicate code patterns...'
  },
  { 
    id: 6, 
    label: 'Calculating financial impact', 
    icon: '💰',
    duration: 5000,
    description: 'Computing cost savings and ROI...'
  },
  { 
    id: 7, 
    label: 'Generating recommendations', 
    icon: '✨',
    duration: 4000,
    description: 'Creating actionable insights...'
  }
];

/**
 * Simulates the analysis process with progress callbacks
 * @param {Function} onProgress - Called with (step, percentage) for each update
 * @param {Function} onComplete - Called when analysis is complete
 * @returns {Promise} Resolves when analysis is complete
 */
export function simulateAnalysis(onProgress, onComplete) {
  return new Promise((resolve) => {
    let currentStep = 0;
    const totalDuration = ANALYSIS_STEPS.reduce((sum, step) => sum + step.duration, 0);
    let elapsedTime = 0;

    const runStep = () => {
      if (currentStep >= ANALYSIS_STEPS.length) {
        onComplete?.();
        resolve();
        return;
      }

      const step = ANALYSIS_STEPS[currentStep];
      const percentage = Math.round((elapsedTime / totalDuration) * 100);
      
      onProgress?.(step, percentage);

      setTimeout(() => {
        elapsedTime += step.duration;
        currentStep++;
        runStep();
      }, step.duration);
    };

    runStep();
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
