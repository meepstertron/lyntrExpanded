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
