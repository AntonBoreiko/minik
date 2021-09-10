
<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'phpmailer/language/');
  $mail->IsHTML(true);

  $mail->setFrom('1213.96@mail.ru', 'САЙТ Arendaminik');

  $mail->addAddress('1213.96@mail.ru');

  // Тело письма
  $body = '<h1>Заявка с сайта</h1>';

  if(trim(!empty($_POST['name']))){
    $body.= '<p><strong>Имя:</strong> '.$_POST['name'].' </p>';
  }

  if(trim(!empty($_POST['phone']))){
    $body.= '<p><strong>Телефон:</strong> '.$_POST['phone'].' </p>';
  }

  if(trim(!empty($_POST['address']))){
    $body.= '<p><strong>Адрес:</strong> '.$_POST['address'].' </p>';
  }


  $mail->Body = $body;

  if(!$mail->send()){
    $message = 'Ошибка';
  } else{
    $message = 'Данные отправлены';
  }

  $response = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);


