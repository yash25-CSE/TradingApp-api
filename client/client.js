const BASE_URL = 'https://trading-app-api.onrender.com';


async function fetchAboutTrade() {
  try {
    const res = await fetch(`${BASE_URL}/api/about-trade`);
    const data = await res.json();

    const contentDiv = document.getElementById('about-trade');
    contentDiv.innerHTML = '';

    data.forEach(item => {
      const div = document.createElement('div');
      div.className = 'entry';
      div.innerHTML = `
        <img src="${BASE_URL}${item.imageUrl}" alt="Image" />
        <h3>${item.heading}</h3>
        <p>${item.content}</p>
        <small>${new Date(item.date).toLocaleString()}</small>
        <br>
        <button onclick="deleteAboutTrade('${item._id}')">Delete</button>
      `;
      contentDiv.appendChild(div);
    });
  } catch (err) {
    console.error('Error fetching About Trade:', err);
  }
}




async function fetchData() {
  const res = await fetch(`${BASE_URL}/api/daily-performance`);
  const data = await res.json();

  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '';

  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'entry';
    div.innerHTML = `
      <img src="${BASE_URL}${item.imageUrl}" alt="Image" />
      <h3>${item.heading}</h3>
      <p>${item.content}</p>
      <p><strong>Date:</strong> ${new Date(item.date).toLocaleString()}</p>
      <button onclick="deleteEntry('${item._id}')">Delete</button>
    `;
    contentDiv.appendChild(div);
  });
}

async function deleteEntry(id) {
  const confirmed = confirm("Are you sure you want to delete this entry?");
  if (!confirmed) return;

  const res = await fetch(`${BASE_URL}/api/daily-performance/${id}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    alert("Entry deleted successfully");
    fetchData(); // refresh
  } else {
    alert("Failed to delete entry");
  }
}

async function fetchDailyUpdates() {
  const res = await fetch(`${BASE_URL}/api/daily-update`);
  const data = await res.json();

  const contentDiv = document.getElementById('daily-updates');
  contentDiv.innerHTML = '';

  data.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${item.heading}</h3>
      <p>${item.content}</p>
      <p><small>${new Date(item.date).toLocaleString()}</small></p>
    `;
    contentDiv.appendChild(div);
  });
}


async function fetchWatchVideos() {
  const res = await fetch(`${BASE_URL}/api/watch-video`);
  const data = await res.json();

  const contentDiv = document.getElementById('watch-videos');
  contentDiv.innerHTML = '';

  data.forEach(item => {
    const videoId = extractYouTubeID(item.youtubeLink);
    const div = document.createElement('div');
    div.className = 'video-entry';
    div.innerHTML = `
      <h3>${item.heading}</h3>
      <p>${item.content}</p>
      <iframe width="560" height="315" 
        src="https://www.youtube.com/embed/${videoId}" 
        frameborder="0" allowfullscreen></iframe>
      <p><small>${new Date(item.date).toLocaleString()}</small></p>
    `;
    contentDiv.appendChild(div);
  });
}

function extractYouTubeID(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}


async function deleteAboutTrade(id) {
  const confirmed = confirm("Are you sure you want to delete this About Trade entry?");
  if (!confirmed) return;

  const res = await fetch(`${BASE_URL}/api/about-trade/${id}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    alert("Entry deleted successfully");
    fetchAboutTrade(); // refresh the list
  } else {
    alert("Failed to delete entry");
  }
}


async function fetchBuyProducts() {
  try {
    const res = await fetch(`${BASE_URL}/api/buy-product`);
    const data = await res.json();

    const container = document.getElementById('buy-products');
    container.innerHTML = '<h2>Buy Products</h2>';

    data.forEach(item => {
      const productHTML = `
        <div class="product-card">
          <h3>${item.heading}</h3>
          <p><strong>Price:</strong> ₹${item.price}</p>
          <p>${item.content}</p>
        </div>
      `;
      container.innerHTML += productHTML;
    });

  } catch (error) {
    console.error('Error fetching buy products:', error);
  }
}


async function fetchTradingSessions() {
  const res = await fetch(`${BASE_URL}/api/trading-sessions`);
  const data = await res.json();
  
  const container = document.getElementById('trading-sessions');
  container.innerHTML = '<h2>Trading Sessions</h2>';

  data.forEach(item => {
    const videoId = extractYouTubeID(item.videoLink);
    const div = document.createElement('div');
    div.className = 'session-entry';
    div.innerHTML = `
      <iframe width="560" height="315" 
        src="https://www.youtube.com/embed/${videoId}" 
        frameborder="0" allowfullscreen></iframe>
      <p>${item.content}</p>
    `;
    container.appendChild(div);
  });
}

// Utility to extract YouTube video ID
function extractYouTubeID(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}



async function fetchChartPatterns() {
  const res = await fetch(`${BASE_URL}/api/chart-patterns`);
  const data = await res.json();
  const container = document.getElementById('chart-patterns');
  
  container.innerHTML = '';
  data.forEach(item => {
    container.innerHTML += `
      <div style="margin: 20px; padding: 10px; border: 1px solid #ccc;">
        <h3>${item.heading}</h3>
        <p>${item.content}</p>
        <img src="${BASE_URL}${item.imageUrl}" width="300"><br>
        <small>${new Date(item.date).toLocaleString()}</small>
      </div>
    `;
  });
}


async function fetchTradingMaterials() {
  const container = document.getElementById('trading-materials');
  container.innerHTML = 'Loading...';

  try {
    const res = await fetch(`${BASE_URL}/api/trading-materials`);
    const data = await res.json();

    if (!Array.isArray(data)) {
      container.innerHTML = 'Unexpected response format.';
      return;
    }

    container.innerHTML = '';
    data.forEach(item => {
      const materialHTML = `
        <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <a href="${BASE_URL}${item.fileUrl}" target="_blank">Download PDF</a><br>
          <small>Uploaded on: ${new Date(item.date).toLocaleString()}</small>
        </div>
      `;
      container.innerHTML += materialHTML;
    });
  } catch (err) {
    container.innerHTML = 'Failed to load trading materials.';
    console.error(err);
  }
}


async function fetchHelpDesk() {
  const container = document.getElementById('help-desk-list');
  container.innerHTML = 'Loading...';

  try {
    const res = await fetch(`${BASE_URL}/api/help-desk`);
    const data = await res.json();

    container.innerHTML = '';
    data.forEach(item => {
      container.innerHTML += `
        <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
          <h3>${item.heading}</h3>
          <p>Email: ${item.email}</p>
          <p>Phone: ${item.phone}</p>
          <small>${new Date(item.date).toLocaleString()}</small>
        </div>
      `;
    });
  } catch (err) {
    container.innerHTML = 'Failed to load Help Desk contacts.';
    console.error(err);
  }
}


// Fetch Asked Questions (FAQs)
async function fetchAskedQuestions() {
  const res = await fetch(`${BASE_URL}/api/asked-questions`);
  const data = await res.json();
  const container = document.getElementById('asked-questions-list');

  container.innerHTML = '<h2>Frequently Asked Questions</h2>';
  data.forEach(item => {
    container.innerHTML += `
      <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
        <h3>Q: ${item.question}</h3>
        <p>A: ${item.answer}</p>
        <small>${new Date(item.date).toLocaleString()}</small>
      </div>
    `;
  });
}
