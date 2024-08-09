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
    <p>Themes go here.</p>
</div>
<div class="tab-content" id="plugins-content">
    <h3>Plugins</h3>
    <div class="plugin-container"></div>
</div>
<div class="tab-content" id="about-content">
    <h3>About</h3>
    <div style="height: 10px;"></div>
    <p>LyntrExpanded is a addon that is striving to improve Lyntr in ways facedev isnt its is also open source</p>
    <p>you can visit the github <a href="https://github.com/meepstertron/lyntrExpanded">here</a> we currently have Themes and Plugins</p>
    <p> </p><p> </p>
    <div style="height: 10px;"></div>
    <div id="profile">
        <img src="https://cdn.lyntr.com/lyntr/9132970051129344_medium.webp?v=0.8658219954878665" alt="Your profile picture." class="h-12 w-12 rounded-full   text-center">
        <p>Hiya, im meep</p>
        <p>I like to draw and code :3 i am the creator of LyntrExpanded</p>
        <p>Contact me on discord: .meepstertron (please report bugs and suggest features on the github)</p>
    </div>
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
                            background: hsl(var(--border));
                            border: none;
                            padding: 0.5rem 1rem;
                            margin-right: 0.5rem;
                            border-radius: 5px;
                            transition: background 0.3s;
                        }
                        .tab-button.active {
                            background: hsl(var(--muted-foreground));
                            color: white;
                        }
                        .tab-content {
                            display: none;
                        }
                        .tab-content.active {
                            display: block;
                        }
                        .plugin-container {
                            display: flex;
                            flex-wrap: wrap;
                            gap: 10px;
                        }
                        .plugin {
                            border: 1px solid #ccc;
                            padding: 10px;
                            border-radius: 5px;
                            flex: 1 1 calc(33.333% - 20px);
                            box-sizing: border-box;
                            background: hsl(var(--muted-background));
                            transition: box-shadow 0.3s;
                        }
                        .plugin:hover {
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        .plugin h4 {
                            margin: 0 0 5px;
                        }
                        .plugin p {
                            margin: 0;
                        }
                        .plugin button {
                            margin-top: 10px;
                            padding: 5px 10px;
                            border: none;
                            border-radius: 3px;
                            cursor: pointer;
                            transition: background 0.3s;
                            color: hsl(var(--primary-foreground));
                        }
                        .plugin button.install {
                            background: hsl(var(--primary));
                            color: white;
                        }
                        .plugin button.uninstall {
                            background: hsl(var(--muted-foreground));
                            color: white;
                        }
                        #profile {
                            border: 1px solid;
                            border-radius: 1rem;
                            width: 60px
                            height: 30px
                            
                            border-color: hsl(var(--muted-foreground));
                            padding: 5px;
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

                            // Handle the "Plugins" tab click
                            if (tabId === 'plugins') {
                                fetchPlugins();
                            }
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

// Function to fetch plugins and display them
function fetchPlugins() {
    const pluginContainer = document.querySelector('.plugin-container');
    const installedPlugins = JSON.parse(localStorage.getItem('installedPlugins')) || [];

    fetch('https://raw.githubusercontent.com/meepstertron/lyntrExpanded/main/Plugins/index.json')
        .then(response => response.json())
        .then(data => {
            if (pluginContainer) {
                pluginContainer.innerHTML = ''; // Clear existing content

                data.plugins.forEach(plugin => {
                    const pluginDiv = document.createElement('div');
                    pluginDiv.classList.add('plugin');
                    pluginDiv.innerHTML = `
                        <h4>${plugin.name}</h4>
                        <p><strong>Version:</strong> ${plugin.ver}</p>
                        <p>${plugin.desc}</p>
                        <p><strong>Author:</strong> ${plugin.author}</p>
                    `;

                    // Add Install or Uninstall button based on installation status
                    const isInstalled = installedPlugins.includes(plugin.file);
                    const button = document.createElement('button');
                    button.textContent = isInstalled ? 'Uninstall' : 'Install';
                    button.classList.add(isInstalled ? 'uninstall' : 'install');
                    pluginDiv.appendChild(button);

                    // Add event listener to the button
                    button.addEventListener('click', () => {
                        if (isInstalled) {
                            // Uninstall the plugin
                            const index = installedPlugins.indexOf(plugin.file);
                            if (index > -1) {
                                installedPlugins.splice(index, 1);
                                localStorage.setItem('installedPlugins', JSON.stringify(installedPlugins));
                                button.textContent = 'Install';
                                button.classList.remove('uninstall');
                                button.classList.add('install');
                                console.log(`Uninstalled ${plugin.name}`);
                            }
                        } else {
                            // Install the plugin
                            installedPlugins.push(plugin.file);
                            localStorage.setItem('installedPlugins', JSON.stringify(installedPlugins));
                            button.textContent = 'Uninstall';
                            button.classList.remove('install');
                            button.classList.add('uninstall');
                            console.log(`Installed ${plugin.name}`);
                        }
                    });

                    pluginContainer.appendChild(pluginDiv);
                });
            }
        })
        .catch(error => console.error('Error fetching plugins:', error));
}

// Use MutationObserver to handle dynamic content loading and changes
function init() {
    const observer = new MutationObserver(() => {
        addCustomSidebarElement();
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

init();
