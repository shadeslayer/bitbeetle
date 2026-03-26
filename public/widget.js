(function() {
  const script = document.currentScript;
  const widgetId = script.getAttribute('data-widget-id');
  const origin = window.location.origin;

  if (!widgetId) {
    console.error('BotSupport Widget: data-widget-id is required');
    return;
  }

  // Styles
  const styles = `
    #botsupport-widget-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    #botsupport-widget-iframe {
      width: 400px;
      height: 600px;
      border: none;
      border-radius: 24px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.15);
      margin-bottom: 20px;
      display: none;
      transition: all 0.3s ease;
      background: white;
    }
    #botsupport-widget-button {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #18181b;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      margin-left: auto;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    #botsupport-widget-button:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 16px rgba(0,0,0,0.15);
    }
    #botsupport-widget-button svg {
      color: white;
      transition: all 0.3s ease;
    }
    #botsupport-widget-button.open svg {
      transform: rotate(90deg);
    }
    @media (max-width: 480px) {
      #botsupport-widget-iframe {
        width: calc(100vw - 40px);
        height: calc(100vh - 100px);
      }
    }
  `;

  const styleTag = document.createElement('style');
  styleTag.innerHTML = styles;
  document.head.appendChild(styleTag);

  // Container
  const container = document.createElement('div');
  container.id = 'botsupport-widget-container';

  // Iframe
  const iframe = document.createElement('iframe');
  iframe.id = 'botsupport-widget-iframe';
  iframe.src = `${origin}/widget?id=${widgetId}`;
  
  // Button
  const button = document.createElement('div');
  button.id = 'botsupport-widget-button';
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path>
    </svg>
  `;

  let isOpen = false;

  button.onclick = () => {
    isOpen = !isOpen;
    if (isOpen) {
      iframe.style.display = 'block';
      button.classList.add('open');
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
    } else {
      iframe.style.display = 'none';
      button.classList.remove('open');
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path>
        </svg>
      `;
    }
  };

  container.appendChild(iframe);
  container.appendChild(button);
  document.body.appendChild(container);
})();
