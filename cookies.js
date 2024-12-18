			// function to set cookie
			function setCookie(name, value, days) {
				var expires = "";
				if (days) {
					var date = new Date();
					date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
					expires = "; expires=" + date.toUTCString();
				}
				document.cookie = name + "=" + (value || "") + expires + "; path=/";
			}

			// function to get cookie value
			function getCookie(name) {
				var nameEQ = name + "=";
				var ca = document.cookie.split(';');
				for (var i = 0; i < ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0) == ' ') c = c.substring(1, c.length);
					if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
				}
				return null;
			}

			// function to toggle theme
			function toggleTheme() {
				var theme = getCookie("theme");
				if (theme === "dark") {
					setCookie("theme", "light", 365);
					// applies light theme
				} else if (theme === "light") {
					setCookie("theme", "auto", 365);
					// applies auto theme
				} else {
					setCookie("theme", "dark", 365);
					// applies dark theme
				}
			}

			// initialize theme on page load
			window.onload = function() {
				var theme = getCookie("theme");
				if (theme === "dark") {
					// apply dark
				} else if (theme === "light") {
					// apply light
				} else {
					// apply auto theme
				}
			};