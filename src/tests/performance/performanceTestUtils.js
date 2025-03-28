/**
 * Utility functions for performance testing
 */

/**
 * Measures the current memory usage of the application in MB
 * @returns {Promise<number>} Memory usage in MB
 */
export const measureMemoryUsage = async () => {
  if (window.performance && window.performance.memory) {
    const memoryInfo = window.performance.memory;
    return memoryInfo.usedJSHeapSize / (1024 * 1024); // Convert to MB
  }

  try {
    if (performance.measureUserAgentSpecificMemory) {
      const memoryMeasurement =
        await performance.measureUserAgentSpecificMemory();
      return memoryMeasurement.bytes / (1024 * 1024); // Convert to MB
    }
  } catch (error) {
    // Memory measurement not supported
  }

  return 0;
};

/**
 * Forces a browser to perform garbage collection (for testing purposes only)
 * Note: This is not guaranteed to work in all browsers
 */
export const forceGarbageCollection = () => {
  if (window.gc) {
    window.gc();
  } else {
    try {
      const largeArray = new Array(10000000).fill(0);
      largeArray.length = 0;
    } catch (e) {
      // Failed to force garbage collection
    }
  }
};

/**
 * Creates a performance marker for measuring operations
 * @param {string} name - Name of the marker
 */
export const startPerformanceMark = (name) => {
  if (performance && performance.mark) {
    performance.mark(`${name}-start`);
  }
};

/**
 * Ends a performance marker and returns the duration
 * @param {string} name - Name of the marker (must match the one used in startPerformanceMark)
 * @returns {number} Duration in milliseconds
 */
export const endPerformanceMark = (name) => {
  if (performance && performance.mark && performance.measure) {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);

    const entries = performance.getEntriesByName(name);
    if (entries.length > 0) {
      return entries[0].duration;
    }
  }
  return 0;
};
