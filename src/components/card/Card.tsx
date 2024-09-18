import { PropsWithChildren } from "react";
import * as card from './card.module.css';

type Props = {
	title?: string;
	className?: string;
}

function Card(props: PropsWithChildren<Props>) {

	return (
		<>
			<div className={card.card + ' ' + props.className}>
				{ props.title &&
					<h2>{ props.title }</h2>
				}
				{ props.children }
			</div>
		</>
	)
}

export default Card;