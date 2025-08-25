// animation.js
import { setupScrollAnimations } from './global.js';

export function setupAnimations() {
    // this keeps your current functionality exactly the same
    document.addEventListener('DOMContentLoaded', () => {
        setupScrollAnimations();
        const animationElement = document.querySelector('#animation-element');
    });
}
