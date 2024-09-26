'use client';

import { FormDataProvider } from '@/components/form/Context';
import { MailStep } from '@/components/form/MailStep';
import { MessageStep } from '@/components/form/MessageStep';
import { NameStep } from '@/components/form/NameStep';
import { SummaryStep } from '@/components/form/SummaryStep';
import { Step, type StepItem, Stepper } from '@/components/ui/Stepper';
import { cn } from '@/lib/utils';
import type React from 'react';

const steps = [
	{ label: 'Nom et prénom' },
	{ label: 'Adresse e-mail' },
	{ label: 'Message' },
	{ label: 'Récapitulatif' },
] satisfies StepItem[];

interface ContactFormProps {
	className?: string;
}

const ContactForm = ({ className }: ContactFormProps) => (
	<FormDataProvider>
		<div className={cn(className, 'flex w-full flex-col gap-4')}>
			<Stepper
				variant="circle-alt"
				initialStep={0}
				orientation="vertical"
				steps={steps}
				size="sm"
			>
				{steps.map((stepProps, index) => {
					if (index === 0) {
						return (
							<Step key={stepProps.label} {...stepProps}>
								<NameStep />
							</Step>
						);
					}

					if (index === 1) {
						return (
							<Step key={stepProps.label} {...stepProps}>
								<MailStep />
							</Step>
						);
					}

					if (index === 2) {
						return (
							<Step key={stepProps.label} {...stepProps}>
								<MessageStep />
							</Step>
						);
					}

					return (
						<Step key={stepProps.label} {...stepProps}>
							<SummaryStep />
						</Step>
					);
				})}
			</Stepper>
		</div>
	</FormDataProvider>
);

export default ContactForm;
