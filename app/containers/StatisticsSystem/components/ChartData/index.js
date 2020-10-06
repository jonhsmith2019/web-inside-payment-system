/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
am4core.useTheme(am4themes_animated);

export default function ChartData(props) {
  useEffect(() => {
    const chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0;
    chart.data = [
      {
        category: 'Chuyển tiền vào game cá',
        value: props.data.tongNap,
        open: 0,
        stepValue: props.data.tongNap,
        color: chart.colors.getIndex(8),
        displayValue: props.data.tongNap,
      },
      {
        category: 'Trả lại tiền khi cộng tiền thất bại',
        value: 0 + props.data.tongHoan,
        open: 0,
        stepValue: 0 + props.data.tongHoan,
        color: chart.colors.getIndex(9),
        displayValue: 0 + props.data.tongHoan,
      },
      {
        category: 'Rút tiền từ game cá',
        value: 0 + props.data.tongRut,
        open: 0,
        stepValue: 0 + props.data.tongRut,
        color: chart.colors.getIndex(10),
        displayValue: 0 + props.data.tongRut,
      },
    ];

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.minGridDistance = 40;

    chart.yAxes.push(new am4charts.ValueAxis());

    const columnSeries = chart.series.push(new am4charts.ColumnSeries());
    columnSeries.dataFields.categoryX = 'category';
    columnSeries.dataFields.valueY = 'value';
    columnSeries.dataFields.openValueY = 'open';
    columnSeries.fillOpacity = 0.8;
    columnSeries.sequencedInterpolation = true;
    columnSeries.interpolationDuration = 1500;

    const columnTemplate = columnSeries.columns.template;
    columnTemplate.strokeOpacity = 0;
    columnTemplate.propertyFields.fill = 'color';

    const label = columnTemplate.createChild(am4core.Label);
    label.text = "{displayValue.formatNumber('#,## a')}";
    label.align = 'center';
    label.valign = 'middle';

    const stepSeries = chart.series.push(new am4charts.StepLineSeries());
    stepSeries.dataFields.categoryX = 'category';
    stepSeries.dataFields.valueY = 'stepValue';
    stepSeries.noRisers = true;
    stepSeries.stroke = new am4core.InterfaceColorSet().getFor(
      'alternativeBackground',
    );
    stepSeries.strokeDasharray = '3,3';
    stepSeries.interpolationDuration = 2000;
    stepSeries.sequencedInterpolation = true;

    // because column width is 80%, we modify start/end locations so that step would start with column and end with next column
    stepSeries.startLocation = 0.1;
    stepSeries.endLocation = 1.1;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = 'none';
  }, [props.data]);

  return (
    <div style={{ overflow: 'auto' }}>
      {isMobile ? (
        <div id="chartdiv" style={{ width: '1000px', height: '500px' }} />
      ) : (
        <div id="chartdiv" style={{ width: '100%', height: '500px' }} />
      )}
    </div>
  );
}

ChartData.propTypes = {
  data: PropTypes.object,
};
