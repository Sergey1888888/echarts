import {HeatmapProps} from "../props/HeatmapProps";
import styles from "../styles/styles.module.css";
import {useEffect} from "react";
import * as echarts from 'echarts'
import {EChartOption} from 'echarts'

export const Heatmap = ({xAxis, yAxis, metric, data}: HeatmapProps) => {
    useEffect(() => {
        if (data && xAxis && yAxis && metric) {
            const x = data.map(value => value[xAxis]);
            const y = data.map(value => value[yAxis]);
            const m = data.map(value => value[metric]);

            //random data
            const d = [];
            for (let i = 0; i < x.length; i++) {
                for (let j = 0; j < y.length; j++) {
                    d.push([i, j, Math.random() >= 0.5 ? m[j] : '-']);
                }
            }

            const min = Math.min(...m);
            const max = Math.max(...m);

            const options: EChartOption = {
                tooltip: {
                    position: 'top'
                },
                grid: {
                    top: '10%',
                    bottom: '10%'

                },
                //@ts-ignore
                xAxis: {
                    type: 'category',
                    show: true,
                    position: 'bottom',
                    data: x,
                    axisLabel: {
                        interval: 0,
                    },
                    axisTick: {
                        show: false
                    }
                },
                //@ts-ignore
                yAxis: {
                    type: 'category',
                    show: true,
                    data: y,
                    axisLabel: {
                        interval: 0,
                    },
                    axisTick: {
                        show: false
                    }
                },
                visualMap: [
                    {
                        min: min,
                        max: max,
                        calculable: true,
                        orient: 'vertical',
                        right: '5%',
                        top: '10%',
                    }
                ],
                gradientColor: ['#F4FAD4', '#D7F1AC', '#A9E3AF', '#82CDBB', '#63C1BF', '#1FA8C9', '#2367AC', '#2A2D84', '#251354', '#050415'],
                series: [
                    {
                        type: 'heatmap',
                        data: d,
                        label: {
                            show: true
                        },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            const element = document.getElementById('chart')!;
            const chart = echarts.init(element);
            chart.setOption(options);
        }
    }, [data, xAxis, yAxis, metric])

    return (
        <div id='chart' className={styles.chart}></div>
    );
};
