import Client from 'ssh2-sftp-client'
import path from 'path'
import fs from 'fs'

const sftp = new Client()

const remoteDir = '/customers/9/3/6/simotoivanen.fi/httpd.www'
const localDir = path.resolve('./website/dist')

async function clearRemoteDir(remotePath) {
  try {
    const list = await sftp.list(remotePath)
    for (const item of list) {
      const fullPath = path.posix.join(remotePath, item.name)
      if (item.type === 'd') {
        await clearRemoteDir(fullPath)
        await sftp.rmdir(fullPath)
      } else {
        await sftp.delete(fullPath)
      }
    }
  } catch (err) {
    console.error('Virhe etäkansion tyhjennyksessä:', err)
    throw err
  }
}

async function uploadDir(localPath, remotePath) {
  const items = fs.readdirSync(localPath, { withFileTypes: true })

  try {
    try {
      await sftp.stat(remotePath)
    } catch {
      await sftp.mkdir(remotePath, true)
    }

    for (const item of items) {
      const localItemPath = path.join(localPath, item.name)
      const remoteItemPath = path.posix.join(remotePath, item.name)

      if (item.isDirectory()) {
        await uploadDir(localItemPath, remoteItemPath)
      } else if (item.isFile()) {
        await sftp.fastPut(localItemPath, remoteItemPath)
      }
    }
  } catch (err) {
    console.error('Virhe tiedostojen lähetyksessä:', err)
    throw err
  }
}

async function deploy() {
  try {
    await sftp.connect({
      host: 'ssh.simotoivanen.fi',
      port: 22,
      username: 'simotoivanen.fi',
      password: 'N0Rthst4t3!N0Rthst4t3!',
    })

    console.log('Yhdistetty SFTP-palvelimeen')

    console.log('Tyhjennetään etäkansio...')
    await clearRemoteDir(remoteDir)

    console.log('Lähetetään dist-kansio...')
    await uploadDir(localDir, remoteDir)

    console.log('Deployment valmis.')

    await sftp.end()
  } catch (error) {
    console.error('Deployment epäonnistui:', error)
    process.exit(1)
  }
}

deploy()