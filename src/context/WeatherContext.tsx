import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import axios, { AxiosRequestConfig } from "axios";
import { WeatherForecastResponse } from "../models/weather.models.ts";

type TWeatherContext = {
	weather: WeatherForecastResponse | null;
	loading: boolean;
	error: Error | null;
	fetchWeather: () => Promise<WeatherForecastResponse>;
}

const BASE_URL = 'https://open-weather-map.levidps.workers.dev/';

const WeatherContext = createContext<TWeatherContext | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [weather, setWeather] = useState<WeatherForecastResponse | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchWeather = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			// TODO: allow means to pass lat/long here
			// - potential to make widget for clubs to display routes w/weather
			const long = "145.9309";
			const lat = "-38.1635";
			/**
			 * TODO: update for caching
			 * - add cache function to see if time of cache and cache data is valid
			 * - only make call if it's invalid or data is missing
			 */
			const response =
				      await axios.get<string, AxiosRequestConfig<any>>(`${BASE_URL}?lat=${lat}&lon=${long}`);
			setWeather(response.data)
			return response.data;
		} catch (e) {
			setError(e instanceof Error ? e : new Error('An unknown error occurred'));
		} finally {
			setLoading(false);
		}
	}, []);

	const value = { weather, loading, error, fetchWeather };

	return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};

export const useWeatherData = (): TWeatherContext => {
	const context = useContext(WeatherContext);
	if (context === undefined) {
		throw new Error('useApiData must be used within an ApiProvider');
	}
	return context;
};