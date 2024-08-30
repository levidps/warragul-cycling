export type WeatherForecastResponse = {
	lat:             number;
	lon:             number;
	timezone:        string;
	timezone_offset: number;
	current:         WeatherForecast;
	hourly:          WeatherForecast[];
	daily:           DailyWeatherForecast[];
	alerts:          Alert[];
}

export type Alert = {
	sender_name: string;
	event:       string;
	start:       number;
	end:         number;
	description: string;
	tags:        string[];
}

export type WeatherForecast = {
	dt:         number;
	sunrise?:   number;
	sunset?:    number;
	temp:       number;
	feels_like: number;
	pressure:   number;
	humidity:   number;
	dew_point:  number;
	uvi:        number;
	clouds:     number;
	visibility: number;
	wind_speed: number;
	wind_deg:   number;
	wind_gust:  number;
	weather:    Weather[];
	rain?:      Rain;
	pop?:       number;
}

export type Rain = {
	'1h': number;
}

export type Weather = {
	id:          number;
	main:        Main;
	description: Description;
	icon:        Icon;
}

export type Description = 'light rain' | 'heavy intensity rain' | 'clear sky' | 'overcast clouds' | 'broken clouds';

export type Icon = '10n' | '10d' | '01d' | '04d' | '04n' | string;

export type Main = 'Rain' | 'Clear' | 'Clouds' | string;

export type DailyWeatherForecast = {
	dt:         number;
	sunrise:    number;
	sunset:     number;
	moonrise:   number;
	moonset:    number;
	moon_phase: number;
	summary:    string;
	temp:       Temp;
	feels_like: FeelsLike;
	pressure:   number;
	humidity:   number;
	dew_point:  number;
	wind_speed: number;
	wind_deg:   number;
	wind_gust:  number;
	weather:    Weather[];
	clouds:     number;
	pop:        number;
	rain?:      number;
	uvi:        number;
}

export type FeelsLike = {
	day:   number;
	night: number;
	eve:   number;
	morn:  number;
}

export type Temp = {
	day:   number;
	min:   number;
	max:   number;
	night: number;
	eve:   number;
	morn:  number;
}
