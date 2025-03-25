/**
 * Utility functions for performance testing
 */

/**
 * Measures the current memory usage of the application in MB
 * @returns {Promise<number>} Memory usage in MB
 */
export const measureMemoryUsage = async () => {
  // Check if performance.memory is available (Chrome only)
  if (window.performance && window.performance.memory) {
    const memoryInfo = window.performance.memory;
    return memoryInfo.usedJSHeapSize / (1024 * 1024); // Convert to MB
  }

  // Fallback for browsers that don't support performance.memory
  try {
    // Use performance.measureUserAgentSpecificMemory when available
    if (performance.measureUserAgentSpecificMemory) {
      const memoryMeasurement =
        await performance.measureUserAgentSpecificMemory();
      return memoryMeasurement.bytes / (1024 * 1024); // Convert to MB
    }
  } catch (error) {
    console.warn("Memory measurement not supported:", error);
  }

  // Return a mock value for environments where memory measurement isn't supported
  console.warn(
    "Memory measurement not supported in this environment. Using mock value."
  );
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
    console.warn("Manual garbage collection not available in this environment");

    // Alternative approach: try to force garbage collection indirectly
    try {
      // Create and release a large array to prompt garbage collection
      const largeArray = new Array(10000000).fill(0);
      largeArray.length = 0;
    } catch (e) {
      console.error("Failed to force garbage collection:", e);
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
