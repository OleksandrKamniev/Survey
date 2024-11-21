import surveyConfig from '@/data/surveyConfig.json';

import StepPage from '@/pages/StepPage';

export function generateStaticParams() {
  const steps = surveyConfig.questions.map((question) => question.id);
  return steps.map((stepName) => ({ stepName }));
}
export default function Home() {
  return <StepPage />;
}
