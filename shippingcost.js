document.addEventListener('DOMContentLoaded', () => { // run script after document is fully loaded
    const zipInput = document.getElementById('zip'); // get zip input
    window.shippingCost = 10; // global variable for shipping cost

    function calculateShipping(zip) { // function to calculate zip shipping price
        let cost = 10; 

        if (/^\d{5}$/.test(zip)) { // check for 5 digits for a  zip
            const zipPrefix = parseInt(zip.slice(0, 1), 10);
            switch (zipPrefix) { // starting digits regional pricing
                case 9: cost = 15; break; 
                case 1: cost = 12; break; 
                case 3: cost = 11; break; 
                default: cost = 10; break;
            }
        }
        window.shippingCost = cost; // update cost

        if (typeof updateTotalPrice === 'function') { // update price if function exists
            updateTotalPrice(); 
        }
    }

    if (zipInput) { // if the input exists on the page, recalculate when the zip updates   
        zipInput.addEventListener('input', () => {
            calculateShipping(zipInput.value.trim());
        });
        calculateShipping(zipInput.value.trim()); // calculate shipping once on page load using the current value
    }
});
