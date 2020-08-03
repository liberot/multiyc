<?php
/**
 * Plugin Name: MultiYC
 * Plugin URI: https://myc.multiyc.de
 * Description: MultiYC Wheather-Service Plugin-Blocker
 * Version: 1.1.0
 * Author: 
 *
 * @package multiyc
 */

defined( 'ABSPATH' ) || exit;

add_action('init', function() {

	if(false == function_exists('register_block_type')) {
		return;
	}

	load_plugin_textdomain('multiyc', false, basename(__DIR__).'/languages');

	if(function_exists('wp_set_script_translations')) {
		wp_set_script_translations('multiyc_wheather', 'multiyc');
	}

	wp_register_script(
		'multiyc_wheather',
			plugins_url('block.js', __FILE__),
			array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore'),
			filemtime(plugin_dir_path(__FILE__).'block.js')
	);

	wp_register_style(
		'multiyc_wheather',
			plugins_url('style.css', __FILE__),
			array(),
			filemtime(plugin_dir_path(__FILE__).'style.css')
	);

	register_block_type( 
		'multiyc/wheather', 
			array(
				'style' => 'multiyc_wheather',
				'editor_script' => 'multiyc_wheather'
			)
	);
});

add_action('wp_head', function() {

	$buf = "";
	$buf.= "<script type='text/javascript'>";
	$buf.= "function consumeWheatherService(qry, rid){;";
	$buf.= "   var url = '';";
	$buf.= "   url+= '/?rest_route=/multiyc/wheather';";
	$buf.= "   url+= '/'+qry;";
	$buf.= "   var xhr = new XMLHttpRequest();";
	$buf.= "   xhr.addEventListener('load', ()=> {";
	$buf.= "      console.log(xhr.responseText);";
	$buf.= "      var json = JSON.parse(xhr.responseText);";
	$buf.= "      var temp = json.current.temperature;";
	$buf.= "      var speed = json.current.wind_speed;";
	$buf.= "      var dir = json.current.wind_dir;";
	$buf.= "      var loc = json.location.name;";
	$buf.= "      var region = json.location.region;";
	$buf.= "      var title = loc +', ' +region;";
	$buf.= "      document.getElementById('location:' +rid).innerHTML = title;";
	$buf.= "      document.getElementById('temperature:' +rid).innerHTML = temp;";
	$buf.= "      document.getElementById('wind_speed:' +rid).innerHTML = speed;";
	$buf.= "      document.getElementById('wind_dir:' +rid).innerHTML = dir;";
	$buf.= "   });";
	$buf.= "   xhr.open('GET', url);";
	$buf.= "   xhr.send();";
	$buf.= "};";
	$buf.="</script>";

	echo $buf;
});

function exec_wheather_service($req) {
	$key = '66707be6afe741429f83473ace17bb13';
	
	$qry = $req->get_param('qry');
	$qry = preg_replace('/\s+/', '_', $qry);

	$lng = 'de';

	$url = 'http://api.weatherstack.com/current';
	$url.= '?access_key='.$key;
	$url.= '&query='.$qry;
	// $url.= '&language='.$lng;
	
	if(function_exists('curl_version')){

		$crl = curl_init();
		curl_setopt($crl, CURLOPT_URL, $url);
		curl_setopt($crl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($crl, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($crl, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($crl, CURLOPT_SSL_VERIFYHOST, 0);
		$res = curl_exec($crl);
		curl_close($crl);

		header('Content-Type: application/json');
		echo $res;

		return;
	}
	
	$res = @file_get_contents($url);
	header('Content-Type: text/html');
	echo $res;
}

// https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/
// https://developer.wordpress.org/rest-api/key-concepts/
// http://127.0.0.1:8083/?rest_route=/multiyc/wheather/Brooklyn Miami
add_action('rest_api_init', function() {
	register_rest_route(
		'multiyc', '/wheather/(?P<qry>[a-zA-Z0-9-_\s+]+)', 
			array(
				'methods'=>'GET',
				'callback'=>'exec_wheather_service',
			)
	);
});

