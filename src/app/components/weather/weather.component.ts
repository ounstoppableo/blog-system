import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { WeatherService } from '@/app/service/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements AfterViewInit, OnChanges {
  @Input()
  smallSize = false;
  currentHourIndex = 0;
  scrollTop = 0;
  hoursData: any[] = [];
  location: any = {};

  @ViewChild('card')
  card!: any;

  constructor(private weatherService: WeatherService) {}

  setRandomLightningDuration() {
    const lightning = document.getElementById('thunderstorm');
    const minDuration = 1; // minimum duration in seconds
    const maxDuration = 4; // maximum duration in seconds
    const randomDuration =
      Math.random() * (maxDuration - minDuration) + minDuration;
    lightning?.style.setProperty('--lightning-duration', `${randomDuration}s`);
  }

  // Adjust initial positions of the particles
  adjustInitialPositions() {
    (window as any).particlesJS('cloud', {
      particles: {
        number: { value: 5, density: { enable: true, value_area: 100 } },
        color: { value: '#ffffff' },
        shape: {
          type: 'image',
          stroke: { width: 2, color: '#00ffff' },
          polygon: { nb_sides: 5 },
          image: {
            src: '/assets/weather/fluffyvloud.png',
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 1,
          random: true,
          anim: {
            enable: true,
            speed: 10,
            opacity_min: 0.0081,
            sync: false,
          },
        },
        size: {
          value: 800,
          random: false,
          anim: { enable: true, speed: 10, size_min: 2, sync: false },
        },
        line_linked: {
          enable: false,
          distance: 0,
          color: '#ffffff',
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: 'left',
          random: true,
          straight: true,
          out_mode: 'out',
          bounce: false,
          attract: { enable: false, rotateX: 60, rotateY: 120 },
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: false, mode: 'bubble' },
          onclick: { enable: false, mode: 'push' },
          resize: true,
        },
        modes: {
          grab: { distance: 0, line_linked: { opacity: 1 } },
          bubble: {
            distance: 0,
            size: 2,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 },
        },
      },
      retina_detect: true,
    });
    (window as any).particlesJS('snow', {
      particles: {
        number: {
          value: 2000,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: '#fff',
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000',
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 1,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 2,
          random: true,
          anim: {
            enable: false,
          },
        },
        line_linked: {
          enable: false,
        },
        move: {
          enable: true,
          speed: 3,
          direction: 'bottom',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      retina_detect: true,
    });
    const particlesArray = (window as any).pJSDom[0].pJS.particles.array;
    particlesArray.forEach((p: any) => {
      p.x = Math.random() * window.innerWidth;
      p.y = Math.random() * window.innerHeight;
    });
  }

  ngOnChanges(changes: any): void {
    if (changes['smallSize']) {
      this.getGeoAndInitWeather();
    }
  }

  ngAfterViewInit(): void {
    window.addEventListener('load', this.getGeoAndInitWeather);
  }

  getGeoAndInitWeather = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const longitude = position.coords.longitude.toFixed(2);
        const latitude = position.coords.latitude.toFixed(2);
        this.weatherService
          .getWeatherByLocation(`${longitude},${latitude}`)
          .subscribe((res) => {
            if (res.code === 200) {
              this.hoursData = res.data.weatherData;
              this.location = res.data.location[0];
              this.init();
            }
          });
      },
      () => {
        this.weatherService
          .getWeatherByLocation('116.40,39.90')
          .subscribe((res) => {
            if (res.code === 200) {
              this.hoursData = res.data.weatherData;
              this.location = res.data.location[0];
              this.init();
            }
          });
      },
    );
  };

  init() {
    $(document).ready(() => {
      $('.cardForWeather .hours').empty();
      $('.cardForWeather .location').empty();
      this.hoursData.forEach((data) => {
        const hourDiv = $('<div>', {
          class: 'hour d-flex flex-column align-items-center',
          'data-day': data.day,
          'data-hour': data.hour,
          'data-weather': data.weather,
          'data-temp': data.temp,
        });

        const timeSpan = $("<span class='timeSpan'>").text(data.time);
        const iconSpan = $('<span>', { class: 'iconfont' });
        const tempSpan = $("<span class='tempSpan'>").text(data.temp + '°C');

        hourDiv.append(timeSpan, iconSpan, tempSpan);
        $('.cardForWeather .hours').append(hourDiv);
      });
      const locationSpan = $("<div class='location cardInfo'>").text(
        `${this.location.adm1} ${this.location.adm2}`,
      );
      $('.cardForWeather').append(locationSpan);
      const background = $('.cardForWeather .background');
      const backgroundNight = $('.cardForWeather .backgroundNight');
      const sun = $('.cardForWeather .sun');
      const moon = $('.cardForWeather .moon');
      const hoursContainer = $('.cardForWeather .hours-container');
      const hoursContainerNative = this.card.nativeElement.querySelector(
        '.cardForWeather .hours-container',
      );
      const hours = $('.cardForWeather .hour');
      const rain = $('.cardForWeather #rain');
      const cloud = $('.cardForWeather #cloud');
      const snow = $('.cardForWeather #snow');
      const thunderstorm = $('.cardForWeather #thunderstorm');
      const temperatureDisplay = $('.cardForWeather #temperature');
      const weatherTypeDisplay = $('.cardForWeather #weatherType');
      const currentDay = $('.cardForWeather #currentDay');
      const that = this;
      const hourWidth = 80;

      function toggleSunMoon(hour: any) {
        if (hour >= 6 && hour <= 21) {
          const rotation = -90 + (hour - 7) * (180 / 15);
          sun.css('transform', 'rotate(' + rotation + 'deg)');
          sun.css('opacity', '1');
          moon.css('opacity', '0');
          background.css('opacity', '1');
          backgroundNight.css('opacity', '0');
          $('.cardForWeather .hour').css('filter', 'invert(0%)');
          $('.cardForWeather .cardInfo').css('filter', 'invert(0%)');
          moon.css('transition', 'all 0s');
          setTimeout(function () {
            sun.css('transition', 'all 1s');
          }, 10);
          cloud.css(
            'filter',
            'brightness(200%) drop-shadow(0 0 10px rgba(255, 255, 255, 1))',
          );
          cloud.css('mix-blend-mode', that.smallSize ? 'soft-light' : 'normal');
          rain.css('mix-blend-mode', 'normal');
        } else {
          moon.css('opacity', '1');
          sun.css('opacity', '0');
          const adjustedHour = hour < 7 ? hour + 24 : hour;
          const rotation = -90 + (adjustedHour - 6) * (180 / 8);
          moon.css('transform', 'rotate(' + rotation + 'deg)');
          background.css('opacity', '0');
          backgroundNight.css('opacity', '1');
          $('.cardForWeather .hour').css('filter', 'invert(100%)');
          $('.cardForWeather .cardInfo').css('filter', 'invert(100%)');
          sun.css('transition', 'all 0s');
          setTimeout(function () {
            moon.css('transition', 'all 1s');
          }, 10);
          cloud.css(
            'filter',
            'brightness(0%) drop-shadow(0 0 10px rgba(255, 255, 255, 1))',
          );
          cloud.css('mix-blend-mode', 'multiply');
          rain.css('mix-blend-mode', 'soft-light');
        }
      }

      // Function to handle scroll and wheel events
      const handleScrollEvent = () => {
        const currentScrollTop: number = hoursContainer.scrollTop() as number;
        const scrollHeight = hoursContainerNative.scrollHeight;
        this.currentHourIndex = Math.ceil(
          (currentScrollTop / scrollHeight) * hours.length,
        );
        const currentHour = hours.eq(this.currentHourIndex);
        requestAnimationFrame(() => {
          toggleSunMoon(parseInt(currentHour.data('hour')));
          highlightHour(this.currentHourIndex);
          updateWeatherAndTemperature(currentHour);
        });
      };

      // Function to highlight the selected hour
      function highlightHour(index: any) {
        hours.removeClass('active'); // Remove active class from all hours
        hours.eq(index).addClass('active'); // Add active class to the selected hour
      }

      const updateWeatherAndTemperature = (currentHour: any) => {
        const temperature = currentHour.data('temp');
        const weather = currentHour.data('weather');
        const day = currentHour.data('day');

        temperatureDisplay.text(temperature);
        weatherTypeDisplay.text(weather.replace(/-/g, ' '));

        // Reset elements to default state
        rain.css('opacity', '0');
        snow.css('opacity', '0');
        cloud.css('opacity', '0');
        thunderstorm.css('opacity', '0');
        background.css('filter', 'none');
        sun.css('filter', 'none');
        moon.css('filter', 'none');

        // Handle weather visibility and background filters
        if (weather === 'rainy') {
          rain.css('opacity', '1');
          cloud.css('opacity', '0.8');
          background.css('filter', 'grayscale(0.5) brightness(0.5)');
          moon.css('filter', 'brightness(0.8)');
        } else if (weather === 'snowy') {
          snow.css('opacity', '1');
          cloud.css('opacity', '0');
          background.css('filter', 'grayscale(0.5) opacity(0.4)');
          sun.css('filter', 'grayscale(0.9)');
        } else if (weather === 'cloudy') {
          cloud.css('opacity', '0.9');
          background.css('filter', 'grayscale(0.5) brightness(0.5)');
          moon.css('filter', 'brightness(0.8)');
        } else if (weather === 'thunderstorm') {
          cloud.css('opacity', '0.8');
          thunderstorm.css('opacity', '1');
          background.css('filter', 'grayscale(1) brightness(0.1)');
          sun.css('filter', 'grayscale(0.9)');
        } else if (
          weather === 'partly-cloudy' ||
          weather === 'partly-cloudy-night'
        ) {
          cloud.css('opacity', '0.5');
        }

        // Handle day text update
        if (day === 'tom') {
          currentDay.text('Tomorrow');
        } else {
          currentDay.text('Today');
        }
      };

      // Initial setup for the first hour
      const init = () => {
        toggleSunMoon(this.hoursData[this.currentHourIndex].hour); // Toggle sun/moon for initial position (07:00)
        highlightHour(this.currentHourIndex); // Highlight the first hour initially
        updateWeatherAndTemperature(hours.eq(this.currentHourIndex));
      };

      // Function to generate drops
      function createRain() {
        const nbDrop = 800;
        for (let i = 1; i <= nbDrop; i++) {
          const dropLeft = randRange(0, 1600);
          const dropTop = randRange(-1000, 1400);

          rain.append('<div class="drop" id="drop' + i + '"></div>');
          $('.cardForWeather #drop' + i).css({ left: dropLeft, top: dropTop });
        }
      }

      // Function to generate a random number range
      function randRange(minNum: any, maxNum: any) {
        return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
      }

      // Event listeners
      hoursContainer.on('scroll', handleScrollEvent);
      hours.on('click', function () {
        const hour = parseInt($(this).data('hour'));
        that.currentHourIndex = hours.index(this);
        toggleSunMoon(hour);
        highlightHour(that.currentHourIndex);
        updateWeatherAndTemperature($(this));
      });

      // Make it rain
      createRain();
      init();
      hoursContainer.scrollLeft(hourWidth * this.currentHourIndex);
    });
    // Set an initial random duration
    this.setRandomLightningDuration();

    // Change the duration periodically
    setInterval(this.setRandomLightningDuration, 5000); // Change every 5 seconds
    // Wait until particles are initialized and then adjust positions
    setTimeout(this.adjustInitialPositions, 1000);

    const canvas: any = $('.cardForWeather #rain')[0];

    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';

      const init = [];
      const maxParts = 300;
      for (let a = 0; a < maxParts; a++) {
        init.push({
          x: Math.random() * w,
          y: Math.random() * h,
          l: Math.random() * 1,
          xs: -4 + Math.random() * 4 + 2,
          ys: Math.random() * 10 + 10,
        });
      }

      const particles: any[] = [];
      for (let b = 0; b < maxParts; b++) {
        particles[b] = init[b];
      }

      function draw() {
        ctx.clearRect(0, 0, w, h);
        for (let c = 0; c < particles.length; c++) {
          const p = particles[c];
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
          ctx.stroke();
        }
        move();
      }

      function move() {
        for (let b = 0; b < particles.length; b++) {
          const p = particles[b];
          p.x += p.xs;
          p.y += p.ys;
          if (p.x > w || p.y > h) {
            p.x = Math.random() * w;
            p.y = -20;
          }
        }
      }

      setInterval(draw, 3);
    }
  }
}
