# React UI Components

UI Components for React Applications.

<https://github.com/iouring-engineering/ui-components>

## Table of Contents

- [Installation](#installation)
- [React Heatmap](#react-heatmap)
  - [Overview](#overview)
  - [Usage](#usage)
  - [Props](#props)
  - [Examples](#examples)
- [License](#license)

## Installation

To get started, you can install the package using npm:

```bash
npm install @iouring-engineering/ui-components
```

## React Heatmap

### Overview

The React Heatmap is an easy-to-use component for visualizing market data, such as stocks, cryptocurrencies, or any other financial data in a heatmap format, making it easier to identify trends and patterns.

### Usage

You can easily integrate the library into your React application. Here's a basic example of how to use the `Heatmap` component:

```jsx
import React from "react";
import { Heatmap } from "@iouring-engineering/ui-components";

const App = () => {
  const marketData = /* Your market data here */;

  return (
    <div>
      <h1>Market Heatmap</h1>
      <Heatmap heatmapList={marketData} />
    </div>
  );
}

export default App;
```

### Props

Props for configuring the `Heatmap` component.

- `heatmapList: Array<Record<string, any>>`: An array of data objects that will be displayed in the heatmap.

- `heatmapFilters?: HeatmapFilter[]` (Optional): An array of heatmap filter definitions to categorize and style the data displayed in the heatmap. If not provided, the default filters will be used.

- `ContentNode: React.FC<ContentNodeProps>`: A required React component used for rendering the content of each heatmap tile.
The tileElement prop can be any item from the `heatmapList`, allowing for flexibility in the type of data that can be passed to the ContentNode component. The `ContentNodeProps` type is defined as follows:

  ```typescript
  type ContentNodeProps = {
    tileElement: Record<string, any>;
  };
  ```

- `emptyContentNode?: React.ReactNode` (Optional): Custom content to be displayed when there is no data in the heatmap.

- `handleTileClick?: (item: any) => void` (Optional): A callback function to handle tile clicks with the selected item as a parameter.

- `tileHeight?: string` (Optional): The height of each heatmap tile.

- `tileWidth?: string` (Optional): The width of each heatmap tile.

- `textColor?: string` (Optional): The text color to apply to the content within the tiles.

- `filterKey?: string` (Optional): The data key to apply the heatmap filter. Specify the key within the `heatmapList` objects, based on which filtering criteria have to be applied.

- `tileAnimation?: boolean` (Optional): Enable or disable tile animation.

- `resetFilter?: boolean` (Optional): Reset the heatmap filter when a specified condition is met.

- `hideFilters?: boolean` (Optional): Hide the heatmap filter interface or controls.

### Examples

#### Example 1: Custom Content Rendering

In this example, we create a basic heatmap using the `<Heatmap>` component. We pass an array of `watchlistStocks` to display market data. The heatmap will use default settings for appearance and interaction.

```jsx
import React from "react";
import { Heatmap } from "@iouring-engineering/ui-components";
import HeatmapContent from "./HeatmapContent"; // Replace with your actual component to be rendered inside each tile

const App = () => {
  return (
    <div>
      <h1>Custom Content Rendering Example</h1>
      <Heatmap
        heatmapList={sampleData}
        ContentNode={HeatmapContent}
        // Other props go here
      />
    </div>
  );
}

export default App;
```

#### Example 2: Handling Tile Clicks

You can also handle tile clicks to perform specific actions when a tile is clicked. In this example, we open a quote for the selected symbol.

```jsx
import React from "react";
import { Heatmap } from "@iouring-engineering/ui-components";

const App = () => {
  return (
    <div>
      <h1>Handling Tile Clicks Example</h1>
      <Heatmap
        heatmapList={sampleData}
        handleTileClick={(item) => navigateToQuote(item)} // Update this as needed
        // Other props go here
      />
    </div>
  );
}

export default App;
```

#### Example 3: Using Custom Filters in the Heatmap

To apply your custom filters to the `Heatmap` component, include the `heatmapFilters` prop with your defined filters. Here's how you can use the `heatmapFilters` prop in your `Heatmap` component:

```jsx
import React from "react";
import { Heatmap } from "@iouring-engineering/ui-components";

const App = () => {
    const heatmapFilters = [
        {
            label: "Above +5%",
            backgroundColor: "limegreen",
            opacity: 1,
            filterCondition: (chngPerValue: number) => {
                return chngPerValue > 5;
            }
        },
        {
            label: "0 to +5 %",
            backgroundColor: "limegreen",
            opacity: 0.5,
            filterCondition: (chngPerValue: number) => {
                return chngPerValue > 0 && chngPerValue < 5;
            }
        },
        {
            label: "0%",
            backgroundColor: "antiquewhite",
            opacity: 1,
            filterCondition: (chngPerValue: number) => {
                return chngPerValue === 0;
            }
        },
        {
            label: "-5 to 0 %",
            backgroundColor: "orangered",
            opacity: 0.5,
            filterCondition: (chngPerValue: number) => {
                return chngPerValue > -5 && chngPerValue < 0;
            }
        },
        {
            label: "Below -5%",
            backgroundColor: "orangered",
            opacity: 1,
            filterCondition: (chngPerValue: number) => {
                return chngPerValue < -5;
            }
        }
        // Add more custom filters as needed
    ];

    return (
        <div>
            <h1>Custom Filters Example</h1>
            <Heatmap
                heatmapList={sampleData}
                heatmapFilters={heatmapFilters} // Pass your custom filters here
                // Other props go here
            />
        </div>
    );
}

export default App;
```

## License

This project is licensed under the terms of the [MIT License](https://github.com/iouring-engineering/ui-components/blob/main/LICENSE).
