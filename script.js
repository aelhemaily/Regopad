

document.addEventListener('DOMContentLoaded', function() {
    // Function to update task action options based on selected method
    function updateTaskOptions(method) {
        const copyOption = document.querySelector('#task option[value="copy"]');
        const deleteOption = document.querySelector('#task option[value="delete"]');
        const replaceOption = document.querySelector('#task option[value="replace"]');

        if (copyOption) {
            if (method === 'all-spaces') {
                copyOption.style.display = 'none'; // Hide copy option
            } else {
                copyOption.style.display = ''; // Show copy option
            }
        }

        if (deleteOption) {
            if (method === 'repeated-words') {
                deleteOption.textContent = 'Delete duplicate(s)'; // Rename the delete option
            } else {
                deleteOption.textContent = 'Delete'; // Revert to original text
            }
        }

        if (replaceOption) {
            if (method === 'repeated-words') {
                replaceOption.style.display = 'none'; // Hide replace option
            } else {
                replaceOption.style.display = ''; // Show replace option
            }
        }
    }

    // Event listener for method change
    const methodSelect = document.getElementById('search-method');
    methodSelect.addEventListener('change', function() {
        const selectedMethod = this.value; // Get the selected method value
        updateTaskOptions(selectedMethod);
    });

    // Initial update on page load
    updateTaskOptions(methodSelect.value);
});



