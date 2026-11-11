/** 线性图标：24×24 stroke，颜色继承 currentColor */

function path(d, extra) {
  return '<path d="' + d + '" ' + (extra || '') + '/>';
}

var BASE = 'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"';

export var ICON_PATHS = {
  chat: path('M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H10l-4 4v-4H6.5A2.5 2.5 0 0 1 4 13.5z'),
  wardrobe: path('M12 4.2a2.1 2.1 0 0 1 2.1 2.1c0 1.2-.9 1.7-2.1 2.3') +
    path('M12 8.6 3.8 14.4a1.2 1.2 0 0 0 .68 2.2h15.04a1.2 1.2 0 0 0 .68-2.2L12 8.6z'),
  scene: path('M4 17.5 9 12l3.2 3.4L15 12l5 5.5M4 5.5h16v13H4z') + '<circle cx="8.5" cy="9" r="1.4"/>',
  focus: path('M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z') + path('M12 7.5V12l3 2'),
  log: path('M5 4.5h14v15H5z') + path('M8.5 8.5h7M8.5 12h7M8.5 15.5h4'),
  memory: path('M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9z'),
  settings: path('M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z') +
    path('M19.4 13.5a7.6 7.6 0 0 0 0-3l1.6-1.2-1.8-3.1-1.9.8a7.6 7.6 0 0 0-2.6-1.5L14.4 3h-3.6l-.3 2.5a7.6 7.6 0 0 0-2.6 1.5l-1.9-.8L4.2 9.3 5.8 10.5a7.6 7.6 0 0 0 0 3l-1.6 1.2 1.8 3.1 1.9-.8a7.6 7.6 0 0 0 2.6 1.5l.3 2.5h3.6l.3-2.5a7.6 7.6 0 0 0 2.6-1.5l1.9.8 1.8-3.1z'),
  bolt: path('M13 2.5 5.5 13.5H11l-1 8 7.5-11H12z'),
  heart: path('M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9z'),
  clock: path('M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z') + path('M12 7v5.2l3.4 2'),
  plus: path('M12 5v14M5 12h14'),
  close: path('M6 6l12 12M18 6 6 18'),
  back: path('M14.5 5 8 12l6.5 7'),
  check: path('M5 12.5 9.5 17 19 7'),
  trash: path('M5 7h14M9.5 7V4.8h5V7M7 7l1 13h8l1-13'),
  upload: path('M12 16V4.5M8 8.5 12 4.5l4 4M4.5 15.5V19h15v-3.5'),
  link: path('M10 14a4 4 0 0 0 5.7 0l2.6-2.6a4 4 0 1 0-5.7-5.7L11.5 6') +
    path('M14 10a4 4 0 0 0-5.7 0L5.7 12.6a4 4 0 1 0 5.7 5.7L12.5 18'),
  image: path('M4 5.5h16v13H4z') + path('M4 15l4.5-4.5 3.5 3.5 3-3L20 15'),
  edit: path('M4.5 19.5h4L19 9a2.1 2.1 0 0 0-3-3L5.5 16.5z'),
  play: path('M8 5.5 18 12 8 18.5z'),
  pause: path('M9 5.5v13M15 5.5v13'),
  reset: path('M4.5 12a7.5 7.5 0 1 0 2.4-5.5') + path('M4 4.5V9h4.5')
};

export function iconMarkup(name) {
  var body = ICON_PATHS[name] || ICON_PATHS.heart;
  return '<svg viewBox="0 0 24 24" ' + BASE + ' aria-hidden="true">' + body + '</svg>';
}
