requirejs.config({
	baseUrl: '/',
	paths: {
		'jquery': 'js/jquery/jquery-3.2.1.min'
	},
	shim: {
	}
});

require([
	'jquery'
], function($) {
});
