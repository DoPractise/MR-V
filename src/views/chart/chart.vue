<template>
  <div>
    <canvas id="myChart" width="400" height="400"></canvas>
  </div>
</template>
<script>
// 设定多个label  https://stackoverflow.com/questions/70532249/chart-js-3-radar-how-to-enabe-multiline-labels
// 颜色设置 https://stackoverflow.com/questions/41959834/change-labels-colors-for-radar-chart-js
import Chart from "chart.js";
//颜色对象
function randColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

export default {
  name: "Chart",
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var ctx = document.getElementById("myChart");
      let radarLabels = [
        ["Eating", "R1"],
        ["Drinking", "R2"],
        "Sleeping",
        ["Designing", "R4"],
        ["Coding", "R5"],
        ["Cycling", "R6"],
        ["Running", "R7"]
      ];
      var notations = {
        0: "",
        10: "no",
        20: "basic",
        30: "proficient",
        40: "great",
        50: "outstanding"
      };
      new Chart(ctx, {
        type: "radar",
        data: {
          labels: radarLabels,
          datasets: [
            {
              label: "My First Dataset",
              data: [65, 59, 90, 81, 56, 55, 40],
              fill: true,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgb(255, 99, 132)",
              pointBackgroundColor: "rgb(255, 99, 132)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgb(255, 99, 132)"
            },
            {
              label: "My Second Dataset",
              data: [28, 48, 40, 19, 96, 27, 100],
              fill: true,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgb(54, 162, 235)",
              pointBackgroundColor: "rgb(54, 162, 235)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgb(54, 162, 235)"
            }
          ]
        },
        options: {
          layout: {
            padding: 0
          },
          elements: {
            line: {
              tension: 0,
              borderWidth: 3
            }
          },
          scale: {
            angleLines: {
                // display: false
            },
            ticks: {
            //   display: false,
              beginAtZero: true,
              userCallback: function (value, index, values) {
                // console.log(value, index, values);
                // 根据值去判断显示
                // return notations[value];
                return value + "%";
              },
              fontColor: '#0f0',
            },
            pointLabels: {
            //   callback: function(value, index, values) {
            //       return '$' + value;
            //   },
              fontColor: radarLabels.map((lbl, idx) => randColor())
            }
          }
        }
      });
    }
  }
};
</script>
