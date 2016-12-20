import {Component, ViewEncapsulation, ElementRef} from '@angular/core';

import {Chart} from './liveSales.loader.ts';
import {LiveSalesService} from './liveSales.service';

@Component({
  selector: 'livesales-chart',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./liveSales.scss')],
  template: require('./liveSales.html')
})

// TODO: move chart.js to it's own component
export class LiveSales {

  public doughnutData: Array<Object>;

  constructor(private liveSalesService:LiveSalesService) {
    this.doughnutData = liveSalesService.getData();
  }

  ngAfterViewInit() {
    this._loadDoughnutCharts();
  }

  private _loadDoughnutCharts() {
    let el = jQuery('.chart-area').get(0);
    new Chart(el.getContext('2d')).Doughnut(this.doughnutData, {
      segmentShowStroke: false,
      percentageInnerCutout : 64,
      responsive: true
    });
  }
}
