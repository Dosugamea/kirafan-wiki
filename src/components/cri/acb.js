/* ----eslint-disable */
const path = window.require("path");
const util = require("util");
const fs = window.require("fs");

const afs2 = require("./afs2");
const hca = require("./hca");
const utf = require("./utf");

const readFile = util.promisify(fs.readFile);
const mkdir = util.promisify(fs.mkdir);

async function parseAcb(acbPath) {
  const pathInfo = path.parse(acbPath);
  const buffer = await readFile(acbPath);
  const utfs = utf.parseUtf(buffer);
  if (!utfs) throw new Error(`NOT ACB FILE`);
  if (utfs.length !== 1) throw new Error(`Failed to parse ACB file`);
  const acb = utfs[0];
  acb.buffer = buffer;
  acb.memoryHcas = await afs2.parseAFS2(acb.AwbFile);
  acb.streamHcas = [];
  for (let i = 0; i < acb.StreamAwbHash.length; i++) {
    const StreamAwb = acb.StreamAwbHash[i];
    const awbPath = path.join(pathInfo.dir, StreamAwb.Name + ".awb");
    if (fs.existsSync(awbPath)) {
      const obj = await afs2.parseAFS2(awbPath);
      acb.streamHcas.push(obj);
    }
  }
  for (let i = 0; i < acb.WaveformTable.length; i++) {
    const Waveform = acb.WaveformTable[i];
    const isMemory = Waveform.Streaming === 0;
    if (!isMemory) {
      if (!acb.streamHcas[Waveform.StreamAwbPortNo]) {
        throw new Error(`MISSING ${acb.StreamAwbHash[i].Name}.awb`);
      }
    }
  }
  return acb;
}

async function acb2wavs(acbPath, key, wavDir, volume, mode, skip) {
  const pathInfo = path.parse(acbPath);
  // console.log(`Parsing ${pathInfo.base}...`);
  const acb = await parseAcb(acbPath);
  if (wavDir === undefined) wavDir = path.join(pathInfo.dir, acb.Name);
  if (!fs.existsSync(wavDir)) {
    await mkdir(wavDir, { recursive: true });
  } else if (skip) {
    console.log(`Skipped ${pathInfo.base}...`);
    return;
  }
  // console.log(`Extracting ${pathInfo.base}...`);
  // let memory = 0,
  //   stream = 0;

  let index = 0;
  let name_i = 0;
  const prom_list = [];

  let c_table, c_key;
  if (acb.Version === 0x1300000) {
    c_table = acb.SequenceTable;
    c_key = "NumTracks";
  } else if (acb.Version === 0x1330000) {
    c_table = acb.CueTable;
    c_key = "NumRelatedWaveforms";
  } else {
    throw new Error("Unsupported ACB version");
  }
  for (let cue of c_table) {
    // acb.CueTable.map(cue => {
    for (let cue_num = 0; cue_num < cue[c_key]; cue_num++) {
      const i = index;
      const Waveform = acb.WaveformTable[i];
      const isMemory = Waveform.Streaming === 0;

      const hcaBuffer = isMemory
        ? acb.memoryHcas[Waveform.MemoryAwbId]
        : acb.streamHcas[Waveform.StreamAwbPortNo][Waveform.StreamAwbId];
      const awbKey = isMemory
        ? acb.memoryHcas.config.key
        : acb.streamHcas[Waveform.StreamAwbPortNo].config.key;
      // const name = isMemory ? `memory_${++memory}.wav` : `stream_${++stream}.wav`;
      const name =
        acb.CueNameTable.find((x) => x.CueIndex === name_i).CueName +
        "_" +
        cue_num +
        ".wav";

      const wavPath = path.join(wavDir, name);
      prom_list.push(
        hca.decodeHcaToWav(hcaBuffer, key, awbKey, wavPath, volume, mode)
      );

      index++;
    }
    name_i++;
  }
  await Promise.all(prom_list);
  // for (let i = 0; i < acb.WaveformTable.length; i++) {
  //   const Waveform = acb.WaveformTable[i];
  //   const isMemory = Waveform.Streaming === 0;
  //   const hcaBuffer = isMemory ? acb.memoryHcas[Waveform.MemoryAwbId] : acb.streamHcas[Waveform.StreamAwbPortNo][Waveform.StreamAwbId];
  //   const awbKey = isMemory ? acb.memoryHcas.config.key : acb.streamHcas[Waveform.StreamAwbPortNo].config.key;
  //   // const name = isMemory ? `memory_${++memory}.wav` : `stream_${++stream}.wav`;
  //   const _name = acb.CueNameTable.find((x) => x.CueIndex === i)?.CueName;
  //   const name = (_name) ? _name + '.wav' : `unmapped_${i}.wav`;
  //   if (!_name) console.log(Waveform);

  //   const wavPath = path.join(wavDir, name);
  //   await hca.decodeHcaToWav(hcaBuffer, key, awbKey, wavPath, volume, mode);
  // }
  // console.log(acb.WaveformTable)
}
exports.acb2wavs = acb2wavs;

async function acbParse(acbPath, key, wavDir, volume, mode, skip) {
  const pathInfo = path.parse(acbPath);
  // console.log(`Parsing ${pathInfo.base}...`);
  const acb = await parseAcb(acbPath);
  if (wavDir === undefined) wavDir = path.join(pathInfo.dir, acb.Name);
  if (!fs.existsSync(wavDir)) {
    await mkdir(wavDir, { recursive: true });
  } else if (skip) {
    console.log(`Skipped ${pathInfo.base}...`);
    return;
  }
  // console.log(`Extracting ${pathInfo.base}...`);
  // let memory = 0,
  //   stream = 0;

  let index = 0;
  let name_i = 0;
  // const prom_list = [];

  let c_table, c_key;
  if (acb.Version === 0x1300000) {
    c_table = acb.SequenceTable;
    c_key = "NumTracks";
  } else if (acb.Version === 0x1330000) {
    c_table = acb.CueTable;
    c_key = "NumRelatedWaveforms";
  } else {
    throw new Error("Unsupported ACB version");
  }
  const output = [];
  for (let cue of c_table) {
    // acb.CueTable.map(cue => {
    for (let cue_num = 0; cue_num < cue[c_key]; cue_num++) {
      const i = index;
      const Waveform = acb.WaveformTable[i];
      const isMemory = Waveform.Streaming === 0;

      const hcaBuffer = isMemory
        ? acb.memoryHcas[Waveform.MemoryAwbId]
        : acb.streamHcas[Waveform.StreamAwbPortNo][Waveform.StreamAwbId];
      const awbKey = isMemory
        ? acb.memoryHcas.config.key
        : acb.streamHcas[Waveform.StreamAwbPortNo].config.key;
      // const name = isMemory ? `memory_${++memory}.wav` : `stream_${++stream}.wav`;
      const name =
        acb.CueNameTable.find((x) => x.CueIndex === name_i).CueName +
        "_" +
        cue_num +
        ".wav";

      const wavPath = path.join(wavDir, name);
      output.push([
        name,
        async () =>
          await hca.decodeHcaToWav(
            hcaBuffer,
            key,
            awbKey,
            wavPath,
            volume,
            mode
          ),
      ]);
      index++;
    }
    name_i++;
  }
  return output;
}
exports.acbParse = acbParse;
