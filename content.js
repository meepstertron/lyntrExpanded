//THIS IS UNFINISHED ONLY A PROTOTYPE IM STILL WORKING ON IT

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Define the selector for the parent div
    const parentSelector = ".inline-flex w-full flex-row items-start gap-2 rounded-[12px] bg-border p-[12px] md:min-w-[250px] md:flex-col";
  
    // Check if the parent div exists
    const parentDiv = document.querySelector(parentSelector);
  
    if (parentDiv) {
      // Create a new div element
      const newDiv = document.createElement("div");
      newDiv.textContent = "This is a new div!";
      newDiv.style.backgroundColor = "lightblue";
      newDiv.style.padding = "10px";
      newDiv.style.marginTop = "10px";
  
      // Append the new div to the parent div
      parentDiv.appendChild(newDiv);
    }
  });
  