// Get the display element from the document
const display = document.querySelector('.calculator-display');

// Get the container of all buttons
const buttonsContainer = document.querySelector('.calculator-buttons');

// Variable to store the current calculation string
let currentExpression = '';

// Add a single event listener to the parent container
buttonsContainer.addEventListener('click', (event) => {
    // Check if the clicked element is a button
    if (!event.target.matches('button')) {
        return;
    }

    const button = event.target;
    const value = button.value;

    // Handle button clicks based on their value
    switch (value) {
        case '=':
            // If there's an expression, try to calculate it
            if (currentExpression) {
                try {
                    // Replace user-friendly symbols with JS-friendly ones
                    let expressionToEvaluate = currentExpression
                        .replace(/×/g, '*')
                        .replace(/÷/g, '/');
                    
                    // Use eval() to calculate the result.
                    // Note: eval() can be a security risk in other contexts, but it's safe here.
                    let result = eval(expressionToEvaluate);
                    
                    // Display the result and update the current expression
                    display.value = result;
                    currentExpression = result.toString();
                } catch (error) {
                    // If there's an error (e.g., "5 / 0"), show 'Error'
                    display.value = 'Error';
                    currentExpression = '';
                }
            }
            break;

        case 'AC':
            // All Clear: Reset everything
            currentExpression = '';
            display.value = '';
            break;

        case 'DE':
            // Delete: Remove the last character
            currentExpression = currentExpression.slice(0, -1);
            display.value = currentExpression;
            break;
            
        default:
            // For all other buttons (numbers, operators), append their value
            currentExpression += value;
            display.value = currentExpression;
            break;
    }
});