document.addEventListener('DOMContentLoaded', () => {
    const searchMethod = document.getElementById('search-method');
    const task = document.getElementById('task');
    const replaceText = document.getElementById('replace-text');
    const runButton = document.getElementById('run-btn');
    const textInput = document.getElementById('text-input');
    const searchTerm = document.getElementById('search-term');
    const searchTermLabel = document.querySelector('label[for="search-term"]');
    const caseSensitiveCheckbox = document.getElementById('case-sensitive');
    const caseSensitiveLabel = document.querySelector('label[for="case-sensitive"]');
    const searchTermWarning = document.createElement('div');
    const noInstancesWarning = document.createElement('div');
    const inputTextWarning = document.createElement('div');
    const successMessage = document.createElement('div');
    const copyButton = document.getElementById('copy-btn');
    const wrappedTextFields = document.getElementById('wrapped-text-fields');
    const startQuoteInput = document.getElementById('start-quote');
const endQuoteInput = document.getElementById('end-quote');


    searchTermWarning.className = 'warning-message';
    searchTermWarning.textContent = 'Please input search term.';

    inputTextWarning.className = 'warning-message warning-message-mid';
    inputTextWarning.textContent = 'Please input text.';

    successMessage.className = 'success-message';
    successMessage.textContent = 'Copied to clipboard!';

    const searchTermContainer = document.querySelector('#search-term').parentElement;
    searchTermContainer.appendChild(searchTermWarning);
    document.querySelector('.search-method-window').appendChild(inputTextWarning);
    document.querySelector('.search-method-window').appendChild(noInstancesWarning);
    document.querySelector('.search-method-window').appendChild(successMessage);

    const outputBox = document.getElementById('output-box');

    // Set initial visibility of wrapped-text-fields and case sensitivity
    wrappedTextFields.style.display = 'none'; // Hide initially
    caseSensitiveCheckbox.style.display = 'inline'; // Ensure checkbox is initially visible
    caseSensitiveLabel.style.display = 'inline'; // Ensure label is initially visible

    // Function to handle visibility based on selected search method
    function updateVisibility() {
        const isAllNumbers = searchMethod.value === 'all-numbers';
        const isAllSymbols = searchMethod.value === 'all-symbols';
        const isAllSpaces = searchMethod.value === 'all-spaces';
        const isRepeatedWords = searchMethod.value === 'repeated-words';
        const isLowercase = searchMethod.value === 'lowercase';
        const isUppercase = searchMethod.value === 'uppercase';
        const isWrappedText = searchMethod.value === 'wrapped-text';

        // Show or hide search term and case sensitive options based on the selected search method
        const hideSearchOptions = isAllNumbers || isAllSymbols || isAllSpaces || isLowercase || isUppercase;
        searchTerm.style.display = isRepeatedWords || isWrappedText ? 'none' : hideSearchOptions ? 'none' : 'block';
        searchTermLabel.style.display = isRepeatedWords || isWrappedText ? 'none' : hideSearchOptions ? 'none' : 'block';
        caseSensitiveCheckbox.style.display = isWrappedText ? 'inline' : hideSearchOptions ? 'none' : 'inline'; // Ensure visibility when wrapped-text is selected
        caseSensitiveLabel.style.display = isWrappedText ? 'inline' : hideSearchOptions ? 'none' : 'inline'; // Ensure visibility when wrapped-text is selected

        // Show or hide wrapped text fields based on the selected search method
        wrappedTextFields.style.display = isWrappedText ? 'flex' : 'none';
    }

    // Initialize visibility on page load
    updateVisibility();


    searchMethod.addEventListener('change', () => {
        const isAllNumbers = searchMethod.value === 'all-numbers';
        const isAllSymbols = searchMethod.value === 'all-symbols';
        const isAllSpaces = searchMethod.value === 'all-spaces';
        const isRepeatedWords = searchMethod.value === 'repeated-words';
        const isLowercase = searchMethod.value === 'lowercase';
        const isUppercase = searchMethod.value === 'uppercase';
        const isWrappedText = searchMethod.value === 'wrapped-text';

        // Show or hide search term and case sensitive options based on the selected search method
        const hideSearchOptions = isAllNumbers || isAllSymbols || isAllSpaces || isLowercase || isUppercase;
        searchTerm.style.display = isRepeatedWords || isWrappedText ? 'none' : hideSearchOptions ? 'none' : 'block';
        searchTermLabel.style.display = isRepeatedWords || isWrappedText ? 'none' : hideSearchOptions ? 'none' : 'block';
        caseSensitiveCheckbox.style.display = isWrappedText ? 'inline' : hideSearchOptions ? 'none' : 'inline'; // Ensure visibility when wrapped-text is selected
        caseSensitiveLabel.style.display = isWrappedText ? 'inline' : hideSearchOptions ? 'none' : 'inline'; // Ensure visibility when wrapped-text is selected
        
        // Show or hide wrapped text fields based on the selected search method
        wrappedTextFields.style.display = isWrappedText ? 'flex' : 'none';

        searchTermWarning.style.display = 'none';
    });
    

    task.addEventListener('change', () => {
        replaceText.style.display = task.value === 'replace' ? 'block' : 'none';
    });

    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }

    function createRegex(query) {
        return new RegExp(query, caseSensitiveCheckbox.checked ? 'g' : 'gi');
    }

    function highlightText(text) {
        const regex = createRegex(text);
        outputBox.innerHTML = outputBox.innerHTML.replace(regex, `<mark class="highlight">$&</mark>`);
    }

    function highlightLinesContaining(text) {
        const regex = createRegex(text);
        const lines = outputBox.innerHTML.split('\n');
        const highlightedLines = lines.map(line => regex.test(line) ? `<mark class="highlight">${line}</mark>` : line);
        outputBox.innerHTML = highlightedLines.join('\n');
    }

    function highlightFirstInstance(text) {
        const regex = createRegex(text);
        const originalHTML = outputBox.innerHTML;
        const match = originalHTML.match(regex);
        if (match) {
            const index = originalHTML.indexOf(match[0]);
            const before = originalHTML.slice(0, index);
            const highlighted = originalHTML.slice(index, index + match[0].length);
            const after = originalHTML.slice(index + match[0].length);
            outputBox.innerHTML = `${before}<mark class="highlight">${highlighted}</mark>${after}`;
        }
    }

    function highlightLastInstance(text) {
        const regex = createRegex(text);
        const originalHTML = outputBox.innerHTML;
        const matches = [...originalHTML.matchAll(regex)];
        const lastMatch = matches[matches.length - 1];
        if (lastMatch) {
            const index = lastMatch.index;
            const highlighted = lastMatch[0];
            const before = originalHTML.slice(0, index);
            const after = originalHTML.slice(index + highlighted.length);
            outputBox.innerHTML = `${before}<mark class="highlight">${highlighted}</mark>${after}`;
        }
    }

// Add these functions anywhere in your script.js file, preferably with other utility functions

/**
 * Deletes all text on a line BEFORE the FIRST instance of the search text.
 */
function deleteTextBefore(searchText, caseSensitive) {
    // Note: We use the raw text input
    const lines = textInput.value.split(/\r?\n/);
    const resultLines = [];
    let found = false;
    
    // Create a non-global regex (no 'g' flag) so line.search() finds the *first* match.
    const regex = new RegExp(searchText, caseSensitive ? '' : 'i');

    lines.forEach(line => {
        // line.search() returns the index of the first match, or -1.
        const firstMatchIndex = line.search(regex);
        
        if (firstMatchIndex !== -1) {
            found = true;
            // Keep everything from the start of the match to the end of the line.
            resultLines.push(line.substring(firstMatchIndex));
        } else {
            resultLines.push(line);
        }
    });

    return { text: resultLines.join('\n'), found };
}

/**
 * Deletes all text on a line AFTER the LAST instance of the search text.
 */
/**
 * Deletes all text on a line AFTER the FIRST instance of the search text.
 */
function deleteTextAfter(searchText, caseSensitive) {
    const lines = textInput.value.split(/\r?\n/);
    const resultLines = [];
    let found = false;

    // Use a non-global regex (no 'g' flag) to ensure we target the first match only.
    const regexFlags = caseSensitive ? '' : 'i';
    const regex = new RegExp(searchText, regexFlags);

    lines.forEach(line => {
        // 1. Find the starting index of the first match
        const firstMatchIndex = line.search(regex);
        
        if (firstMatchIndex !== -1) {
            found = true;
            
            // 2. Get the actual matched text to determine its length.
            // We use the same non-global regex on the rest of the line starting from the match.
            const match = line.substring(firstMatchIndex).match(regex);
            
            // 3. Calculate the end position (start index + match length)
            const matchLength = match ? match[0].length : 0;
            const endPosition = firstMatchIndex + matchLength;
            
            // 4. Keep everything from the start of the line up to the end position of the first match.
            resultLines.push(line.substring(0, endPosition));
        } else {
            resultLines.push(line);
        }
    });

    return { text: resultLines.join('\n'), found };
}

// NOTE: The function highlightDeletedBeforeAfter is no longer needed 
// and should be deleted from your script.js.

    function highlightReplacedText(originalText, searchText, replacementText) {
        const regex = createRegex(searchText);
        return originalText.replace(regex, `<mark class="highlight">${replacementText}</mark>`);
    }

    function replaceLinesNotContaining(text, replacement) {
        const regex = createRegex(text);
        const lines = outputBox.innerHTML.split('\n');
        const replacedLines = lines.map(line => !regex.test(line) ? `<mark class="highlight">${replacement}</mark>` : line);
        return replacedLines.join('\n');
    }

    function highlightLinesStarting(text) {
        const regex = createRegex(`^${text}`);
        const lines = outputBox.innerHTML.split('\n');
        const highlightedLines = lines.map(line => regex.test(line) ? `<mark class="highlight">${line}</mark>` : line);
        outputBox.innerHTML = highlightedLines.join('\n');
    }

    function highlightLinesEnding(text) {
        const regex = createRegex(`${text}$`);
        const lines = outputBox.innerHTML.split('\n');
        const highlightedLines = lines.map(line => regex.test(line) ? `<mark class="highlight">${line}</mark>` : line);
        outputBox.innerHTML = highlightedLines.join('\n');
    }

    function highlightAllNumbers() {
        const regex = /\d+/g;
        outputBox.innerHTML = outputBox.innerHTML.replace(regex, `<mark class="highlight">$&</mark>`);
    }

    function replaceAllNumbers(replacement) {
        const regex = /\d+/g;
        outputBox.innerHTML = outputBox.innerHTML.replace(regex, `<mark class="highlight">${replacement}</mark>`);
    }

    function copyAllNumbers() {
        const regex = /\d+/g;
        const sanitizedText = sanitizeInput(textInput.value); // Use sanitized input text
        const matches = sanitizedText.match(regex) || [];
        const numbersToCopy = matches.join('\n');
        copyToClipboard(numbersToCopy);
        highlightAllNumbers();
        return numbersToCopy.length > 0;
    }

    function highlightAllSymbols() {
        const regex = /[^\w\s]/g;
        outputBox.innerHTML = outputBox.innerHTML.replace(regex, `<mark class="highlight">$&</mark>`);
    }

    function replaceAllSymbols(replacement) {
        const regex = /[^\w\s]/g;
        outputBox.innerHTML = outputBox.innerHTML.replace(regex, `<mark class="highlight">${replacement}</mark>`);
    }

    function copyAllSymbols() {
        const regex = /[^\w\s]/g;
        const sanitizedText = sanitizeInput(textInput.value); // Use sanitized input text
        const matches = sanitizedText.match(regex) || [];
        const symbolsToCopy = matches.join('\n');
        copyToClipboard(symbolsToCopy);
        highlightAllSymbols();
        return symbolsToCopy.length > 0;
    }

    function copyToClipboard(text) {
        const tempInput = document.createElement('textarea');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    }

    
  
    function highlightRepeatedWords() {
        const regex = createRegex('\\b(\\w+)\\s+\\1\\b');
        const originalHTML = outputBox.innerHTML;
        outputBox.innerHTML = originalHTML.replace(regex, `<mark class="highlight">$&</mark>`);
    }
    

    
    function highlightUppercase() {
        const regex = /[A-Z]/g;
        outputBox.innerHTML = outputBox.innerHTML.replace(regex, (match) => `<mark class="highlight">${match}</mark>`);
    }
    
    function copyUppercase() {
        const regex = /[A-Z]/g;
        const sanitizedText = sanitizeInput(textInput.value); // Use sanitized input text
        const matches = sanitizedText.match(regex) || [];
        const uppercaseToCopy = matches.join('');
        copyToClipboard(uppercaseToCopy);
        return uppercaseToCopy.length > 0;
    }
    
    function replaceUppercase(replacement) {
        const regex = /[A-Z]/g;
        const originalHTML = outputBox.innerHTML;
        const replacedContent = originalHTML.replace(regex, replacement);
        outputBox.innerHTML = replacedContent;
    }
    
   
    
    function highlightLowercase() {
        const regex = /[a-z]/g;
        outputBox.innerHTML = outputBox.innerHTML.replace(regex, (match) => `<mark class="highlight">${match}</mark>`);
    }
    
    function copyLowercase() {
        const regex = /[a-z]/g;
        const sanitizedText = sanitizeInput(outputBox.textContent); // Use text from outputBox
        const matches = sanitizedText.match(regex) || [];
        const lowercaseToCopy = matches.join('');
        copyToClipboard(lowercaseToCopy);
        return lowercaseToCopy;
    }
    
    function replaceLowercase(replacement) {
        const regex = /[a-z]/g;
        const originalText = outputBox.innerHTML;
        const replacedContent = originalText.replace(regex, replacement);
        outputBox.innerHTML = replacedContent;
    }
    
    
    
    function handleWrappedText(taskAction) {
        const startQuote = sanitizeInput(startQuoteInput.value);
        const endQuote = sanitizeInput(endQuoteInput.value);
        const caseSensitive = document.getElementById('case-sensitive').checked;
    
        if (!startQuote || !endQuote) {
            noInstancesWarning.style.display = 'block';
            outputBox.innerHTML = ''; // Clear the output box
            displayTaskStatus(false);
            return;
        }
    
        // Split the text input into individual lines, handling different types of line breaks
        const lines = textInput.value.split(/\r?\n/); // Handles both Unix (\n) and Windows (\r\n) line breaks
        let outputLines = [];
        let found = false;
        let contentToCopy = '';
    
        // Create the regex flags based on case sensitivity
        const regexFlags = caseSensitive ? 'g' : 'gi';
        const escapedStartQuote = escapeRegExp(startQuote);
        const escapedEndQuote = escapeRegExp(endQuote);
    
        // Create a regex to match text between startQuote and endQuote
        const wrappedTextRegex = new RegExp(`(${escapedStartQuote})(.*?)(${escapedEndQuote})`, regexFlags);
    
        lines.forEach(line => {
            let modifiedLine = line;
            let match;
    
            // Track lastIndex to avoid reprocessing already handled parts
            let lastIndex = 0;
    
            while ((match = wrappedTextRegex.exec(line)) !== null) {
                if (match.index >= lastIndex) {
                    const beforeText = match[1]; // startQuote
                    const innerText = match[2]; // Text between startQuote and endQuote
                    const afterText = match[3]; // endQuote
    
                    const originalText = match[0];
    
                    if (taskAction === 'highlight') {
                        const highlightedInnerText = `<mark class="highlight">${innerText}</mark>`;
                        modifiedLine = modifiedLine.replace(originalText, `${beforeText}${highlightedInnerText}${afterText}`);
                        lastIndex = match.index + beforeText.length + highlightedInnerText.length + afterText.length;
                        found = true;
    
                    } else if (taskAction === 'copy') {
                        contentToCopy += innerText + '\n';
                        // Highlight the text in the output
                        const highlightedInnerText = `<mark class="highlight">${innerText}</mark>`;
                        modifiedLine = modifiedLine.replace(originalText, `${beforeText}${highlightedInnerText}${afterText}`);
                        lastIndex = match.index + beforeText.length + highlightedInnerText.length + afterText.length;
                        found = true;
    
                    } else if (taskAction === 'replace') {
                        // Create a highlighted version of the replacement text
                        const replacementText = sanitizeInput(replaceText.value);
                        const highlightedReplacementText = `<mark class="highlight">${replacementText}</mark>`;
                        // Replace the original text with the highlighted replacement text
                        modifiedLine = modifiedLine.replace(originalText, `${beforeText}${highlightedReplacementText}${afterText}`);
                        lastIndex = match.index + beforeText.length + highlightedReplacementText.length + afterText.length;
                        found = true;
    
                    } else if (taskAction === 'delete') {
                        // Remove only the text between the start and end quotes, preserving the quotes
                        modifiedLine = modifiedLine.replace(originalText, `${beforeText}${afterText}`);
                        lastIndex = match.index + beforeText.length + afterText.length;
                        found = true;
                    }
                }
            }
    
            // Add the modified line to the output lines
            outputLines.push(modifiedLine);
        });
    
        if (taskAction === 'copy') {
            if (contentToCopy) {
                // Ensure the copied content is highlighted in the output
                outputBox.innerHTML = outputLines.join('\n');
                copyToClipboard(contentToCopy.trim()); // Remove trailing newline
            }
        } else if (taskAction === 'delete') {
            // Remove any empty lines after processing all lines
            outputLines = outputLines.filter(line => line.trim().length > 0);
            outputBox.innerHTML = outputLines.join('\n');
        } else {
            outputBox.innerHTML = outputLines.join('\n');
        }
    
        // Call displayTaskStatus with appropriate boolean value
        displayTaskStatus(found);
    }
    
    // Helper function to escape special characters in regex
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    


    function showSuccessMessage() {
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 1500);
    }

    function validateInputs() {
        let valid = true;
        
        // Text input validation
        if (!textInput.value.trim()) {
            inputTextWarning.style.display = 'block';
            valid = false;
        } else {
            inputTextWarning.style.display = 'none';
        }
    
        // Search term validation
        const requiresSearchTerm = ['all-instances', 'lines-containing', 'lines-not-containing', 'lines-starting', 'lines-ending', 'first-instance', 'last-instance', 'wrapped-text'].includes(searchMethod.value);
        if (requiresSearchTerm && !searchTerm.value.trim() && searchMethod.value !== 'wrapped-text') {
            searchTermWarning.style.display = 'block';
            searchTermWarning.textContent = 'Please input search term.';
            valid = false;
        } else {
            searchTermWarning.style.display = 'none';
        }
    
        // Wrapped text validation
        const wrappedTextWarning = document.getElementById('wrapped-text-warning');
        if (searchMethod.value === 'wrapped-text') {
            if (!startQuoteInput.value.trim() || !endQuoteInput.value.trim()) {
                wrappedTextWarning.style.display = 'block';
                wrappedTextWarning.textContent = 'Please input start and end limiters.';
                valid = false;
            } else {
                wrappedTextWarning.style.display = 'none';
            }
        } else {
            wrappedTextWarning.style.display = 'none';
        }
    
        return valid;
    }
    
    

   // Function to display task status messages
