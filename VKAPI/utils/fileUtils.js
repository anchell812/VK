const fs = require('fs');
const path = require('path');
const { encode, decode } = require('node-base64-image');
const jimp = require('jimp');
const logger = require('../logger/log');
const config = require('../configData/config.json');
const data = require('../testData/data.json');
const timeouts = require('../configData/timeouts.json');

class FilesUtil {

  static async checkFileExists(pathToDownloadedPhoto) {

    fs.stat(pathToDownloadedPhoto, function (exists) {
      if (exists) {
        logger.info('File exists')
      }
    }) == true, { timeout: timeouts.waits };
  }

  static getFileDestination(path, name, ext) {
    return (path + name + ext);
  }

  static async downloadFile(url) {
    logger.info('Downloading photo');
    const options = {
      string: true,
    };
    const image = await encode(url, options);
    await decode(image, { fname: (config.downloadDir + data.fileName), ext: data.extention });
  }

  static async compareImages(photo1, photo2) {

    const photoFromTestData = await jimp.read(photo1);
    const photoFromVK = await jimp.read(photo2);
    const photo1Hash = photoFromTestData.hash();
    const photo2Hash = photoFromVK.hash();
    if (photo1Hash == photo2Hash) {
      logger.info("Photos are the same");
      return true;
    } else {
      logger.error("photo are not the same");
      return false;
    }
  }

  static async deleteFile(pathToDeletingFiles) {
    logger.info('Deleting image');
    const directory = pathToDeletingFiles;
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
        });
      }
    });
  };
}

module.exports = FilesUtil;