the wrapper is the entire SVG element, it contains everything: the axes, data elements and legends
the graph only contains data elements

unline my previous thought, the axes do not include in the graph

## Draw the data element

```javascript
const dots = d3.selectAll('circle');
```

You are creating a d3 selection that aware of elements that's already exist.

If you already drew a part of your dataset, d3 will know which data dot has already been drawn and which need to be added

```javascript
const dots = d3.selectAll('circle').data(weatherObjsList);
```

use `.data()` to connect the data source to d3 selection. joining the selected elements (in this case, `circle` elements) with your list of data points.

the returned selection will have existing element, new elements and old elements that need to be removed

`_enter` is the list of data points which don't have an element to render yet

`_exit` is the list of data point which have already been rendered but currently not in the provided dataset
