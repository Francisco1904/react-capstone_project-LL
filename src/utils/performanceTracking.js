/**
 * Simple utility to measure component render time
 * @returns {Object} Performance measurement functions
 */
export const createRenderTimer = () => {
  const startTimes = {};
  const durations = {};
  const counts = {};

  return {
    start: (componentName) => {
      startTimes[componentName] = performance.now();
      counts[componentName] = (counts[componentName] || 0) + 1;
    },
    end: (componentName) => {
      if (startTimes[componentName]) {
        const duration = performance.now() - startTimes[componentName];
        durations[componentName] = duration;
        return duration;
      }
      return 0;
    },
    getDurations: () => ({ ...durations }),
    getCounts: () => ({ ...counts }),
  };
};
