<?php
// Verify required fields
if (!isset($_POST['fname']) || !isset($_POST['lname']) || !isset($_POST['email']) || 
    !isset($_POST['tel']) || !isset($_POST['message']) || !isset($_POST['consent'])) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
    exit;
}

// Email validation
$email = $_POST['email'];
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid email format']);
    exit;
}

// Phone number validation
$tel = $_POST['tel'];
if (!preg_match("/^0[1-7][0-9]{1}(\s[0-9]{2}){4}$/", $tel)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid phone number format']);
    exit;
}

// Data preparation
$fname = htmlspecialchars($_POST['fname']);
$lname = htmlspecialchars($_POST['lname']);
$message = htmlspecialchars($_POST['message']);
$fullName = $fname . ' ' . $lname;

// Admin email
$to_admin = "clementdannepro@gmail.com";
$subject_admin = "New contact request from $fullName";
$message_admin = "Name: $fullName\n\n" .
                 "Email: $email\n\n" .
                 "Phone: $tel\n\n" .
                 "Message:\n$message";

// Admin headers
$headers_admin = "From: Contact Form <noreply@yourdomain.com>\r\n";
$headers_admin .= "Reply-To: $email\r\n";
$headers_admin .= "Content-Type: text/plain; charset=UTF-8\r\n";

// User confirmation email
$subject_user = "Confirmation of your message";
$message_user = "Hello $fullName,\n\n" .
                "Thank you for your message. I will get back to you soon.\n\n" .
                "Best regards,\nClément Danne\n\n" .
                "Your message:\n\n" .
                "Name: $fullName\n\n" .
                "Email: $email\n\n" .
                "Phone: $tel\n\n" .
                "Message:\n$message";

// User headers
$headers_user = "From: Clément Danne <clementdannepro@gmail.com>\r\n";
$headers_user .= "Reply-To: clementdannepro@gmail.com\r\n";
$headers_user .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send emails
$mail_sent_admin = mail($to_admin, $subject_admin, $message_admin, $headers_admin);
$mail_sent_user = mail($email, $subject_user, $message_user, $headers_user);

// Check and respond
if ($mail_sent_admin && $mail_sent_user) {
    echo json_encode(['status' => 'success', 'message' => 'Message sent successfully!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error sending message.']);
}
?>
