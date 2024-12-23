/* 
This script allows you to...
reset either the app itself or just an individual widget
delete/modify specific widget data and specific cookies, without affecting the rest of the app
This is useful for debugging and testing purposes, as well as clearing cache.
run potentially dangerous scripts (so be careful with it!)
remove users (or individual data from users) from the app (for home servers)
e.g. If I wanted to clear my date & time settings, I can delete them without affecting my name or notes.
Or if I suspect a potential hacker on my home server, I can both delete their account and remove their data and block them from accessing the app.
This script is a powerful tool that can be used for good or evil, so use it wisely.
If using locally (as an .html file without a server), you will still have the ability to delete cookies and local storage, but not the ability to delete users or their data.
This is because the app is not connected to a server, so it cannot access the server's database to delete users or their data.
This also applies to imnoahnovak.github.io.
One last note- you must be an admin to use this script, as it can do *pretty much* anything to all users on the app.
*/

// Reset app
function resetApp() {
    if (confirm("Are you sure you want to completely reset the app? This will delete all data and settings!")) {
        localStorage.clear();
        document.cookie = "theme=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
        document.cookie = "note=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
        document.cookie = "name=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
        document.cookie = "date=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
        document.cookie = "time=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
        document.cookie = "preferences=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
        document.cookie = "users=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
        alert("App reset. Refresh the page to continue.");
    }
}