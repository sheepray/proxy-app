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
		const ses = session.fromPartition('firstSession')
		const remoteProxy = 'https://httpbin.org/ip'
		const targetURL = 'http://www.github.com'

		ses.setProxy({proxyRules: remoteProxy}, function(){
				console.log('proxy used')
				mainWindow.loadURL(targetURL)
		})

	}

	/* replace the username and secret with your own credentials */
	app.on('login', function(event, webContents, request, authInfo, callback) {
		event.preventDefault();
		callback('username', 'secret');
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
