//  ┏━┓┏━╸╺┳╸╻ ╻┏━┓
//  ┗━┓┣╸  ┃ ┃ ┃┣━┛
//  ┗━┛┗━╸ ╹ ┗━┛╹

export const definitions = [
  {
    hex: 0x000000,
    hexString: '000000',
    lab: [0, 0, 0],
    name: 'Black',
    rgb: [0, 0, 0],
    shortHexString: '000',
  },
  {
    hex: 0x000080,
    hexString: '000080',
    lab: [12.975311577716514, 47.50776531013767, -64.70427324580548],
    name: 'Navy',
    rgb: [0, 0, 128],
  },
  {
    hex: 0x0000ff,
    hexString: '0000ff',

    lab: [32.302586667249486, 79.19666178930935, -107.8636810449517],
    name: 'Blue',
    rgb: [0, 0, 255],
    shortHexString: '00f',
  },
  {
    hex: 0x008000,
    hexString: '008000',
    lab: [46.22881784262658, -51.69964732808236, 49.89795230983843],
    name: 'Green',
    rgb: [0, 128, 0],
  },
  {
    hex: 0x008080,
    hexString: '008080',
    lab: [48.25607381337552, -28.841559463342104, -8.481050086288366],
    name: 'Teal',
    rgb: [0, 128, 128],
  },
  {
    hex: 0x00ff00,
    hexString: '00ff00',
    lab: [87.73703347354422, -86.18463649762525, 83.18116474777854],
    name: 'Lime',
    rgb: [0, 255, 0],
    shortHexString: '0f0',
  },
  {
    hex: 0x00ffff,
    hexString: '00ffff',
    lab: [91.11652110946342, -48.079618466228766, -14.138127754846131],
    name: 'Aqua',
    rgb: [0, 255, 255],
    shortHexString: '0ff',
  },
  {
    hex: 0x800000,
    hexString: '800000',
    lab: [25.530784572416174, 48.05523604548828, 38.05963258349509],
    name: 'Maroon',
    rgb: [128, 0, 0],
  },
  {
    hex: 0x800080,
    hexString: '800080',
    lab: [29.782100092098077, 58.93983731904201, -36.49792996282386],
    name: 'Purple',
    rgb: [128, 0, 128],
  },
  {
    hex: 0x808000,
    hexString: '808000',
    lab: [51.86833136334822, -12.930760098732952, 56.677284661941485],
    name: 'Olive',
    rgb: [128, 128, 0],
  },
  {
    hex: 0x808080,
    hexString: '808080',
    lab: [53.58501345216902, 0.003155620347972121, -0.006243566036268078],
    name: 'Gray',
    rgb: [128, 128, 128],
  },
  {
    hex: 0xc0c0c0,
    hexString: 'c0c0c0',
    lab: [77.70436358995272, 0.004249412075496561, -0.008407692302303538],
    name: 'Silver',
    rgb: [192, 192, 192],
  },
  {
    hex: 0xff0000,
    hexString: 'ff0000',
    lab: [53.23288178584245, 80.10930952982204, 67.22006831026425],
    name: 'Red',
    rgb: [255, 0, 0],
    shortHexString: 'f00',
  },
  {
    hex: 0xff00ff,
    hexString: 'ff00ff',
    lab: [60.319933664076004, 98.25421868616108, -60.84298422386232],
    name: 'Fuchsia',
    rgb: [255, 0, 255],
    shortHexString: 'f0f',
  },
  {
    hex: 0xffff00,
    hexString: 'ffff00',
    lab: [97.13824698129729, -21.555908334832285, 94.48248544644461],
    name: 'Yellow',
    rgb: [255, 255, 0],
    shortHexString: 'ff0',
  },
  {
    hex: 0xffffff,
    hexString: 'ffffff',
    lab: [100, 0.00526049995830391, -0.010408184525267927],
    name: 'White',
    rgb: [255, 255, 255],
    shortHexString: 'fff',
  },
]

export const getDefinitionByName = name =>
  definitions.find(def => def.name.toLowerCase() === name.toLowerCase())
