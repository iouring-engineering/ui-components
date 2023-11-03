
export const getDefaultHeatmapFilters = () => {
    return [
        {
            label: "Above +5%",
            backgroundColor: "var(--heatmap-positive)",
            opacity: 1,
            filterCondition: (value: number) => {
                return value > 5;
            }
        },
        {
            label: "+2 to +5 %",
            backgroundColor: "var(--heatmap-positive)",
            opacity: 0.8,
            filterCondition: (value: number) => {
                return value >= 2 && value <= 5;
            }
        },
        {
            label: "0 to +2 %",
            backgroundColor: "var(--heatmap-positive)",
            opacity: 0.5,
            filterCondition: (value: number) => {
                return value > 0 && value < 2;
            }
        },
        {
            label: "0%",
            backgroundColor: "var(--heatmap-zero)",
            opacity: 1,
            filterCondition: (value: number) => {
                return value === 0;
            }
        },
        {
            label: "0 to -2 %",
            backgroundColor: "var(--heatmap-negative)",
            opacity: 0.5,
            filterCondition: (value: number) => {
                return value > -2 && value < 0;
            }
        },
        {
            label: "-2 to -5 %",
            backgroundColor: "var(--heatmap-negative)",
            opacity: 0.8,
            filterCondition: (value: number) => {
                return value >= -5 && value <= -2;
            }
        },
        {
            label: "Below -5%",
            backgroundColor: "var(--heatmap-negative)",
            opacity: 1,
            filterCondition: (value: number) => {
                return value < -5;
            }
        }
    ];
}