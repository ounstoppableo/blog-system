export function judgeSeason() {
  const month = new Date().getMonth();
  if (month === 10 || month === 11 || month === 0) {
    return 'Winter';
  } else if (month === 7 || month === 8 || month === 9) {
    return 'Autumn';
  } else if (month === 4 || month === 5 || month === 6) {
    return 'Summer';
  } else {
    return 'Spring';
  }
}

//因为设计原因，maxSize不能大于25px
export function seasonSelect(type: 'Spring' | 'Summer' | 'Autumn' | 'Winter') {
  if (type === 'Spring') {
    ($(document) as any).snowfall('');
    ($(document) as any).snowfall({
      image:
        'https://cdn.jsdelivr.net/gh/ounstoppableo/season_float_animation@vlatest/img/1.png',
      flakeCount: 10,
      minSpeed: 1,
      minSize: 8,
      maxSize: 25,
    });
    ($(document) as any).snowfall({
      image:
        'https://cdn.jsdelivr.net/gh/ounstoppableo/season_float_animation@vlatest/img/2.png',
      flakeCount: 10,
      minSpeed: 1,
      minSize: 8,
      maxSize: 25,
    });
    ($(document) as any).snowfall({
      image:
        'https://cdn.jsdelivr.net/gh/ounstoppableo/season_float_animation@vlatest/img/3.png',
      flakeCount: 10,
      minSpeed: 1,
      minSize: 8,
      maxSize: 25,
    });
    ($(document) as any).snowfall({
      image:
        'https://cdn.jsdelivr.net/gh/ounstoppableo/season_float_animation@vlatest/img/4.png',
      flakeCount: 10,
      minSpeed: 1,
      minSize: 8,
      maxSize: 25,
    });
  } else if (type === 'Summer') {
    ($(document) as any).snowfall('');
    ($(document) as any).snowfall({
      icon: '🍀',
      flakeCount: 10,
      minSpeed: 1,
      minSize: 8,
      maxSize: 25,
    });
    ($(document) as any).snowfall({
      icon: '☘️',
      flakeCount: 10,
      minSpeed: 1,
      minSize: 8,
      maxSize: 25,
    });
    ($(document) as any).snowfall({
      icon: '☘️',
      flakeCount: 10,
      minSpeed: 1,
      minSize: 8,
      maxSize: 25,
    });
    ($(document) as any).snowfall({
      icon: '🍀',
      flakeCount: 10,
      minSpeed: 1,
      minSize: 8,
      maxSize: 25,
    });
  } else if (type === 'Autumn') {
    ($(document) as any).snowfall('');
    ($(document) as any).snowfall({
      icon: '🍁',
      flakeCount: 10,
      minSpeed: 1,
      minSize: 8,
      maxSize: 25,
    });
    ($(document) as any).snowfall({
      icon: '🍁',
      flakeCount: 10,
      minSpeed: 1,
      minSize: 8,
      maxSize: 25,
    });
    ($(document) as any).snowfall({
      icon: '🍁',
      flakeCount: 10,
      minSpeed: 1,
      minSize: 8,
      maxSize: 25,
    });
    ($(document) as any).snowfall({
      icon: '🍁',
      flakeCount: 10,
      minSpeed: 1,
      minSize: 8,
      maxSize: 25,
    });
  } else if (type === 'Winter') {
    ($(document) as any).snowfall('');
    ($(document) as any).snowfall({
      image: 'assets/ParticleSmoke.png',
      flakeCount: 10,
      minSpeed: 1,
      minSize: 8,
      maxSize: 25,
    });
    ($(document) as any).snowfall({
      image: 'assets/ParticleSmoke.png',
      flakeCount: 10,
      minSpeed: 1,
      minSize: 8,
      maxSize: 25,
    });
    ($(document) as any).snowfall({
      image: 'assets/ParticleSmoke2.png',
      flakeCount: 10,
      minSpeed: 1,
      minSize: 8,
      maxSize: 25,
    });
    ($(document) as any).snowfall({
      image: 'assets/ParticleSmoke2.png',
      flakeCount: 10,
      minSpeed: 1,
      minSize: 8,
      maxSize: 25,
    });
  }
}

export function closedFloat() {
  ($(document) as any).snowfall('');
}
