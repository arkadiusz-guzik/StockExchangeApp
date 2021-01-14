import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsAccountComponent } from 'src/app/containers/accountContainers/charts-account/charts-account.component';
import { HistoryAccountComponent } from 'src/app/containers/accountContainers/history-account/history-account.component';
import { LeftbarAccountComponent } from 'src/app/containers/accountContainers/leftbar-account/leftbar-account.component';
import { PortfolioAccountComponent } from 'src/app/containers/accountContainers/portfolio-account/portfolio-account.component';
import { AccountRoutingModule } from './account-routing.module';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { StockListChartsAccountComponent } from 'src/app/components/accountComponents/stock-list-charts-account/stock-list-charts-account.component';
import { DataContainerPortfolioComponent } from 'src/app/containers/accountContainers/data-container-portfolio/data-container-portfolio.component';
import { ChartSummaryPortfolioComponent } from 'src/app/components/accountComponents/chart-summary-portfolio/chart-summary-portfolio.component';
import { PortfolioSummaryComponent } from 'src/app/components/accountComponents/portfolio-summary/portfolio-summary.component';
import { StockListPortfolioAccountComponent } from 'src/app/components/accountComponents/stock-list-portfolio-account/stock-list-portfolio-account.component';
import { StockListHistoryAccountComponent } from 'src/app/components/accountComponents/stock-list-history-account/stock-list-history-account.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartContainerComponent } from 'src/app/containers/accountContainers/chart-container/chart-container.component';
import { ChartHeaderComponent } from 'src/app/components/accountComponents/chart-header/chart-header.component';
import { LinearChartComponent } from 'src/app/components/accountComponents/linear-chart/linear-chart.component';
import { TransactionsComponent } from 'src/app/components/accountComponents/transactions/transactions.component';
import { StockSearchHistoryAccountComponent } from 'src/app/components/accountComponents/stock-search-account/stock-search-history-account.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import { TransactionContainerComponent } from 'src/app/containers/accountContainers/transaction-container/transaction-container.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DatePipe } from '@angular/common'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CorrectTransactionComponent } from 'src/app/alerts/account/correct-transaction/correct-transaction.component';
import { WrongTransactionComponent } from 'src/app/alerts/account/wrong-transaction/wrong-transaction.component';
import { SessionTimeComponent } from 'src/app/components/accountComponents/session-time/session-time.component';
import { SessionDialogComponent } from 'src/app/dialogs/accountDialogs/session-dialog/session-dialog.component';
import { AppModule } from 'src/app/app.module';
import { MatDialogRef } from '@angular/material/dialog';


@NgModule({
    imports: [
        CommonModule,
        AccountRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatSortModule,
        NgxChartsModule,
        MatTabsModule,
        MatInputModule,
        MatPaginatorModule,
        NgApexchartsModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
    ],
    declarations: [
        PortfolioAccountComponent,
        ChartsAccountComponent,
        HistoryAccountComponent,
        LeftbarAccountComponent,
        LeftbarAccountComponent,
        StockListChartsAccountComponent,
        DataContainerPortfolioComponent,
        PortfolioSummaryComponent,
        ChartSummaryPortfolioComponent,
        StockListHistoryAccountComponent,
        StockListPortfolioAccountComponent,
        ChartContainerComponent,
        ChartHeaderComponent,
        LinearChartComponent,
        TransactionsComponent,
        StockSearchHistoryAccountComponent, 
        TransactionContainerComponent,
        CorrectTransactionComponent,
        WrongTransactionComponent,
        
    ],
    
    providers:[DatePipe]
})
export class AccountModule { }