import "../assets/styles/index.scss";

import { Button, Grow } from "@mui/material";
import React, { useEffect, useState } from "react";

import { getDefaultHeatmapFilters } from "./DefaultProps";

export interface HeatmapFilter {
    label: string
    backgroundColor?: string,
    borderColor?: string
    opacity?: number,
    className?: string,
    filterCondition: (item: any) => boolean
}

export type HeatmapContentNodeProps = {
    tileElement: Record<string, any>
}

interface customCardColors {
    positiveColor?:string
    negativeColor?: string
    zeroColor?: string
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
    cardColors?: customCardColors
    borderColors?: customCardColors
    isOpacityApply?:boolean
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
        hideFilters,
        cardColors,
        borderColors,
        isOpacityApply = true
    } = props;

    const heatmapFiltersList: Array<HeatmapFilter> = heatmapFilters && heatmapFilters.length
        ? heatmapFilters 
        : getDefaultHeatmapFilters(cardColors, borderColors);

    const [
        selectedFilterIndex,
        setSelectedFilterIndex
    ] = useState(-1);

    const handleResetFilter = () => {
        setSelectedFilterIndex(-1);
    };

    useEffect(() => {
        if (resetFilter) {
            handleResetFilter();
        }
    }, [
        resetFilter
    ]);

    const applyFilter = () => {
        if (selectedFilterIndex === -1)
            return heatmapList;
        else if (filterKey) {
            const selectedFilter = heatmapFiltersList[ selectedFilterIndex ];
            const filtered = heatmapList.filter((item) => {
                const changeValue = parseFloat(item[ filterKey ]);
                return selectedFilter.filterCondition(changeValue);
            });
            return filtered;
        }
        return [
        ];
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
        const matchingFilter = heatmapFiltersList.find((filter) => {
            return filter.filterCondition(chngValue); 
        });

        if (matchingFilter && matchingFilter.className)
            return matchingFilter.className;
        return "";
    };

    const getTileStyles = (value: string) => {
        const chngValue = parseFloat(value);
        const matchingFilter = heatmapFiltersList.find((filter) => {
            return filter.filterCondition(chngValue); 
        });

        const tileStyle: React.CSSProperties = 
        { background: "transparent", borderColor: "transparent", opacity: 1 };

        if (matchingFilter && matchingFilter.backgroundColor)
            tileStyle.background = matchingFilter.backgroundColor;
        if (matchingFilter && matchingFilter.opacity)
            tileStyle.opacity = isOpacityApply ? matchingFilter.opacity : 1;
        if (matchingFilter && matchingFilter.borderColor) {
            tileStyle.borderColor = matchingFilter.borderColor;
            tileStyle.borderWidth = "1px";
            tileStyle.borderStyle = "solid";
        }

        return tileStyle;
    };

    const heatmapTiles = applyFilter();

    return (
        <div className="heatmap-container">
            {!hideFilters && <div className="heatmap-filter-container">
                <div className="heatmap-filters">
                    {heatmapFiltersList.map((filter, index) => {
                        return (
                            <Button
                                key={index}
                                className="filter-box"
                                style={{ color: textColor }}
                                onClick={() => {
                                    return getFilteredSymbols(index); 
                                }}
                            >
                                <div
                                    className={`
                                        filter-bg ${filter.className} 
                                        ${selectedFilterIndex === index ? "selected-filter" : ""}`}
                                    style={{
                                        background: filter.backgroundColor ? 
                                            filter.backgroundColor
                                            : "transparent",
                                        borderWidth: filter.borderColor ? "1px" : "0px",
                                        borderStyle: "solid",
                                        borderColor: filter.borderColor ? filter.borderColor: "transparent",
                                        opacity: filter.opacity ? filter.opacity : 1,
                                    }}
                                >
                                </div>
                                <div className="filter-content">
                                    {filter.label}
                                </div>
                            </Button>
                        ); 
                    })}
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
                    ? heatmapTiles.map((item, index) => {
                        return (
                            <Grow key={index} in timeout={tileAnimation ? (100 * index) : 0}>
                                <div
                                    className="heatmap-card"
                                    style={{
                                        height: tileHeight
                                    }}
                                >
                                    <div
                                        className={`transparency-wrapper 
                                            ${filterKey && getTileCategoryClass(item[ filterKey ])}`}
                                        style={filterKey ? getTileStyles(item[ filterKey ]) : {}}
                                    >
                                    </div>
                                    <div
                                        className="card-wrapper"
                                        style={{
                                            color: textColor
                                        }}
                                        onClick={() => {
                                            return handleTileClick && handleTileClick(item); 
                                        }}>
                                        <ContentNode tileElement={item} />
                                    </div>
                                </div>
                            </Grow>
                        ); 
                    })
                    : <>{emptyContentNode}</>}
            </div >
        </div>
    );
};
