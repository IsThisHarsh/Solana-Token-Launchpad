export const handleNumberInput = (name: string, form: any) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value;
        const parsedValue = rawValue === "" ? undefined : parseFloat(rawValue);
        if (parsedValue) {
            if (!isNaN(parsedValue) || rawValue === "") {
                form.setValue(name, parsedValue, {shouldValidate: true});
            }
        }
    };