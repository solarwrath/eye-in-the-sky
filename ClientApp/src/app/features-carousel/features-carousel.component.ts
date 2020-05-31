import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NguCarouselConfig} from '@ngu/carousel';

@Component({
  selector: 'app-features-carousel',
  templateUrl: './features-carousel.component.html',
  styleUrls: ['./features-carousel.component.scss']
})
export class FeaturesCarouselComponent implements OnInit {
  public features: Feature[] = [
    {
      title: 'Моніторінг',
      text: 'Проводіть перевірки стану ваших машин у режимі реального часу',
      image: 'features-monitoring.png',
    },
    {
      title: 'Аналіз Даних(WIP)',
      text: 'Інтерпретуйте зібрані дані, щоб виявити потенційні проблеми',
      image: 'features-analytics.png',
    },
    {
      title: 'Віддалене керування (WIP)',
      text: 'Зручно викликайте RPC прямо з браузеру',
      image: 'features-rpc.png',
    },
  ];

  public carouselConfig: NguCarouselConfig = {
    grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
    slide: 3,
    speed: 250,
    point: {
      visible: true
    },
    load: 3,
    touch: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
    interval: {
      timing: 2000,
      initialDelay: 4000,
    },
    loop: true,
  };

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.cd.detectChanges();
  }
}

interface Feature {
  title: string;
  text: string;
  image: string;
}
