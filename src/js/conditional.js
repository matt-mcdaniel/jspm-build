import $ from 'jquery';

let added = false;
$('#add-element').on('click', function() {
	if (added) {
		$('#my-element').remove();
		removeModule();
		return added = false;
	}

	let els = $('#elements-loaded');
	let newElement = $(document.createElement('h3'))
		.attr('id', 'my-element')
		.html('my-element');

	els.append(newElement);
	added = true;

	addModule();
});

const addModule = () => {
	System.import('d3').then((m) => {

		let mods = $('#modules-loaded');
		let newElement = $(document.createElement('h3'))
			.attr('id', 'my-module')
			.html('d3 ' + m.version);

		mods.append(JSON.stringify(m));
		console.log(m.version);
	});
}

const removeModule = () => {
	console.log('remove me');
}