interface customCardColors {
    positiveColor?:string
    negativeColor?: string
    zeroColor?: string
}

export const getDefaultHeatmapFilters = (cardColors: customCardColors | undefined, borderColors: customCardColors | undefined) => {
    return [
        {
            label: "Above +5%", opacity: 1,
            backgroundColor: cardColors?.positiveColor ? cardColors.positiveColor : "var(--heatmap-lib-positive)",
            borderColor: borderColors?.positiveColor ? borderColors.positiveColor : "var(--heatmap-lib-positive)",
            filterCondition: (value: number) => {
                return value > 5;
            }
        },
        {
            label: "+2 to +5 %", opacity: 0.8,
            backgroundColor: cardColors?.positiveColor ? cardColors.positiveColor : "var(--heatmap-lib-positive)",
            borderColor: borderColors?.positiveColor ? borderColors.positiveColor : "var(--heatmap-lib-positive)",
            filterCondition: (value: number) => {
                return value >= 2 && value <= 5;
            }
        },
        {
            label: "0 to +2 %", opacity: 0.5,
            backgroundColor: cardColors?.positiveColor ? cardColors.positiveColor : "var(--heatmap-lib-positive)",
            borderColor: borderColors?.positiveColor ? borderColors.positiveColor : "var(--heatmap-lib-positive)",
            filterCondition: (value: number) => {
                return value > 0 && value < 2;
            }
        },
        {
            label: "0%", opacity: 1,
            backgroundColor: cardColors?.zeroColor ? cardColors.zeroColor : "var(--heatmap-lib-zero)",
            borderColor: borderColors?.zeroColor ? borderColors.zeroColor : "var(--heatmap-lib-positive)",
            filterCondition: (value: number) => {
                return value === 0;
            }
        },
        {
            label: "0 to -2 %", opacity: 0.5,
            backgroundColor: cardColors?.negativeColor ? cardColors.negativeColor : "var(--heatmap-lib-negative)",
            borderColor: borderColors?.negativeColor ? borderColors.negativeColor : "var(--heatmap-lib-positive)",
            filterCondition: (value: number) => {
                return value > -2 && value < 0;
            }
        },
        {
            label: "-2 to -5 %", opacity: 0.8,
            backgroundColor: cardColors?.negativeColor ? cardColors.negativeColor : "var(--heatmap-lib-negative)",
            borderColor: borderColors?.negativeColor ? borderColors.negativeColor : "var(--heatmap-lib-positive)",
            filterCondition: (value: number) => {
                return value >= -5 && value <= -2;
            }
        },
        {
            label: "Below -5%", opacity: 1,
            backgroundColor: cardColors?.negativeColor ? cardColors.negativeColor : "var(--heatmap-lib-negative)",
            borderColor: borderColors?.negativeColor ? borderColors.negativeColor : "var(--heatmap-lib-positive)",
            filterCondition: (value: number) => {
                return value < -5;
            }
        }
    ];
};
