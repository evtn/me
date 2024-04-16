import { Suspense, lazy } from "preact/compat";

const PDFGenerator = lazy(async () => (await import(".")).PDFGenerator);

export const PDFGeneratorWrapper = () => {
    return (
        <Suspense fallback={<div />}>
            <PDFGenerator />
        </Suspense>
    );
};
