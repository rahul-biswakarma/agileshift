import React from "react";

type ButtonProps = {
	onClick: () => void;
	imgSrc: string;
	altText: string;
	spanText: string;
	className?: string;
  };

function SignUpButtons({ onClick, imgSrc, altText, spanText, className }:ButtonProps) {
	return (
			<button
				className={`relative w-full  p-[0.5rem_1rem] rounded flex flex-wrap items-center ${className}`}
				onClick={onClick}
			>
				<img
					src={imgSrc}
					alt={altText}
					className="w-6 h-6"
				/>
				<span className="absolute text-center w-full text-white text-sm font-[500] ml-2">
					{spanText}
				</span>
			</button>
		
		);
	};
	
	export { SignUpButtons };

			

			

			
		
