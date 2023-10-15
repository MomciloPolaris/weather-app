import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Infos from "./Infos";
import Sunrise from "./Icons/Sunrise";
import Sunset from "./Icons/Sunset";
import { forecastType } from "../types";
import {
  getHumidityValue,
  getPop,
  getSunTime,
  getVisibilityValue,
  getWindDirection,
} from "../helpers";

type Props = {
  data: forecastType;
};

function Degree({ temp }: { temp: number }) {
  return (
    <span>
      {temp} <sup>°</sup>
    </span>
  );
}

function Forecast({ data }: Props) {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);
  const today = data.list[0];

  const renderHourlyForecast = () => {
    return data.list.map((item, i) => (
      <div className="inline-block text-center w-[50px] flex-shrink-0" key={i}>
        <p className="text-sm">
          {i === 0 ? "Now" : new Date(item.dt * 1000).getHours()}
        </p>
        <img
          alt={`weather-icon-${item.weather[0].description}`}
          src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
        />
        <p className="text-sm font-bold">
          <Degree temp={Math.round(item.main.temp)} />
        </p>
      </div>
    ));
  };

  const temperatureData = {
    labels: data.list.map((item) => new Date(item.dt * 1000).getHours()),
    datasets: [
      {
        label: "Max Temperature (°C)",
        data: data.list.map((item) => Math.ceil(item.main.temp_max)),
        borderColor: "rgba(255, 99, 132, 0.7)",
        fill: false,
      },
      {
        label: "Min Temperature (°C)",
        data: data.list.map((item) => Math.floor(item.main.temp_min)),
        borderColor: "rgba(75, 192, 192, 0.7)",
        fill: false,
      },
    ],
  };

  return (
    <div className="w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg">
      <div className="mx-auto w-[380px]">
        <section className="text-center">
          <h2 className="text-2xl font-black">
            {data.name}
            <span className="font-thin"> {data.country}</span>
          </h2>
          <h1 className="text-4xl font-extrabold">
            <Degree temp={Math.round(today.main.temp)} />
          </h1>
          <p className="text-sm">
            {today.weather[0].main} {today.weather[0].description}
          </p>
          <p className="text-sm">
            H: <Degree temp={Math.ceil(today.main.temp_max)} /> L:{" "}
            <Degree temp={Math.floor(today.main.temp_min)} />
          </p>
        </section>

        <section className="flex overflow-x-scroll mt-4 pb-2 mb-5">
          <Line data={temperatureData} />
        </section>

        <section className="flex flex-wrap justify-between text-zinc-700">
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
            <Sunrise /> <span className="mt-2">{getSunTime(data.sunrise)}</span>
          </div>
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
            <Sunset /> <span className="mt-2">{getSunTime(data.sunset)}</span>
          </div>
          <Infos
            icon="wind"
            title="Wind"
            info={`${Math.round(today.wind.speed)}km/h`}
            description={`${getWindDirection(
              Math.round(today.wind.deg)
            )}, gusts ${today.wind.gust.toFixed(1)} km/h`}
          />
          <Infos
            icon="feels"
            title="Feels like"
            info={<Degree temp={Math.round(today.main.feels_like)} />}
            description={`Feels ${
              Math.round(today.main.feels_like) < Math.round(today.main.temp)
                ? "colder"
                : "warmer"
            }`}
          />
          <Infos
            icon="humidity"
            title="Humidity"
            info={`${today.main.humidity}%`}
            description={getHumidityValue(today.main.humidity)}
          />
          <Infos
            icon="pop"
            title="Precipitation"
            info={`${Math.round(today.pop * 1000)}%`}
            description={`${getPop(today.pop)}, clouds at ${today.clouds.all}%`}
          />
          <Infos
            icon="pressure"
            title="Pressure"
            info={`${today.main.pressure} hPa`}
            description={`${
              Math.round(today.main.pressure) < 1013 ? "Lower" : "Higher"
            } than standard`}
          />
          <Infos
            icon="visibility"
            title="Visibility"
            info={`${(today.visibility / 1000).toFixed()} km`}
            description={getVisibilityValue(today.visibility)}
          />
        </section>
      </div>
    </div>
  );
}

export default Forecast;
