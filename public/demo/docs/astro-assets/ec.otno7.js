try{(()=>{function a(e){if(!e)return;let t=e.getAttribute("tabindex")!==null,r=e.scrollWidth>e.clientWidth;r&&!t?(e.setAttribute("tabindex","0"),e.setAttribute("role","region")):!r&&t&&(e.removeAttribute("tabindex"),e.removeAttribute("role"))}var u=window.requestIdleCallback||(e=>setTimeout(e,1)),s=window.cancelIdleCallback||clearTimeout;function l(e){let t=new Set,r,n;return new ResizeObserver(c=>{c.forEach(o=>t.add(o.target)),r&&clearTimeout(r),n&&s(n),r=setTimeout(()=>{n&&s(n),n=u(()=>{t.forEach(o=>e(o)),t.clear()})},250)})}function i(e,t){e.querySelectorAll?.(".expressive-code pre > code").forEach(r=>{let n=r.parentElement;n&&t.observe(n)})}var d=l(a);i(document,d);var b=new MutationObserver(e=>e.forEach(t=>t.addedNodes.forEach(r=>{i(r,d)})));b.observe(document.body,{childList:!0,subtree:!0});document.addEventListener("astro:page-load",()=>{i(document,d)});})();}catch(e){console.error("[EC] tabindex-js-module failed:",e)}
try{(()=>{function i(o){let e=document.createElement("pre");Object.assign(e.style,{opacity:"0",pointerEvents:"none",position:"absolute",overflow:"hidden",left:"0",top:"0",width:"20px",height:"20px",webkitUserSelect:"auto",userSelect:"all"}),e.ariaHidden="true",e.textContent=o,document.body.appendChild(e);let a=document.createRange();a.selectNode(e);let n=getSelection();if(!n)return!1;n.removeAllRanges(),n.addRange(a);let r=!1;try{r=document.execCommand("copy")}finally{n.removeAllRanges(),document.body.removeChild(e)}return r}async function l(o){let e=o.currentTarget,a=e.dataset,n=!1,r=a.code.replace(/\u007f/g,`
`);try{await navigator.clipboard.writeText(r),n=!0}catch{n=i(r)}if(!n||e.parentNode?.querySelector(".feedback"))return;let t=document.createElement("div");t.classList.add("feedback"),t.append(a.copied),e.before(t),t.offsetWidth,requestAnimationFrame(()=>t?.classList.add("show"));let c=()=>!t||t.classList.remove("show"),d=()=>{!t||parseFloat(getComputedStyle(t).opacity)>0||(t.remove(),t=void 0)};setTimeout(c,1500),setTimeout(d,2500),e.addEventListener("blur",c),t.addEventListener("transitioncancel",d),t.addEventListener("transitionend",d)}function s(o){o.querySelectorAll?.(".expressive-code .copy button").forEach(e=>e.addEventListener("click",l))}s(document);var u=new MutationObserver(o=>o.forEach(e=>e.addedNodes.forEach(a=>{s(a)})));u.observe(document.body,{childList:!0,subtree:!0});document.addEventListener("astro:page-load",()=>{s(document)});})();}catch(e){console.error("[EC] copy-js-module failed:",e)}
(function() {
        'use strict';

        // Configuration constants.
        const CONSTANTS = {
          MIN_FONT_SIZE: 60,
          MAX_FONT_SIZE: 500,
          DEFAULT_FONT_SIZE: 100,
          FONT_ADJUSTMENT: 7,
          DOUBLE_CLICK_THRESHOLD: 600,
          HINT_DISPLAY_TIME: 4000,
          FADE_TRANSITION_TIME: 500,
          MIN_BLOCK_HEIGHT: 95
        };

        // Plugin configuration.
        const pluginConfig = {
          fullscreenButtonTooltip: 'Toggle fullscreen view',
          enableEscapeKey: true,
          exitOnBrowserBack: true,
          animationDuration: 200
        };

        // Avoid duplicate initialization.
        if (window.expressiveCodeFullscreenInitialized) return;
        window.expressiveCodeFullscreenInitialized = true;

        // Initialize fullscreen state.
        const fullscreenState = {
          isFullscreenActive: false,
          scrollPosition: 0,
          originalCodeBlock: null,
          fontSize: CONSTANTS.DEFAULT_FONT_SIZE,
          focusTrapHandler: null,
        };

        // Cache frequently used DOM elements.
        const domCache = {
          fullscreenContainer: null,
          get container() {
            if (!this.fullscreenContainer) {
              this.fullscreenContainer = document.querySelector('.cb-fullscreen__container');
            }
            return this.fullscreenContainer;
          },
          clearCache() {
            this.fullscreenContainer = null;
          }
        };

        // Font size management.
        const fontManager = {
          storageKey: 'expressiveCodeFullscreenFontSize',

          loadFontSize() {
            try {
              const savedSize = localStorage.getItem(this.storageKey);
              if (savedSize) {
                const parsedSize = parseInt(savedSize, 10);
                if (parsedSize >= CONSTANTS.MIN_FONT_SIZE && parsedSize <= CONSTANTS.MAX_FONT_SIZE) {
                  return parsedSize;
                }
              }
            } catch (e) {
              console.warn('Could not load font size from localStorage');
            }
            return CONSTANTS.DEFAULT_FONT_SIZE;
          },

          saveFontSize(size) {
            try {
              localStorage.setItem(this.storageKey, size.toString());
            } catch (e) {
              console.warn('Could not save font size to localStorage');
            }
          },

          adjustFontSize(change, codeBlock) {
            const newSize = Math.max(CONSTANTS.MIN_FONT_SIZE, Math.min(CONSTANTS.MAX_FONT_SIZE, fullscreenState.fontSize + change));
            fullscreenState.fontSize = newSize;
            this.saveFontSize(newSize);
            this.applyFontSize(codeBlock);
          },

          resetFontSize(codeBlock) {
            fullscreenState.fontSize = CONSTANTS.DEFAULT_FONT_SIZE;
            this.saveFontSize(CONSTANTS.DEFAULT_FONT_SIZE);
            this.applyFontSize(codeBlock);
          },

          applyFontSize(codeBlock) {
            if (codeBlock) {
              const scale = fullscreenState.fontSize / 100;
              codeBlock.style.setProperty('--ec-font-scale', scale);

              // Also apply directly to all text elements as backup.
              const textElements = codeBlock.querySelectorAll('pre, code, span, .frame');
              textElements.forEach(el => {
                el.style.setProperty('font-size', `calc(1em * ${scale})`, 'important');
              });

              // Announce font size change to screen readers.
              this.announceFontSizeChange(fullscreenState.fontSize);

            } else {
            }
          },

          announceFontSizeChange(fontSize) {
            const statusElement = document.getElementById('font-size-status');
            if (statusElement) {
              const percentage = Math.round(fontSize);
              statusElement.textContent = `Font size changed to ${percentage}%`;

              // Clear the announcement after a brief delay to allow for multiple changes.
              setTimeout(() => {
                if (statusElement.textContent === `Font size changed to ${percentage}%`) {
                  statusElement.textContent = '';
                }
              }, 1000);
            }
          }
        };

        // Initialize immediately and also on DOM ready.
        function initialize() {
          createFullscreenContainer();
          initializeFullscreenButtons();
        }

        // Initialize immediately if DOM is already loaded.
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initialize);
        } else {
          initialize();
        }

        // Also initialize when new content is added (for dynamic content).
        const observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
              mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1 && (node.matches('.expressive-code') || node.querySelector('.expressive-code'))) {
                  setTimeout(initializeFullscreenButtons, 100);
                }
              });
            }
          });
        });
        observer.observe(document.body, { childList: true, subtree: true });

        // Create fullscreen container.
        function createFullscreenContainer() {
          if (document.querySelector('.cb-fullscreen__container')) return;

          const container = document.createElement('div');
          container.className = 'cb-fullscreen__container';
          container.setAttribute('role', 'dialog');
          container.setAttribute('aria-modal', 'true');
          container.setAttribute('aria-label', 'Code block in fullscreen view');
          container.setAttribute('aria-describedby', 'fullscreen-description');
          container.setAttribute('tabindex', '-1');

          // Ensure it's added directly to body, not any wrapper.
          document.body.appendChild(container);

          // Minimal inline styles - most styling in baseStyles.
        }

        // Initialize fullscreen buttons.
        function initializeFullscreenButtons() {
          const buttons = document.querySelectorAll('.cb-fullscreen__button');
          buttons.forEach(button => {
            const codeBlock = button.closest('.expressive-code');
            if (codeBlock) {
              const frame = codeBlock.querySelector('.frame');

              // Check if block is tall enough to show fullscreen button
              if (frame && frame.offsetHeight < CONSTANTS.MIN_BLOCK_HEIGHT) {
                button.style.display = 'none';
                return;
              }
            }

            button.addEventListener('click', handleFullscreenClick);
            button.addEventListener('keydown', function(event) {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleFullscreenClick.call(this, event);
              }
            });
          });
        }

        function handleFullscreenClick(event) {
          event.preventDefault();
          event.stopPropagation();

          const codeBlock = this.closest('.expressive-code');
          if (codeBlock) {
            toggleFullscreen(codeBlock);
          }
        }

        function toggleFullscreen(codeBlock) {
          const fullscreenContainer = domCache.container;

          if (fullscreenState.isFullscreenActive) {
            exitFullscreen(fullscreenContainer);
          } else {
            enterFullscreen(codeBlock, fullscreenContainer);
          }
        }

        function enterFullscreen(codeBlock, fullscreenContainer) {
          fullscreenState.originalCodeBlock = codeBlock;
          fullscreenState.fontSize = fontManager.loadFontSize();

          const originalButton = codeBlock.querySelector('.cb-fullscreen__button');
          if (originalButton) {
            originalButton.setAttribute('aria-expanded', 'true');
          }

          const clonedBlock = codeBlock.cloneNode(true);
          clonedBlock.classList.add('cb-fullscreen__active');
          // Ensure the expressive-code class is present for CSS selectors to work.
          if (!clonedBlock.classList.contains('expressive-code')) {
            clonedBlock.classList.add('expressive-code');
          }


          // Force full width with inline styles.
          // Styles handled in baseStyles (.expressive-code.cb-fullscreen__active).

          const fullscreenButtonInClone = clonedBlock.querySelector('.cb-fullscreen__button');
          if (fullscreenButtonInClone) {
            // Force icon switching with JavaScript instead of CSS.
            const onIcon = fullscreenButtonInClone.querySelector('.fullscreen-on');
            const offIcon = fullscreenButtonInClone.querySelector('.fullscreen-off');

            if (onIcon && offIcon) {
              onIcon.style.display = 'none';
              offIcon.style.display = 'inline';
            }

            fullscreenButtonInClone.addEventListener('click', function(event) {
              event.preventDefault();
              event.stopPropagation();
              toggleFullscreen(clonedBlock);
            });
          }

          saveScrollPosition();
          setBodyOverflow(true);

          if (pluginConfig.enableEscapeKey) addKeyupListener();
          if (pluginConfig.exitOnBrowserBack) {
            history.pushState({ fullscreenActive: true }, '', window.location.href);
            addPopStateListener();
          }

          const pageBackgroundColor = getPageBackgroundColor();
          const textColor = getContrastTextColor(pageBackgroundColor);
          fullscreenContainer.style.backgroundColor = pageBackgroundColor;
          fullscreenContainer.style.color = textColor;

          const contentWrapper = document.createElement('div');
          contentWrapper.className = 'cb-fullscreen__content';

          // Add hidden description for screen readers.
          const description = document.createElement('div');
          description.id = 'fullscreen-description';
          description.className = 'cb-fullscreen__sr-only';
          // Styles handled in baseStyles.
          description.textContent = 'Use the font size controls to adjust text size. Press Escape to exit fullscreen.';

          const fontControls = createFontSizeControls();
          contentWrapper.appendChild(description);
          contentWrapper.appendChild(fontControls);
          contentWrapper.appendChild(clonedBlock);

          fullscreenContainer.appendChild(contentWrapper);

          addFontControlListeners(fontControls, clonedBlock);
          fontManager.applyFontSize(clonedBlock);

          if (pluginConfig.enableEscapeKey) {
            const hint = createFullscreenHint();
            fullscreenContainer.appendChild(hint);

            setTimeout(() => {
              if (hint && hint.parentNode) {
                hint.style.setProperty('transition', 'opacity 0.9s ease', 'important');
                hint.style.setProperty('opacity', '0', 'important');

                setTimeout(() => {
                  if (hint && hint.parentNode) {
                    hint.remove();
                  }
                }, CONSTANTS.FADE_TRANSITION_TIME);
              }
            }, CONSTANTS.HINT_DISPLAY_TIME);
          }

          // Show the fullscreen container.
          fullscreenContainer.style.visibility = 'visible';
          fullscreenContainer.style.transform = 'scale(1)';
          fullscreenContainer.style.pointerEvents = 'auto';
          fullscreenContainer.classList.add('cb-fullscreen__container--open');
          fullscreenState.isFullscreenActive = true;

          // Force layout recalculation to ensure stretching works.
          setTimeout(() => {
            fullscreenContainer.offsetHeight; // Force reflow
            clonedBlock.style.width = '100%';
            clonedBlock.style.maxWidth = 'none';
          }, 0);

          fullscreenContainer.focus();
          addFocusTrap(fullscreenContainer);
        }

        function exitFullscreen(fullscreenContainer) {
          setBodyOverflow(false);
          restoreScrollPosition();

          if (pluginConfig.enableEscapeKey) removeKeyupListener();
          if (pluginConfig.exitOnBrowserBack) {
            removePopStateListener();
            // Only go back if we're exiting due to escape key or button click (not back button).
            if (history.state && history.state.fullscreenActive) {
              history.back();
            }
          }

          removeFocusTrap();

          // Hide the fullscreen container.
          fullscreenContainer.style.visibility = 'hidden';
          fullscreenContainer.style.transform = 'scale(0.01)';
          fullscreenContainer.style.pointerEvents = 'none';
          fullscreenContainer.classList.remove('cb-fullscreen__container--open');
          fullscreenContainer.innerHTML = '';

          fullscreenState.isFullscreenActive = false;

          if (fullscreenState.originalCodeBlock) {
            const originalButton = fullscreenState.originalCodeBlock.querySelector('.cb-fullscreen__button');
            if (originalButton) {
              originalButton.setAttribute('aria-expanded', 'false');
              originalButton.blur();
            }
          }

          fullscreenState.originalCodeBlock = null;
        }

        // Utility functions.
        function createFontSizeControls() {
          const controls = document.createElement('div');
          controls.className = 'cb-fullscreen__font-controls';

          // Styles are controlled by external CSS file.

          controls.setAttribute('role', 'toolbar');
          controls.setAttribute('aria-label', 'Font size controls');
          controls.setAttribute('aria-orientation', 'horizontal');

          controls.innerHTML = `
            <button class="cb-fullscreen__font-btn cb-fullscreen__font-btn--decrease"
                    type="button"
                    aria-label="Decrease font size (Double-click to reset to default)"
                    aria-describedby="font-size-status"
                    title="Decrease font size (Double-click to reset)"
                    style="border-radius: 6px !important; border: none !important;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" role="img">
                <title>Minus icon</title>
                <path d="M5 12h14"/>
              </svg>
            </button>
            <button class="cb-fullscreen__font-btn cb-fullscreen__font-btn--increase"
                    type="button"
                    aria-label="Increase font size"
                    aria-describedby="font-size-status"
                    title="Increase font size"
                    style="border-radius: 6px !important; border: none !important;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" role="img">
                <title>Plus icon</title>
                <path d="M12 5v14m-7-7h14"/>
              </svg>
            </button>
            <div id="font-size-status" class="cb-fullscreen__sr-only" aria-live="polite" aria-atomic="true" style="position: absolute !important; width: 1px !important; height: 1px !important; padding: 0 !important; margin: -1px !important; overflow: hidden !important; clip: rect(0, 0, 0, 0) !important; white-space: nowrap !important; border: 0 !important;"></div>
          `;
          return controls;
        }

        function createFullscreenHint() {
          const hint = document.createElement('div');
          hint.className = 'cb-fullscreen__hint';

          // Styles handled in baseStyles.

          hint.innerHTML = 'Press <kbd>Esc</kbd> to exit full screen';
          return hint;
        }

        function getPageBackgroundColor() {
          const bodyBg = window.getComputedStyle(document.body).backgroundColor;
          if (bodyBg && bodyBg !== 'rgba(0, 0, 0, 0)' && bodyBg !== 'transparent') {
            return bodyBg;
          }
          const fallbackBg = window.getComputedStyle(document.documentElement).backgroundColor;
          if (fallbackBg && fallbackBg !== 'rgba(0, 0, 0, 0)' && fallbackBg !== 'transparent') {
            return fallbackBg;
          }
          return '#ffffff';
        }

        function getContrastTextColor(backgroundColor) {
          const rgb = backgroundColor.match(/\d+/g);
          if (rgb && rgb.length >= 3) {
            const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
            return brightness > 128 ? '#000000' : '#ffffff';
          }
          return '#000000';
        }

        function saveScrollPosition() {
          fullscreenState.scrollPosition = window.scrollY || document.documentElement.scrollTop;
        }

        function restoreScrollPosition() {
          if (typeof fullscreenState.scrollPosition === 'number' && !isNaN(fullscreenState.scrollPosition)) {
            setTimeout(() => {
              window.scrollTo({
                top: fullscreenState.scrollPosition,
                behavior: 'smooth',
              });
            }, 0);
          }
        }

        function setBodyOverflow(hidden) {
          if (hidden) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
          } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
          }
        }

        function handleKeyup(event) {
          if (event.key === 'Escape' && fullscreenState.isFullscreenActive) {
            const fullscreenContainer = domCache.container;
            if (fullscreenContainer) {
              exitFullscreen(fullscreenContainer);
            }
          }
        }

        function addKeyupListener() {
          document.removeEventListener('keyup', handleKeyup);
          document.addEventListener('keyup', handleKeyup);
        }

        function removeKeyupListener() {
          document.removeEventListener('keyup', handleKeyup);
        }

        function handlePopState(event) {
          if (fullscreenState.isFullscreenActive) {
            // Prevent the history.back() call in exitFullscreen from causing a loop.
            const isBackButtonPressed = !event.state || !event.state.fullscreenActive;
            if (isBackButtonPressed) {
              const fullscreenContainer = domCache.container;
              if (fullscreenContainer) {
                // Temporarily disable back button handling to prevent recursion.
                removePopStateListener();
                exitFullscreen(fullscreenContainer);
              }
            }
          }
        }

        function addPopStateListener() {
          window.removeEventListener('popstate', handlePopState);
          window.addEventListener('popstate', handlePopState);
        }

        function removePopStateListener() {
          window.removeEventListener('popstate', handlePopState);
        }

        function addFocusTrap(container) {
          const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"], summary, audio[controls], video[controls]'
          );

          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          function handleTabKey(event) {
            if (event.key === 'Tab') {
              if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                  event.preventDefault();
                  lastElement.focus();
                }
              } else {
                if (document.activeElement === lastElement) {
                  event.preventDefault();
                  firstElement.focus();
                }
              }
            }
          }

          container.addEventListener('keydown', handleTabKey);
          fullscreenState.focusTrapHandler = handleTabKey;
        }

        function removeFocusTrap() {
          const container = domCache.container;
          if (container && fullscreenState.focusTrapHandler) {
            container.removeEventListener('keydown', fullscreenState.focusTrapHandler);
            fullscreenState.focusTrapHandler = null;
          }
        }

        function addFontControlListeners(fontControls, codeBlock) {

          const decreaseBtn = fontControls.querySelector('.cb-fullscreen__font-btn--decrease');
          const increaseBtn = fontControls.querySelector('.cb-fullscreen__font-btn--increase');


          if (!decreaseBtn || !increaseBtn) {
            return;
          }

          let decreaseClickData = { lastClickTime: 0, clickCount: 0 };

          // Enhanced keyboard support for decrease button.
          decreaseBtn.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              decreaseBtn.click();
            }
          });

          decreaseBtn.addEventListener('click', (event) => {
            const currentTime = Date.now();
            const timeDifference = currentTime - decreaseClickData.lastClickTime;

            if (timeDifference < CONSTANTS.DOUBLE_CLICK_THRESHOLD) {
              decreaseClickData.clickCount++;
              if (decreaseClickData.clickCount === 2) {
                fontManager.resetFontSize(codeBlock);
                decreaseClickData.clickCount = 0;
                // Announce reset to screen readers.
                const statusElement = document.getElementById('font-size-status');
                if (statusElement) {
                  statusElement.textContent = 'Font size reset to default (100%)';
                  setTimeout(() => {
                    statusElement.textContent = '';
                  }, 1000);
                }
              }
            } else {
              decreaseClickData.clickCount = 1;
              fontManager.adjustFontSize(-CONSTANTS.FONT_ADJUSTMENT, codeBlock);
            }

            decreaseClickData.lastClickTime = currentTime;
            // Keep focus for keyboard users.
            if (event.detail === 0) { // Keyboard activation.
              decreaseBtn.focus();
            } else {
              // Blur for mouse clicks.
              decreaseBtn.blur();
            }
          });

          // Enhanced keyboard support for increase button.
          increaseBtn.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              increaseBtn.click();
            }
          });

          increaseBtn.addEventListener('click', (event) => {
            fontManager.adjustFontSize(CONSTANTS.FONT_ADJUSTMENT, codeBlock);
            // Keep focus for keyboard users.
            if (event.detail === 0) { // Keyboard activation.
              increaseBtn.focus();
            } else {
              // Blur for mouse clicks.
              increaseBtn.blur();
            }
          });
        }
      })();