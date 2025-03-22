import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api/api";
import ReactApexChart from "react-apexcharts";

interface Historical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

export default function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<Historical[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
    enabled: !!coinId,
    refetchInterval: 10000,
  });

  const priceData = (data ?? []).map((price) => Number(price.close));
  const timeData = (data ?? []).map((price) => new Date(price.time_close * 1000).getTime());

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ReactApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: priceData.length > 0 ? priceData : [0],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: { show: false },
            xaxis: {
              type: "datetime",
              categories: timeData,
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: true },
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}
