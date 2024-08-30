export const round = (n: number): number => Math.round(n);

export const angleToDirection = (angle: number): string => {
	while( angle < 0 ) angle += 360 ;
	while( angle >= 360 ) angle -= 360 ;
	const v = Math.round( (angle -11.25 ) / 22.5 ) ;
	const str =["N","NNE","NE","ENE","E","ESE", "SE",
	     "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"] ;
	return str[ Math.abs(v) ] ;
}