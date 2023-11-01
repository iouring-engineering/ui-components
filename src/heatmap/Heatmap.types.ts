export interface HeatmapFilter {
    label: string
    backgroundColor?: string,
    opacity?: number,
    className?: string,
    filterCondition: (item: any) => boolean
}

export type ThemeType = "light" | "dark" | "black"

export type ContentNodeProps = {
    tileElement: Record<string, any>
}

export interface HeatmapViewProps {
    heatmapList: Array<Record<string, any>>
    heatmapFilters?: HeatmapFilter[]
    ContentNode: React.FC<ContentNodeProps>
    emptyContentNode?: React.ReactNode
    handleTileClick?: (item: any) => void
    tileHeight?: string
    tileWidth?: string
    textColor?: string
    theme?: ThemeType
    filterKey?: string
    tileAnimation?: boolean
    resetFilter?: boolean
    hideFilters?: boolean
}
