import * as React from "react";
import {cn} from "@/lib/utils";

export type TextFieldProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
};

const TextField = React.forwardRef<HTMLTextAreaElement, TextFieldProps>(
    ({className, label, ...props}, ref) => {
        return (
            <div className="space-y-1">
                {label && (
                    <label
                        htmlFor={props.id}
                        className="block text-sm font-medium text-muted-foreground"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    className={cn(
                        "flex h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);

TextField.displayName = "TextField";

export {TextField};
