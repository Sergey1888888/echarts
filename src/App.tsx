import styles from "./app.module.css"
import Select from "./components/Select";
import {useEffect, useState} from "react";
import {Products, ProductsResponse, Settings, SettingsNumeric} from "./utils/types";
import {productKeys, productNumericKeys} from "./utils/constants";
import Heatmap from "./components/Heatmap";
import {getProducts} from "./api/products";

function App() {
    const [fetchedData, setFetchedData] = useState<Products[] | null>(null);
    const [selectedX, setSelectedX] = useState<Settings | null>(null);
    const [selectedY, setSelectedY] = useState<Settings | null>(null);
    const [selectedM, setSelectedM] = useState<SettingsNumeric | null>(null);

    const onSelectX = (value: Settings) => {
        setSelectedX(value);
    };

    const onSelectY = (value: Settings) => {
        setSelectedY(value);
    };

    const onSelectM = (value: SettingsNumeric) => {
        setSelectedM(value);
    };

    useEffect(() => {
        getProducts().then(products => setFetchedData(products));
    }, [])

    return (
        <div className={styles.app}>
            <div className={styles.settings}>
                <div className={styles.settings_title}>Settings</div>
                <Select label='X Axis' selected={selectedX} options={productKeys} placeholder='Выберите'
                        onChange={onSelectX}/>
                <Select label='Y Axis' selected={selectedY} options={productKeys} placeholder='Выберите'
                        onChange={onSelectY}/>
                <Select label='Metric' selected={selectedM} options={productNumericKeys as unknown as string[]}
                        placeholder='Выберите' onChange={onSelectM}/>
            </div>
            <Heatmap xAxis={selectedX} yAxis={selectedY} metric={selectedM} data={fetchedData}/>
        </div>
    );
}

export default App;
