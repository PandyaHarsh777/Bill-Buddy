/*1 {get by id}
2 {event lsiterner}
3 {retrive valur as str}
4 {covert it to number}
5 {cheke isvalid by make var isvalidbill...}
6 {make it in formate by toFixed() fun}
7 {updaate this to Dom}
8 {validate input, css error}
9 {reset btn function}
*/
const billInput = document.getElementById('bill-input');
const tipButtons = document.querySelectorAll('.tip-percent-btn');
const customTipInput = document.getElementById('custom-tip-input');
const peopleInput = document.getElementById('people-input');
const tipAmountDisplay = document.getElementById('tip-amount-display');
const totalAmountDisplay = document.getElementById('total-amount-display');
const resetButton = document.getElementById('reset-button');
//----- Event Listeners

/*console.log('Bill Input Element:', billInput);
console.log('Tip Buttons NodeList:', tipButtons);
console.log('Custom Tip Input Element:', customTipInput);
console.log('People Input Element:', peopleInput);
console.log('Tip Amount Display Element:', tipAmountDisplay);
console.log('Total Amount Display Element:', totalAmountDisplay);
console.log('Reset Button Element:', resetButton); */
//task start here
billInput.addEventListener('input', calculateTip)
    /* const currentBillValue = billInput.value;
     console.log(currentBillValue);*/

//for each btn value
tipButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        const clickedButton = event.target;
        const tipPercentage = clickedButton.dataset.tip;
        /*console.log(clickedButton.dataset.tip);
        //console.log(clickedButton.textContent);
        // console.log(tipPercentage.value);undefine 
        //console.log(`Selected Tip Percentage (from data-tip): ${tipPercentage}% `); */

        // Remove 'active' class from all buttons
        tipButtons.forEach(btn => btn.classList.remove('active'));
        //add active to clicked btn
        clickedButton.classList.add('active');
        //clear cutome tip when btn ic clicked..
        customTipValue = '';
        console.log(`button ${tipPercentage}% cliked`);

        calculateTip();
    });
});
customTipInput.addEventListener('input', function(event) {
    const customTipValue = event.target.value;
    tipButtons.forEach(btn => btn.classList.remove('active'));
    console.log(`Custom Tip value: ${customTipValue}%`);
    calculateTip();
});
/*
use with aRROW function
customTipInput.addEventListener('input', () => {
    const customTipValue = event.target.value;
    console.log("Custom Tip Input changed, current value:", customTipValue);
}); */
peopleInput.addEventListener('input', calculateTip);

//reser button click eventlistner
if (resetButton) {
    resetButton.addEventListener('click', () => {
        //call here resetCalculator()
        console.log('Reset button clicked! Executing resetCalculator function...');
        resetCalculator();
    });
} else {
    console.error('Error: Reset button element not found. Cannot add event listener.');
}
// ============================================
//   Core Functions main start logic fun
// ============================================

