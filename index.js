const path = require('path')
const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

var mainWindow = null

initialize()

function initialize(){
	function createWindow(){
		var windowOptions = {
			width: 800,
			height: 600,
			minWidth:680
		}

		mainWindow = new BrowserWindow(windowOptions)
		//mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

		mainWindow.on('closed', function(){
				mainWindow = null
		})

		const session = electron.session
		const ses = session.fromPartition('proxySession')
		const remoteProxy = 'http://127.0.0.1:3128' //replace it with your proxy address along with port
		const targetURL = 'http://www.stackexchange.com' //the url you want to connect to.
		const referrerURL = 'http://www.google.com' //referrer url

		mainWindow.webContents.session.setProxy({proxyRules: remoteProxy}, function (){
			//mainWindow.loadURL(targetURL)
			const httpExtraHeader = {httpReferrer: referrerURL + '\n'}
			//mainWindow.loadURL(targetURL, httpExtraHeader)
			mainWindow.webContents.loadURL(targetURL, httpExtraHeader)
		})
	}

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
}
