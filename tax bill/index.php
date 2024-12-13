<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$database = "billing";

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $invoice_number = $_POST['invoice_number'];
    $invoice_date = $_POST['invoice_date'];
    $customer_name = $_POST['customer_name'];
    $subtotal = $_POST['subtotal'];
    $tax = $_POST['tax'];
    $tax_amount = $_POST['tax_amount'];
    $discount = $_POST['discount'];
    $net_total = $_POST['net_total'];

    $sql = "INSERT INTO invoices (invoice_number, invoice_date, customer_name, subtotal, tax, tax_amount, discount, net_total) 
            VALUES ('$invoice_number', '$invoice_date', '$customer_name', '$subtotal', '$tax', '$tax_amount', '$discount', '$net_total')";

    if ($conn->query($sql) === TRUE) {
        echo "Invoice saved successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
