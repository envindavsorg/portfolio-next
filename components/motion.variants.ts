import type { Variants } from 'framer-motion';

const base: Variants = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
	},
};

const createVariant = (duration: number, delay: number): Variants => ({
	...base,
	visible: {
		...base.visible,
		transition: {
			duration,
			delay,
			ease: 'backOut',
		},
	},
});

enum VariantDurations {
	One = 0.35,
	Two = 0.45,
	Three = 0.55,
	Four = 0.65,
	Five = 0.75,
	Six = 0.85,
	Seven = 0.95,
	Eight = 1,
}

enum VariantDelays {
	One = 0.25,
	Two = 0.35,
	Three = 0.45,
	Four = 0.55,
	Five = 0.65,
	Six = 0.75,
	Seven = 0.85,
	Eight = 0.95,
}

export const variantsOne: Variants = createVariant(
	VariantDurations.One,
	VariantDelays.One,
);
export const variantsTwo: Variants = createVariant(
	VariantDurations.Two,
	VariantDelays.Two,
);
export const variantsThree: Variants = createVariant(
	VariantDurations.Three,
	VariantDelays.Three,
);
export const variantsFour: Variants = createVariant(
	VariantDurations.Four,
	VariantDelays.Four,
);
export const variantsFive: Variants = createVariant(
	VariantDurations.Five,
	VariantDelays.Five,
);
export const variantsSix: Variants = createVariant(
	VariantDurations.Six,
	VariantDelays.Six,
);

export const variantsSeven: Variants = createVariant(
	VariantDurations.Seven,
	VariantDelays.Seven,
);

//
//
//
//
export const defaultVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.35,
			delay: 0.25,
			ease: 'backOut',
		},
	},
};

export const defaultVariantsFast: Variants = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			delay: 0.5,
			ease: 'backOut',
		},
	},
};

export const defaultVariantsNoDelay: Variants = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.35,
			ease: 'backOut',
		},
	},
};
