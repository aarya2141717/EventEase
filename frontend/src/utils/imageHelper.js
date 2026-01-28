// Helper function to properly encode image paths
export const getImagePath = (imagePath) => {
  if (!imagePath) return '/images/default-placeholder.jpg';
  
  // If already encoded (contains %), return as-is
  if (imagePath.includes("%")) {
    return imagePath;
  }
  
  // If it contains special characters that need encoding
  if (imagePath.includes("'") || imagePath.includes("&") || imagePath.includes(" ")) {
    // Split and encode only the filename
    const parts = imagePath.split('/');
    const directory = parts.slice(0, -1).join('/');
    const filename = parts[parts.length - 1];
    // Use encodeURIComponent which properly handles all special characters
    return `${directory}/${encodeURIComponent(filename)}`;
  }
  
  return imagePath;
};

// Helper function to handle image loading errors
export const handleImageError = (e) => {
  // Prevent infinite loop
  if (e.target.dataset.fallbackTried === 'true') {
    console.warn('Image failed to load after retry:', e.target.src);
    // Show placeholder instead of hiding
    e.target.style.backgroundColor = '#e0e0e0';
    e.target.style.display = 'flex';
    e.target.style.alignItems = 'center';
    e.target.style.justifyContent = 'center';
    e.target.style.minHeight = '200px';
    e.target.alt = 'Image not available';
    return;
  }
  
  e.target.dataset.fallbackTried = 'true';
  const originalSrc = e.target.getAttribute('data-original-src') || e.target.src;
  
  console.warn('Image load error, trying alternative encoding for:', originalSrc);
  
  // Try with full URL encoding
  const parts = originalSrc.split('/');
  const directory = parts.slice(0, -1).join('/');
  const filename = parts[parts.length - 1];
  const fullyEncoded = `${directory}/${encodeURIComponent(filename)}`;
  
  if (fullyEncoded !== e.target.src) {
    e.target.src = fullyEncoded;
  }
};
