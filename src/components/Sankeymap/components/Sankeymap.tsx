import {SankeymapProps} from "../props/SankeymapProps";
import styles from "../styles/styles.module.css";
import {useEffect} from "react";
import * as echarts from 'echarts'
import {EChartOption} from 'echarts'

export const Sankeymap = ({data, links}: SankeymapProps) => {
    useEffect(() => {
        if (data && links) {
            const options: EChartOption = {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: {
                    //@ts-ignore
                    type: 'sankey',
                    layout: 'none',
                    emphasis: {
                        focus: 'adjacency'
                    },
                    data: data,
                    links: links
                }
            };
            const element = document.getElementById('chart')!;
            const chart = echarts.init(element);
            //@ts-ignore
            chart.setOption(options);
        }
    }, [data, links])

    return (
        <div id='chart' className={styles.chart}></div>
    );
};
