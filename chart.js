import * as d3 from 'd3';

const weatherUrl =
  'https://gist.githubusercontent.com/S4mLab/443e4c9ec734ce19b202c54b0666e7fe/raw/6d14a1d3778b39d3b3b5e9509ecb17cee738bc9a/weather_data.json';

const drawScatterPlot = async () => {
  const weatherObjsList = await d3.json(weatherUrl);
  console.table(weatherObjsList[0]);

  // access the data
  const xAccessor = (dataObj) => dataObj.dewPoint;
  const yAccessor = (dataObj) => dataObj.humidity;
  const colorAccessor = (dataObj) => dataObj.cloudCover;

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
  const graphDimension = {
    width:
      wrapperDimension.width -
      wrapperDimension.margins.right -
      wrapperDimension.margins.left,
    height:
      wrapperDimension.height -
      wrapperDimension.margins.top -
      wrapperDimension.margins.bottom,
  };

  // draw the canvas
  const wrapper = d3
    .select('#wrapper')
    .append('svg')
    .attr('width', wrapperDimension.width)
    .attr('height', wrapperDimension.height);

  const graph = wrapper
    .append('g')
    .attr('width', graphDimension.width)
    .attr('height', graphDimension.height)
    .style(
      'transform',
      `translate(${wrapperDimension.margins.left}px, ${wrapperDimension.margins.top}px)`
    );

  // create the scale
  const dewPointDomain = d3.extent(weatherObjsList, xAccessor);
  const xScale = d3
    .scaleLinear()
    .domain(dewPointDomain)
    .range([0, graphDimension.width])
    .nice();

  const humidityDomain = d3.extent(weatherObjsList, yAccessor);
  const yScale = d3
    .scaleLinear()
    .domain(humidityDomain)
    .range([graphDimension.height, 0])
    .nice();

  // color scale for cloud cover var
  const cloudCoverDomain = d3.extent(weatherObjsList, colorAccessor);
  const colorScale = d3
    .scaleLinear()
    .domain(cloudCoverDomain)
    .range(['skyblue', 'darkslategrey']);
  // draw data element
  const dataDots = graph.selectAll('circle').data(weatherObjsList);

  dataDots
    .join('circle')
    .attr('cx', (dataObj) => xScale(xAccessor(dataObj)))
    .attr('cy', (dataObj) => yScale(yAccessor(dataObj)))
    .attr('r', 4)
    .attr('fill', (dataObj) => colorScale(colorAccessor(dataObj)));

  // draw peripherials (axes, legends)
  const xAxisGenerator = d3.axisBottom().scale(xScale);

  const xAxis = graph
    .append('g')
    .call(xAxisGenerator)
    .style('transform', `translateY(${graphDimension.height}px)`);

  // adding x axis label
  const xAxisLabel = xAxis
    .append('text')
    .attr('x', graphDimension.width / 2)
    .attr('y', wrapperDimension.margins.bottom - 10)
    .attr('fill', 'black')
    .style('font-size', '1.4em')
    .html('Dew point (??F)');

  const yAxisGenerator = d3.axisLeft().scale(yScale).ticks(5);

  const yAxis = graph.append('g').call(yAxisGenerator);

  // adding y axis label
  const yAxisLabel = yAxis
    .append('text')
    .attr('x', -graphDimension.height / 2)
    .attr('y', -wrapperDimension.margins.left + 10)
    .attr('fill', 'black')
    .style('font-size', '1.4em')
    .text('Relative humidity')
    .style('transform', 'rotate(-90deg)')
    .style('text-anchor', 'middle');
};

drawScatterPlot();
