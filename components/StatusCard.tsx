
interface StatusCardProps {
    title: string;
    description: string;
    action?: React.ReactNode;
    className?: string;
    children?: React.ReactNode;
}

export function StatusCard({
    title,
    description,
    action,
    className = "",
    children,
}: StatusCardProps) {
    return (
        <div className={`border border-gray-200 rounded-lg p-6 bg-white shadow-sm ${className}`}>
            <div className="text-center mb-4 space-y-4 max-w-md w-full mx-4">
                {children}
            <div className="text-lg font-semibold mb-2">{title}</div>
            {description && <p className="text-sm">{description}</p>}
            {action && <div className="mt-4">{action}</div>}
            </div>
        </div>
    );

            
}
