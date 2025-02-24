// DOM elements
const videoGrid = document.getElementById('videoGrid');
const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');
const searchResultsContainer = document.getElementById('searchResultsContainer');
const searchResultsGrid = document.getElementById('searchResultsGrid');
const searchQueryDisplay = document.getElementById('searchQuery');
const mainContainer = document.querySelector('.container');
const uploadForm = document.getElementById('uploadForm');
const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');

// Initialize the app
function init() {
  displayVideos(videos, videoGrid);
  
  // Setup event listeners
  setupUploadModal();
  setupDragAndDrop();
}

// Display videos in a grid
function displayVideos(videosArray, container) {
  container.innerHTML = '';
  
  videosArray.forEach(video => {
    const videoCard = createVideoCard(video);
    container.appendChild(videoCard);
  });
}

// Create a video card element
function createVideoCard(video) {
  const videoCard = document.createElement('div');
  videoCard.className = 'video-card';
  videoCard.dataset.id = video.id;
  videoCard.onclick = () => showVideoPage(video.id);
  
  videoCard.innerHTML = `
    <img src="${video.thumbnail}" alt="${video.title}" class="thumbnail">
    <div class="video-info">
      <div class="video-title">${video.title}</div>
      <div class="channel-name">${video.channelName}</div>
      <div class="video-stats">
        <div class="stats-item">${video.views} views</div>
        <div class="stats-item">${video.timeAgo}</div>
      </div>
    </div>
  `;
  
  return videoCard;
}

// Search videos
function searchVideos(event) {
  event.preventDefault();
  const query = searchInput.value.trim().toLowerCase();
  
  if (query === '') return;
  
  // Filter videos based on search query
  const results = videos.filter(video => {
    return (
      video.title.toLowerCase().includes(query) ||
      video.channelName.toLowerCase().includes(query) ||
      video.categories.some(category => category.toLowerCase().includes(query))
    );
  });
  
  // Display search results
  searchQueryDisplay.textContent = query;
  displayVideos(results, searchResultsGrid);
  
  // Show search results, hide main content
  mainContainer.style.display = 'none';
  searchResultsContainer.style.display = 'block';
  
  // Clear search input
  searchInput.value = '';
}

// Go back to home page
function backToHome() {
  mainContainer.style.display = 'flex';
  searchResultsContainer.style.display = 'none';
}

// Show video page (placeholder function)
function showVideoPage(videoId) {
  const video = videos.find(v => v.id === parseInt(videoId));
  if (!video) return;
  
  // In a real application, this would navigate to a video page
  alert(`Playing video: ${video.title}`);
  
  // This would redirect to a video page in a real application
  // window.location.href = `video.html?id=${videoId}`;
}

// Modal functions
function openModal() {
  document.getElementById('uploadModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('uploadModal').style.display = 'none';
}

// Setup upload modal
function setupUploadModal() {
  // Close modal when clicking outside of it
  window.onclick = function(event) {
    if (event.target == document.getElementById('uploadModal')) {
      closeModal();
    }
  };
  
  // Handle form submission
  uploadForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('videoTitle').value;
    const description = document.getElementById('videoDescription').value;
    const tags = document.getElementById('videoTags').value;
    const category = document.getElementById('videoCategory').value;
    
    // In a real app, this would send data to a server
    alert(`Video upload simulation complete!\n\nTitle: ${title}\nCategory: ${category}`);
    
    // Add the uploaded video to the list (simulation)
    const newVideo = {
      id: videos.length + 1,
      title: title,
      channelName: "Your Channel",
      views: "0",
      timeAgo: "Just now",
      thumbnail: "/api/placeholder/400/320",
      categories: [category, ...tags.split(',').map(tag => tag.trim())]
    };
    
    videos.unshift(newVideo);
    displayVideos(videos, videoGrid);
    
    // Reset form and close modal
    uploadForm.reset();
    closeModal();
  });
}

// Setup drag and drop functionality
function setupDragAndDrop() {
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });
  
  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
  });
  
  ['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
  });
  
  function highlight() {
    dropArea.style.border = '2px solid #ff0000';
  }
  
  function unhighlight() {
    dropArea.style.border = '2px dashed #aaaaaa';
  }
  
  dropArea.addEventListener('drop', handleDrop, false);
  
  function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
  }
  
  function handleFiles(files) {
    if (files.length > 0) {
      document.getElementById('videoTitle').value = files[0].name.split('.')[0];
      alert('File selected: ' + files[0].name);
    }
  }
  
  // Handle file input change
  fileInput.addEventListener('change', function(e) {
    handleFiles(this.files);
  });
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);
