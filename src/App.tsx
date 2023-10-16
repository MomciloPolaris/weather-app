import Search from "./components/Search";
import useForecast from "./hooks/useForecast";
import Forecast from "./components/Forecast";

const App = (): JSX.Element => {
  const { term, options, forecast, onInputChange, onOptionSelect, onSubmit } =
    useForecast();

  return (
    <div className="App">
      <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-blue-400 to-lime-400 h-fullscreen w-full">
        {forecast ? (
          <Forecast data={forecast} />
        ) : (
          <Search
            term={term}
            options={options}
            onInputChange={onInputChange}
            onOptionSelect={onOptionSelect}
            onSubmit={onSubmit}
          />
        )}
      </main>
    </div>
  );
};

export default App;
