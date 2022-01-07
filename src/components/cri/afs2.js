const fs = window.require('fs');
// const path = require('path');
const util = require('util');

// const hca = require('./hca');

const readFile = util.promisify(fs.readFile);
// const writeFile = util.promisify(fs.writeFile);
// const mkdir = util.promisify(fs.mkdir);

async function parseAFS2(buffer) {
  if (typeof(buffer) === 'string') buffer = await readFile(buffer);
  if (!buffer || buffer.length < 4) return null;
  let pos = 0;
  const config = {};
  config.buffer = buffer;
  config.magic = buffer.slice(pos, 4).toString(); pos += 4;
  if (config.magic !== 'AFS2') return null;
  config.unknown1 = buffer.readUInt8(pos); pos += 1;
  config.sizeLen = buffer.readUInt8(pos); pos += 1;
  config.unknown2 = buffer.readUInt8(pos); pos += 1;
  config.unknown3 = buffer.readUInt8(pos); pos += 1;
  config.fileCount = buffer.readUInt32LE(pos); pos += 4;
  config.align = buffer.readUInt16LE(pos); pos += 2;
  config.key = buffer.readUInt16LE(pos); pos += 2;
  config.fileIds = [];
  for (let i = 0; i < config.fileCount; i++) {
    const fileId = buffer.readUInt16LE(pos); pos += 2;
    config.fileIds.push(fileId);
  }
  const files = [];
  let start;
  if (config.sizeLen === 2) {
    start = buffer.readUInt16LE(pos); pos += 2;
  } else if (config.sizeLen === 4) {
    start = buffer.readUInt32LE(pos); pos += 4;
  } else console.log('Unknown sizeLen: ' + config.sizeLen);
  let mod = start % config.align;
  if (mod != 0) start += config.align - mod;
  for (let i = 0; i < config.fileCount; i++) {
    let end;
    if (config.sizeLen === 2) {
      end = buffer.readUInt16LE(pos); pos += 2;
    } else if (config.sizeLen === 4) {
      end = buffer.readUInt32LE(pos); pos += 4;
    } else console.log('Unknown sizeLen: ' + config.sizeLen);
    files.push(buffer.slice(start, end));
    start = end;
    mod = start % config.align;
    if (mod != 0) start += config.align - mod;
  }
  files.config = config;
  return files;
}
exports.parseAFS2 = parseAFS2;
