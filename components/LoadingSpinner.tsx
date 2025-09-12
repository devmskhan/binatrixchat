import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    message?: string;
    className?: string;
    showMessage?: boolean;
    variant?: "default" | "dots" | "pulse" | "gradient";
}

export default function LoadingSpinner({
     size = "md",
     message = "Loading...",
     className,
     showMessage = true,
     variant = "default"
    }: LoadingSpinnerProps) {
    
    const sizeClasses = {
        sm: "w-6 h-6 border-2",
        md: "w-10 h-10 border-4",
        lg: "w-16 h-16 border-8",
    };

    const containerPadding = {
        sm: "min-h-[60px]",
        md: "min-h-[100px]",
        lg: "min-h-[150px]",
    };

    const dotSizes = {
        sm: "w-2 h-2",
        md: "w-3 h-3", 
        lg: "w-4 h-4",
    };

    const pulseSizes = {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16",
    };

    const renderSpinner = () => {
        switch (variant) {
            case "dots":
                return (
                    <div className="flex space-x-2">
                        <div className={cn("bg-primary rounded-full animate-bounce", dotSizes[size])}></div>
                        <div className={cn("bg-primary rounded-full animate-bounce delay-100", dotSizes[size])}></div>
                        <div className={cn("bg-primary rounded-full animate-bounce delay-200", dotSizes[size])}></div>
                    </div>
                );
            
            case "pulse":
                return (
                    <div className="relative">
                        <div className={cn("bg-primary/20 rounded-full animate-ping absolute", pulseSizes[size])}></div>
                        <div className={cn("bg-primary rounded-full animate-pulse", dotSizes[size])} style={{
                            position: 'relative',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}></div>
                    </div>
                );
            
            case "gradient":
                return (
                    <div className={cn("relative", sizeClasses[size])}>
                        <div className={cn(
                            "animate-spin rounded-full border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1",
                            sizeClasses[size]
                        )}>
                            <div className="rounded-full bg-background h-full w-full"></div>
                        </div>
                    </div>
                );
            
            default:
                return (
                    <div className={cn(
                        "animate-spin rounded-full border-muted-foreground/20 border-t-primary drop-shadow-sm",
                        sizeClasses[size]
                    )} />
                );
        }
    };

    return (
        <div className={cn(
            "flex flex-col items-center justify-center gap-3", 
            containerPadding[size], 
            className
        )}>
            <div 
                role="status"
                aria-label="loading"
                className="relative"
            >
                {renderSpinner()}
            </div>
            
            {showMessage && (
                <p className="text-sm text-muted-foreground animate-pulse text-center max-w-xs">
                    {message}
                </p>
            )}
        </div>
    );
}

// Enhanced inline variant for use within existing layouts
export function InlineSpinner({ 
    size = "md",
    className,
    variant = "default",
}: {
    size?: "sm" | "md" | "lg";
    className?: string;
    variant?: "default" | "dots" | "pulse" | "gradient";
}) {
    const sizeClasses = {
        sm: "w-4 h-4 border-2",
        md: "w-6 h-6 border-4", 
        lg: "w-8 h-8 border-8",
    };

    const dotSizes = {
        sm: "w-1.5 h-1.5",
        md: "w-2 h-2",
        lg: "w-3 h-3", 
    };

    const pulseSizes = {
        sm: "w-6 h-6",
        md: "w-8 h-8",
        lg: "w-10 h-10",
    };

    const renderInlineSpinner = () => {
        switch (variant) {
            case "dots":
                return (
                    <div className="flex space-x-1">
                        <div className={cn("bg-primary rounded-full animate-bounce", dotSizes[size])}></div>
                        <div className={cn("bg-primary rounded-full animate-bounce delay-100", dotSizes[size])}></div>
                        <div className={cn("bg-primary rounded-full animate-bounce delay-200", dotSizes[size])}></div>
                    </div>
                );
            
            case "pulse":
                return (
                    <div className="relative flex items-center justify-center">
                        <div className={cn("bg-primary/20 rounded-full animate-ping absolute", pulseSizes[size])}></div>
                        <div className={cn("bg-primary rounded-full animate-pulse relative z-10", dotSizes[size])}></div>
                    </div>
                );
            
            case "gradient":
                return (
                    <div className={cn(
                        "animate-spin rounded-full border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5",
                        sizeClasses[size]
                    )}>
                        <div className="rounded-full bg-background h-full w-full"></div>
                    </div>
                );
            
            default:
                return (
                    <div className={cn(
                        "animate-spin rounded-full border-muted-foreground/20 border-t-primary drop-shadow-sm",
                        sizeClasses[size]
                    )} />
                );
        }
    };

    return (
        <div 
            role="status"
            aria-label="loading"
            className={cn("inline-flex items-center justify-center", className)}
        >
            {renderInlineSpinner()}
        </div>
    );
}

// Overlay spinner for full-screen loading
export function OverlaySpinner({
    message = "Loading...",
    showMessage = true,
    variant = "gradient",
    blur = false,
}: {
    message?: string;
    showMessage?: boolean;
    variant?: "default" | "dots" | "pulse" | "gradient";
    blur?: boolean;
}) {
    return (
        <div className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-background/80",
            blur && "backdrop-blur-sm"
        )}>
            <div className="flex flex-col items-center justify-center gap-4 p-8 bg-card rounded-lg shadow-lg border">
                <LoadingSpinner 
                    size="lg" 
                    message={message}
                    showMessage={showMessage}
                    variant={variant}
                    className="min-h-0"
                />
            </div>
        </div>
    );
}

// Button loading spinner
export function ButtonSpinner({
    size = "sm",
    className,
}: {
    size?: "sm" | "md";
    className?: string;
}) {
    const sizeClasses = {
        sm: "w-4 h-4 border-2",
        md: "w-5 h-5 border-2",
    };

    return (
        <div className={cn(
            "animate-spin rounded-full border-current/20 border-t-current",
            sizeClasses[size],
            className
        )}
        role="status"
        aria-label="loading"
        />
    );
}