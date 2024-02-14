interface BadgeProps {
    children: React.ReactNode;
  }

export default function Badge({ children }: BadgeProps) {

    return (
        <span className="text-xs bg-primary/10 text-primary rounded-full px-3 py-1">
        {children}
        </span>
    );
    }