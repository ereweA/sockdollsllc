document.addEventListener('DOMContentLoaded', () => {
    const zipInput = document.getElementById('zip');
    window.shippingCost = 10; 

    function calculateShipping(zip) {
        let cost = 10; 

        if (/^\d{5}$/.test(zip)) {
            const zipPrefix = parseInt(zip.slice(0, 1), 10);
            switch (zipPrefix) {
                case 9: cost = 15; break; 
                case 1: cost = 12; break; 
                case 3: cost = 11; break; 
                default: cost = 10; break;
            }
        }

        window.shippingCost = cost;
        if (typeof updateTotalPrice === 'function') {
            updateTotalPrice(); 
        }
    }

    if (zipInput) {
        zipInput.addEventListener('input', () => {
            calculateShipping(zipInput.value.trim());
        });
        calculateShipping(zipInput.value.trim());
    }
});
