import { PropsWithChildren } from "react";
import * as card from './card.module.css';

type Props = {
	title?: string;
}

function Card(props: PropsWithChildren<Props>) {

	return (
		<>
			<div className={card.card}>
				{ props.title &&
					<h2>{ props.title }</h2>
				}
				{ props.children }
			</div>
		</>
	)
}

export default Card;