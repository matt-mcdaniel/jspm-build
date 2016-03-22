'use strict';

require('src/js/test');

function addElement(val, parent) {
	var elToAdd = document.createElement('h3');
	var parentNode = document.getElementById(parent);

	parentNode.appendChild(elToAdd);
	elToAdd.innerHTML = val;
}

function addModule(val) {

	console.log("add modules");
	var path = val === 'custom' ? 'src/js/' + val + '.js' : val;

	System.import(path).then(function (mod) {
		console.log(mod);
	});

	addElement(path, 'modules-loaded');
}

$('button').on('click', function () {
	var arr = $(this).html().split(' ');
	var val = arr[1].toLowerCase();

	addElement(val, 'elements-loaded');
	addModule(val);
});