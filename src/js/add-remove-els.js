import './test';

function addElement(...args) {
	var val = args[0];
	var parent = args[1];

	var elToAdd = document.createElement('h3');
	var parentNode = document.getElementById(parent);

	parentNode.appendChild(elToAdd);
	elToAdd.innerHTML = val;
}

function addModule(val) {

	if (val === 'custom') {

		System.import('src/js/custom').then((mod) => {
			console.log('module loaded: ', mod);
			addElement('src/js/custom', 'modules-loaded');
		});

	} else {

		System.import('d3').then((mod) => {
			console.log('module loaded: ', mod);
			addElement('d3', 'modules-loaded');
		});

	}

}

$('button').on('click', function() {
	var arr = $(this).html().split(' ');
	var val = arr[1].toLowerCase();

	addElement(val, 'elements-loaded');
	addModule(val);
});