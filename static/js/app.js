const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'
d3.json(url).then((data) => {
    console.log(data)
})


function sampleCharts(sample_id) {
    d3.json(url).then((data) => {
        console.log(data.samples)
        
        var sample = data.samples
        
        var sampleResults = sample.filter(sample => sample.id == sample_id)
        console.log(sampleResults)
        
        var sampleFirst = sampleResults[0]
        console.log(sampleFirst)

        var otuId = sampleFirst.otu_ids
        console.log(otuId)

        var otuLabel = sampleFirst.otu_labels
        console.log(otuLabel)

        var samplesValues = sampleFirst.sample_values
        console.log(samplesValues)
    // Bar Chart    
    var barChart = [{
        x: samplesValues.slice(0,10).reverse(),
        y: otuId.slice(0,10).map(otuId => `OTU ${otuId}`).reverse(),
        text: otuLabel.slice(0,10).reverse(),
        type: 'bar',
        marker: {
            color: 'blue',
            width: 1
            },
        orientation: 'h'
    }] 

    var barLayout = {
        title: `Top 10 OTUs found for ${sample_id}`
    }

    Plotly.newPlot('bar', barChart, barLayout)

    // Bubble Chart
    var bubbleChart = [{
        x: otuId,
        y: samplesValues,
        text: otuLabel,
        mode: 'markers',
        marker: {
            color: otuId,
            size: samplesValues
        }
    }]

    var bubbleLayout = {
        title: `Sample Display by Individual`,
        hovermode: 'closest',
        xaxis: {title: 'OTU ID'}
    }

    Plotly.newPlot('bubble', bubbleChart, bubbleLayout)
    })
}

function sampleMeta (sample_id) {
    d3.json(url).then((data) => {
        var metaData = data.metadata
        var metaID = metaData.filter(sample => sample.id == sample_id)
        var metaFirst = metaID[0]
        var metaWfr = metaFirst.wfreq

        d3.select('#sample-metadata').html('')

        Object.entries(metaFirst).forEach(([key, value]) => {
            console.log(key, value)
            d3.select('#sample-metadata').append('h5').text(`${key}: ${value}`)
        })
    })
}

// Dropdown Menu
function init() {
    var dropDownmenu = d3.select('#selDataset')
    d3.json(url).then((data) => {
        var sampleName = data.names
        for (let i = 0; i < data.names.length; i++) {
            names = data.names[i]
            console.log(names)
            dropDownmenu
            .append('option')
            .text(names)
            .property('value', names)
        }
        
        const defaultSample = sampleName[0]
        sampleCharts(defaultSample)
        sampleMeta(defaultSample)
    })
}

function optionChanged(next_Sample) {
    sampleCharts(next_Sample)
    sampleMeta(next_Sample)
    }
    init ()