
function getTotel() {
    // Get all rows in the table body
    const rows = document.querySelectorAll("table tbody tr");

    rows.forEach(row => {
        // Get inputs within the current row
        const priceInput = row.querySelector('input[id^="Taxable_Value"]');
        const qtyInput = row.querySelector('input[id^="Qty"]');
        const totalInput = row.querySelector('input[id^="Amount"]');

        // Check if all inputs exist in the row
        if (priceInput && qtyInput && totalInput) {
            const TaxableValue = parseFloat(priceInput.value) || 0;
            const Qty = parseInt(qtyInput.value) || 0;
            const Amount = TaxableValue * Qty;

            // Update the total field for the current row
            totalInput.value = Amount.toFixed(2);
        }
    });

    // Recalculate the subtotal after updating row totals
    calculateSubtotal();
}


// Function to calculate the subtotal of all items
function calculateSubtotal() {
    const rows = document.querySelectorAll("table tr");
    let subtotal = 0;

    rows.forEach((row, index) => {
        if (index > 0) {
            const totalInput = row.querySelector("#Amount");
            if (totalInput) {
                subtotal += parseFloat(totalInput.value) || 0;
            }
        }
    });

    document.getElementById("subtotal").value = subtotal.toFixed(2);
    calculateNetTotal();
}

// Function to calculate tax and tax amount
function calculateTax() {
    const subtotal = parseFloat(document.getElementById("subtotal").value) || 0;
    const taxRate = parseFloat(document.getElementById("tax").value) || 0;
    const taxAmount = (subtotal * taxRate) / 100;
    document.getElementById("taxtotal").value = taxAmount.toFixed(2);

    calculateNetTotal();
}

// Function to calculate the net total after tax and discounts
function calculateNetTotal() {
    const subtotal = parseFloat(document.getElementById("subtotal").value) || 0;
    const taxAmount = parseFloat(document.getElementById("taxtotal").value) || 0;
    const discountRate = parseFloat(document.getElementById("discount").value) || 0;

    const discountAmount = (subtotal * discountRate) / 100;
    const netTotal = subtotal + taxAmount - discountAmount;

    document.getElementById("nettotal").value = netTotal.toFixed(2);
}

// Function to apply discount   
// function applyDiscount() {
//     calculateNetTotal();
// }

// Function to add a new row for an additional item
function addRow() {
    const table = document.querySelector("table");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td><button class="btn btn-danger" onclick="deleteRow(this)">D</button></td>
        <td><input class="form-control" type="number" value="1" readonly></td>
        <td><input type="text" class="form-control"></td>
        <td><input type="number" class="form-control" onkeyup="getTotel()"></td>
        <td><input type="number" value="1" class="form-control" onkeyup="getTotel()"></td>
        <td><input type="text" readonly class="form-control"></td>
    `;
    table.appendChild(newRow);
    updateItemCount();
}

// Function to delete a row
function deleteRow(button) {
    const row = button.closest("tr");
    row.remove();
    calculateSubtotal();
    updateItemCount();
}

// Function to update the total item count
function updateItemCount() {
    const rows = document.querySelectorAll("table tr").length - 1; // Exclude header row
    document.getElementById("total-items").textContent = rows;
}

// Function to print the invoice
function printInvoice() {
    window.print();
}

// Function to save the invoice
function saveInvoice() {
    alert("Invoice saved successfully!");
}

// Function to display the current date
function displayDate() {
    const today = new Date();
    const dateElement = document.getElementById("date");

    dateElement.textContent = today.toLocaleDateString();
}

// Initialize the date display
displayDate();
function convertToWords() {
    const netTotal = parseInt(document.getElementById('nettotal').value);
    if (isNaN(netTotal) || netTotal < 0) {
        document.getElementById('result').innerHTML = "Please enter a valid net total.";
        return;
    }

    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const teens = ["", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const thousands = ["", "Thousand"];

    function numberToWords(num) {
        if (num === 0) return "Zero";

        let words = "";
        if (num >= 1000) {
            words += ones[Math.floor(num / 1000)] + " Thousand ";
            num %= 1000;
        }
        if (num >= 100) {
            words += ones[Math.floor(num / 100)] + " Hundred ";
            num %= 100;
        }
        if (num > 10 && num < 20) {
            words += teens[num - 10] + " ";
        } else {
            words += tens[Math.floor(num / 10)] + " ";
            num %= 10;
        }
        words += ones[num] + " ";
        return words.trim();
    }

    const netTotalInWords = numberToWords(netTotal) + " Rupees Only.";
    document.getElementById('result').innerHTML = `<strong>Total Amount (in words):</strong> INR ${netTotalInWords}`;
}
function syncFields() {
    document.getElementById('subtotal_field').value = document.getElementById('subtotal').value;
    document.getElementById('tax_field').value = document.getElementById('tax').value;
    document.getElementById('taxtotal_field').value = document.getElementById('taxtotal').value;
    document.getElementById('discount_field').value = document.getElementById('discount').value;
    document.getElementById('nettotal_field').value = document.getElementById('nettotal').value;
}
