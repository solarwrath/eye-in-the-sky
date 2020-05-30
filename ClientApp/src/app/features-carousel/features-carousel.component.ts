import {ChangeDetectorRef, Component, ViewChild, ViewChildren, OnInit} from '@angular/core';
import {NguCarouselConfig} from '@ngu/carousel';

@Component({
  selector: 'app-features-carousel',
  templateUrl: './features-carousel.component.html',
  styleUrls: ['./features-carousel.component.scss']
})
export class FeaturesCarouselComponent implements OnInit {
  public features: Feature[] = [
    {
      id: 0,
      title: 'Моніторінг',
      text: 'Проводіть перевірки стану ваших машин у режимі реального часу',
      image: '',
    },
    {
      id: 1,
      title: 'Аналіз Даних(WIP)',
      text: 'Інтерпретуйте зібрані дані, щоб виявити потенційні проблеми',
      image: '',
    },
    {
      id: 2,
      title: 'Віддалене керування (WIP)',
      text: 'Зручно викликайте RPC прямо з браузеру',
      image: '',
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
  id: number;
  title: string;
  text: string;
  image: string;
}
