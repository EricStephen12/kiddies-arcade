// utils/gameAnimations.ts
import { Tile } from '@/app/types/gametypes';
import { levelGoals } from '@/app/data/songData';

export const burstAllTilesAnimation = (fallingTiles: Tile[]) => {
  if (typeof window === 'undefined') return;
  
  // Simplified animation to reduce DOM overhead
  fallingTiles.slice(0, 3).forEach((tile, index) => { // Limit to first 3 tiles for performance
    setTimeout(() => {
      const tileElement = document.querySelector(`[data-tile-id="${tile.id}"]`);
      if (tileElement) {
        // Simple scale animation instead of complex particles
        tileElement.style.transform = 'scale(1.2)';
        tileElement.style.opacity = '0.5';
        
        setTimeout(() => {
          if (tileElement.parentNode) {
            tileElement.style.transform = '';
            tileElement.style.opacity = '';
          }
        }, 300);
      }
    }, index * 50);
  });
};

// Forest-themed elements for celebration
const FOREST_ELEMENTS = {
  emojis: ['🌟', '✨', '🌲', '🌸', '🦋', '🌳', '🍄', '🌿', '🌙', '⭐'],
  colors: ['#FFD700', '#FF9F43', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A373', '#F4A261', '#E9C46A'],
  sizes: ['1rem', '1.5rem', '2rem', '2.5rem', '3rem']
};

export const celebrateCollectiblesAnimation = (currentLevel: number, collectibles: Record<string, number>) => {
  if (typeof window === 'undefined') return;
  
  const levelGoal = levelGoals[currentLevel];
  if (!levelGoal?.collectibles) return;

  // Create a container for all celebration elements
  const container = document.createElement('div');
  container.className = 'fixed inset-0 pointer-events-none z-50 overflow-hidden';
  
  // Add forest background overlay
  const overlay = document.createElement('div');
  overlay.className = 'absolute inset-0 bg-gradient-to-br from-green-900/80 to-blue-900/80 backdrop-blur-sm';
  container.appendChild(overlay);
  
  // Add twinkling stars background
  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.innerHTML = '✨';
    star.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      font-size: ${Math.random() * 1 + 0.5}rem;
      opacity: ${Math.random() * 0.8 + 0.2};
      animation: twinkle ${Math.random() * 3 + 2}s infinite alternate;
    `;
    
    const twinkleKeyframes = `
      @keyframes twinkle {
        0% { opacity: ${Math.random() * 0.3 + 0.1}; transform: scale(${Math.random() * 0.5 + 0.5}); }
        100% { opacity: ${Math.random() * 0.8 + 0.2}; transform: scale(${Math.random() * 1.5 + 1}); }
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = twinkleKeyframes;
    container.appendChild(style);
    container.appendChild(star);
  }
  
  // Add celebration message
  const message = document.createElement('div');
  message.className = 'absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center';
  message.innerHTML = `
    <div class="text-6xl md:text-8xl font-bold text-yellow-300 mb-4 animate-bounce">
      Level Complete!
    </div>
    <div class="text-2xl text-white font-semibold mb-8">
      You've collected all the treasures! 🎉
    </div>
  `;
  container.appendChild(message);
  
  // Add the container to the body
  document.body.appendChild(container);
  
  // Create bursting stars effect
  const burstStars = (count: number, x: number, y: number) => {
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      const size = FOREST_ELEMENTS.sizes[Math.floor(Math.random() * FOREST_ELEMENTS.sizes.length)];
      const color = FOREST_ELEMENTS.colors[Math.floor(Math.random() * FOREST_ELEMENTS.colors.length)];
      const emoji = FOREST_ELEMENTS.emojis[Math.floor(Math.random() * FOREST_ELEMENTS.emojis.length)];
      
      star.innerHTML = emoji;
      star.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        font-size: ${size};
        color: ${color};
        pointer-events: none;
        z-index: 100;
        transform-origin: center;
        will-change: transform, opacity;
      `;
      
      const angle = Math.random() * Math.PI * 2;
      const distance = 100 + Math.random() * 100;
      const duration = 1 + Math.random() * 1.5;
      const delay = Math.random() * 0.5;
      const rotation = Math.random() * 360;
      const scale = 0.5 + Math.random() * 2;
      
      const animation = star.animate(
        [
          { 
            transform: `translate(0, 0) rotate(0deg) scale(1)`,
            opacity: 1 
          },
          { 
            transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${rotation}deg) scale(${scale})`,
            opacity: 0 
          }
        ],
        { 
          duration: duration * 1000,
          delay: delay * 1000,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }
      );
      
      container.appendChild(star);
      animation.onfinish = () => star.remove();
    }
  };
  
  // Create multiple burst points
  const burstPoints = [
    { x: '25%', y: '25%' },
    { x: '75%', y: '25%' },
    { x: '50%', y: '50%' },
    { x: '25%', y: '75%' },
    { x: '75%', y: '75%' }
  ];
  
  // Trigger burst animations
  burstPoints.forEach((point, i) => {
    setTimeout(() => {
      const x = window.innerWidth * parseFloat(point.x) / 100;
      const y = window.innerHeight * parseFloat(point.y) / 100;
      burstStars(15, x, y);
    }, i * 300);
  });
  
  // Add floating forest elements
  const floatingElements = ['🌲', '🌸', '🦋', '🌳', '🍄', '🌿', '🌙'];
  floatingElements.forEach((emoji, i) => {
    const element = document.createElement('div');
    element.className = 'absolute text-4xl md:text-6xl';
    element.innerHTML = emoji;
    element.style.cssText = `
      left: ${10 + (i * 15)}%;
      bottom: -50px;
      animation: floatUp ${3 + Math.random() * 4}s ease-in-out infinite;
      animation-delay: ${i * 0.5}s;
      opacity: 0.8;
    `;
    
    const floatKeyframes = `
      @keyframes floatUp {
        0% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = floatKeyframes;
    container.appendChild(style);
    container.appendChild(element);
  });
  
  // Auto-remove after animation completes
  setTimeout(() => {
    container.remove();
  }, 5000);
};

export const createJumpEffect = (column: number, tileY: number, gameAreaHeight: number) => {
  // Simplified jump effect for better performance
  if (typeof window === 'undefined') return;
  
  // Just use CSS classes instead of dynamic DOM creation
  const existingEffects = document.querySelectorAll('.jump-effect');
  if (existingEffects.length > 2) return; // Limit concurrent effects
  
  const effect = document.createElement('div');
  effect.className = 'fixed pointer-events-none z-50 jump-effect text-2xl animate-bounce';
  effect.innerHTML = '⭐';
  effect.style.cssText = `
    position: fixed;
    left: ${25 + column * 20}%;
    bottom: ${Math.max(0, gameAreaHeight - tileY)}px;
    animation-duration: 0.3s;
  `;
  
  document.body.appendChild(effect);
  setTimeout(() => {
    if (effect.parentNode) {
      effect.remove();
    }
  }, 300);
};