function displayTaskStatus(found) {
    const taskDoneMessage = document.querySelector('.task-done-message');
    const zeroMessage = document.querySelector('.zero-message');
    
    if (found) {
        taskDoneMessage.textContent = 'Task done!'; // Success message
        taskDoneMessage.style.display = 'block'; // Show success message
        zeroMessage.style.display = 'none'; // Hide no instances found message
    } else {
        zeroMessage.textContent = '0 instances found.'; // No instances found message
        zeroMessage.style.display = 'block'; // Show no instances found message
        taskDoneMessage.style.display = 'none'; // Hide success message
        outputBox.innerHTML = ''; // Clear output box if no instances found
    }
    
    // Hide the message after 3 seconds
    setTimeout(() => {
        taskDoneMessage.style.display = 'none';
        zeroMessage.style.display = 'none';
    }, 1500); // Adjust the timeout duration as needed
}

function uppercasify() {
    const query = sanitizeInput(searchTerm.value);
    const sanitizedText = sanitizeInput(textInput.value);
    let updatedText = sanitizedText;

    if (query) {
        const regex = new RegExp(query, caseSensitiveCheckbox.checked ? 'g' : 'gi');
        updatedText = updatedText.replace(regex, (match) => `<mark class="highlight">${match.toUpperCase()}</mark>`);
    } else {
        updatedText = updatedText.toUpperCase();
    }

    outputBox.innerHTML = updatedText;
}



    runButton.addEventListener('click', () => {
        if (!validateInputs()) {
            outputBox.innerHTML = ''; // Clear the output box if inputs are invalid
            return;
        }

        const method = searchMethod.value;
        const query = sanitizeInput(searchTerm.value);
        const taskAction = task.value;
        const replacement = sanitizeInput(replaceText.value);

        
        
        
        

        noInstancesWarning.style.display = 'none';
        successMessage.style.display = 'none';

        const sanitizedText = sanitizeInput(textInput.value);
        outputBox.innerHTML = sanitizedText;

        let found = false;
        let contentToCopy = '';


        if (method === 'wrapped-text') {
            handleWrappedText(taskAction);
            
        

        
        } else if (method === 'all-instances') {
            if (taskAction === 'highlight') {
                highlightText(query);
                found = outputBox.innerHTML.includes('<mark class="highlight">');
                displayTaskStatus(found);

        


            } else if (taskAction === 'copy') {
                // Highlight all instances of the query
                highlightText(query);
                found = outputBox.innerHTML.includes('<mark class="highlight">');
                
                // Collect all highlighted instances
                const highlightedInstances = [];
                const highlightRegex = /<mark class="highlight">(.*?)<\/mark>/g;
                let match;
            
                // Extract highlighted instances
                while ((match = highlightRegex.exec(outputBox.innerHTML)) !== null) {
                    highlightedInstances.push(match[1]);
                }
            
                // Join all highlighted instances with newline characters for copying
                const contentToCopy = highlightedInstances.join('\n');
                if (contentToCopy) {
                    copyToClipboard(contentToCopy);}
                    displayTaskStatus(found);

                        

            } else if (taskAction === 'replace') {
                const replacedText = highlightReplacedText(sanitizedText, query, replacement);
                outputBox.innerHTML = replacedText;
                found = replacedText.includes('<mark class="highlight">');
                displayTaskStatus(found);
} else if (taskAction === 'delete-before') {
    const result = deleteTextBefore(query, caseSensitiveCheckbox.checked);
    if (result.found) {
        // Display the actual modified text from the deletion function
        outputBox.innerHTML = sanitizeInput(result.text); 
        found = true;
    } else {
        outputBox.innerHTML = ''; // Clear output if nothing was found/modified
    }
    displayTaskStatus(found);

} else if (taskAction === 'delete-after') {
    const result = deleteTextAfter(query, caseSensitiveCheckbox.checked);
    if (result.found) {
        // Display the actual modified text from the deletion function
        outputBox.innerHTML = sanitizeInput(result.text); 
        found = true;
    } else {
        outputBox.innerHTML = ''; // Clear output if nothing was found/modified
    }
    displayTaskStatus(found);


              } else if (taskAction === 'delete') {
                // Create regex for the search term
                const regex = new RegExp(query, caseSensitiveCheckbox.checked ? 'g' : 'gi');
            
                // Split the sanitized text into lines, handling different types of line breaks
                const lines = sanitizedText.split(/\r?\n/); // Handles both Unix (\n) and Windows (\r\n) line breaks
            
                // Remove all instances of the search term from each line
                const modifiedLines = lines.map(line => {
                    // Replace the search term and clean up extra spaces
                    return line.replace(regex, '').replace(/\s{2,}/g, ' ').trim();
                });
            
                // Preserve originally empty lines and remove newly created empty lines
                const originalEmptyLines = lines.map(line => line.trim().length === 0);
                const resultLines = modifiedLines.filter((line, index) => {
                    // Keep originally empty lines, remove new empty lines
                    return line.length > 0 || originalEmptyLines[index];
                });
            
                // Update the output box with the processed lines
                outputBox.innerHTML = resultLines.join('\n');
            
                // Determine if any instances of the search term were removed
                const anyInstancesRemoved = sanitizedText !== resultLines.join('\n');
            
                // Set found to true if any instances were removed, false otherwise
                const found = anyInstancesRemoved;
            
                // Clear the output box if no instances were found
                if (!found) {
                    outputBox.innerHTML = ''; // Clear the output box
                }
            
                // Display the task status message based on the found status
                displayTaskStatus(found);
            
           } else if (taskAction === 'uppercasify') {
            console.log("Running uppercasify function..."); // Debugging line
            uppercasify();
            found = outputBox.innerHTML.includes('<mark class="highlight">');
            displayTaskStatus(found);
        }
        
                
            
            
                
            
        


        } else if (method === 'lowercase') {
            if (taskAction === 'highlight') {
                highlightLowercase();
                found = outputBox.innerHTML.includes('<mark class="highlight">');
                displayTaskStatus(found);
            } else if (taskAction === 'copy') {
                const lowercaseToCopy = copyLowercase();
                if (lowercaseToCopy.length > 0) {
                    highlightLowercase(); // Ensure highlighting after copying
                   
                }
                found = lowercaseToCopy.length > 0;
                displayTaskStatus(found);
            } else if (taskAction === 'replace') {
                replaceLowercase(replacement);
                found = outputBox.innerHTML.includes(`<mark class="highlight">${replacement}</mark>`);
                highlightLowercase();
                found = outputBox.innerHTML.includes('<mark class="highlight">');
                displayTaskStatus(found);
            } else if (taskAction === 'delete') {
                // Create a regular expression to match all lowercase letters
                const lowercaseRegex = /[a-z]/g;
                
                // Get the current content from the output box
                const currentContent = outputBox.innerHTML;
                
                // Preserve the original empty lines
                const originalLines = currentContent.split('\n');
                const isOriginalEmptyLine = originalLines.map(line => line.trim().length === 0);
                
                // Remove all lowercase letters from the content
                const modifiedLines = originalLines.map((line, index) => {
                    if (isOriginalEmptyLine[index]) {
                        return line; // Preserve originally empty lines
                    }
                    return line.replace(lowercaseRegex, ''); // Remove lowercase letters
                });
                
                // Filter out newly created empty lines, while keeping original empty lines
                const resultLines = modifiedLines.filter((line, index) => {
                    return line.trim().length > 0 || isOriginalEmptyLine[index];
                });
        
                // Set the updated content back to the output box
                outputBox.innerHTML = resultLines.join('\n');
                
                // Check if any lowercase letters remain
                found = !lowercaseRegex.test(outputBox.innerHTML);
                displayTaskStatus(found);
            
            } else if (taskAction === 'uppercasify') {
    
                const currentContent = outputBox.innerHTML;
                
                // Update the content to uppercase for lowercase method
                const updatedContent = currentContent.replace(/[a-z]/g, (match) => `<mark class="highlight">${match.toUpperCase()}</mark>`);
                
                outputBox.innerHTML = updatedContent;
                
                // Check if any content was updated to uppercase
                found = /<mark class="highlight">[A-Z]<\/mark>/g.test(outputBox.innerHTML);
                displayTaskStatus(found);
            }

              
          } else if (method === 'lines-containing') {
            // Helper function to create regex with case sensitivity option
            function createRegex(query) {
                return new RegExp(query, caseSensitiveCheckbox.checked ? '' : 'i');
            }
        
            // Helper function to normalize line breaks and trim lines
            function normalizeLines(text) {
                return text.split(/\r?\n/).map(line => line.trim());
            }
        
            const regex = createRegex(query);
            const lines = normalizeLines(sanitizedText);
        
            if (taskAction === 'highlight') {
                // Highlight lines containing the search term
                const highlightedLines = lines.map(line => {
                    if (regex.test(line)) {
                        return `<mark class="highlight">${line}</mark>`;
                    }
                    return line;
                });
        
                outputBox.innerHTML = highlightedLines.join('\n');
                found = highlightedLines.some(line => /<mark class="highlight">/.test(line));
                displayTaskStatus(found);

            } else if (taskAction === 'copy') {
                // Copy lines containing the search term
                const linesContainingQuery = lines.filter(line => regex.test(line));
                contentToCopy = linesContainingQuery.join('\n');
        
                if (contentToCopy.length > 0) {
                    // Highlight lines for visual consistency
                    const highlightedLines = lines.map(line => {
                        if (regex.test(line)) {
                            return `<mark class="highlight">${line}</mark>`;
                        }
                        return line;
                    });
                    outputBox.innerHTML = highlightedLines.join('\n');
                    copyToClipboard(contentToCopy);
                }
        
                found = contentToCopy.length > 0;
                displayTaskStatus(found);
        
            } else if (taskAction === 'replace') {
                    const regex = new RegExp(escapeRegExp(query), caseSensitiveCheckbox.checked ? 'g' : 'gi');
                    const lines = sanitizedText.split('\n');
                    const replacedLines = lines.map(line => regex.test(line) ? `<mark class="highlight">${replacement}</mark>` : line);
                    outputBox.innerHTML = replacedLines.join('\n');
                    found = replacedLines.join('\n').includes('<mark class="highlight">');
            
            
            // Helper function to escape special characters in the query for regex
            function escapeRegExp(string) {
                return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            }
            displayTaskStatus(found);

            } else if (taskAction === 'delete') {
                // Remove lines containing the search term
                const modifiedLines = lines.filter(line => !regex.test(line));
        
                outputBox.innerHTML = modifiedLines.join('\n');
                found = lines.some(line => regex.test(line)); // Check if any lines were removed
            }
            displayTaskStatus(found);
         }else  if (taskAction === 'uppercasify') {
            const lines = sanitizedText.split('\n');
    
            // Process lines to convert to uppercase and highlight if they contain the search term
            const processedLines = lines.map(line => {
                if (regex.test(line)) {
                    // Convert the entire line to uppercase and highlight it
                    return `<mark class="highlight">${line.toUpperCase()}</mark>`;
                }
                return line;
            });
    
            // Update outputBox with the modified content
            outputBox.innerHTML = processedLines.join('\n');
    
            // Check if any lines were processed (converted to uppercase and highlighted)
            const found = processedLines.some(line => line.includes('<mark class="highlight">'));
    
            // Display task status based on whether any lines were processed
            displayTaskStatus(found);
       
    
    // Helper function to escape special characters in the query for regex
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }  


        } else if (method === 'lines-not-containing') {
            // Helper function to create regex with case sensitivity option
            function createRegex(query) {
                return new RegExp(query, caseSensitiveCheckbox.checked ? '' : 'i');
            }
        
            // Helper function to normalize line breaks and trim lines
            function normalizeLines(text) {
                return text.split(/\r?\n/).map(line => line.trim());
            }
        
            const regex = createRegex(query);
            const lines = normalizeLines(sanitizedText);
        
            if (taskAction === 'highlight') {
                // Highlight lines that do not contain the search term
                const highlightedLines = lines.map(line => {
                    if (!regex.test(line)) {
                        return `<mark class="highlight">${line}</mark>`;
                    }
                    return line;
                });
                
                outputBox.innerHTML = highlightedLines.join('\n');
                
                found = highlightedLines.some(line => /<mark class="highlight">/.test(line));
                displayTaskStatus(found);
        
            } else if (taskAction === 'copy') {
                // Copy lines that do not contain the search term
                const linesToCopy = lines.filter(line => !regex.test(line)).join('\n');
        
                if (linesToCopy.length > 0) {
                    // Highlight lines for visual consistency
                    const highlightedLines = lines.map(line => {
                        if (!regex.test(line)) {
                            return `<mark class="highlight">${line}</mark>`;
                        }
                        return line;
                    });
        
                    outputBox.innerHTML = highlightedLines.join('\n');
                    copyToClipboard(linesToCopy);
                }
        
                found = linesToCopy.length > 0;
                displayTaskStatus(found);
        
            } else if (taskAction === 'replace') {
                // Replace lines that do not contain the search term
                const replacedLines = lines.map(line => {
                    if (!regex.test(line)) {
                        return line.replace(/(.+)/, match => `<mark class="highlight">${replacement}</mark>`);
                    }
                    return line;
                });
        
                outputBox.innerHTML = replacedLines.join('\n');
                found = replacedLines.join('\n').includes('<mark class="highlight">');
                displayTaskStatus(found);
        
            } else if (taskAction === 'delete') {
                const regex = createRegex(query, caseSensitiveCheckbox.checked ? 'g' : 'gi');
                
                // Split the text content into lines
                const lines = sanitizedText.split('\n');
            
                // Preserve the original empty lines
                const isOriginalEmptyLine = lines.map(line => line.trim().length === 0);
            
                // Keep only lines that contain the search term and preserve empty lines
                const modifiedLines = lines.filter((line, index) => {
                    const containsTerm = regex.test(line);
                    return containsTerm || isOriginalEmptyLine[index];
                });
            
                // Filter out newly created empty lines while keeping original empty lines
                const resultLines = modifiedLines.filter((line, index) => {
                    return line.trim().length > 0 || isOriginalEmptyLine[index];
                });
            
                // Update the output box with the processed lines
                outputBox.innerHTML = resultLines.join('\n');
            
                // Check if any lines do not contain the search term, indicating lines were deleted
                found = lines.some(line => !regex.test(line));
            
                // Display the task status message based on the found status
                displayTaskStatus(found);
            }
            
        
            } else if (method === 'uppercase') {
                if (taskAction === 'highlight') {
                    highlightUppercase();
                    found = outputBox.innerHTML.includes('<mark class="highlight">');
                    displayTaskStatus(found);
                } else if (taskAction === 'copy') {
                    const uppercaseToCopy = copyUppercase();
                    if (uppercaseToCopy.length > 0) {
                        highlightUppercase(); // Ensure highlighting after copying
                    }
                    found = uppercaseToCopy.length > 0;
                    displayTaskStatus(found);
                } else if (taskAction === 'replace') {
                    replaceUppercase(replacement);
                    found = outputBox.innerHTML.includes(`<mark class="highlight">${replacement}</mark>`);
                    displayTaskStatus(found);

                } else if (taskAction === 'delete') {
                    // Create a regular expression to match all uppercase letters
                    const uppercaseRegex = /[A-Z]/g;
                
                    // Get the current content from the output box
                    const currentContent = outputBox.innerHTML;
                
                    // Preserve the original empty lines
                    const originalLines = currentContent.split('\n');
                    const isOriginalEmptyLine = originalLines.map(line => line.trim().length === 0);
                
                    // Remove all uppercase letters from the content
                    const modifiedLines = originalLines.map((line, index) => {
                        if (isOriginalEmptyLine[index]) {
                            return line; // Preserve originally empty lines
                        }
                        return line.replace(uppercaseRegex, ''); // Remove uppercase letters
                    });
                
                    // Filter out newly created empty lines, while keeping original empty lines
                    const resultLines = modifiedLines.filter((line, index) => {
                        return line.trim().length > 0 || isOriginalEmptyLine[index];
                    });
                
                    // Set the updated content back to the output box
                    outputBox.innerHTML = resultLines.join('\n');
                
                    // Check if any uppercase letters remain
                    found = uppercaseRegex.test(currentContent);
                
                    // Display the task status message based on the found status
                    displayTaskStatus(found);
                }
                
            
            // Function to highlight uppercase letters
            function highlightUppercase() {
                const uppercaseRegex = /[A-Z]/g;
                outputBox.innerHTML = outputBox.innerHTML.replace(uppercaseRegex, match => `<mark class="highlight">${match}</mark>`);
            }
            
            // Function to copy uppercase letters
            function copyUppercase() {
                const uppercaseRegex = /[A-Z]/g;
                const uppercaseMatches = outputBox.innerHTML.match(uppercaseRegex);
                if (uppercaseMatches) {
                    copyToClipboard(uppercaseMatches.join(''));
                    return uppercaseMatches.join('');
                }
                return '';
            }
            
            // Function to replace uppercase letters
            function replaceUppercase(replacement) {
                const uppercaseRegex = /[A-Z]/g;
                outputBox.innerHTML = outputBox.innerHTML.replace(uppercaseRegex, `<mark class="highlight">${replacement}</mark>`);
            }
           


              } else if (method === 'lines-starting') {
                // Define regex to match lines starting with the search term
                const regex = new RegExp(`^\\s*${query}`, caseSensitiveCheckbox.checked ? '' : 'i');

            
                 if (taskAction === 'highlight') {
                    const lines = sanitizedText.split('\n');
                    
                    // Highlight lines starting with the search term
                    const highlightedLines = lines.map(line => {
                        if (regex.test(line)) {
                            // Highlight the entire line
                            return `<mark class="highlight">${line}</mark>`;
                        }
                        return line;
                    });
                
                    outputBox.innerHTML = highlightedLines.join('\n');
                    
                    // Check if any lines have been highlighted
                    found = highlightedLines.some(line => line.includes('<mark class="highlight">'));
                    displayTaskStatus(found);
                
                
            
                } else if (taskAction === 'copy') {
                    const lines = sanitizedText.split('\n');
                    // Collect lines starting with the search term
                    const contentToCopy = lines.filter(line => regex.test(line)).join('\n');
            
                    // Highlight lines starting with the search term
                    const highlightedLines = lines.map(line => {
                        if (regex.test(line)) {
                            return `<mark class="highlight">${line}</mark>`;
                        }
                        return line;
                    });
                    outputBox.innerHTML = highlightedLines.join('\n');
            
                    if (contentToCopy) {
                        // Copy the collected lines to the clipboard
                        copyToClipboard(contentToCopy);
                    }
            
                    found = contentToCopy.length > 0;
                    displayTaskStatus(found);
            
                
                
                 } else if (taskAction === 'replace') {
                        const lines = sanitizedText.split('\n');
                        
                        // Replace lines starting with the search term with highlighted replacement text
                        const replacedLines = lines.map(line => {
                            if (regex.test(line)) {
                                // Replace the whole line with the replacement text wrapped in <mark> tag
                                return `<mark class="highlight">${replacement}</mark>`;
                            }
                            return line;
                        });
                    
                        outputBox.innerHTML = replacedLines.join('\n');
                        
                        // Check if any lines have been replaced and highlighted
                        found = replacedLines.some(line => line.includes('<mark class="highlight">'));
                        displayTaskStatus(found);
                    
                                    
                
                
                    } else if (taskAction === 'delete') {
                        const lines = sanitizedText.split('\n');
                
                        // Preserve the original empty lines
                        const isOriginalEmptyLine = lines.map(line => line.trim().length === 0);
                
                        // Remove lines starting with the query
                        const modifiedLines = lines.map((line, index) => {
                            if (isOriginalEmptyLine[index]) {
                                return line; // Preserve originally empty lines
                            }
                            return regex.test(line) ? '' : line; // Remove lines starting with the query
                        });
                
                        // Filter out newly created empty lines while keeping original empty lines
                        const resultLines = modifiedLines.filter((line, index) => {
                            return line.trim().length > 0 || isOriginalEmptyLine[index];
                        });
                
                        outputBox.innerHTML = resultLines.join('\n');
                
                        // Check if any lines starting with the search term remain
                        found = lines.some(line => regex.test(line));
                
                        // Display the task status message based on the found status
                        displayTaskStatus(found);
                    }
                    
        
                } else if (method === 'lines-ending') {
                    // Define regex to match lines ending with the search term
                    const regex = new RegExp(`${query}\\s*$`, caseSensitiveCheckbox.checked ? '' : 'i');
                
                    if (taskAction === 'highlight') {
                        const lines = sanitizedText.split('\n');
                        
                        // Highlight lines ending with the search term
                        const highlightedLines = lines.map(line => {
                            if (regex.test(line)) {
                                // Highlight the entire line
                                return `<mark class="highlight">${line}</mark>`;
                            }
                            return line;
                        });
                
                        outputBox.innerHTML = highlightedLines.join('\n');
                        
                        // Check if any lines have been highlighted
                        found = highlightedLines.some(line => line.includes('<mark class="highlight">'));
                        displayTaskStatus(found);
                
                    } else if (taskAction === 'copy') {
                        const lines = sanitizedText.split('\n');
                        // Collect lines ending with the search term
                        const contentToCopy = lines.filter(line => regex.test(line)).join('\n');
                
                        // Highlight lines ending with the search term
                        const highlightedLines = lines.map(line => {
                            if (regex.test(line)) {
                                return `<mark class="highlight">${line}</mark>`;
                            }
                            return line;
                        });
                        outputBox.innerHTML = highlightedLines.join('\n');
                
                        if (contentToCopy) {
                            // Copy the collected lines to the clipboard
                            copyToClipboard(contentToCopy);
                        }
                
                        found = contentToCopy.length > 0;
                        displayTaskStatus(found);
                
                    } else if (taskAction === 'replace') {
                        const lines = sanitizedText.split('\n');
                        
                        // Replace lines ending with the search term with highlighted replacement text
                        const replacedLines = lines.map(line => {
                            if (regex.test(line)) {
                                // Replace the whole line with the replacement text wrapped in <mark> tag
                                return `<mark class="highlight">${replacement}</mark>`;
                            }
                            return line;
                        });
                
                        outputBox.innerHTML = replacedLines.join('\n');
                        
                        // Check if any lines have been replaced and highlighted
                        found = replacedLines.some(line => line.includes('<mark class="highlight">'));
                        displayTaskStatus(found);
                
                    } else if (taskAction === 'delete') {
                        const lines = sanitizedText.split('\n');
                
                        // Preserve the original empty lines
                        const isOriginalEmptyLine = lines.map(line => line.trim().length === 0);
                
                        // Remove lines ending with the query
                        const modifiedLines = lines.map((line, index) => {
                            if (isOriginalEmptyLine[index]) {
                                return line; // Preserve originally empty lines
                            }
                            return regex.test(line) ? '' : line; // Remove lines ending with the query
                        });
                
                        // Filter out newly created empty lines while keeping original empty lines
                        const resultLines = modifiedLines.filter((line, index) => {
                            return line.trim().length > 0 || isOriginalEmptyLine[index];
                        });
                
                        outputBox.innerHTML = resultLines.join('\n');
                
                        // Check if any lines ending with the search term remain
                        found = lines.some(line => regex.test(line));
                
                        // Display the task status message based on the found status
                        displayTaskStatus(found);
                    }
                
             
        



        } else if (method === 'first-instance') {
            if (taskAction === 'highlight') {
                highlightFirstInstance(query);
                found = outputBox.innerHTML.includes('<mark class="highlight">');
                displayTaskStatus(found);
            } else if (taskAction === 'copy') {
                const regex = new RegExp(query, caseSensitiveCheckbox.checked ? 'g' : 'gi');
                
                const match = sanitizedText.match(regex);
                if (match) {
                    contentToCopy = sanitizedText.slice(sanitizedText.indexOf(match[0]), sanitizedText.indexOf(match[0]) + match[0].length);
                    copyToClipboard(contentToCopy);
                    highlightFirstInstance(query); // Highlight the first instance
                    
                    found = true;
                }
                displayTaskStatus(found);
            } else if (taskAction === 'replace') {
                const regex = new RegExp(query, caseSensitiveCheckbox.checked ? 'g' : 'gi');
                const match = sanitizedText.match(regex);
                if (match) {
                    const index = sanitizedText.indexOf(match[0]);
                    const before = sanitizedText.slice(0, index);
                    const after = sanitizedText.slice(index + match[0].length);
                    outputBox.innerHTML = `${before}<mark class="highlight">${replacement}</mark>${after}`;
                    found = outputBox.innerHTML.includes('<mark class="highlight">');
                } else {
                    noInstancesWarning.style.display = 'block';
                    outputBox.innerHTML = ''; // Clear output box if no instances are found
                }
                displayTaskStatus(found);


            }else if (taskAction === 'delete') {
                const regex = new RegExp(query, caseSensitiveCheckbox.checked ? 'g' : 'gi');
                const match = sanitizedText.match(regex);
            
                if (match) {
                    const index = sanitizedText.indexOf(match[0]);
                    const before = sanitizedText.slice(0, index);
                    const after = sanitizedText.slice(index + match[0].length);
                    const newText = before + after;
            
                    // Preserve the original empty lines
                    const originalLines = sanitizedText.split('\n');
                    const isOriginalEmptyLine = originalLines.map(line => line.trim().length === 0);
            
                    // Process new text to remove newly created empty lines
                    const newLines = newText.split('\n');
                    const processedLines = newLines.filter((line, index) => {
                        return line.trim().length > 0 || isOriginalEmptyLine[index];
                    });
            
                    outputBox.innerHTML = processedLines.join('\n');
                    found = match.length > 0; // An instance was found and deleted
                } else {
                    found = false;
                }
            
                displayTaskStatus(found);
            }
            
           
        

            
        } else if (method === 'last-instance') {
           
            if (taskAction === 'highlight') {
                highlightLastInstance(query);
                found = outputBox.innerHTML.includes('<mark class="highlight">');
                displayTaskStatus(found);
            } else if (taskAction === 'copy') {
                const regex = new RegExp(query, caseSensitiveCheckbox.checked ? 'g' : 'gi');
                const matches = [...sanitizedText.matchAll(regex)];
                const lastMatch = matches[matches.length - 1];
                if (lastMatch) {
                    contentToCopy = sanitizedText.slice(lastMatch.index, lastMatch.index + lastMatch[0].length);
                    copyToClipboard(contentToCopy);
                    highlightLastInstance(query); // Highlight the last instance
                    found = true;
                }
                displayTaskStatus(found);
            } else if (taskAction === 'replace') {
                const regex = new RegExp(query, caseSensitiveCheckbox.checked ? 'g' : 'gi');
                const matches = [...sanitizedText.matchAll(regex)];
                const lastMatch = matches[matches.length - 1];
                if (lastMatch) {
                    const index = lastMatch.index;
                    const highlighted = lastMatch[0];
                    const before = sanitizedText.slice(0, index);
                    const after = sanitizedText.slice(index + highlighted.length);
                    outputBox.innerHTML = `${before}<mark class="highlight">${replacement}</mark>${after}`;
                    found = outputBox.innerHTML.includes('<mark class="highlight">');
                } 
                displayTaskStatus(found);
            } else if (taskAction === 'delete') {
                const regex = new RegExp(query, caseSensitiveCheckbox.checked ? 'g' : 'gi');
                const matches = [...sanitizedText.matchAll(regex)];
                const lastMatch = matches[matches.length - 1];
                
                if (lastMatch) {
                    const index = lastMatch.index;
                    const highlighted = lastMatch[0];
                    const before = sanitizedText.slice(0, index);
                    const after = sanitizedText.slice(index + highlighted.length);
                    let newText = before + after;
            
                    // Preserve the original empty lines
                    const originalLines = sanitizedText.split('\n');
                    const isOriginalEmptyLine = originalLines.map(line => line.trim().length === 0);
            
                    // Process new text to remove newly created empty lines
                    const newLines = newText.split('\n');
                    const processedLines = newLines.filter((line, index) => {
                        return line.trim().length > 0 || isOriginalEmptyLine[index];
                    });
            
                    outputBox.innerHTML = processedLines.join('\n');
                    found = matches.length > 0; // An instance was found and deleted
                } else {
                    found = false;
                }
            
                displayTaskStatus(found);
            }
            
            
        
        
        
        } else if (method === 'all-numbers') {
            if (taskAction === 'highlight') {
                highlightAllNumbers();
                found = outputBox.innerHTML.includes('<mark class="highlight">');
                displayTaskStatus(found);
            } else if (taskAction === 'copy') {
                found = copyAllNumbers();
                 displayTaskStatus(found);
               
            } else if (taskAction === 'replace') {
                replaceAllNumbers(replacement);
                found = outputBox.innerHTML.includes('<mark class="highlight">');
                displayTaskStatus(found);
            }else if (taskAction === 'delete') {
                // Original text and tracking empty lines
                const originalLines = sanitizedText.split('\n');
                const originalEmptyLines = originalLines.map(line => line.trim().length === 0);
            
                // Check for any numbers in the original text
                const containsNumbers = /\d/.test(sanitizedText);
            
                // Remove all numbers
                const modifiedText = sanitizedText.replace(/\d+/g, '');
                const modifiedLines = modifiedText.split('\n');
            
                // Only keep original empty lines or non-empty lines that were not empty after modification
                const resultLines = modifiedLines.filter((line, index) => {
                    // Determine if the line is newly empty
                    const isNewlyEmpty = line.trim().length === 0;
                    // Return true to keep the line if it was originally empty or not newly empty
                    return !isNewlyEmpty || originalEmptyLines[index];
                });
            
                // Join lines and update output
                outputBox.innerHTML = resultLines.join('\n');
            
                // Check if any numbers are still present in the modified text
                const stillContainsNumbers = /\d/.test(outputBox.innerHTML);
            
                // Update found status based on original and modified text
                found = containsNumbers && !stillContainsNumbers;
            
                // Display the task status message
                displayTaskStatus(found);
            }
            
            
            
        
        
        
        } else if (method === 'repeated-words') {
            // Function to create a regex with optional case sensitivity
            function createRegex(pattern, flags) {
                return new RegExp(pattern, flags);
            }
        
            // Determine regex flags based on the case sensitivity checkbox
            const flags = caseSensitiveCheckbox.checked ? 'g' : 'gi';
            // Regular expression to match consecutive repeated words
            const regex = createRegex('\\b(\\w+)\\b(?:\\s+\\1)+', flags);
        
            const lines = sanitizedText.split(/\r?\n/); // Handles both Unix (\n) and Windows (\r\n) line breaks
            let outputLines = [];
            let found = false;
        
            function highlightRepeatedWords(text) {
                return text.replace(regex, (match) => {
                    // Return the match with repeated words highlighted
                    return match.replace(/\b(\w+)\b/g, (word, group1) => {
                        return `<mark class="highlight">${group1}</mark>`;
                    });
                });
            }
        
            if (taskAction === 'highlight') {
                outputLines = lines.map(line => highlightRepeatedWords(line));
                outputBox.innerHTML = outputLines.join('\n');
                found = outputLines.some(line => /<mark class="highlight">/.test(line));
                displayTaskStatus(found);
        
            } else if (taskAction === 'copy') {
                const repeatedWords = [];
        
                lines.forEach(line => {
                    const matches = line.match(regex);
                    if (matches) {
                        matches.forEach(match => {
                            match.split(/\s+/).forEach(word => {
                                if (!repeatedWords.includes(word)) {
                                    repeatedWords.push(word);
                                }
                            });
                        });
                    }
                });
        
                if (repeatedWords.length > 0) {
                    copyToClipboard(repeatedWords.join('\n'));
                    found = true;
                }
        
                outputLines = lines.map(line => highlightRepeatedWords(line));
                outputBox.innerHTML = outputLines.join('\n');
                displayTaskStatus(found);
        
            } else if (taskAction === 'replace') {
                const replacementText = sanitizeInput(replaceText.value);
                outputLines = lines.map(line => line.replace(regex, (match) => {
                    const replaced = match.replace(/\b(\w+)\b/g, replacementText);
                    return `<mark class="highlight">${replaced}</mark>`;
                }));
                outputBox.innerHTML = outputLines.join('\n');
                found = outputLines.some(line => /<mark class="highlight">/.test(line));
                displayTaskStatus(found);
        
              } else if (taskAction === 'delete') {
                outputLines = lines.map(line => {
                    return line.replace(regex, (match) => {
                        // Split the matched text into individual words and filter duplicates
                        const words = match.split(/\s+/);
                        const uniqueWords = [];
                        const seenWords = new Set();
            
                        words.forEach(word => {
                            const normalizedWord = caseSensitiveCheckbox.checked ? word : word.toLowerCase();
                            if (!seenWords.has(normalizedWord)) {
                                seenWords.add(normalizedWord);
                                uniqueWords.push(word);
                            }
                        });
            
                        return uniqueWords.join(' ');
                    });
                });
                outputBox.innerHTML = outputLines.join('\n');
                found = sanitizedText.trim() !== outputLines.join('\n').trim();
                displayTaskStatus(found);
            
                if (!found) {
                    noInstancesWarning.style.display = 'block';
                    outputBox.innerHTML = ''; // Clear the output box if nothing was found
                }
            
                // Helper function to escape special characters in the query for regex
                function escapeRegExp(string) {
                    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                }
            }
            
                
        
        
        
            
            
        
        
        
        
        

        
        } else if (method === 'all-symbols') {
            if (taskAction === 'highlight') {
                highlightAllSymbols();
                found = outputBox.innerHTML.includes('<mark class="highlight">');
                displayTaskStatus(found);
            } else if (taskAction === 'copy') {
                found = copyAllSymbols();
                displayTaskStatus(found);
            } else if (taskAction === 'replace') {
                replaceAllSymbols(replacement);
                found = outputBox.innerHTML.includes('<mark class="highlight">');
                displayTaskStatus(found);
            } else if (taskAction === 'delete') {
                // Use a regex to match all symbols (non-word characters excluding spaces)
                const regex = /[^\w\s]/g;
                
                // Get the current content from the output box
                const sanitizedText = textInput.value;
                const originalLines = sanitizedText.split('\n');
                const isOriginalEmptyLine = originalLines.map(line => line.trim().length === 0);
                
                // Remove symbols from each line
                const modifiedLines = originalLines.map((line, index) => {
                    if (isOriginalEmptyLine[index]) {
                        return line; // Preserve originally empty lines
                    }
                    return line.replace(regex, ''); // Remove symbols from each non-empty line
                });
                
                // Filter out newly created empty lines while preserving original empty lines
                const resultLines = modifiedLines.filter((line, index) => {
                    return line.trim().length > 0 || isOriginalEmptyLine[index];
                });
                
                // Update the output box with the modified lines
                outputBox.innerHTML = resultLines.join('\n');
                
                // Check if any symbols were removed
                const hasSymbolsLeft = /[^\w\s]/.test(outputBox.innerHTML);
                
                // Determine if any symbols were present initially
                const hadSymbols = /[^\w\s]/.test(sanitizedText);
                
                // If symbols were present and now none are left, found should be true
                found = hadSymbols && !hasSymbolsLeft;
                
                // Display the task status message
                displayTaskStatus(found);
            
        }
        
        function highlightAllSymbols() {
            const regex = /[^\w\s]/g; // Regex to match symbols (non-word characters excluding spaces)
            const sanitizedText = textInput.value;
            const highlightedText = sanitizedText.replace(regex, match => `<mark class="highlight">${match}</mark>`);
            outputBox.innerHTML = highlightedText;
        }
        
        function copyAllSymbols() {
            const regex = /[^\w\s]/g; // Regex to match symbols (non-word characters excluding spaces)
            const sanitizedText = textInput.value;
            const symbols = sanitizedText.match(regex);
            if (symbols) {
                copyToClipboard(symbols.join('\n'));
                return true;
            }
            return false;
        }
        
        function replaceAllSymbols(replacement) {
            const regex = /[^\w\s]/g; // Regex to match symbols (non-word characters excluding spaces)
            const sanitizedText = textInput.value;
            const replacedText = sanitizedText.replace(regex, `<mark class="highlight">${replacement}</mark>`);
            outputBox.innerHTML = replacedText;
        }
        
            
           
        


        }else if (method === 'all-spaces') {
            const regex = /\s+/g;
            const lines = sanitizedText.split('\n');
        
            if (taskAction === 'highlight') {
                // Process lines to include empty lines and highlight all spaces
                const lines = sanitizedText.split('\n');
                const highlightedLines = lines.map(line => {
                    // Check if the line contains spaces or is empty
                    if (regex.test(line) || line.trim() === '') {
                        // Highlight spaces or treat empty lines as needing highlight
                        const highlightedLine = line.replace(regex, match => `<mark class="highlight">${match}</mark>`);
                        return highlightedLine || `<mark class="highlight">&nbsp;</mark>`; // Ensure empty lines have visual highlight
                    }
                    return line;
                });
        
                outputBox.innerHTML = highlightedLines.join('\n');
                found = highlightedLines.some(line => /<mark class="highlight">/.test(line));
                displayTaskStatus(found);

            
        
            } else if (taskAction === 'replace') {
                outputBox.innerHTML = lines.map(line =>
                    line.replace(regex, `<mark class="highlight">${replacement}</mark>`)
                ).join('\n');
                found = outputBox.innerHTML.includes('<mark class="highlight">');
                displayTaskStatus(found);
            } else if (taskAction === 'delete') {
                // Define a regex to match spaces (or other patterns to remove)
                const regex = /\s+/g; // Regex to match spaces
            
                // Split the sanitized text into lines
                const lines = sanitizedText.split('\n');
            
                // Remove spaces within each line
                const updatedLines = lines.map(line => line.replace(regex, ''));
            
                // Filter out empty lines
                const nonEmptyLines = updatedLines.filter(line => line.trim().length > 0);
            
                // Join lines back into a single string with newline characters
                const updatedText = nonEmptyLines.join('\n');
                outputBox.innerHTML = updatedText;
            
                // Determine if the new text is different from the original text
                const hasChanges = sanitizedText !== updatedText;
                
                // Set found based on whether there are changes
                found = hasChanges;
            
                // Display the task status
                displayTaskStatus(found);
            }
        }            
        
    });

    copyButton.addEventListener('click', () => {
        const content = outputBox.textContent || outputBox.innerText;
        if (content.trim()) {
            copyToClipboard(content);
            showSuccessMessage(); // Show success message
        }
    });
});


