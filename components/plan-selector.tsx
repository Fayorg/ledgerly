import { getAvailablePlans, getRecommandedPlan, Plan } from '@/lib/plans';
import { cn } from '@/lib/utils';
import React from 'react';

export default function PlanSelector({ plan, onPlanChange, disabled = false }: { plan: Plan; onPlanChange: (plan: Plan) => void; disabled?: boolean }) {
	const plans = getAvailablePlans();
	const recommanded = getRecommandedPlan();
	const selected = plans.findIndex((p) => p.name === plan.name);

	return (
		<div className="grid grid-cols-1 gap-2">
			{plans.map((plan, index) => (
				<PlanCard key={index} plan={plan} selected={selected == index} onClick={() => !disabled && onPlanChange(plan)} recommanded={plans.findIndex((p) => p.name === recommanded.name) == index} />
			))}
		</div>
	);
}

function PlanCard({ plan, selected = false, onClick = () => {}, recommanded = false }: { plan: Plan; selected?: boolean; onClick?: () => void; recommanded?: boolean }) {
	return (
		<div className={cn('border-2 rounded-lg px-2 py-2', selected && 'border-blue-400')} onClick={onClick}>
			<div className="flex justify-between">
				<div className="flex justify-center items-center gap-2">
					<h2 className="text-lg font-bold">{plan.name}</h2>
					{recommanded && <h2 className="bg-green-300 px-2 py-0 rounded-sm">Best Seller</h2>}
				</div>
				<h2 className="text-lg">${plan.amount}</h2>
			</div>
			<p>{plan.description}</p>
		</div>
	);
}
