import * as d3 from 'd3';

const weatherUrl =
  'https://gist.githubusercontent.com/S4mLab/443e4c9ec734ce19b202c54b0666e7fe/raw/6d14a1d3778b39d3b3b5e9509ecb17cee738bc9a/weather_data.json';

const drawScatterPlot = async () => {
  const weatherObjsList = await d3.json(weatherUrl);

  // access the data
  const xAccessor = (dataObj) => dataObj.dewPoint;
  const yAccessor = (dataObj) => dataObj.humidity;

  // initialise canvas dimension
  const minWrapperDimension = d3.min([
    window.innerHeight * 0.9,
    window.innerWidth * 0.9,
  ]);
  const wrapperDimension = {
    width: minWrapperDimension,
    height: minWrapperDimension,
    margins: {
      top: 10,
      right: 10,
      bottom: 50,
      left: 50,
    },
  };
  const graphDimension = {};
};

drawScatterPlot();