// // Event Listener for the Run Button
// document.getElementById('run-btn').addEventListener('click', function(event) {
//     if (!validateSearchTerm()) {
//         event.preventDefault();
//         return;
//     }
    
//     handleTask(); // Call your task handling function
// });

// Example Task Handling Function
function handleTask() {
    // Get the selected search method and task
    const searchMethod = document.getElementById('search-method').value;
    const taskAction = document.getElementById('task').value;

    // Get the search term and other relevant inputs
    const searchTerm = document.getElementById('search-term').value.trim();
    const textInput = document.getElementById('text-input').value;

    if (!searchTerm) {
        return; // Skip if no search term (though validation should catch this)
    }

    if (searchMethod === 'wrapped-text') {
        handleWrappedText(taskAction);
    }

    // Add more conditions for other methods...
}

// Example Function for Wrapped Text
function handleWrappedText(taskAction) {
    const startQuote = sanitizeInput(document.getElementById('start-quote').value);
    const endQuote = sanitizeInput(document.getElementById('end-quote').value);
    const caseSensitive = document.getElementById('case-sensitive').checked;
    const textInput = document.getElementById('text-input').value;

    if (!startQuote || !endQuote) {
        noInstancesWarning.style.display = 'block';
        outputBox.innerHTML = ''; // Clear the output box
        return;
    }

    // Process text here...
}

// Helper function to sanitize input
function sanitizeInput(input) {
    // Example sanitization
    return input.replace(/[^a-zA-Z0-9]/g, '');
}





