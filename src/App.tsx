import styles from "./app.module.css"
import Select from "./components/Select";
import {ChangeEvent, MouseEvent, useEffect, useState} from "react";
import {ExcelData, Products, SankeyMapData, SankeyMapLinks, Settings, SettingsNumeric} from "./utils/types";
import {productKeys, productNumericKeys} from "./utils/constants";
import Heatmap from "./components/Heatmap";
import {getProducts} from "./api/products";
import * as xlsx from "xlsx";
import Sankeymap from "./components/Sankeymap";

function App() {
    const [fetchedData, setFetchedData] = useState<Products[] | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [excelData, setExcelData] = useState<any[] | null>(null);
    const [sankeyData, setSankeyData] = useState<SankeyMapData[] | null>(null);
    const [sankeyLinks, setSankeyLinks] = useState<SankeyMapLinks[] | null>(null);
    const [sankeyOptions, setSankeyOptions] = useState<string[] | null>(null);
    const [sankeyNumericOptions, setSankeyNumericOptions] = useState<string[] | null>(null);
    const [sankeySelectedOption, setSankeySelectedOption] = useState<string[]>([]);
    const [sankeySelectedNumericOption, setSankeySelectedNumericOption] = useState<string | null>(null);
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

    const onSelectSankeyOption = (value: string) => {
        if (sankeySelectedOption.includes(value)) {
            setSankeySelectedOption(sankeySelectedOption.filter(option => option !== value));
        } else {
            setSankeySelectedOption([...sankeySelectedOption, value]);
        }
    };

    const onSelectSankeyNumericOption = (value: string) => {
        setSankeySelectedNumericOption(value);
    };

    const onReadFile = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target?.result;
                const workbook = xlsx.read(data, {type: "array"});
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const excelData: ExcelData[] = xlsx.utils.sheet_to_json(worksheet);
                const sankeyOptions: string[] = [];
                const sankeyNumericOptions: string[] = [];
                for (let [key, value] of Object.entries(excelData[0])) {
                    if (typeof value === 'number') {
                        sankeyNumericOptions.push(key);
                    } else if (typeof value === 'string') {
                        sankeyOptions.push(key);
                    }
                }

                setExcelData(excelData);
                setSankeyOptions(sankeyOptions);
                setSankeyNumericOptions(sankeyNumericOptions);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    };

    const onCloseFile = () => {
        setFile(null);
    };

    const onInputClick = (event: MouseEvent<HTMLInputElement>) => {
        const element = event.target as HTMLInputElement;
        element.value = '';
    };

    useEffect(() => {
        getProducts().then(products => setFetchedData(products));
    }, [])

    useEffect(() => {
        if (excelData && sankeySelectedOption.length >= 2 && sankeySelectedNumericOption) {
            const sourcesTargets = [];

            for (let i = 0; i < sankeySelectedOption.length; i++) {
                sourcesTargets.push(new Set(excelData.map(data => data[sankeySelectedOption[i]])));
            }

            const links: SankeyMapLinks[] = [];
            const makeLinks = (sources: Set<string>, sourceKey: string, targets: Set<string>, targetKey: string) => {
                for (let source of sources.values()) {
                    for (let target of targets.values()) {
                        const profit = excelData.filter(data => data[sourceKey] === source && data[targetKey] === target)
                            .reduce((result, current) => result += current[sankeySelectedNumericOption], 0);
                        if (profit > 0) {
                            links.push({source, target, value: Number(profit.toFixed(2))});
                        }
                    }
                }
            }

            for (let i = 0; i < sankeySelectedOption.length - 1; i++) {
                makeLinks(sourcesTargets[i], sankeySelectedOption[i], sourcesTargets[i + 1], sankeySelectedOption[i + 1]);
            }

            const allNames = [];
            for (let set of sourcesTargets) {
                allNames.push(...set);
            }
            const sankeyData: SankeyMapData[] = [];
            for (let name of allNames) {
                sankeyData.push({name});
            }

            setSankeyLinks(links);
            setSankeyData(sankeyData);
        }
    }, [excelData, sankeySelectedOption, sankeySelectedNumericOption])

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
                <label htmlFor="upload">
                    3 задание
                    <input
                        type="file"
                        name="upload"
                        id="upload"
                        onClick={onInputClick}
                        onChange={onReadFile}
                    />
                </label>
                {file && <div className={styles.close3} onClick={onCloseFile}>Закрыть 3 задание</div>}
                {file && sankeyOptions && sankeyNumericOptions && <div>
                    <Select label='Source / target' selected={sankeySelectedOption} options={sankeyOptions}
                            placeholder='Выберите'
                            onChange={onSelectSankeyOption} multiple/>
                    <Select label='Metric' selected={sankeySelectedNumericOption} options={sankeyNumericOptions}
                            placeholder='Выберите'
                            onChange={onSelectSankeyNumericOption}/>
                </div>}
            </div>
            {!file && <Heatmap xAxis={selectedX} yAxis={selectedY} metric={selectedM} data={fetchedData}/>}
            {file && sankeyData && sankeyLinks && <Sankeymap data={sankeyData} links={sankeyLinks}/>}
        </div>
    );
}

export default App;