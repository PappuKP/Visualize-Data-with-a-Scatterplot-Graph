/** 
*  @fileOverview Scatter Plot implementation for comapring international professional cyclists across 
*  several years and with information about the doping allegations on them, the scatter plot is created 
*  using D3.js library.
*  @author Anuj Yadav
*  @see Access Source Data {@link https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json|Datasource} 
*  @see Other Charts {@link https://github.com/yadavanuj1996/D3.js-Charts|Other D3.js-Charts}
*  @see Cod Pen {@link https://codepen.io/yadavanuj1996/pen/PMQEeW|Codpen}
*/
/** 
*  Function listens to DOM loading and will will call getCyclistData function on loading of DOM. 
*  @function
*  @name DOMContentLoadedFunction
*  @listens DOMContentLoaded
*/
document.addEventListener("DOMContentLoaded",()=>{
  getCyclistData();
});
/** 
*  @external XMLHttpRequest
*  @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest 
*/
/**
*  The function will send ajax request to get cyclist dataset, access cyclist data set at 
*  {@link https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json|Datasource}  
*/
let getCyclistData= ()=>{
  let ajaxRequest=new XMLHttpRequest();
  ajaxRequest.open("GET","https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json","true");
  ajaxRequest.send();
  ajaxRequest.onload=()=>{
    const responseData=ajaxRequest.responseText;
    const responseDatasetInJSON=JSON.parse(responseData);
    loadDopingChart(responseDatasetInJSON);
  }
}
/** 
*  This function will load the chart create svg add circles and display them on screen.
*  @param {Array<Object>} dopingDataset The dataset for construcing the chart
*/
let loadDopingChart=(dopingDataset)=>{
  const svgHeight=getChartHeight();
  const svgWidth=getChartWidth();
  const padding=getChartPadding();
  const specifier="%M:%S";
  const parsedData=getParsedData(dopingDataset,specifier);
  
  let svg=loadSvg(svgHeight,svgWidth);
  let legend=getCustomLegend();
                   
  let tooltip=getTooltip();
  
  let circlesInSvg=addCirclesInSvg(svg,dopingDataset);
      circlesInSvg.attr("cx",(d,i)=>xScale(dopingDataset,svgWidth,padding)(new Date(d.Year)))
                  .attr("cy",(d,i)=>yScale(parsedData,svgHeight,padding)(d3.timeParse(specifier)(d.Time)))
                  .attr("r",6)
                  .attr("data-xvalue",(d)=>d.Year)
                  .attr("data-yvalue",(d,i)=>d3.timeParse(specifier)(d.Time).toISOString())
                  .attr("fill",(d,i)=>{
                    if(d.Doping){
                      return "#5790C2";
                    }
                    return "#FC813F";
                  })
                  .on("mouseover", (d)=> {
                    tooltip.style("opacity", 1)
                           .attr("data-year", d.Year)
                           .html(`${d.Name}: ${d.Nationality}<br>
                                  Year: ${d.Year} Time: ${d.Time}<br></br>${d.Doping}`)
                           .style("left",`${20+xScale(dopingDataset,svgWidth,padding)(new Date(d.Year))}px`)
                           .style("top", `${yScale(parsedData,svgHeight,padding)(d3.timeParse(specifier)(d.Time))}px`);
                  })
                  .on("mouseout",(d,i)=>{
                    tooltip.style("opacity",0);
                  });
   
  let xAxis=d3.axisBottom(xScale(dopingDataset,svgWidth,padding)).tickFormat(d3.format("d"));
  loadXAxis(svg,xAxis,svgHeight,padding);
  
  let yAxis = d3.axisLeft(yScale(parsedData,svgHeight,padding)).tickFormat((d)=> d3.timeFormat(specifier)(d));
  loadYAxis(svg,yAxis,padding);
  
           
}
/** Return chart height.*/
const getChartHeight=()=>600;
/** Return chart width.*/
const getChartWidth=()=>1200;
/** Return chart padding.*/
const getChartPadding=()=>100;
/** This will return array of Time(MM:SS) format after extracting it from dataset.*/
const getParsedData=(dataset,specifier)=>{
  return dataset.map((d)=> {
      return d3.timeParse(specifier)(d.Time);
  });
};
/** Add svg in body and return it.*/
const loadSvg=(height,width)=>{
  return d3.select("body")
           .append("svg")
           .attr("height",height)
           .attr("width",width);
};
/** Returns custom legend sectin to represent the detail and color use of scatter plot. */
const getCustomLegend=(legendSvg)=>{
  return d3.select("body")
           .append("div")
           .attr("id","legend")
           .attr("height",100)
           .attr("width",100)
           .attr("fill","red")
           .style("left",`50px`)
           .style("top", `100px`)
           .html(`<div style="display:flex;font-size:13px;">
                   <div style="background-color:#5790C2;width:20px;height:20px;">
                   </div>
                   <div style="padding-left:10px;">Riders with doping allegations</div>
                  </div>
                  <div style="display:flex;padding-top:5px;font-size:13px;">
                   <div style="background-color:#FC813F;width:20px;height:20px;">
                   </div>
                   <div style="padding-left:10px;">No doping allegations</div>
                  </div>`);
};
/** Return tooltip to show inforamtion about a point when it is hovered. */
const getTooltip=()=>{
  return d3.select("body")
           .append("div")
           .attr("id","tooltip")
           .style("opacity",0);
};
/**
*  This function will add circles equal to number of elements in dataset inside svg.
*  @param {object} svg The svg element.
*  @param {Array<object>} dataset The doping Dataset.
*  @return {object} The svg element with number of cicles equal to number of elements in dataset. 
*/
const addCirclesInSvg=(svg,dataset)=>{
  return svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("class","dot");
};
/** Add labels in svg.*/
const addLabelsOnCircles=(svg,dataset,fontSize)=>{
  return svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .style("font-size",fontSize)
            .text((d,i)=>`${d.Time}`);        
};
/* This function will append a x-axis (g element)in svg (param).*/
const loadXAxis=(svg,xAxis,height,padding)=>{
   svg.append("g")
      .attr("transform",`translate(0,${height-padding})`)
      .attr("id","x-axis")
      .call(xAxis);
};
/* This function will append a y-axis (g element)in svg (param).*/
const loadYAxis=(svg,yAxis,padding)=>{
   svg.append("g")
      .attr("transform",`translate(${padding},0)`)
      .attr("id","y-axis")
      .call(yAxis);
};
/**
 * The Curried Function that will return interpolated value on x axis and will return 
 * function on first call then number value in second
 * @function
 * @param {Array<object>} dataset Dataset of all elements.
 * @param {number} width Width for chart area.
 * @param {number} padding Padding for chart inside svg.
 * @return {number} The interpolated value on that the point will be represented on chart.
 */
