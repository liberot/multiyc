<?php
/**
 * Plugin Name: MultiYC Wetterwidget
 * Plugin URI: https://myc.multiyc.de
 * Description: MultiYC Weather Service Plugin
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
		wp_set_script_translations('multiyc_weather', 'multiyc');
	}

	wp_register_script(
		'multiyc_weather_service',
			plugins_url('service.js', __FILE__),
			array('jquery')
	);
	wp_enqueue_script('multiyc_weather_service');

	wp_register_script(
		'multiyc_weather',
			plugins_url('block.js', __FILE__),
			array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore'),
			filemtime(plugin_dir_path(__FILE__).'block.js')
	);

	wp_register_style(
		'multiyc_weather',
			plugins_url('style.css', __FILE__),
			array(),
			filemtime(plugin_dir_path(__FILE__).'style.css')
	);

	register_block_type( 
		'multiyc/weather', 
			array(
				'style' => 'multiyc_weather',
				'editor_script' => 'multiyc_weather'
			)
	);
});

function exec_weather_service($req) {
	
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
		$res = setup_dataprovider($res);		
//		header('Content-Type: application/json');
		echo $res;

		return;
	}
	
	$res = @file_get_contents($url);
// 	header('Content-Type: text/html');
	echo $res;
}

function setup_dataprovider($json) {
	$coll = json_decode($json);
	$res = [];
	$res['timestamp'] = date('U');
	$res['date'] = date('yy-m-d h:i:s');
	$res['timezone'] = date_default_timezone_get();
	$res['temperatureCelsius'] = (int) preg_replace('/\D/', '', $coll->current->temperature);
	$res['windSpeedKmh'] = (int) preg_replace('/\D/', '', $coll->current->wind_speed);
	$res['windSpeedKnots'] = (int) kmhToKnots($res['windSpeedKmh']);
	$res['windDirection'] = preg_replace('/[^NWSEO]/', '', $coll->current->wind_dir);
	$res['windDirection'] = preg_replace('/[E]/', 'O', $coll->current->wind_dir);
	$res['weatherCode'] = (int) preg_replace('/\D/', '', $coll->current->weather_code);
	$res['location'] = $coll->location->name;
	return json_encode($res);
}

function knotsToKmh($knots) {
	$res = null;
	$res = $knots *2;
	$res-= 10 *($res /100);
	return $res;
}

function kmhToKnots($kmh) {
	$res = null;
	$res = $kmh /2;
	$res+= 10 *($res /100);
	return $res;
}

// https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints
// https://developer.wordpress.org/rest-api/key-concepts
// http://127.0.0.1:8083/?rest_route=/multiyc/weather/Brooklyn Miami
// https://make.wordpress.org/core/2020/07/22/rest-api-changes-in-wordpress-5-5
add_action('rest_api_init', 'add_multiyc_rest_route');
function add_multiyc_rest_route() {
	register_rest_route(
		'multiyc', '/weather/(?P<qry>[a-zA-Z0-9-_\s+]+)', 
			array(
				'methods'=>'GET',
				'callback'=>'exec_weather_service',
				'permission_callback'=>'__return_true'
			)
	);
};

