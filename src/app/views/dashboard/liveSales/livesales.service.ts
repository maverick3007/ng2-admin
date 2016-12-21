import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';



@Injectable()
export class LiveSalesService {
  salesdata;
  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {
    let dashboardColors = this._baConfig.get().colors.dashboard;

    return [
      {
        value: 2000,
        color: dashboardColors.white,
        highlight: colorHelper.shade(dashboardColors.white, 15),
        label: 'Kassa Haacht',
        percentage: 87,
        order: 1,
      }, {
        value: 1500,
        color: dashboardColors.gossip,
        highlight: colorHelper.shade(dashboardColors.gossip, 15),
        label: 'Kassa Aarschot',
        percentage: 22,
        order: 2,
      }, {
        value: 1000,
        color: dashboardColors.silverTree,
        highlight: colorHelper.shade(dashboardColors.silverTree, 15),
        label: 'WebShop',
        percentage: 70,
        order: 3,
      }
    ];
  }
}
