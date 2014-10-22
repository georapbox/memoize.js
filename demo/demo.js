/*jshint expr: true, browser: true, devel: true*/
/*global memoize*/

(function (doc) {
	var fiborg,
		fibMem;
	
	// Original Fibonacci Series function.
	fiborg = fibMem = function (x) {
		if(x < 2) {
			return 1;    
		}  else {
			return fibMem(x - 1) + fibMem(x - 2);
		}
		return x;
	};
	
	var runFunBtn = doc.getElementById('runFunBtn'),
		memoizeInput = doc.getElementById('memoizeInput'),
		fibValue = doc.getElementById('fibValInput').value,
		preloader = doc.getElementById('preloader');

	runFunBtn.addEventListener('click', function () {
		fibValue = doc.getElementById('fibValInput').value;
		
		toggleVisibility(preloader, true);
		
		setTimeout(function () {
			if (memoizeInput.checked) {
				// Run function with memoization.
				fibMem = memoize(fiborg);
				
				// Display output.
				output('---------- Run: fibMem(' + fibValue + ') with memoization ----------', 'green', function () {
					toggleVisibility(preloader, false);
				});
			} else {
				// Reassign to original function to disable memoization.
				fibMem = fiborg;
				
				// Display output.
				output('---------- Run: fibMem(' + fibValue + ') without memoization ----------', 'red', function () {
					toggleVisibility(preloader, false);
				});
			}
		}, 100);	
	}, false);
	
	/**
	 * Displays output in browser's console.
	 *
	 * @param a {String} Custom message.
	 * @pram c {String} Color.
	 * @param callback {Function} Callback function to execute after output is displayed.
	*/
	function output(a, c, callback) {
		console.log('%c ' + a, 'color:' + c);
		console.time('fibMem');
		console.log('result: %s', fibMem(fibValue));
		console.log('time of execution:');
		console.timeEnd('fibMem');

		callback && callback();
	}
	
	/**
	 * Toggles visiblility of element (visible/hidden).
	 *
	 * @param element {HTMLElement} The element to toggle visibility to.
	 * @param visible {Boolean} true -> visibility="visible", false -> visibility="hidden".
	*/
	function toggleVisibility(element, visible) {
		var visibility = element.style.visibility;
		(visible === true) ? element.style.visibility = 'visible': element.style.visibility = 'hidden';
	}
}(document));