import tigerFactory, {
  TigerTokenAuthProvider,
} from "@gooddata/sdk-backend-tiger";
import { MeasureGroupIdentifier, newDimension } from "@gooddata/sdk-model";
import * as md from "./export";
import Chart from "chart.js/auto";

async function getDataFromGoodData(measuresAndAttributes, dimensions) {
  let data;

  try {
    const backend = tigerFactory({
      hostname: process.env.GD_HOSTNAME,
    }).withAuthentication(new TigerTokenAuthProvider(process.env.GD_API_KEY));



    const result = await backend
      .workspace(process.env.GD_WORKSPACE)
      .execution()
      .forItems(measuresAndAttributes)
      .withDimensions(dimensions)
      .execute();

    data = await result.readAll();
    console.log(data)
  } catch (err) {
    console.log(err);
  }

  return data;
}

(async function () {
  const ctx = document.getElementById("chart");
  const { data, headerItems } = await getDataFromGoodData(
      [md.Rating.Avg, md.ProductCategory],
      newDimension([md.ProductCategory, MeasureGroupIdentifier,])
  );
  const labels = headerItems[0][0].map((item) => item.attributeHeaderItem.name);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Avg Ratings",
          data,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
})();
