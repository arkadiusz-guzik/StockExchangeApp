export class ChartDataFormat {
    
    public series: Array<{
        name:string;
        data:Array<{x: any, y: any[]}>;
    }>;
    public chart:{
        type: string,
        height: number,
        toolbar: {
            show: boolean
        },
        zoom: {
            enabled: boolean
        }
    };
    public title:{
        align: string,
    };
    public xaxis:{
        tickAmount: number
    };
    public yaxis:{
        tooltip:{
            enabled: boolean
        }
    };
 


    constructor(){
       
        this.series = new Array();
        this.series[0] = {
            name: "candle",
            data: new Array()
        };
        this.chart = {
            type: "candlestick",
            height: 400,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        };
        this.title = {
            align: "left",
        };
        this.xaxis = {
            tickAmount: 6
        };
        this.yaxis = {
            tooltip: { enabled: true }
        };
    }
}

