<?php
if($_POST)
{
    $to_email       = "your_mail@mail.com"; //Recipient email, Replace with own email here
   
    //check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
       
        $output = json_encode(array( //create JSON data
            'type'=>'error',
            'text' => 'Sorry Request must be Ajax POST'
        ));
        die($output); //exit script outputting json data
    }
    
    $name = 'Ticker';
   
    //proceed with PHP email.
    $headers = 'From: '.$name.'' . "\r\n" .
    'Reply-To: '.$email.'' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
    
    //Sanitize input data using PHP filter_var().
    $email     = filter_var($_POST["subscribe_email"], FILTER_SANITIZE_EMAIL);
    $output = json_encode(array('type'=>'message', 'text' => 'Thank you. Your email was sent successfully.'));
   
    $send_mail = @mail($to_email, '', 'You have a new subscriber '.$email , $headers); 
    
    die($output);
    
    if(!$send_mail) {
        $output = json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your PHP mail configuration.'));
        die($output);
    }
}
?>