function calculateTip() {
    //console.log('--- Executing calculateTip ---');
    // --- 1. Retrieve Input Values (Strings) ---
    const billValueStr = billInput.value;
    const customTipValueStr = customTipInput.value;
    const peopleValueStr = peopleInput.value;
    let selectedButtonTipStr = null; // Use null to indicate no button is active
    const activeButton = document.querySelector('.tip-percent-btn.active'); // Find the button with the 'active' class


    /* console.log(billValueStr);
     console.log(customTipValueStr);
     console.log(peopleValueStr);
     //console.log(activeButton);
     console.log(selectedButtonTipStr); */

    // --- 2. Convert to Numbers ---
    const billAmount = parseFloat(billValueStr);
    const numberOfPeople = parseFloat(peopleValueStr)
    const customTipPercent = parseFloat(customTipValueStr);
    const selectedButtonTipPercent = selectedButtonTipStr ? parseFloat(selectedButtonTipStr) : null;
    //used if = ? ;; else :
    //console.log(billAmount, numberOfPeople, customTipPercent, selectedButtonTipPercent);

    // --- 3. INPUT VALIDATION SECTION ---
    const isBillValid = !isNaN(billAmount) && billAmount >= 0;
    //console.log(`validation Bill amount ${billAmount} is valid ${isBillValid}`);

    let isTipValid = false;

    let isPeopleValid = !isNaN(numberOfPeople) && numberOfPeople > 0 && Number.isInteger(numberOfPeople);
    //console.log(`Validation - Number of People (${numberOfPeople}) Is Valid Integer: ${isPeopleValid}`);

    const isCustomTipInputValid = customTipValueStr === '' || (!isNaN(customTipPercent) && customTipPercent >= 0);

    // code for actual tip (custome input or buton inpur or defaulte)==>
    //// --- 4. Determine Tip Percentage to Use ---
    let actualTipPercent = 0;
    if (customTipValueStr !== '' && !isNaN(customTipPercent) && customTipPercent >= 0) {
        actualTipPercent = customTipPercent;

    } else if (customTipValueStr === '') {
        if (activeButton) {
            const selectedButtonTipPercent = parseFloat(activeButton.dataset.tip);
            //If an active button is found,so get its tip
            if (!isNaN(selectedButtonTipPercent) && selectedButtonTipPercent >= 0) {
                actualTipPercent = selectedButtonTipPercent;
            }
        }
    }

    isTipValid = !isNaN(actualTipPercent) && actualTipPercent >= 0;
    //console.log(`validation actual tip Percent ${actualTipPercent} is valid: ${isTipValid}`);
    let totalTipAmount = 0;
    if (isBillValid && isTipValid) {
        totalTipAmount = billAmount * (actualTipPercent / 100);
    }

    //console.log(`calculated total tip amount: ${totalTipAmount} type: ${typeof totalTipAmount}`);

    //now totalbillAmount step3
    const totalBillAmount = billAmount + totalTipAmount;
    //console.log(`calculated total Bill amount: ${totalBillAmount} type: ${typeof totalBillAmount}`);

    //tip amount per person step4
    let tipAmountPerPerson = 0;
    let totalAmountPerPerson = 0;

    if (isBillValid && isTipValid && isPeopleValid) {
        tipAmountPerPerson = totalTipAmount / numberOfPeople;
        totalAmountPerPerson = totalBillAmount / numberOfPeople;
    } else {
        tipAmountPerPerson = 0;
        totalAmountPerPerson = 0;
        if (!isPeopleValid) {
            console.warn("Cannot calculate per-person amounts due to invalid Number of People.");
        } else {
            console.warn("Calculation skipped or defaulted to 0 due to invalid Bill or Tip inputs.");
        }
    }
    /*  console.log(billAmount,
          numberOfPeople,
          actualTipPercent,
          totalTipAmount,
          totalBillAmount,
          tipAmountPerPerson,
          totalAmountPerPerson); */
    //formate those values for output:
    const formattedTipAmount = tipAmountPerPerson.toFixed(2);
    const formattedTotalAmount = totalAmountPerPerson.toFixed(2);
    //displaye amount with $sign
    const displayTipAmount = `$${formattedTipAmount}`;
    const displayTotalAmount = `$${formattedTotalAmount}`;
    //log this output
    //console.log("final display TipAmount/per:", displayTipAmount);
    //console.log("final display TotalAmount/per:", displayTotalAmount);

    //update output to DOM
    if (tipAmountDisplay) {
        tipAmountDisplay.textContent = displayTipAmount;
    } else {
        console.error('Error: tipAmountDisplay element not found in the DOM.');
    }

    if (totalAmountDisplay) {
        totalAmountDisplay.textContent = displayTotalAmount;
    } else {
        console.error('Error: totalAmountDisplay element not found in the DOM.');
    }

    //validation error to DOM
    // ✅ validation error to DOM (only after user types something)
    if (billInput) {
        if (billInput.value !== '') {
            billInput.classList.toggle('error', !isBillValid);
        } else {
            billInput.classList.remove('error');
        }
    }

    if (peopleInput) {
        if (peopleInput.value !== '') {
            peopleInput.classList.toggle('error', !isPeopleValid);
        } else {
            peopleInput.classList.remove('error');
        }
    }

    if (customTipInput) {
        if (customTipInput.value !== '') {
            customTipInput.classList.toggle('error', !isCustomTipInputValid);
        } else {
            customTipInput.classList.remove('error');
        }
    }

} //end of caclulation or logic

//reser btn function
function resetCalculator() {
    if (billInput) {
        billInput.value = '';
        billInput.classList.remove('error');
    } else {
        console.error("error :billInput elemenyt not found,it can not reset.");
    }

    if (customTipInput) {
        customTipInput.value = '';
        customTipInput.classList.remove('error');
    } else {
        console.error("error :customTipInput elemenyt not found,it can not reset.");
    }
    if (tipButtons && tipButtons.length > 0) {
        tipButtons.forEach(button => {
            button.classList.remove('active');
        })
    } else {
        console.error("error :tipButtons elemenyt not found,it can not reset.");
    }

    if (peopleInput) {
        peopleInput.value = '';
        peopleInput.classList.remove('error');
    } else {
        console.log("error :peopleInput elemenyt not found,it can not reset.");
    }

    if (tipAmountDisplay) {
        tipAmountDisplay.textContent = "$0.00";
    } else {
        console.error("error :tipAmountDisplay elemenyt not found,it can not reset.");
    }

    if (totalAmountDisplay) {
        totalAmountDisplay.textContent = "$0.00";
    } else {
        console.error("error :totalAmountDisplay elemenyt not found,it can not reset.");
    }
    console.log('resetCalculator function progress: Inputs cleared, buttons deselected, tip display reset.');

}

// Initial calculation on page load
document.addEventListener('DOMContentLoaded', () => {
    calculateTip()
});