import { Component } from '@angular/core';
import { UtilsModule } from '../../shared/modules/utils.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [
    UtilsModule,
    MatSidenavModule,
    MatListModule,
    RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
