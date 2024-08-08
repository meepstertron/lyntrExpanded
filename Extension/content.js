console.log('Content script loaded');

// Function to add or update the custom sidebar element
function addCustomSidebarElement() {
    const profileButtonContainer = document.querySelector('.inline-flex.w-full.flex-row.items-start.gap-2.rounded-\\[12px\\].bg-border.p-\\[12px\\].md\\:min-w-\\[250px\\].md\\:flex-col');

    if (profileButtonContainer) {
        // Check if the custom button container already exists
        let customContainer = document.querySelector('.custom-sidebar-container');
        if (!customContainer) {
            // Create a new div element for the custom button
            customContainer = document.createElement('div');
            customContainer.classList.add('custom-sidebar-container', 'relative', 'flex', 'flex-row', 'justify-between', 'gap-1', 'border-none', 'w-full', 'md:w-auto', 'svelte-1b26yb0');
            customContainer.innerHTML = `
                <button id="custom-button" class="shit border-2 border-solid border-primary p-1.5 inline-flex items-center justify-center gap-1 rounded-xl font-bold text-primary border-none w-full md:w-auto svelte-1b26yb0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>
                    <span class="hidden md:block">LyntrExpanded</span>
                </button>
            `;
            profileButtonContainer.appendChild(customContainer);

            // Add event listener to the custom button
            const customButton = document.getElementById('custom-button');
            customButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent event from bubbling up to document
                console.log('Custom button clicked');

                // Hide the target div
                const targetDiv = document.querySelector('.flex.h-full.w-full.max-w-\\[600px\\].flex-col.overflow-hidden.md\\:px-1');
                console.log('Target div:', targetDiv);
                if (targetDiv) {
                    targetDiv.style.display = 'none'; // Hide the div
                    console.log('Target div hidden.');

                    // Create and insert the new div with tabs
                    const newDiv = document.createElement('div');
                    newDiv.classList.add('new-sidebar-div', 'relative', 'flex', 'flex-col', 'w-full', 'md:w-auto', 'svelte-1b26yb0');
                    newDiv.innerHTML = `
<div class="tabs">
    <button class="tab-button active" data-tab="settings">Settings</button>
    <button class="tab-button" data-tab="themes">Themes</button>
    <button class="tab-button" data-tab="plugins">Plugins</button>
    <button class="tab-button" data-tab="about">About</button>
</div>
<div class="tab-content" id="settings-content">
    <h3>Settings</h3>
    <p>Settings content goes here.</p>
</div>
<div class="tab-content" id="themes-content">
    <h3>Themes</h3>
    <p>PThemes go here.</p>
</div>
<div class="tab-content" id="plugins-content">
    <h3>Plugins</h3>
    <div class="plugin-container"></div>
</div>
<div class="tab-content" id="about-content">
    <h3>About</h3>
    <p>About content goes here.</p>
</div>
                    `;
                    // Insert the new div in the same position as the target div
                    targetDiv.parentNode.insertBefore(newDiv, targetDiv.nextSibling);

                    // Style the tabs and tab content
                    const tabStyles = `
                        .tabs {
                            padding-top: 30px;
                            display: flex;
                            cursor: pointer;
                            margin-bottom: 1rem;
                        }
                        .tab-button {
                            background: hsl(var(--muted-foreground));
                            border: none;
                            padding: 0.5rem 1rem;
                            margin-right: 0.5rem;
                            border-radius: 5px;
                            transition: background 0.3s;
                        }
                        .tab-button.active {
                            background: hsl(var(--primary));
                            color: white;
                        }
                        .tab-content {
                            display: none;
                        }
                        .tab-content.active {
                            display: block;
                        }
                    `;
                    const styleSheet = document.createElement("style");
                    styleSheet.type = "text/css";
                    styleSheet.innerText = tabStyles;
                    document.head.appendChild(styleSheet);

                    // Show the "Settings" tab by default
                    document.getElementById('settings-content').classList.add('active');

                    // Add event listeners to the tabs
                    const tabButtons = newDiv.querySelectorAll('.tab-button');
                    tabButtons.forEach(button => {
                        button.addEventListener('click', () => {
                            // Hide all tab contents
                            const tabContents = newDiv.querySelectorAll('.tab-content');
                            tabContents.forEach(content => content.classList.remove('active'));

                            // Remove active class from all buttons
                            tabButtons.forEach(btn => btn.classList.remove('active'));

                            // Show the clicked tab content
                            const tabId = button.getAttribute('data-tab');
                            document.getElementById(`${tabId}-content`).classList.add('active');

                            // Set the clicked button as active
                            button.classList.add('active');
                        });
                    });
                } else {
                    console.log('Target div not found.');
                }
            });

            // Add event listeners to other buttons in the sidebar
            const sidebarButtons = profileButtonContainer.querySelectorAll('button');
            sidebarButtons.forEach(button => {
                if (button.id !== 'custom-button') {
                    button.addEventListener('click', () => {
                        console.log('Sidebar button clicked');
                        // Show the target div
                        const targetDiv = document.querySelector('.flex.h-full.w-full.max-w-\\[600px\\].flex-col.overflow-hidden.md\\:px-1');
                        console.log('Target div:', targetDiv);
                        if (targetDiv) {
                            targetDiv.style.display = ''; // Show the div again
                            console.log('Target div shown.');

                            // Remove the new div if it exists
                            const newDiv = document.querySelector('.new-sidebar-div');
                            if (newDiv) {
                                newDiv.remove();
                                console.log('New div removed.');
                            }
                        } else {
                            console.log('Target div not found.');
                        }
                    });
                }
            });
        }
    } else {
        console.log('Profile button container not found.');
    }
}

// Use MutationObserver to handle dynamic content loading and changes
function init() {
    const observer = new MutationObserver(() => {
        addCustomSidebarElement();
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

init();
