const dot = (cx: number, cy: number, r = 1) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="currentColor" stroke="none"/>`

export const icons = {
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>' + dot(8, 14) + dot(12, 14) + dot(16, 14) + dot(8, 17.2),
  checklist: '<path d="M4 6.8l1.7 1.7L8.8 5.3M4 13.8l1.7 1.7 3.1-3.2M12 7h8M12 14h8M12 20h8"/>' + dot(6.2, 20, 1.3),
  kanban: '<rect x="3" y="4" width="5" height="14" rx="1.6"/><rect x="9.5" y="4" width="5" height="9" rx="1.6"/><rect x="16" y="4" width="5" height="11.5" rx="1.6"/>',
  chat: '<path d="M20 11.5c0 4.1-3.6 7.5-8 7.5-1.2 0-2.4-.25-3.4-.7L4 19.5l1.2-3.6C4.4 14.7 4 13.2 4 11.5 4 7.4 7.6 4 12 4s8 3.4 8 7.5z"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2C4.5 7 6.6 5 9 5c1.3 0 2.4.6 3 1.6C12.6 5.6 13.7 5 15 5c2.4 0 4.5 2 4.5 4.8C19.5 15.4 12 20 12 20z"/>',
  shield: '<path d="M12 3.5l7 2.8v5.2c0 4.6-3 7.8-7 9-4-1.2-7-4.4-7-9V6.3l7-2.8z"/><path d="M9 12l2.2 2.2L15.2 10"/>',
  bell: '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15L6 16.5z"/><path d="M10 20.5a2.2 2.2 0 0 0 4 0"/>',
  cloudOff: '<path d="M7 18.5h10.2a3.8 3.8 0 0 0 .6-7.6A6 6 0 0 0 6.4 9.6 4.5 4.5 0 0 0 7 18.5z"/><path d="M4 4l16 16"/>',
  flag: '<path d="M5.5 21V4M5.5 4.5h11l-2 4 2 4h-11"/>',
  layers: '<path d="M12 4l8.5 4.5L12 13 3.5 8.5 12 4z"/><path d="M3.5 13L12 17.5l8.5-4.5"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  palette:
    '<path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.8-1.7 1.7-1.7h2a4 4 0 0 0 4-4c0-4-3.8-7.2-8.5-7.2z"/>' +
    dot(7.5, 11.5) +
    dot(9.5, 7.8) +
    dot(14, 7.5),
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
  image: '<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><circle cx="9" cy="10" r="1.6"/><path d="M20.5 16l-4.5-4.5L7 19.5"/>',
  block: '<circle cx="12" cy="12" r="8.5"/><path d="M6 6l12 12"/>',
  download: '<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19.5h14"/>',
  trash: '<path d="M4.5 7h15M10 4h4M6.5 7l.8 11.5a2 2 0 0 0 2 1.9h5.4a2 2 0 0 0 2-1.9L17.5 7"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowDown: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5S9.7 5.9 12 3.5z"/>',
  phone: '<path d="M6.5 4h3l1.5 4-2 1.3a10 10 0 0 0 5.7 5.7L16 13l4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4z"/>',
  video: '<rect x="3.5" y="6.5" width="12" height="11" rx="2.5"/><path d="M15.5 10.5l5-3v9l-5-3"/>',
  sparkle: '<path d="M11 3.5l1.7 4.8 4.8 1.7-4.8 1.7L11 16.5l-1.7-4.8L4.5 10l4.8-1.7L11 3.5z"/><path d="M18 15v5M15.5 17.5h5"/>',
  users: '<circle cx="9" cy="9" r="3.2"/><path d="M3.5 19.5c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8"/><path d="M15.5 6a3 3 0 0 1 0 6M17.5 14.9c1.6.6 2.7 2.2 3 4.6"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="M4.5 7l7.5 6 7.5-6"/>',
  android: '<path d="M5 18v-3a7 7 0 0 1 14 0v3z"/><path d="M7.6 9.6L6 7.2M16.4 9.6L18 7.2"/>' + dot(9.5, 14.2) + dot(14.5, 14.2),
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  plane: '<path d="M3.5 11.2L20.5 4l-6.2 15.5-3.1-6.1-7.7-2.2z"/><path d="M11.2 13.4L20.5 4"/>',
  monitor: '<rect x="3" y="4.5" width="18" height="12" rx="2.5"/><path d="M9 20h6M12 16.5V20"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4"/>',
  moon: '<path d="M19.5 14.6A8 8 0 0 1 9.4 4.5a8 8 0 1 0 10.1 10.1z"/>',
  cloud: '<path d="M7 18.5h10.2a3.8 3.8 0 0 0 .6-7.6A6 6 0 0 0 6.4 9.6 4.5 4.5 0 0 0 7 18.5z"/>',
} as const

export type IconName = keyof typeof icons
