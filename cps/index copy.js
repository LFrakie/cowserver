const { app, BrowserWindow } = require('electron')

function createWindow() {
  // Crea la ventana del navegador.
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // Carga la página web en la ventana del navegador.
  win.loadURL('http://192.168.100.107:1234')

  // Abre las herramientas de desarrollo.
  win.webContents.openDevTools()

  // Emitido cuando la ventana es cerrada.
  win.on('closed', () => {
    // Desreferencia el objeto ventana, por lo que la ventana puede ser cerrada
    // por el recolector de basura de JavaScript.
    win = null
  })
}

// Este método será llamado cuando Electron haya finalizado
// la inicialización y esté listo para crear ventanas del navegador.
// Algunas APIs pueden solamente ser usadas despues de que este evento ocurra.
app.whenReady().then(createWindow)

// Salir cuando todas las ventanas estén cerradas.
app.on('window-all-closed', () => {
  // En macOS, es común para las aplicaciones y su barra de menú
  // permanecer activas hasta que el usuario salga explicitamente con Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // En macOS, es común re-crear una ventana de la aplicación cuando
  // el icono del dock es clickeado y no hay otras ventanas abiertas.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

