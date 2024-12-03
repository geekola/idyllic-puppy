interface CampaignHeaderProps {
  title: string;
}

export function CampaignHeader({ title }: CampaignHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-primary to-highlight px-6 py-8 text-white">
      <h1 className="text-2xl font-heading font-bold">AR Campaign Details</h1>
      <p className="mt-2 text-white/80">{title}</p>
    </div>
  );
}