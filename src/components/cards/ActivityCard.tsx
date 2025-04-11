import React from "react";

// Use React.ComponentPropsWithoutRef to correctly type props including className
type CardProps = React.ComponentPropsWithoutRef<"div">;

const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={`bg-brand-surface rounded-2xl p-4 ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const ActivityCard: React.FC<CardProps> = ({ className, ...props }) => {
  return (
    <Card className={className} {...props}>
      <h3 className="text-lg font-semibold mb-4">Activity</h3>
      {/* Placeholder for Activity content */}
      <div className="text-center text-brand-text-muted">[Activity Chart]</div>
    </Card>
  );
};
