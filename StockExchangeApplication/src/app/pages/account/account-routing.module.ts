import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsAccountComponent } from 'src/app/containers/accountContainers/charts-account/charts-account.component';
import { HistoryAccountComponent } from 'src/app/containers/accountContainers/history-account/history-account.component';
import { PortfolioAccountComponent } from 'src/app/containers/accountContainers/portfolio-account/portfolio-account.component';

const routes: Routes = [
            { path: 'portfolio', component: PortfolioAccountComponent},
            { path: 'charts', component: ChartsAccountComponent},
            { path: 'history', component: HistoryAccountComponent},
            { path: 'history/search/:value', component: HistoryAccountComponent},
            { path:'', redirectTo:'/account/portfolio', pathMatch:'full'},
            { path:'**', redirectTo:'/account/portfolio', pathMatch:'full'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }