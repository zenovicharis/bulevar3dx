<?php
require '../vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;

$config = json_decode(file_get_contents($_SERVER['HOME'].'/config.json'), true);
$mail = new PHPMailer();
$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPSecure = 'ssl';
$mail->Host = 'smtp.gmail.com';
$mail->Username = $config['address'];
$mail->Password = $config['password'];
$mail->Port = 465;
$mail->setFrom('no-reply@upnp.rs', $_REQUEST['name']);
$mail->addReplyTo($_REQUEST['email'], $_REQUEST['name']);
$mail->CharSet = 'UTF-8';
$mail->isHTML();
$mail->Subject = 'Online Forma';
$content = generateContent($_REQUEST['name'], $_REQUEST['email'], $_REQUEST['content']);
$mail->Body    = $content;
$mail->AltBody = htmlentities($content);
$mail->addAddress($config['reciever'], "Jusuf");
$isSent = $mail->Send();
$url = '';
if(!$isSent) {
    $message = urlencode('Poruka nije poslata, probajte ponovo kasnije');
    $url .= ('?errormessage='.$message);
} else {
    $message = urlencode('Poruka uspesno poslata, javljamo vam se prvom prilikom');
    $url .= ('?message='.$message);
}
header("Location: /index.html".$url);

function generateContent ($name, $email, $content) {
    return "
        <div>
            <p><strong>Ime</strong>: ".(empty($name) ? 'Nije Popunjeno' : filter_var($name, FILTER_SANITIZE_STRING))."</p>
            <p><strong>E-Mail</strong>: ".(empty($email) ? 'Nije Popunjeno' : filter_var($email, FILTER_SANITIZE_STRING))."</p>
            <hr>	
            <p>
            ".filter_var($content, FILTER_SANITIZE_STRING)."
            </p>
            <hr>
            <small>Mail poslat sa forme sajta https://bulevar3dx.com</small>
        </div>";
}