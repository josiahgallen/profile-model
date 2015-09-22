


var user = new UserModel();
var App = Backbone.Router.extend({
	routes: {
		'': 'profile',
		'edit': 'edit'
	},
	profile: function() {
		$('.page').hide();
		$('#profile').show();
	},
	edit: function() {
		$('.page').hide();
		$('#edit').show();
	}
});

$.get(
	'http://tiyfe.herokuapp.com/collections/josiah-gitcloneusers',
	function(response) {
		user.set({
		name: response[0].user, 
		email: response[0].email, 
		role: response[0].role
	})
	},
	'json'
	);

$('#name').val(user.get('name'));
$('#inputEmail3').val(user.get('email'));
$('#role').val(user.get('role'));

$('#profileForm').submit(function(e){
	e.preventDefault();
	user.set({
		name: $('#name').val(), 
		email: $('#inputEmail3').val(), 
		role: $('#role').val()
	})
	$.post(
		'http://tiyfe.herokuapp.com/collections/josiah-gitcloneusers',
		{
			user: user.get('name'),
			email: user.get('email'),
			role: user.get('role')
		},
		function(response) {
			console.log(response);
		},
		'json'
		);
})

user.on('change', function(){
	$('.profile-usertitle-name').text(user.get('name'));
	$('.profile-usertitle-job').text(user.get('role'));
	$('.navbar-right .dropdown .dropdown-toggle').html(user.get('name') + ' <span class="caret"></span>');

})

var app = new App();
Backbone.history.start();