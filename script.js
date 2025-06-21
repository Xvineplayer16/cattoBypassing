const typewriterElement = document.getElementById('typewriter');
const firstVisitText = "Welcome to Catto Bypassing";
const returnVisitText = "Catto Bypassing";
const hasVisited = localStorage.getItem('hasVisitedBefore');
const textToType = hasVisited ? returnVisitText : firstVisitText;

function typeWriter(text, i = 0) {
  if (i < text.length) {
    typewriterElement.textContent = text.substring(0, i + 1);
    setTimeout(() => typeWriter(text, i + 1), 100);
  }
}

typeWriter(textToType);

if (!hasVisited) {
  localStorage.setItem('hasVisitedBefore', 'true');
}

const placeholderTexts = [
  "Search games...", 
  "Search apps...", 
  "Search tools...", 
  "Search proxies..."
];
let currentPlaceholderIndex = 0;
const searchInput = document.querySelector('.search-input');

function rotatePlaceholder() {
  currentPlaceholderIndex = (currentPlaceholderIndex + 1) % placeholderTexts.length;
  searchInput.setAttribute('placeholder', placeholderTexts[currentPlaceholderIndex]);
  setTimeout(rotatePlaceholder, 3000);
}

setTimeout(rotatePlaceholder, 3000);

searchInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    alert('Searching for: ' + this.value);
  }
});

function updateDateTime() {
  const now = new Date();
  const timeElement = document.getElementById('time');
  const dateElement = document.getElementById('date');
  
  let hours = now.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  timeElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  dateElement.textContent = `${months[now.getMonth()]} ${now.getDate()}`;
}

async function updateBattery() {
  try {
    if ('getBattery' in navigator) {
      const battery = await navigator.getBattery();
      const batteryLevel = document.getElementById('battery-level');
      const batteryPercent = document.getElementById('battery-percent');
      
      const updateBatteryDisplay = () => {
        const level = Math.round(battery.level * 100);
        batteryLevel.style.width = `${level}%`;
        batteryPercent.textContent = `${level}%`;
        
        if (level < 20) {
          batteryLevel.style.backgroundColor = '#f44336';
        } else if (level < 50) {
          batteryLevel.style.backgroundColor = '#ff9800';
        } else {
          batteryLevel.style.backgroundColor = '#4CAF50';
        }
      };
      
      updateBatteryDisplay();
      battery.addEventListener('levelchange', updateBatteryDisplay);
      battery.addEventListener('chargingchange', updateBatteryDisplay);
    } else {
      throw new Error('Battery API not supported');
    }
  } catch (error) {
    console.error('Battery API error:', error);
    const batteryPercent = document.getElementById('battery-percent');
    batteryPercent.textContent = "N/A";
  }
}

function updateWifi() {
  const wifiNames = ['Home Wi-Fi', 'CattoNet', 'SecureNetwork', '5G Connection'];
  document.getElementById('wifi-name').textContent = wifiNames[Math.floor(Math.random() * wifiNames.length)];
}

function updateStatus() {
  updateDateTime();
  updateBattery();
  updateWifi();
}

updateStatus();

setInterval(updateDateTime, 1000);

setInterval(() => {
  updateWifi();
}, 300000);
