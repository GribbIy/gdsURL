<?php
// Generate a random password
function generatePassword($length = 12) {
    $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $password = '';
    for ($i = 0; $i < $length; $i++) {
        $password .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $password;
}

// Discord webhook URL
$webhookUrl = 'https://discord.com/api/webhooks/1275210600674492567/UfV8e_W29LEXyvEnqUuc8Qk48v4lkvNRPKHRDPO9QlrbeA-XdErKGM5gF5VPOZa06jQG';

// Generate a new password
$newPassword = generatePassword();

// Send the password to Discord
$data = json_encode(['content' => "The new password is: $newPassword"]);
$ch = curl_init($webhookUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
$response = curl_exec($ch);
curl_close($ch);

// Update the HTML page with the new password (You need a mechanism to do this)
file_put_contents('password.txt', $newPassword); // Example of updating a text file with the new password
?>
