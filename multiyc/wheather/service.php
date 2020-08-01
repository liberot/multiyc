<?php
// http://127.0.0.1:8083/wp-content/plugins/multiyc/wheather/service.php?q=Munich
// http://127.0.0.1:8083/wp-content/plugins/multiyc/wheather/service.php?q=New York
$key = '66707be6afe741429f83473ace17bb13';
$qry = $_GET['q'];

$url = 	'http://api.weatherstack.com/current?access_key='.$key.'&query='.$qry;
$url = preg_replace('/\s+/', '_', $url);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
$result = curl_exec($ch);
curl_close($ch);

header('Content-Type: application/json');
echo $result;

?>