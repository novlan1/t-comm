import * as http from 'http';
import * as path from 'path';
import * as fs from 'fs';
import type { IPublishOptions } from './types';


export function postFile(fileDataInfo, fileKeyValue, options?: IPublishOptions) {
  return new Promise(((resolve, reject) => {
    if (!options) {
      console.log('[publish] failed. 需要 options');
      return;
    }

    const req = http.request(options, (res) => {
      // res.setEncoding("utf8");
      res.on('data', (chunk) => {
        const result = JSON.parse(chunk);
        console.log('[postFile] result: ', result);
        resolve(result);
      });
    });

    req.on('error', (e) => {
      console.log(`[postFile] problem with request: ${e.message}`);
      reject(e);
    });

    const boundaryKey = Math.random().toString(16);
    const endData = `\r\n----${boundaryKey}--`;

    let dataLength = 0;
    const dataArr: Array<Record<string, any>> = [];
    for (const item of fileDataInfo) {
      const dataInfo = `\r\n----${boundaryKey}\r\n` + `Content-Disposition: form-data; name="${item.urlKey}"\r\n\r\n${item.urlValue}`;
      const dataBinary = Buffer.from(dataInfo, 'utf-8');
      dataLength += dataBinary.length;
      dataArr.push({
        dataInfo,
      });
    }

    const files: Array<Record<string, any>> = [];
    for (const item of fileKeyValue) {
      const content = `\r\n----${boundaryKey}\r\n` + 'Content-Type: application/octet-stream\r\n' + `Content-Disposition: form-data; name="${item.urlKey}"; filename="${path.basename(item.urlValue)}"\r\n` + 'Content-Transfer-Encoding: binary\r\n\r\n';
      // 当编码为ascii时，中文会乱码。
      const contentBinary = Buffer.from(content, 'utf-8');
      files.push({
        contentBinary,
        filePath: item.urlValue,
      });
    }

    let contentLength = 0;
    for (const item of files) {
      const { filePath } = item;
      if (fs.existsSync(filePath)) {
        const stat = fs.statSync(filePath);
        contentLength += stat.size;
      } else {
        contentLength += Buffer.from('\r\n', 'utf-8').length;
      }
      contentLength += item.contentBinary.length;
    }

    req.setHeader('Content-Type', `multipart/form-data; boundary=--${boundaryKey}`);
    req.setHeader('Content-Length', dataLength + contentLength + Buffer.byteLength(endData));

    // 将参数发出
    for (const item of dataArr) {
      req.write(item.dataInfo);
    }

    let fileIndex = 0;
    const doOneFile = function () {
      req.write(files[fileIndex].contentBinary);
      const currentFilePath = files[fileIndex].filePath;
      if (fs.existsSync(currentFilePath)) {
        // @ts-ignore
        const fileStream = fs.createReadStream(currentFilePath, { bufferSize: 4 * 1024 });
        fileStream.pipe(req, { end: false });

        fileStream.on('end', () => {
          fileIndex += 1;
          if (fileIndex === files.length) {
            req.end(endData);
          } else {
            doOneFile();
          }
        });
      } else {
        req.write('\r\n');
        fileIndex += 1;

        if (fileIndex === files.length) {
          req.end(endData);
        } else {
          doOneFile();
        }
      }
    };

    if (fileIndex === files.length) {
      req.end(endData);
    } else {
      doOneFile();
    }
  }));
}