let xScale=(dataset,width,padding)=>{
  return d3.scaleTime()
           .domain([d3.min(dataset,(d,i)=>new Date(d.Year-1)),d3.max(dataset,(d,i)=>new Date(d.Year+1))])
           .range([padding,width-padding]);          
};
/**
 * The Curried Function that will return interpolated value on y axis and return 
 * function in first call then number value in second
 * @function 
 * @param {Array<object>} dataset Dataset of all elements.
 * @param {number} height Height for chart area.
 * @param {number} padding Padding for chart inside svg.
 * @return {number} The interpolated value on that the point will be represented on chart
 */
let yScale=(parsedData,height,padding)=>{
  return d3.scaleTime()
           .domain(d3.extent(parsedData))
           .range([padding,height-padding])
            .nice();
};
/**
 * The Curried Function that will return interpolated value on y axis and return 
 * function in first call then number value in second
 * @function 
 * @param {Array<object>} dataset Dataset of all elements.
 * @param {number} height Height for chart area.
 * @param {number} padding Padding for chart inside svg.
 * @return {number} The interpolated value on that the point will be represented on chart
 */
let ySecondsScale=(dataset,height,padding)=>{
  return d3.scaleTime()
           .domain([d3.min(dataset,(d,i)=>d.Seconds),d3.max(dataset,(d,i)=>d.Seconds)])
           .range([padding,height-padding]);          
};