import "../assets/styles/index.scss";

import { Button, Grow } from "@mui/material";
import React, { useEffect, useState } from "react";

import { getDefaultHeatmapFilters } from "./DefaultProps";

export interface HeatmapFilter {
    label: string
    backgroundColor?: string,
    opacity?: number,
    className?: string,
    filterCondition: (item: any) => boolean
}

export type HeatmapContentNodeProps = {
    tileElement: Record<string, any>
}

interface HeatmapViewProps {
    heatmapList: Array<Record<string, any>>
    heatmapFilters?: HeatmapFilter[]
    ContentNode: React.FC<HeatmapContentNodeProps>
    emptyContentNode?: React.ReactNode
    handleTileClick?: (item: any) => void
    tileHeight?: string
    tileWidth?: string
    textColor?: string
    filterKey?: string
    tileAnimation?: boolean
    resetFilter?: boolean
    hideFilters?: boolean
}

export const Heatmap = (props: HeatmapViewProps) => {
    const {
        heatmapList,
        heatmapFilters,
        ContentNode,
        emptyContentNode,
        handleTileClick,
        tileHeight = "90px",
        tileWidth = "200px",
        textColor = "#000",
        filterKey,
        tileAnimation,
        resetFilter,
        hideFilters
    } = props;

    const heatmapFiltersList: Array<HeatmapFilter> = heatmapFilters && heatmapFilters.length ? heatmapFilters : getDefaultHeatmapFilters();

    const [
        selectedFilterIndex,
        setSelectedFilterIndex
    ] = useState(-1);

    const handleResetFilter = () => {
        setSelectedFilterIndex(-1);
    }

    useEffect(() => {
        if (resetFilter) {
            handleResetFilter();
        }
    }, [resetFilter]);

    const applyFilter = () => {
        if (selectedFilterIndex === -1)
            return heatmapList;
        else if (filterKey) {
            const selectedFilter = heatmapFiltersList[selectedFilterIndex];
            const filtered = heatmapList.filter((item) => {
                const changeValue = parseFloat(item[filterKey]);
                return selectedFilter.filterCondition(changeValue);
            });
            return filtered;
        }
        else
            return [];
    };

    const getFilteredSymbols = (inx: number) => {
        if (selectedFilterIndex === inx) {
            setSelectedFilterIndex(-1);
        } else {
            setSelectedFilterIndex(inx);
        }
    };

    const getTileCategoryClass = (value: string) => {
        const chngValue = parseFloat(value);
        const matchingFilter = heatmapFiltersList.find(filter => filter.filterCondition(chngValue));

        if (matchingFilter && matchingFilter.className)
            return matchingFilter.className;
        else
            return "";
    };

    const getTileStyles = (value: string) => {
        const chngValue = parseFloat(value);
        const matchingFilter = heatmapFiltersList.find(filter => filter.filterCondition(chngValue));

        const tileStyle: React.CSSProperties = { backgroundColor: "transparent", opacity: 1 };

        if (matchingFilter && matchingFilter.backgroundColor)
            tileStyle.backgroundColor = matchingFilter.backgroundColor
        if (matchingFilter && matchingFilter.opacity)
            tileStyle.opacity = matchingFilter.opacity

        return tileStyle;
    };

    const heatmapTiles = applyFilter();

    return (
        <div className="heatmap-container">
            {!hideFilters && <div className="heatmap-filter-container">
                <div className="heatmap-filters">
                    {heatmapFiltersList.map((filter, index) => (
                        <Button
                            key={index}
                            className="filter-box"
                            style={{ color: textColor }}
                            onClick={() => getFilteredSymbols(index)}
                        >
                            <div
                                className={`filter-bg ${filter.className} ${selectedFilterIndex === index ? "selected-filter" : ""}`}
                                style={{
                                    backgroundColor: filter.backgroundColor ? filter.backgroundColor : "transparent",
                                    opacity: filter.opacity ? filter.opacity : 1,
                                }}
                            >
                            </div>
                            <div className="filter-content">
                                {filter.label}
                            </div>
                        </Button>
                    ))}
                </div>
            </div>}
            <div
                className={`heatmap-view-wrap ${heatmapTiles.length === 0 ? "heatmap-results-empty" : ""}`}
                style={{
                    gridTemplateRows: `repeat(auto-fill, minmax(${tileHeight}, 1fr))`,
                    gridTemplateColumns: `repeat(auto-fill, minmax(${tileWidth}, 1fr))`,
                }}
            >
                {heatmapTiles.length
                    ? heatmapTiles.map((item, index) => (
                        <Grow key={index} in timeout={tileAnimation ? (100 * index) : 0}>
                            <div
                                className="heatmap-card"
                                style={{
                                    height: tileHeight
                                }}
                            >
                                <div
                                    className={`transparency-wrapper ${filterKey && getTileCategoryClass(item[filterKey])}`}
                                    style={filterKey ? getTileStyles(item[filterKey]) : undefined}
                                >
                                </div>
                                <div
                                    className="card-wrapper"
                                    style={{
                                        color: textColor
                                    }}
                                    onClick={() => handleTileClick && handleTileClick(item)}>
                                    <ContentNode tileElement={item} />
                                </div>
                            </div>
                        </Grow>
                    )
                    )
                    : <>{emptyContentNode}</>}
            </div >
        </div>
    );
};
