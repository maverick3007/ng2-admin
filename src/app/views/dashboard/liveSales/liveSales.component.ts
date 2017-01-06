import {Component, ViewEncapsulation, ElementRef, OnInit} from '@angular/core';

import {Chart} from './liveSales.loader.ts';

import {BaThemeConfigProvider, colorHelper} from '../../../theme';
import {AuthenticationService} from '../../../services';

@Component({
  selector: 'livesales-chart',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./liveSales.scss')],
  template: require('./liveSales.html')
})

// TODO: move chart.js to it's own component
export class LiveSales implements OnInit {
    today = new Date();
    todaystr = this.today.toISOString().substring(0, 10).replace(/-/gi,'');
    isDataAvailable:boolean = false;
  public doughnutData: Array<Object>;
  TotalRevenue: number=0;
  public latestUpdate:Date;
  public reportDate:Date;
  constructor( private _auth: AuthenticationService, private _baConfig:BaThemeConfigProvider) {
  }

  ngOnInit() {

        this.loadSalesData(this.todaystr);
    }
  
  loadSalesData(datestr){
      this._auth.apiGet('livesales/' + datestr).subscribe(data => this.convertToDData(data));
  }

  convertToDData(salesinfo){
      var results = []
      let dashboardColors = this._baConfig.get().colors.dashboard;
      var mainColors = [dashboardColors.white,dashboardColors.gossip,dashboardColors.silverTree];
      var test = salesinfo;
      this.TotalRevenue = salesinfo.ReportTotal;
      this.reportDate = salesinfo.Date;
      this.latestUpdate = salesinfo.LastUpdate;
      for(var i=0; i < salesinfo.LocationSales.length; i++) {
          let dp = new Object();
          dp['color'] = mainColors[i];
          dp['highlight'] = colorHelper.shade(mainColors[i], 15);
          dp['label'] = salesinfo.LocationSales[i].Location;
          dp['order'] = (i+1);
          dp['value'] = salesinfo.LocationSales[i].TotalSales;
          dp['percentage'] = (salesinfo.LocationSales[i].TotalSales / salesinfo.LocationSales[i].RunningAvg)*100;
          dp['runningavg']=salesinfo.LocationSales[i].RunningAvg;
          this.reportDate = salesinfo.LocationSales[i].Date;
          results.push(dp);
      }
      this.doughnutData = results;
      this._loadDoughnutCharts();
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


