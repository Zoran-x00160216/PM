import React from "react";
import PropTypes from "prop-types";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./PieChartComponent.css";
import "bootstrap/dist/css/bootstrap.min.css";

const PieChartComponent = ({ setText, data, colors }) => {
  const COLORS = colors;

  // console.log(data);
  const pieData = [];
  for (let i in data) {
    pieData.push(data[i]);
  }
  // console.log(pieData);
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc"
          }}
        >
          <label>{`${payload[0].name} : ${payload[0].value}`}</label>
        </div>
      );
    }
    return null;
  };
  return (
    <>
      <div className="col-sm-6 mt-3 mr-auto">
        <div className="m-3 p-5 shadow-sm mb-1 bgCards myRounded">
          <div className="text-center border-bottom">
            <p>{setText}</p>
          </div>
          <PieChart width={200} height={200}>
            <Pie
              data={pieData}
              color="#000000"
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </div>
      </div>
    </>
  );
};

PieChartComponent.protoTypes = {
  setText: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  color: PropTypes.object.isRequired
};
export default PieChartComponent;
