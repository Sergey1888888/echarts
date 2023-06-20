import {Products, Settings, SettingsNumeric} from "../../../utils/types";

export interface HeatmapProps {
    xAxis: Settings | null;
    yAxis: Settings | null;
    metric: SettingsNumeric | null;
    data: Products[] | null;
}