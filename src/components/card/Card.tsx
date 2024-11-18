import { ForwardedRef, forwardRef, PropsWithChildren } from "react";
import * as card from './card.module.css';

type Props = {
	title?: string;
	className?: string;
	ref: HTMLDivElement | null,
}

const Card = forwardRef(function CardComponent(props: PropsWithChildren<Props>, ref: ForwardedRef<HTMLDivElement>) {

	return (
		<>
			<div ref={ref}
			     className={card.card + ' ' + props.className}>
				{ props.title &&
				  <h2>{ props.title }</h2>
				}
				{ props.children }
			</div>
		</>
	)
})

export default Card;