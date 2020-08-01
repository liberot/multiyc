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

add_action( 'init', 'multiyc_wheather_load_textdomain' );

function multiyc_wheather_load_textdomain() {
	load_plugin_textdomain( 'multiyc', false, basename( __DIR__ ) . '/languages' );
}

function multiyc_wheather_register_block() {

	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	wp_register_script(
		'multiyc_wheather',
		plugins_url( 'block.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
	);

	wp_register_style(
		'multiyc_wheather',
		plugins_url( 'style.css', __FILE__ ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);

	register_block_type( 'multiyc/wheather', array(
		'style' => 'multiyc_wheather',
		'editor_script' => 'multiyc_wheather'
	) );

	if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations( 'multiyc_wheather', 'multiyc' );
	}

}
add_action( 'init', 'multiyc_wheather_register_block' );



function add_wheather_service_js() { 

$buf = <<<EOD
<script type='text/javascript'>
	function consumeWheatherService(req, rid){;
		var url='/wp-content/plugins/multiyc/wheather/service.php';
			url+='?q='+req;
		var xhr = new XMLHttpRequest();
			xhr.addEventListener('load', ()=> {
				document.getElementById(rid).innerHTML = xhr.responseText;
				console.log(xhr.responseText);
			});
			xhr.open('GET', url);
			xhr.send();
	};
</script>

EOD;

	echo $buf;
}
add_action('wp_head', 'add_wheather_service_js');
