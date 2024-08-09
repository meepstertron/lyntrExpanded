function highlightMentions(excludeClass) {
    // Regular expression to match @mentions
    const mentionPattern = /@([a-zA-Z0-9_]+)/g;

    // Function to check if an element has the exclude class
    function isExcludedElement(element) {
        return element.classList && element.classList.contains(excludeClass);
    }

    // Function to highlight and make mentions clickable
    function highlightText(element) {
        if (!element) element = document.body;

        // Skip highlighting if the element or its parents have the excluded class
        if (isExcludedElement(element)) {
            return;
        }

        const childNodes = element.childNodes;

        childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                let html = text;

                // Replace mentions
                html = html.replace(mentionPattern, '<span class="mention">$&</span>');

                if (html !== text) {
                    const span = document.createElement('span');
                    span.innerHTML = html;
                    node.parentNode.replaceChild(span, node);
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                highlightText(node); // Recursive call for child elements
            }
        });
    }

    // Function to handle mention clicks
    function handleMentionClick(event) {
        const mention = event.target.textContent.substring(1); // Remove '@'
        window.location.href = `https://lyntr.com/@${mention}`;
    }

    // Add event listeners for mentions
    function addMentionListeners() {
        document.querySelectorAll('.mention').forEach(span => {
            span.addEventListener('click', handleMentionClick);
        });
    }

    // Add CSS for highlighting
    const style = document.createElement('style');
    style.textContent = `
        .mention {
            color: green;
            background-color: rgba(0, 255, 0, 0.1); /* Light green background for mentions */
            text-decoration: underline;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    // Run the highlighting function on the whole document
    highlightText();

    // Add listeners for mentions after highlighting
    addMentionListeners();
}


window.onBodyChange = function() {
    highlightMentions('static bottom-2 flex max-w-md cursor-pointer items-center gap-4 rounded-full bg-border p-4 md:absolute md:w-[250px]');

};
