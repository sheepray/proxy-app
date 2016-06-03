const path = require('path')
const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

var mainWindow = null

/* initialize application */
initialize()

function initialize(){

	/* create a window for the app */
	function createWindow(){
		var windowOptions = {
			width: 800,
			height: 600,
			minWidth:680
		}

		/* create the window with settings */
		mainWindow = new BrowserWindow(windowOptions)

		/* populate the content of the window using a file */
		//mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

		/* when window is closed */
		mainWindow.on('closed', function(){
				mainWindow = null
		})

		const remoteProxy = 'http://127.0.0.1:3128' //replace it with your proxy address along with port
		const targetURL = 'http://www.stackexchange.com' //the url you want to connect to.
		const referrerURL = 'http://www.google.com' //referrer url

		/* set proxy */
		mainWindow.webContents.session.setProxy({proxyRules: remoteProxy}, function (){
			const httpReferrerHeader = {httpReferrer: referrerURL + '\n'}
			mainWindow.loadURL(targetURL, httpReferrerHeader)
		})
	}// end of create window function.

	/* replace the username and password with your own credentials */
	app.on('login', function(event, webContents, request, authInfo, callback) {
		console.log('login event triggered');
		event.preventDefault()
		callback('username', 'password')
	})

	/* create window when app loaded by node */
	app.on('ready', function(){
		createWindow()
	})

	app.on('window-all-closed', function(){
		if(process.platform != 'darwin'){
			app.quit()
		}
	})
}// end of initialize function.
