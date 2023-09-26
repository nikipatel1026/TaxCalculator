"use strict";

const $ = selector => document.querySelector(selector);

const getErrorMsg = lbl => `${lbl} must be a valid number greater than zero.`;

const getErrorMsgTax = lbl => `${lbl} must be a valid number greater than zero and less than 100.`;

const focusAndSelect = selector => {
    const elem = $(selector);
    elem.focus();
    elem.select();
};

const calculateTax = (subtotal, taxRate) => {
    const taxAmount = subtotal * taxRate / 100;
    return taxAmount;
};

const processEntries = () => {
    const salesAmount = parseFloat($("#salesAmount").value);
    const taxPercent = parseFloat($("#taxPercent").value);

    if (isNaN(salesAmount) || salesAmount <= 0) {
        alert(getErrorMsg("Sales Amount"));
        focusAndSelect("#salesAmount");
    } else if (isNaN(taxPercent) || taxPercent <= 0 || taxPercent >= 100) {
        alert(getErrorMsgTax("Tax Percent"));
        focusAndSelect("#taxPercent");
    } else {
        const tax = calculateTax(salesAmount, taxPercent);
        const total = salesAmount + tax;

        // Formatted the total as currency using Intl.NumberFormat
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });

        const formattedTotal = formatter.format(total);

        $("#total").value = formattedTotal;
    }
};


var clearEntries = () => {
    $("#salesAmount").value = "";
    $("#taxPercent").value = "";
    $("#total").value = "";
};

document.addEventListener("DOMContentLoaded", () => {
    $("#calculate").addEventListener("click", processEntries);
    $("#salesAmount").focus();
});
