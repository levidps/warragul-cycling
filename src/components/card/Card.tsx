import { forwardRef, PropsWithChildren, useRef } from "react";
import * as card from './card.module.css';

type Props = {
	title?: string;
	className?: string;
	ref: HTMLDivElement | null,
}

const Card = forwardRef(function CardComponent(props: PropsWithChildren<Props>) {
	const localRef = useRef<HTMLDivElement | null>(null)

	return (
		<>
			<div ref={localRef}
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